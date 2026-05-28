const projects = {
  p01: {
    num:'01', label:'Ministry of Misconduct', date:'March 2026 — In Progress',
    slug: 'ministry-of-misconduct',
    categories:['Game','p5.js','Satire','Solo'],
    context:'A p5.js browser game where you play the powerful person and your job is to maintain corruption, not fight it. Inversion is the point — it should be felt, not explained.',
    hero: 'Content/Project%201/Ministry%20of%20misconduct%20gameplay%20.gif',
    thumbs: ['Content/Project%201/Keyshots/thumb-1.png','Content/Project%201/Keyshots/thumb-2.png','Content/Project%201/Keyshots/thumb-3.png'],
  },
  p02: {
    num:'02', label:'Ghar Jo Hum Piche Chhod Aaye', date:'2024',
    slug: 'ghar-jo-hum-piche-chhod-aaye',
    categories:['VR','Installation','Physical Computing','Immersive'],
    context:'A multisensory VR and physical-space installation set in a single kitchen on the day Partition news breaks, experienced through the body of an unsupervised child looking for a lost toy.',
    hero: '',
    thumbs: [],
  },
  p03: {
    num:'03', label:'C-Pill', date:'',
    slug: 'untitled-nikhil',
    categories:['Speculative','Critical Design','Political Philosophy'],
    context:'Each party\'s manifesto is a "pill" that grants complete knowledge of that party — but consuming it disqualifies you from voting for them. Full knowledge cancels belief.',
    hero: 'Content/C-Pill/C-Pill%20speculation%20.jpg',
    thumbs: [],
  },
  p04: {
    num:'04', label:'Hum Panchi Umukt Gagan Ke', date:'',
    slug: 'hum-panchi-umukt-gagan-ke',
    categories:['Narrative','Animation','Film'],
    context:'A video poem adapting Shiv Mangal Singh Suman\'s Hindi poem into a puppeteering-style animated short — full solo pipeline: narration, storyboard, assets, sound design, final video.',
    hero: '',
    thumbs: [],
  },
  p05: {
    num:'05', label:'Zepto Satire', date:'',
    slug: 'zepto-satire',
    categories:['Interaction Design','Data Viz','Critique'],
    context:'A functional dummy app that mimics Zepto\'s ordering flow but, instead of food, surfaces data about gig-workers\' health under Delhi\'s high AQI — interaction-as-critique.',
    hero: '',
    thumbs: [],
  },
  p06: {
    num:'06', label:'Fledge', date:'',
    slug: 'fledge',
    categories:['Narrative','Comic','Education'],
    context:'A bird-themed educational comic about breaking routine and facing challenges.',
    hero: '',
    thumbs: [],
  },
};

const keys = ['p01','p02','p03','p04','p05','p06'];
let cur = null;
let snapIdx = 0;
const cvBody     = document.getElementById('cv-body');
const projDetail = document.getElementById('proj-detail');
const isMobile   = () => window.innerWidth < 768;
const imgIdx     = {};

function getAllImages(id) {
  const p = projects[id];
  const imgs = [];
  if (p.hero) imgs.push(p.hero);
  (p.thumbs || []).forEach(t => { if (t) imgs.push(t); });
  return imgs;
}

function swapHero(e, id, src) {
  e.stopPropagation();
  const big = document.querySelector(`.pblock[data-id="${id}"] .pb-big`);
  let img = big.querySelector('img');
  if (!img) { img = document.createElement('img'); big.appendChild(img); }
  img.src = src;
  big.style.backgroundImage = `url('${src}')`;
  const idx = getAllImages(id).indexOf(src);
  if (idx !== -1) imgIdx[id] = idx;
  updateActiveThumb(id, src);
}

