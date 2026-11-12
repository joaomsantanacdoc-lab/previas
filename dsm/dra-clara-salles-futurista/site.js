(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const nav = $(".nav");
  const onScroll = () => nav && nav.classList.toggle("solid", scrollY > 24);
  onScroll(); addEventListener("scroll", onScroll, { passive: true });

  const burger = $("#burger"), drawer = $("#drawer");
  if (burger && drawer) {
    burger.addEventListener("click", () => burger.setAttribute("aria-expanded", drawer.classList.toggle("open")));
    $$("a", drawer).forEach((a) => a.addEventListener("click", () => { drawer.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }));
  }

  const items = $$(".rv"), reveal = (el) => el.classList.add("in");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } }), { threshold: .12, rootMargin: "0px 0px -6% 0px" });
    items.forEach((el) => io.observe(el));
  }
  const sweep = () => items.forEach((el) => !el.classList.contains("in") && el.getBoundingClientRect().top < innerHeight * .96 && reveal(el));
  addEventListener("scroll", sweep, { passive: true }); addEventListener("load", sweep); setTimeout(sweep, 300);

  const hours = $("#hours"), status = $("#status");
  if (hours && status) {
    const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Bahia", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
    const g = (t) => parts.find((p) => p.type === t).value;
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(g("weekday")), now = (+g("hour") % 24) * 60 + +g("minute");
    const slots = (d) => { const row = $(`[data-d="${d}"]`, hours); return row && row.dataset.slots ? row.dataset.slots.split(",").map((s) => s.split("-").map((h) => { const [a, b] = h.split(":"); return +a * 60 + +b; })) : []; };
    const fmt = (m) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
    const names = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
    $(`[data-d="${day}"]`, hours)?.classList.add("today");
    const cur = slots(day).find(([a, b]) => now >= a && now < b);
    let txt;
    if (cur) txt = `Aberto agora · até ${fmt(cur[1])}`;
    else {
      let found = null;
      for (let i = 0; i < 8 && !found; i++) { const d = (day + i) % 7; const s = slots(d).find(([a]) => i > 0 || a > now); if (s) found = [i, d, s[0]]; }
      txt = found ? `Fechado agora · abre ${found[0] === 0 ? "hoje" : found[0] === 1 ? "amanhã" : names[found[1]]} às ${fmt(found[2])}` : "Atendimento com hora marcada";
    }
    status.querySelector("span").textContent = txt; status.classList.toggle("closed", !cur);
  }

  const hello = $("#hello");
  if (hello) {
    const pill = document.createElement("button");
    pill.type = "button"; pill.className = "hello-pill"; pill.innerHTML = "<i></i>" + (hello.dataset.pill || "Recado");
    document.body.appendChild(pill);
    let shown = false, timer = null;
    const scope = hello.dataset.scope ? "hello-seen-" + hello.dataset.scope : "";
    let seen = false;
    try { seen = !!scope && sessionStorage.getItem(scope) === "1"; } catch (e) {}
    const collapse = () => { clearTimeout(timer); hello.classList.remove("show"); pill.classList.add("show"); try { if (scope) sessionStorage.setItem(scope, "1"); } catch (e) {} };
    const open = () => { pill.classList.remove("show"); hello.classList.add("show"); clearTimeout(timer); timer = setTimeout(collapse, 14000); };
    const first = () => { if (shown) return; shown = true; if (seen) pill.classList.add("show"); else open(); };
    const hero = $(".hero") || $(".x-phero");
    addEventListener("scroll", () => { if (scrollY > (hero ? hero.offsetHeight * .6 : 320)) first(); }, { passive: true });
    setTimeout(first, 9000);
    $("#hello-x").addEventListener("click", collapse);
    pill.addEventListener("click", open);
  }

  const wa = $(".wa"), zones = $$("[data-no-wa]");
  if (wa && zones.length && "IntersectionObserver" in window) {
    const vis = new Set();
    const io2 = new IntersectionObserver((es) => { es.forEach((e) => e.isIntersecting ? vis.add(e.target) : vis.delete(e.target)); wa.classList.toggle("hide", vis.size > 0); }, { threshold: .15 });
    zones.forEach((z) => io2.observe(z));
  }
})();

