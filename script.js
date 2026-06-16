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

// ── Projects donut (landing infographic) ──
(function buildDonut() {
  const svg = document.getElementById('donut');
  if (!svg) return;

  const SVGNS = 'http://www.w3.org/2000/svg';
  const keys = Object.keys(projects);
  const cx = 110, cy = 110, r = 80, GAP = 9;     // degrees of gap between segments
  const seg = 360 / keys.length;                  // slice per project
  const span = seg - GAP;

  const center = document.getElementById('donut-center');
  const defLabel = center.querySelector('.dc-label').textContent;
  const defSub = center.querySelector('.dc-sub').textContent;

  const polar = (radius, deg) => {
    const a = (deg - 90) * Math.PI / 180;          // -90 so 0° starts at top
    return { x: cx + radius * Math.cos(a), y: cy + radius * Math.sin(a) };
  };
  const arcPath = (radius, a0, a1) => {
    const s = polar(radius, a1), e = polar(radius, a0);
    const large = a1 - a0 <= 180 ? 0 : 1;
    return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${large} 0 ${e.x} ${e.y}`;
  };

  const segEls = [];

  keys.forEach((k, i) => {
    const p = projects[k];
    const a0 = i * seg + GAP / 2;
    const a1 = a0 + span;
    const mid = a0 + span / 2;

    const d = arcPath(r, a0, a1);

    // the visible arc
    const path = document.createElementNS(SVGNS, 'path');
    path.setAttribute('d', d);
    path.setAttribute('class', 'seg');
    path.setAttribute('pathLength', '1');          // normalize for draw-in
    path.style.transitionDelay = (0.12 * i) + 's';
    svg.appendChild(path);

    // invisible wide hit-area on top (thin strokes are hard to hover)
    const hit = document.createElementNS(SVGNS, 'path');
    hit.setAttribute('d', d);
    hit.setAttribute('class', 'seg-hit');
    svg.appendChild(hit);

    // the number label, just outside the ring
    const num = polar(r + 18, mid);
    const t = document.createElementNS(SVGNS, 'text');
    t.setAttribute('x', num.x);
    t.setAttribute('y', num.y);
    t.setAttribute('class', 'seg-num');
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('dominant-baseline', 'middle');
    t.textContent = String(i + 1).padStart(2, '0');
    svg.appendChild(t);

    const activate = (on) => {
      path.classList.toggle('active', on);
      t.classList.toggle('active', on);
      center.classList.toggle('swapped', on);
      center.querySelector('.dc-label').textContent = on ? p.title : defLabel;
      center.querySelector('.dc-sub').textContent = on ? String(i + 1).padStart(2, '0') + ' / ' + String(keys.length).padStart(2, '0') : defSub;
    };

    const go = () => {
      document.body.classList.add('leaving');
      setTimeout(() => { location.href = `case.html?id=${k}`; }, 320);
    };

    [hit, t].forEach(el => {
      el.addEventListener('pointerenter', () => activate(true));
      el.addEventListener('pointerleave', () => activate(false));
      el.addEventListener('click', go);
    });

    segEls.push(path);
  });

  // draw the segments in
  requestAnimationFrame(() => requestAnimationFrame(() => {
    segEls.forEach(p => p.classList.add('drawn'));
  }));
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