function initDrag(bigEl, id) {
  let startX = 0, lastX = 0, active = false, didDrag = false;
  const THRESHOLD = 50;

  bigEl.addEventListener('pointerdown', e => {
    startX = lastX = e.clientX;
    active = true;
    didDrag = false;
    bigEl.setPointerCapture(e.pointerId);
    bigEl.style.cursor = 'grabbing';
  });

  bigEl.addEventListener('pointermove', e => {
    if (!active) return;
    lastX = e.clientX;
    const dx = lastX - startX;
    if (Math.abs(dx) > 6) didDrag = true;
    if (didDrag) {
      const clamped = Math.sign(dx) * Math.min(Math.abs(dx) * 0.14, 22);
      const img = bigEl.querySelector('img');
      if (img) img.style.transform = `translateX(${clamped}px)`;
    }
  });

  bigEl.addEventListener('pointerup', e => {
    if (!active) return;
    active = false;
    bigEl.style.cursor = '';
    const dx = lastX - startX;
    const img = bigEl.querySelector('img');

    if (didDrag && Math.abs(dx) >= THRESHOLD) {
      const dir = dx < 0 ? 1 : -1;
      const imgs = getAllImages(id);
      if (imgs.length > 1) {
        imgIdx[id] = ((imgIdx[id] || 0) + dir + imgs.length) % imgs.length;
        const src = imgs[imgIdx[id]];
        if (img) {
          img.style.transition = 'opacity 0.13s, transform 0.13s';
          img.style.opacity = '0';
          img.style.transform = `translateX(${Math.sign(dx) * -28}px)`;
          setTimeout(() => {
            img.src = src;
            bigEl.style.backgroundImage = `url('${src}')`;
            updateActiveThumb(id, src);
            img.style.transition = 'none';
            img.style.transform = `translateX(${Math.sign(dx) * 28}px)`;
            img.style.opacity = '0';
            requestAnimationFrame(() => requestAnimationFrame(() => {
              img.style.transition = 'opacity 0.18s, transform 0.18s';
              img.style.opacity = '1';
              img.style.transform = 'translateX(0)';
              setTimeout(() => { img.style.transition = ''; }, 180);
            }));
          }, 130);
        } else {
          bigEl.style.backgroundImage = `url('${src}')`;
        }
      }
    } else if (img) {
      img.style.transition = 'transform 0.2s';
      img.style.transform = 'translateX(0)';
      setTimeout(() => { img.style.transition = ''; }, 200);
    }
  });

  bigEl.addEventListener('pointercancel', () => {
    active = false;
    bigEl.style.cursor = '';
    const img = bigEl.querySelector('img');
    if (img) {
      img.style.transition = 'transform 0.2s';
      img.style.transform = 'translateX(0)';
      setTimeout(() => { img.style.transition = ''; }, 200);
    }
  });

  bigEl.addEventListener('click', e => {
    if (Math.abs(lastX - startX) > 8) e.stopPropagation();
  });
}

function buildSheet() {
  let h = '';
  keys.forEach(k => {
    const p = projects[k];
    const heroImg = p.hero ? `<img src="${p.hero}" alt="${p.label}">` : '';
    const thumbsHtml = getAllImages(k).map((src, i) =>
      `<div class="pb-thumb${i === 0 ? ' active' : ''}" data-src="${src}" style="background-image:url('${src}')" onclick="swapHero(event,'${k}','${src}')"><img src="${src}" alt=""></div>`
    ).join('');
    const cats = (p.categories || []).join('<br>');
    h += `<div class="pblock" data-id="${k}" onclick="pick('${k}')">
      <div class="pb-meta">
        <div class="pb-title">${p.label}</div>
        <div class="pb-date">${p.date}</div>
      </div>
      <div class="pb-big"${p.hero ? ` style="background-image:url('${p.hero}')"` : ''}>${heroImg}</div>
      <div class="pb-cats">${cats}</div>
      <div class="pb-row2">
        <div class="pb-thumbs">${thumbsHtml}</div>
        <div class="pb-context">${p.context || ''}</div>
      </div>
    </div>`;
  });
  document.getElementById('sheet').innerHTML = h;
  keys.forEach(k => {
    const big = document.querySelector(`.pblock[data-id="${k}"] .pb-big`);
    if (big) initDrag(big, k);
  });
}

async function populate(id) {
  const p = projects[id];
  const container = document.getElementById('pd-sections');
  container.innerHTML = '';
  try {
    const res = await fetch(`Content/${p.slug}.html`);
    if (!res.ok) throw new Error(res.status);
    container.innerHTML = await res.text();
  } catch (e) {
    console.error('Failed to load case study:', e);
  }
}

function updateActiveThumb(id, src) {
  document.querySelectorAll(`.pblock[data-id="${id}"] .pb-thumb`)
    .forEach(t => t.classList.toggle('active', t.dataset.src === src));
}

