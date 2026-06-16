// ── Shared project data ──
const projects = {
  p01: {
    title: 'Ministry of Misconduct',
    date: 'March 2026 — In Progress',
    categories: ['Game', 'p5.js', 'Satire', 'Solo'],
    slug: 'ministry-of-misconduct',
    hero: 'Content/Project%201/Ministry%20of%20misconduct%20gameplay%20.gif',
  },
  p02: {
    title: 'Ghar Jo Hum Piche Chhod Aaye',
    date: '2024',
    categories: ['VR', 'Installation', 'Physical Computing', 'Immersive'],
    slug: 'ghar-jo-hum-piche-chhod-aaye',
    hero: 'Content/Ghar%20jo%20hum%20piche%20chhod%20aaye/GJHPCA.png',
  },
  p03: {
    title: 'C-Pill',
    date: '',
    categories: ['Speculative', 'Critical Design', 'Political Philosophy'],
    slug: 'untitled-nikhil',
    hero: 'Content/C-Pill/C-Pill%20speculation%20.jpg',
  },
  p04: {
    title: 'Hum Panchi Umukt Gagan Ke',
    date: '',
    categories: ['Narrative', 'Animation', 'Film'],
    slug: 'hum-panchi-umukt-gagan-ke',
    hero: 'Content/Hum%20Panchi%20Umukt%20Gagan%20Ke/HPUMGk.png',
  },
  p05: {
    title: 'Zepto Satire',
    date: '',
    categories: ['Interaction Design', 'Data Viz', 'Critique'],
    slug: 'zepto-satire',
    hero: 'Content/Zupto/Screenshot%20(99).png',
  },
};

// ── Dark-mode toggle with persistence ──
(function initTheme() {
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
})();

// ── Case-study page ──
(function initCase() {
  const body = document.getElementById('case-body');
  if (!body) return; // not the case template

  const id = new URLSearchParams(location.search).get('id');
  const p = projects[id];

  if (!p) {
    body.innerHTML = '<p class="case-error">Project not found. <a href="index.html">Back to index</a>.</p>';
    return;
  }

  document.title = p.title + ' — Nikhil Shah';
  document.getElementById('case-title').textContent = p.title;
  document.getElementById('case-meta').textContent =
    p.categories.join(' · ') + (p.date ? '  —  ' + p.date : '');

  const heroEl = document.getElementById('case-hero');
  if (p.hero) {
    heroEl.src = p.hero;
    heroEl.alt = p.title;
  } else {
    heroEl.remove();
  }

  fetch(`Content/${p.slug}.html`)
    .then(r => { if (!r.ok) throw new Error(r.status); return r.text(); })
    .then(html => { body.innerHTML = html; })
    .catch(() => {
      body.innerHTML = '<p class="case-error">Couldn\'t load this case study.</p>';
    });
})();

// ── Image zoom (lightbox) ──
function openZoom(src) {
  const z = document.getElementById('zoom');
  if (!z) return;
  document.getElementById('zoom-img').src = src;
  z.classList.add('show');
}
function closeZoom() {
  const z = document.getElementById('zoom');
  if (z) z.classList.remove('show');
}
document.addEventListener('click', e => {
  const img = e.target.closest('.pd-imgs img');
  if (img) openZoom(img.src);
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeZoom();
});
