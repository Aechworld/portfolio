// ── Project data ──
const projects = {
  p01: { label: 'Ministry of Misconduct', slug: 'ministry-of-misconduct', date: 'March 2026 — In Progress', categories: ['Game', 'p5.js', 'Satire', 'Solo'], hero: 'Content/Project%201/Ministry%20of%20misconduct%20gameplay%20.gif' },
  p02: { label: 'Ghar Jo Hum Piche Chhod Aaye', slug: 'ghar-jo-hum-piche-chhod-aaye', date: '2024', categories: ['VR', 'Installation', 'Physical Computing', 'Immersive'], hero: 'Content/Ghar%20jo%20hum%20piche%20chhod%20aaye/GJHPCA.png' },
  p03: { label: 'C-Pill', slug: 'untitled-nikhil', date: '', categories: ['Speculative', 'Critical Design', 'Political Philosophy'], hero: 'Content/C-Pill/C-Pill%20speculation%20.jpg' },
  p04: { label: 'Hum Panchi Umukt Gagan Ke', slug: 'hum-panchi-umukt-gagan-ke', date: '', categories: ['Narrative', 'Animation', 'Film'], hero: 'Content/Hum%20Panchi%20Umukt%20Gagan%20Ke/HPUMGk.png' },
  p05: { label: 'Zepto Satire', slug: 'zepto-satire', date: '', categories: ['Interaction Design', 'Data Viz', 'Critique'], hero: 'Content/Zupto/Screenshot%20(99).png' },
};

// ── Theme toggle (all pages) ──
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