function openZoom(src) {
  document.getElementById('pd-zoom-img').src = src;
  document.getElementById('pd-zoom').style.display = 'flex';
}

function closeZoom() {
  const el = document.getElementById('pd-zoom');
  if (el) el.style.display = 'none';
}

function navigateProject(dir) {
  const newIdx = snapIdx + dir;
  if (newIdx < 0 || newIdx >= keys.length) return;
  snapIdx = newIdx;
  const id = keys[newIdx];
  if (document.body.classList.contains('detail-open')) {
    pick(id);
  } else {
    const pblocks = document.querySelectorAll('.pblock');
    if (pblocks[newIdx]) pblocks[newIdx].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  updateNavArrows();
}

function updateNavArrows() {
  const up = document.getElementById('nav-up');
  const down = document.getElementById('nav-down');
  if (!up || !down) return;
  up.classList.toggle('hidden', snapIdx === 0);
  down.classList.toggle('hidden', snapIdx === keys.length - 1);
}

function initSnapObserver() {
  const sheet = document.getElementById('sheet');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = keys.indexOf(entry.target.dataset.id);
        if (idx !== -1) { snapIdx = idx; updateNavArrows(); }
      }
    });
  }, { root: sheet, threshold: 0.5 });
  document.querySelectorAll('.pblock').forEach(b => observer.observe(b));
}

function pick(id) {
  if (cur === id) return;
  cur = id;
  snapIdx = keys.indexOf(id);
  updateNavArrows();
  populate(id);
  document.querySelectorAll('.pblock').forEach(el => el.classList.remove('active'));
  document.querySelector(`.pblock[data-id="${id}"]`).classList.add('active');
  document.body.classList.add('detail-open');

  if (isMobile()) {
    cvBody.style.display = 'none';
    projDetail.style.cssText = 'display:block; opacity:1; transform:translateX(0);';
    return;
  }

  cvBody.style.transition = 'opacity 0.2s ease, transform 0.24s ease';
  cvBody.style.opacity = '0';
  cvBody.style.transform = 'translateX(20px)';
  setTimeout(() => {
    cvBody.style.display = 'none';
    projDetail.style.cssText = 'display:block; transition:none; opacity:0; transform:translateX(14px);';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      projDetail.style.transition = 'opacity 0.22s ease, transform 0.26s ease';
      projDetail.style.opacity = '1';
      projDetail.style.transform = 'translateX(0)';
    }));
  }, 210);
}

function closeDetail() {
  cur = null;
  document.body.classList.remove('detail-open');
  document.querySelectorAll('.pblock').forEach(el => el.classList.remove('active'));
  document.getElementById('pd-sections').innerHTML = '';

  if (isMobile()) {
    projDetail.style.cssText = 'display:none;';
    cvBody.style.cssText = '';
    return;
  }

  projDetail.style.transition = 'opacity 0.2s ease, transform 0.24s ease';
  projDetail.style.opacity = '0';
  projDetail.style.transform = 'translateX(20px)';
  setTimeout(() => {
    projDetail.style.display = 'none';
    cvBody.style.cssText = 'display:block; transition:none; opacity:0; transform:translateX(-10px);';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      cvBody.style.transition = 'opacity 0.22s ease, transform 0.26s ease';
      cvBody.style.opacity = '1';
      cvBody.style.transform = 'translateX(0)';
    }));
  }, 210);
}

function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(btn =>
    btn.classList.toggle('active', btn.textContent.toLowerCase() === tab)
  );
  document.body.classList.toggle('show-cv', tab === 'cv');
}

function goTop() {
  if (isMobile()) switchTab('projects');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeZoom(); closeDetail(); } });

const themeChk = document.getElementById('theme-chk');
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  themeChk.checked = true;
}
themeChk.addEventListener('change', function() {
  document.body.classList.toggle('dark', this.checked);
  localStorage.setItem('theme', this.checked ? 'dark' : 'light');
});

buildSheet();
initSnapObserver();
updateNavArrows();

document.getElementById('pd-sections').addEventListener('click', e => {
  const img = e.target.closest('.pd-imgs img');
  if (img) { e.stopPropagation(); openZoom(img.src); }
});

fetch('Content/cv.html')
  .then(r => r.text())
  .then(html => { document.getElementById('cv-body').innerHTML = html; })
  .catch(e => console.error('Failed to load CV:', e));
