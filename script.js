const projects = {
  p01: {
    label:'Ministry of Misconduct', date:'2026', status:'In Progress', feature:true,
    slug:'ministry-of-misconduct',
    categories:['Game','p5.js','Satire'],
    context:'A browser game where you play the powerful person and your job is to maintain corruption, not fight it. Inversion is the point — felt, not explained.',
    hero:'Content/Project%201/Ministry%20of%20misconduct%20gameplay%20.gif',
  },
  p02: {
    label:'Ghar Jo Hum Piche Chhod Aaye', date:'2024',
    slug:'ghar-jo-hum-piche-chhod-aaye',
    categories:['VR','Installation','Immersive'],
    context:'A multisensory VR and physical-space installation set in a single kitchen the day Partition news breaks, experienced through the body of a child.',
    hero:'Content/Ghar%20jo%20hum%20piche%20chhod%20aaye/GJHPCA.png',
  },
  p03: {
    label:'C-Pill', date:'',
    slug:'untitled-nikhil',
    categories:['Speculative','Critical Design'],
    context:'Each party\'s manifesto is a “pill” granting complete knowledge of that party — but consuming it disqualifies you from voting for them.',
    hero:'Content/C-Pill/C-Pill%20speculation%20.jpg',
  },
  p04: {
    label:'Hum Panchi Umukt Gagan Ke', date:'',
    slug:'hum-panchi-umukt-gagan-ke',
    categories:['Narrative','Animation','Film'],
    context:'A video poem adapting Shiv Mangal Singh Suman’s Hindi poem into a puppeteering-style animated short — full solo pipeline.',
    hero:'Content/Hum%20Panchi%20Umukt%20Gagan%20Ke/HPUMGk.png',
  },
  p05: {
    label:'Zepto Satire', date:'',
    slug:'zepto-satire',
    categories:['Interaction','Data Viz'],
    context:'A functional dummy app mimicking Zepto’s ordering flow that, instead of food, surfaces data on gig-workers’ health under Delhi’s AQI.',
    hero:'Content/Zupto/Screenshot%20(99).png',
  },
};

const order = ['p01','p02','p03','p04','p05'];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let originEl = null;       // tile the detail opened from
let currentImg = '';       // its background-image, reused on close

function buildBento() {
  const intro = `
    <section class="tile tile-intro" style="grid-area:intro; --i:0">
      <div>
        <div class="intro-name">Nikhil Shah</div>
        <p class="intro-role">Interaction designer working across story, games, research, satire &amp; speculation. Selected work below.</p>
      </div>
      <div class="intro-bottom">
        <div class="intro-links">
          <a href="mailto:shahniku2004@gmail.com">Email</a>
          <a href="Content/Nikhil_Resume.pdf" target="_blank">CV</a>
          <a href="sandbox.html">Sandbox</a>
          <a href="https://www.instagram.com" target="_blank">Instagram</a>
        </div>
        <label class="theme-toggle" title="Toggle dark mode">
          <input type="checkbox" id="theme-chk">
          <span class="theme-track"><span class="theme-knob"></span></span>
        </label>
      </div>
    </section>`;

  const tiles = order.map((k, i) => {
    const p = projects[k];
    const num = String(i + 1).padStart(2, '0');
    const cats = (p.categories || []).join(' · ');
    return `
      <a class="tile tile-proj${p.feature ? ' tile-feature' : ''}"
         style="grid-area:${k}; --i:${i + 1}"
         onclick="openDetail(event,'${k}')">
        <div class="tile-img" style="background-image:url('${p.hero}')"></div>
        <span class="tile-num">${num}</span>
        ${p.status ? `<span class="tile-status">${p.status}</span>` : ''}
        <div class="tile-foot">
          <div class="tile-title">${p.label}</div>
          <div class="tile-cats">${cats}${p.date ? ' — ' + p.date : ''}</div>
          <div class="tile-context">${p.context || ''}</div>
        </div>
      </a>`;
  }).join('');

  document.getElementById('bento').innerHTML = intro + tiles;
  initTheme();
}

function makeFlipHero(rect, img) {
  const hero = document.createElement('div');
  hero.className = 'flip-hero';
  hero.style.backgroundImage = img;
  hero.style.left = rect.left + 'px';
  hero.style.top = rect.top + 'px';
  hero.style.width = rect.width + 'px';
  hero.style.height = rect.height + 'px';
  document.body.appendChild(hero);
  return hero;
}