(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const bar = document.querySelector(".progress");
  const onScroll = () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + "%";
  };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  const photo = document.querySelector(".hero [data-parallax]") || document.querySelector(".hero .photo img");
  if (photo && !reduce) {
    const move = () => { if (scrollY < innerHeight * 1.2) photo.style.transform = `translate3d(0, ${scrollY * -0.12}px, 0)`; };
    addEventListener("scroll", move, { passive: true }); move();
  }

  const sc = document.getElementById("scroller");
  if (sc) {
    const step = () => (sc.firstElementChild?.getBoundingClientRect().width || 300) + 18;
    document.getElementById("next")?.addEventListener("click", () => sc.scrollBy({ left: step(), behavior: "smooth" }));
    document.getElementById("prev")?.addEventListener("click", () => sc.scrollBy({ left: -step(), behavior: "smooth" }));
    if (!reduce) {
      const auto = setInterval(() => { if (sc.scrollLeft + sc.clientWidth >= sc.scrollWidth - 8) sc.scrollTo({ left: 0, behavior: "smooth" }); else sc.scrollBy({ left: step(), behavior: "smooth" }); }, 6000);
      ["pointerdown", "wheel", "touchstart", "keydown"].forEach((ev) => sc.addEventListener(ev, () => clearInterval(auto), { passive: true }));
    }
  }

  const links = [...document.querySelectorAll(".x-toc a[href^='#']")];
  if (links.length && "IntersectionObserver" in window) {
    const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { links.forEach((a) => a.classList.remove("on")); map.get(e.target.id)?.classList.add("on"); }
    }), { rootMargin: "-30% 0px -60% 0px" });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }
})();

(() => {
  const recado = document.getElementById("jm-recado"), pilula = document.getElementById("jm-pilula");
  if (!recado || !pilula) return;
  const chave = "jm-recado-visto-" + location.pathname.split("/").filter(Boolean)[0];
  let visto = false;
  try { visto = sessionStorage.getItem(chave) === "1"; } catch (e) {}
  const celular = matchMedia("(max-width: 640px)").matches;
  let mostrou = false, timer = null;
  const abrir = () => { pilula.classList.remove("on"); recado.classList.add("on"); pilula.setAttribute("aria-expanded", "true"); clearTimeout(timer); if (!celular) timer = setTimeout(fechar, 15000); };
  const fechar = () => { clearTimeout(timer); recado.classList.remove("on"); pilula.classList.add("on"); pilula.setAttribute("aria-expanded", "false"); try { sessionStorage.setItem(chave, "1"); } catch (e) {} };
  const primeira = () => { if (mostrou) return; mostrou = true; if (!celular && !visto) abrir(); else pilula.classList.add("on"); };
  const topo = document.querySelector(".hero") || document.querySelector(".x-phero");
  addEventListener("scroll", () => { if (scrollY > (topo ? topo.offsetHeight * .6 : 320)) primeira(); }, { passive: true });
  setTimeout(primeira, 8000);
  pilula.addEventListener("click", abrir);
  recado.querySelector(".jm-fechar").addEventListener("click", fechar);
  recado.querySelector(".jm-ir")?.addEventListener("click", fechar);
  addEventListener("keydown", (e) => { if (e.key === "Escape" && recado.classList.contains("on")) fechar(); });
  const zonas = document.querySelectorAll("[data-no-wa]");
  if (celular && zonas.length && "IntersectionObserver" in window) {
    const vis = new Set();
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => e.isIntersecting ? vis.add(e.target) : vis.delete(e.target));
      document.documentElement.classList.toggle("jm-no-wa", vis.size > 0);
    }, { threshold: .15 });
    zonas.forEach((z) => io.observe(z));
  }
  const oferta = document.getElementById("jm-oferta");
  if (oferta && "IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => {
      document.documentElement.classList.toggle("jm-na-oferta", e.isIntersecting);
      if (e.isIntersecting && recado.classList.contains("on")) fechar();
    }, { threshold: .2 }).observe(oferta);
  }
})();

