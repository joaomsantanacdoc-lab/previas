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

  // Horário: cada linha de #hours tem data-d (0=domingo) e data-slots="08:00-12:00,14:00-18:00" (vazio = fechado).
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

  // Recado ao médico: aparece depois que ele já viu o topo, fica alguns segundos e vira um botão discreto.
  const hello = $("#hello");
  if (hello) {
    const pill = document.createElement("button");
    pill.type = "button"; pill.className = "hello-pill"; pill.innerHTML = "<i></i>" + (hello.dataset.pill || "Recado");
    document.body.appendChild(pill);
    let shown = false, timer = null;
    // Em sites com várias páginas (data-scope), o recado abre uma vez por visita; nas outras páginas fica só o botão.
    const scope = hello.dataset.scope ? "hello-seen-" + hello.dataset.scope : "";
    let seen = false;
    try { seen = !!scope && sessionStorage.getItem(scope) === "1"; } catch (e) {}
    const collapse = () => { clearTimeout(timer); hello.classList.remove("show"); pill.classList.add("show"); try { if (scope) sessionStorage.setItem(scope, "1"); } catch (e) {} };
    const open = () => { pill.classList.remove("show"); hello.classList.add("show"); clearTimeout(timer); timer = setTimeout(collapse, 14000); };
    const first = () => { if (shown) return; shown = true; if (seen) pill.classList.add("show"); else open(); };
    const hero = $(".hero");
    addEventListener("scroll", () => { if (scrollY > (hero ? hero.offsetHeight * .6 : 320)) first(); }, { passive: true });
    setTimeout(first, 9000);
    $("#hello-x").addEventListener("click", collapse);
    pill.addEventListener("click", open);
  }

  // O botão flutuante some quando a própria seção de contato está na tela.
  const wa = $(".wa"), zones = $$("[data-no-wa]");
  if (wa && zones.length && "IntersectionObserver" in window) {
    const vis = new Set();
    const io2 = new IntersectionObserver((es) => { es.forEach((e) => e.isIntersecting ? vis.add(e.target) : vis.delete(e.target)); wa.classList.toggle("hide", vis.size > 0); }, { threshold: .15 });
    zones.forEach((z) => io2.observe(z));
  }
})();

(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Barra de leitura.
  const bar = document.querySelector(".progress");
  const onScroll = () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + "%";
  };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // Profundidade: a foto do topo desce mais devagar que a página.
  const photo = document.querySelector(".hero .photo img");
  if (photo && !reduce) {
    const move = () => { if (scrollY < innerHeight * 1.2) photo.style.transform = `translate3d(0, ${scrollY * -0.12}px, 0)`; };
    addEventListener("scroll", move, { passive: true }); move();
  }

  // Carrossel de avaliações.
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

  // Índice lateral: marca a seção que está na tela.
  const links = [...document.querySelectorAll(".toc ol a[href^='#']")];
  if (links.length && "IntersectionObserver" in window) {
    const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { links.forEach((a) => a.classList.remove("on")); map.get(e.target.id)?.classList.add("on"); }
    }), { rootMargin: "-30% 0px -60% 0px" });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }
})();