async function openDetail(e, id) {
  const tile = e.currentTarget;
  originEl = tile;
  currentImg = tile.querySelector('.tile-img').style.backgroundImage;

  const p = projects[id];
  const body = document.getElementById('detail-body');
  const d = document.getElementById('detail');
  const panel = d.querySelector('.detail-panel');

  body.innerHTML = '';
  // load case study in parallel with the animation
  fetch(`Content/${p.slug}.html`)
    .then(r => { if (!r.ok) throw new Error(r.status); return r.text(); })
    .then(html => { body.innerHTML = html; })
    .catch(() => { body.innerHTML = `<h3 style="font-size:16px">${p.label}</h3><p>${p.context || ''}</p>`; });

  document.body.style.overflow = 'hidden';

  if (reduceMotion) {
    d.classList.add('open');
    panel.scrollTop = 0;
    return;
  }

  // FLIP: clone tile image, grow it into the panel's footprint
  d.classList.add('open', 'animating');     // backdrop in, panel hidden
  const from = tile.getBoundingClientRect();
  const to = panel.getBoundingClientRect();
  const hero = makeFlipHero(from, currentImg);

  requestAnimationFrame(() => {
    hero.style.transition = 'top .5s var(--ease-io), left .5s var(--ease-io), width .5s var(--ease-io), height .5s var(--ease-io)';
    hero.style.left = to.left + 'px';
    hero.style.top = to.top + 'px';
    hero.style.width = to.width + 'px';
    hero.style.height = to.height + 'px';
  });

  const finish = () => {
    panel.scrollTop = 0;
    d.classList.remove('animating');         // panel + content fade in
    hero.classList.add('fade');
    setTimeout(() => hero.remove(), 300);
  };
  hero.addEventListener('transitionend', finish, { once: true });
  setTimeout(finish, 650);                    // safety fallback
}

function closeDetail() {
  const d = document.getElementById('detail');
  if (!d.classList.contains('open')) return;
  const panel = d.querySelector('.detail-panel');

  if (reduceMotion || !originEl) {
    d.classList.remove('open');
    document.body.style.overflow = '';
    return;
  }

  // FLIP back: shrink a hero from the panel footprint to the origin tile
  const from = panel.getBoundingClientRect();
  d.classList.add('animating');               // hide panel immediately
  const to = originEl.getBoundingClientRect();
  const hero = makeFlipHero(from, currentImg);

  requestAnimationFrame(() => {
    hero.style.transition = 'top .42s var(--ease-io), left .42s var(--ease-io), width .42s var(--ease-io), height .42s var(--ease-io)';
    hero.style.left = to.left + 'px';
    hero.style.top = to.top + 'px';
    hero.style.width = to.width + 'px';
    hero.style.height = to.height + 'px';
  });

  d.classList.remove('open');                 // backdrop fades out alongside
  const done = () => {
    hero.classList.add('fade');
    setTimeout(() => hero.remove(), 300);
    d.classList.remove('animating');
    document.body.style.overflow = '';
  };
  hero.addEventListener('transitionend', done, { once: true });
  setTimeout(done, 560);
}

function openZoom(src) {
  const z = document.getElementById('zoom');
  document.getElementById('zoom-img').src = src;
  z.classList.add('show');
}
function closeZoom() {
  document.getElementById('zoom').classList.remove('show');
}

function initTheme() {
  const chk = document.getElementById('theme-chk');
  if (!chk) return;
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    chk.checked = true;
  }
  chk.addEventListener('change', function () {
    document.body.classList.toggle('dark', this.checked);
    localStorage.setItem('theme', this.checked ? 'dark' : 'light');
  });
}

// close on background click of detail overlay
document.getElementById('detail').addEventListener('click', e => {
  if (e.target.id === 'detail') closeDetail();
});

// zoom case-study images
document.getElementById('detail-body').addEventListener('click', e => {
  const img = e.target.closest('.pd-imgs img');
  if (img) { e.stopPropagation(); openZoom(img.src); }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (document.getElementById('zoom').classList.contains('show')) closeZoom();
    else closeDetail();
  }
});

buildBento();