// ── Physics landing (only where the stage exists) ──
(function initStage() {
  const stage = document.getElementById('stage');
  if (!stage || typeof Matter === 'undefined') return;

  const items = [
    { id: 'p01', kind: 'proj', label: projects.p01.label, hero: projects.p01.hero, href: 'case.html?id=p01' },
    { id: 'p02', kind: 'proj', label: projects.p02.label, hero: projects.p02.hero, href: 'case.html?id=p02' },
    { id: 'p03', kind: 'proj', label: projects.p03.label, hero: projects.p03.hero, href: 'case.html?id=p03' },
    { id: 'p04', kind: 'proj', label: projects.p04.label, hero: projects.p04.hero, href: 'case.html?id=p04' },
    { id: 'p05', kind: 'proj', label: projects.p05.label, hero: projects.p05.hero, href: 'case.html?id=p05' },
    { id: 'about', kind: 'about', label: 'About me', href: 'about.html' },
  ];

  const { Engine, Runner, Composite, Bodies, Body, Mouse, MouseConstraint, Events } = Matter;

  const RADIUS = 28;   // corner roundness (matches CSS border-radius)
  const WALL = 400;    // wall thickness, kept off-screen

  const engine = Engine.create();
  engine.gravity.y = 1;
  const world = engine.world;

  let W = stage.clientWidth;
  let H = stage.clientHeight;

  let bounds = [];
  function buildBounds() {
    Composite.remove(world, bounds);
    const floor = Bodies.rectangle(W / 2, H + WALL / 2, W + WALL * 2, WALL, { isStatic: true });
    const left  = Bodies.rectangle(-WALL / 2, H / 2, WALL, H * 3, { isStatic: true });
    const right = Bodies.rectangle(W + WALL / 2, H / 2, WALL, H * 3, { isStatic: true });
    bounds = [floor, left, right];
    Composite.add(world, bounds);
  }
  buildBounds();

  const cards = []; // { el, body, item, w, h }

  function sizeFor(item) {
    const big = item.kind === 'about' || item.id === 'p01';
    return big ? { w: 420, h: 277 } : { w: 353, h: 235 };
  }

  items.forEach(item => {
    const { w, h } = sizeFor(item);

    const el = document.createElement('a');
    el.className = `shape shape-${item.kind}`;
    el.href = item.href;
    el.style.width = w + 'px';
    el.style.height = h + 'px';
    el.draggable = false;
    if (item.kind === 'proj') {
      el.innerHTML =
        `<span class="shape-img" style="background-image:url('${item.hero}')"></span>` +
        `<span class="shape-label">${item.label}</span>`;
    } else {
      el.innerHTML = `<span class="shape-label shape-label-lg">${item.label}</span><span class="shape-arrow">→</span>`;
    }
    el.addEventListener('click', e => e.preventDefault()); // navigation handled by physics click test
    stage.appendChild(el);

    const body = Bodies.rectangle(
      60 + Math.random() * (W - 120),
      -200 - Math.random() * 600,
      w, h,
      {
        chamfer: { radius: RADIUS },
        restitution: 0.35,
        friction: 0.45,
        frictionAir: 0.012,
        angle: (Math.random() - 0.5) * 0.5,
      }
    );
    cards.push({ el, body, item, w, h });
  });

  // drop them in one at a time
  cards.forEach((c, i) => {
    setTimeout(() => {
      Composite.add(world, c.body);
      c.el.classList.add('in');
    }, 250 + i * 180);
  });

  // mouse drag / throw
  const mouse = Mouse.create(stage);
  const mc = MouseConstraint.create(engine, {
    mouse,
    constraint: { stiffness: 0.2, render: { visible: false } },
  });
  Composite.add(world, mc);
  mouse.element.removeEventListener('wheel', mouse.mousewheel);

  // click-vs-drag: navigate only on a clean click
  let downPos = null, downBody = null;
  Events.on(mc, 'mousedown', () => {
    downBody = mc.body;
    downPos = { x: mouse.position.x, y: mouse.position.y };
  });
  Events.on(mc, 'mouseup', () => {
    if (downBody && downPos) {
      const moved = Math.hypot(mouse.position.x - downPos.x, mouse.position.y - downPos.y);
      const card = cards.find(c => c.body === downBody);
      if (card && moved < 6) navigateTo(card.item.href);
    }
    downBody = null; downPos = null;
  });

  // render loop: sync DOM cards to physics bodies
  (function frame() {
    for (const c of cards) {
      const { x, y } = c.body.position;
      c.el.style.transform =
        `translate(${x - c.w / 2}px, ${y - c.h / 2}px) rotate(${c.body.angle}rad)`;
    }
    requestAnimationFrame(frame);
  })();

  Runner.run(Runner.create(), engine);

  let resizeT;
  window.addEventListener('resize', () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => {
      W = stage.clientWidth;
      H = stage.clientHeight;
      buildBounds();
    }, 150);
  });
})();

// ── Page transition veil ──
function navigateTo(href) {
  const veil = document.getElementById('veil');
  if (!veil) { window.location.href = href; return; }
  veil.classList.add('show');
  setTimeout(() => { window.location.href = href; }, 380);
}

// ── Case-study page ──
(function initCase() {
  const body = document.getElementById('case-body');
  if (!body) return;

  const id = new URLSearchParams(location.search).get('id');
  const p = projects[id];
  if (!p) {
    body.innerHTML = '<p class="case-error">Project not found. <a href="index.html">Back to index</a>.</p>';
    return;
  }

  document.title = p.label + ' — Nikhil Shah';
  document.getElementById('case-title').textContent = p.label;
  document.getElementById('case-meta').textContent =
    p.categories.join(' · ') + (p.date ? '  —  ' + p.date : '');

  const heroEl = document.getElementById('case-hero');
  if (p.hero) { heroEl.src = p.hero; heroEl.alt = p.label; }
  else heroEl.remove();

  fetch(`Content/${p.slug}.html`)
    .then(r => { if (!r.ok) throw new Error(r.status); return r.text(); })
    .then(html => { body.innerHTML = html; })
    .catch(() => { body.innerHTML = '<p class="case-error">Couldn\'t load this case study.</p>'; });
})();

// ── Image zoom (lightbox, all pages) ──
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
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeZoom(); });
