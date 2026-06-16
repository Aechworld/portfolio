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

// ── Projects radial fan (landing infographic) ──
(function buildFan() {
  const svg = document.getElementById('fan');
  if (!svg) return;

  const SVGNS = 'http://www.w3.org/2000/svg';
  const keys = Object.keys(projects);
  const n = keys.length;
  const A0 = -90;                          // first slice boundary at the top
  const baseSpan = 360 / n;                // equal slices when nothing is hovered
  const EXPAND = 1.7;                      // hovered slice grows to 1.7× a normal slice

  const mk = (tag, attrs) => {
    const el = document.createElementNS(SVGNS, tag);
    for (const k in attrs) if (attrs[k] != null) el.setAttribute(k, attrs[k]);
    return el;
  };

  function build() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const W = window.innerWidth, H = window.innerHeight;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('width', W);
    svg.setAttribute('height', H);

    const C = { x: W / 2, y: H / 2 };        // hub centered on the page
    const rCircle = 66, moat = 18, rIn = rCircle + moat;
    const rOut = Math.hypot(W, H) + 200;     // big enough to bleed off-screen

    const pt = (rad, deg) => {
      const a = deg * Math.PI / 180;
      return [C.x + rad * Math.cos(a), C.y + rad * Math.sin(a)];
    };
    const wedgePath = (a0, a1) => {
      const [x1, y1] = pt(rIn, a0), [x2, y2] = pt(rOut, a0);
      const [x3, y3] = pt(rOut, a1), [x4, y4] = pt(rIn, a1);
      const large = (a1 - a0) > 180 ? 1 : 0;
      return `M ${x1} ${y1} L ${x2} ${y2} A ${rOut} ${rOut} 0 ${large} 1 ${x3} ${y3} ` +
             `L ${x4} ${y4} A ${rIn} ${rIn} 0 ${large} 0 ${x1} ${y1} Z`;
    };

    const gWedge = mk('g', {}), gSep = mk('g', {}), gLabel = mk('g', {});
    const wedges = [], labels = [], seps = [];
    let hoverTimer = null;

    keys.forEach((k, i) => {
      const w = mk('path', { class: 'wedge' });
      w.style.transitionDelay = (0.07 * i) + 's';
      gWedge.appendChild(w); wedges.push(w);

      const t = mk('text', { class: 'wedge-label', 'dominant-baseline': 'middle' });
      t.textContent = `${String(i + 1).padStart(2, '0')}   ${projects[k].title}`;
      gLabel.appendChild(t); labels.push(t);

      const sep = mk('line', { class: 'sep' });
      gSep.appendChild(sep); seps.push(sep);

      const go = () => {
        document.body.classList.add('leaving');
        setTimeout(() => { location.href = `case.html?id=${k}`; }, 320);
      };
      [w, t].forEach(el => {
        el.addEventListener('pointerenter', () => {
          clearTimeout(hoverTimer);
          hoverTimer = setTimeout(() => focus(i), 130);   // small delay before widening
        });
        el.addEventListener('pointerleave', () => {
          clearTimeout(hoverTimer);
          focus(-1);
        });
        el.addEventListener('click', go);
      });
    });

    const moatC = mk('circle', { cx: C.x, cy: C.y, r: rIn, class: 'moat' });
    const hub = mk('circle', { cx: C.x, cy: C.y, r: rCircle, class: 'hub' });
    const hubT = mk('text', {
      x: C.x, y: C.y, class: 'hub-label',
      'text-anchor': 'middle', 'dominant-baseline': 'middle',
    });
    hubT.textContent = 'Projects';

    svg.append(gWedge, gSep, moatC, hub, hubT, gLabel);

    // ── geometry driven by current spans (animated on hover) ──
    let spans = keys.map(() => baseSpan);
    let target = spans.slice();
    let hovered = -1;

    function layout() {
      let start = A0;
      for (let i = 0; i < n; i++) {
        const a0 = start, a1 = start + spans[i], mid = a0 + spans[i] / 2;
        start = a1;

        wedges[i].setAttribute('d', wedgePath(a0, a1));

        const [lx, ly] = pt(rIn + 24, mid);
        const cos = Math.cos(mid * Math.PI / 180);
        labels[i].setAttribute('x', lx);
        labels[i].setAttribute('y', ly);
        labels[i].setAttribute('text-anchor', cos > 0.2 ? 'start' : cos < -0.2 ? 'end' : 'middle');

        const [sx1, sy1] = pt(rIn - 2, a0), [sx2, sy2] = pt(rOut, a0);
        seps[i].setAttribute('x1', sx1); seps[i].setAttribute('y1', sy1);
        seps[i].setAttribute('x2', sx2); seps[i].setAttribute('y2', sy2);
      }
    }

    let raf = null;
    function tick() {
      let done = true;
      for (let i = 0; i < n; i++) {
        const d = target[i] - spans[i];
        if (Math.abs(d) > 0.04) { spans[i] += d * 0.12; done = false; }
        else spans[i] = target[i];
      }
      layout();
      raf = done ? null : requestAnimationFrame(tick);
    }

    function focus(h) {
      hovered = h;
      if (h < 0) {
        target = keys.map(() => baseSpan);
      } else {
        const big = baseSpan * EXPAND;
        const rest = (360 - big) / (n - 1);
        target = keys.map((_, i) => (i === h ? big : rest));
      }
      wedges.forEach((w, i) => {
        w.classList.toggle('active', i === h);
        w.classList.toggle('dim', h >= 0 && i !== h);
        labels[i].classList.toggle('active', i === h);
        labels[i].classList.toggle('dim', h >= 0 && i !== h);
      });
      if (!raf) raf = requestAnimationFrame(tick);
    }

    layout();
    requestAnimationFrame(() => requestAnimationFrame(() => {
      svg.querySelectorAll('.wedge, .wedge-label').forEach(el => el.classList.add('in'));
    }));
  }

  build();
  let rt;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(build, 160); });
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