(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const NS = "http://www.w3.org/2000/svg";
  const clamp = (v) => Math.max(0, Math.min(1, v));

  const tracado = (w, h, periodo) => {
    const k = h / 170, u = periodo / 400;
    let d = `M0 ${(100 * k).toFixed(1)}`;
    for (let x = 0; x < w + periodo; x += periodo) {
      const P = (a, b) => `${(x + a * u).toFixed(1)} ${(b * k).toFixed(1)}`;
      d += ` L${P(120, 100)} Q${P(136, 84)} ${P(152, 100)} L${P(176, 100)} L${P(188, 112)} L${P(204, 22)} L${P(222, 150)} L${P(236, 100)} L${P(272, 100)} Q${P(300, 70)} ${P(328, 100)} L${P(400, 100)}`;
    }
    return d;
  };

  const ajustar = (svg, periodo) => {
    const w = Math.max(1, Math.round(svg.clientWidth)), h = Math.max(1, Math.round(svg.clientHeight));
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svg.setAttribute("preserveAspectRatio", "none");
    svg.querySelectorAll("path").forEach((p) => p.setAttribute("d", tracado(w, h, periodo(w, h))));
  };

  const novoEcg = (classe, pai) => {
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("class", "ecg " + classe);
    svg.setAttribute("aria-hidden", "true");
    svg.appendChild(document.createElementNS(NS, "path"));
    pai.prepend(svg);
    return svg;
  };
  const phero = document.querySelector(".x-phero");
  if (phero && !phero.querySelector(".ecg")) novoEcg("pecg", phero);
  const fim = document.querySelector(".x-final");
  if (fim && !fim.querySelector(".ecg")) novoEcg("fecg", fim);

  const linhas = [...document.querySelectorAll("svg.ecg")].map((svg) => ({ svg, path: svg.querySelector("path"), len: 0, heroi: svg.classList.contains("hecg") && matchMedia("(min-width: 1081px)").matches }));
  const periodoSecao = (w, h) => Math.max(200, Math.min(420, h * 2.6));

  const topo = document.createElement("div");
  topo.className = "ecg-top";
  topo.setAttribute("aria-hidden", "true");
  topo.innerHTML = `<svg xmlns="${NS}"><path class="base"/><path class="live"/><circle r="2.6"/></svg>`;
  document.body.appendChild(topo);
  const tSvg = topo.firstElementChild, tBase = tSvg.querySelector(".base"), tLive = tSvg.querySelector(".live"), tDot = tSvg.querySelector("circle");
  let tLen = 0;

  const medir = () => {
    linhas.forEach((l) => { ajustar(l.svg, periodoSecao); l.len = l.path.getTotalLength(); l.path.style.strokeDasharray = `${l.len} ${l.len}`; });
    ajustar(tSvg, (w) => (w < 700 ? 150 : 210));
    tLen = tLive.getTotalLength();
    tLive.style.strokeDasharray = `${tLen} ${tLen}`;
  };

  let heroiP = reduce ? 1 : 0;
  const pintar = () => {
    const vh = innerHeight;
    linhas.forEach((l) => {
      let p;
      if (reduce) p = 1;
      else if (l.heroi) p = heroiP;
      else { const r = l.svg.getBoundingClientRect(); p = clamp((vh - r.top) / (vh * 0.75)); }
      l.path.style.strokeDashoffset = l.len * (1 - p);
    });
    const H = document.documentElement.scrollHeight - vh;
    const q = H > 0 ? clamp(scrollY / H) : 0;
    tLive.style.strokeDashoffset = tLen * (1 - q);
    const pt = tLive.getPointAtLength(Math.max(0.01, tLen * q));
    tDot.setAttribute("cx", pt.x.toFixed(1));
    tDot.setAttribute("cy", pt.y.toFixed(1));
    tDot.style.opacity = q > 0.002 ? 1 : 0;
  };

  let pedido = false;
  const agendar = () => { if (!pedido) { pedido = true; requestAnimationFrame(() => { pedido = false; pintar(); }); } };
  medir(); pintar();
  addEventListener("scroll", agendar, { passive: true });
  let rt;
  addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { medir(); pintar(); }, 150); });

  if (!reduce && linhas.some((l) => l.heroi)) {
    const t0 = performance.now(), D = 2400;
    const passo = (t) => { const x = clamp((t - t0) / D); heroiP = 1 - Math.pow(1 - x, 3); pintar(); if (x < 1) requestAnimationFrame(passo); };
    setTimeout(() => requestAnimationFrame(passo), 250);
  }

  const rolar = (el) => {
    const fin = el.textContent;
    const total = (fin.match(/\d/g) || []).length;
    if (!total || reduce) return;
    el.classList.add("roll");
    const t0 = performance.now(), D = 1100 + total * 60;
    const passo = (t) => {
      const q = clamp((t - t0) / D);
      let n = 0;
      el.textContent = [...fin].map((c) => { if (!/\d/.test(c)) return c; n++; return n / total <= q ? c : String(Math.floor(Math.random() * 10)); }).join("");
      if (q < 1) requestAnimationFrame(passo); else el.textContent = fin;
    };
    requestAnimationFrame(passo);
  };
  const numeros = [...document.querySelectorAll(".monitor b, .monitor .mbpm, .traj .t, .frente .big, .nota .num")].filter((el) => !el.children.length && /\d/.test(el.textContent));
  numeros.forEach((el) => el.classList.add("roll"));
  if ("IntersectionObserver" in window && !reduce) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { io.unobserve(e.target); setTimeout(() => rolar(e.target), 200); } }), { threshold: 0.6 });
    numeros.forEach((el) => io.observe(el));
  }
})();
