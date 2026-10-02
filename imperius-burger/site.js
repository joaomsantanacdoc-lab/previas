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
    const hero = $(".hero") || $(".x-phero");
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
  const photo = document.querySelector(".hero [data-parallax]") || document.querySelector(".hero .photo img");
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
  const links = [...document.querySelectorAll(".x-toc a[href^='#']")];
  if (links.length && "IntersectionObserver" in window) {
    const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { links.forEach((a) => a.classList.remove("on")); map.get(e.target.id)?.classList.add("on"); }
    }), { rootMargin: "-30% 0px -60% 0px" });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }
})();

// Restaurante: cardápio, pedido pelo WhatsApp, simulador de reservas e galeria (quadro #53).
(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const brl = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const num = (t) => { const m = String(t || "").replace(/\./g, "").match(/(\d+),(\d{2})/); return m ? +m[1] + +m[2] / 100 : 0; };
  let unidadeAtual = null;

  // ---------- Cardápio ----------
  const menu = $("[data-cardapio]");
  if (menu) {
    const tabs = $$(".r-tab", menu), cats = $$(".r-cat", menu), nav = document.getElementById("nav");
    const offset = () => (nav ? nav.offsetHeight : 70) + ($(".r-menubar", menu)?.offsetHeight || 0) + 12;
    tabs.forEach((t) => t.addEventListener("click", () => {
      const alvo = document.getElementById("cat-" + t.dataset.cat);
      if (alvo) scrollTo({ top: alvo.getBoundingClientRect().top + scrollY - offset(), behavior: "smooth" });
    }));
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        tabs.forEach((t) => t.classList.toggle("on", t.dataset.cat === e.target.dataset.cat));
        const on = tabs.find((t) => t.classList.contains("on"));
        on?.parentElement.scrollTo({ left: on.offsetLeft - 16, behavior: "smooth" });
      }), { rootMargin: "-35% 0px -55% 0px" });
      cats.forEach((c) => io.observe(c));
    }
    const busca = $(".r-search input", menu), vazio = $(".r-empty", menu);
    busca?.addEventListener("input", () => {
      const q = busca.value.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
      let total = 0;
      cats.forEach((c) => {
        let n = 0;
        $$(".r-item", c).forEach((i) => {
          const ok = !q || i.dataset.busca.normalize("NFD").replace(/[̀-ͯ]/g, "").includes(q);
          i.hidden = !ok; if (ok) n++;
        });
        c.hidden = n === 0; total += n;
      });
      if (vazio) vazio.hidden = total > 0;
    });
    const units = $$(".r-unit", menu);
    if (units.length) unidadeAtual = units[0].dataset.unit;
    units.forEach((b) => b.addEventListener("click", () => {
      unidadeAtual = b.dataset.unit;
      units.forEach((x) => x.classList.toggle("on", x === b));
      $$(".r-price[data-unit]", menu).forEach((p) => { p.hidden = p.dataset.unit !== unidadeAtual; });
      renderCart();
    }));
  }

  // ---------- Pedido ----------
  const cart = $("#r-cart");
  const sacola = new Map();
  const precoDe = (item) => typeof item.p === "object" ? (item.p[unidadeAtual] || Object.values(item.p)[0]) : item.p;
  function renderCart() {
    if (!cart) return;
    const lista = $(".r-cartlist", cart);
    let qtd = 0, total = 0, linhas = [];
    lista.innerHTML = "";
    sacola.forEach((q, chave) => {
      const item = JSON.parse(chave), p = num(precoDe(item));
      qtd += q; total += p * q;
      const li = document.createElement("li");
      li.innerHTML = `<span><b>${q}×</b> ${item.n}</span><span>${p ? brl(p * q) : ""}</span><span class="r-qty"><button type="button" aria-label="Menos">−</button><button type="button" aria-label="Mais">+</button></span>`;
      const [menos, mais] = li.querySelectorAll("button");
      menos.onclick = () => { const v = sacola.get(chave) - 1; v > 0 ? sacola.set(chave, v) : sacola.delete(chave); renderCart(); };
      mais.onclick = () => { sacola.set(chave, sacola.get(chave) + 1); renderCart(); };
      lista.appendChild(li);
      linhas.push(`• ${q}× ${item.n}${p ? " — " + brl(p * q) : ""}`);
    });
    cart.classList.toggle("has", qtd > 0);
    $(".r-cartn", cart).textContent = qtd;
    $(".r-carttot", cart).textContent = total ? brl(total) : "";
    const nomeU = unidadeAtual ? $(`.r-unit[data-unit="${unidadeAtual}"]`)?.textContent : "";
    const msg = `${cart.dataset.open}\n${linhas.join("\n")}${total ? `\n\nTotal estimado: ${brl(total)}` : ""}${nomeU ? `\nUnidade: ${nomeU}` : ""}`;
    $(".r-bubble", cart).textContent = msg;
    $(".r-cartsend", cart).href = `https://wa.me/${cart.dataset.wa}?text=${encodeURIComponent(msg)}`;
  }
  if (cart) {
    const btn = $(".r-cartbtn", cart);
    const abrir = (v) => { cart.classList.toggle("open", v); btn.setAttribute("aria-expanded", v); };
    btn.addEventListener("click", () => abrir(!cart.classList.contains("open")));
    $(".r-cartx", cart).addEventListener("click", () => abrir(false));
    $$(".r-add").forEach((b) => b.addEventListener("click", () => {
      const chave = b.dataset.item;
      sacola.set(chave, (sacola.get(chave) || 0) + 1);
      b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop");
      renderCart();
    }));
    renderCart();
  }

  // ---------- Reserva ----------
  const book = $("#reserva-sim");
  if (book) {
    const cfg = JSON.parse(book.dataset.cfg), form = $("form", book), steps = $$(".r-step", book), dots = $$(".r-stepper li", book);
    const f = (n) => form.elements[n];
    const hoje = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Bahia" }));
    const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const min = new Date(hoje); min.setDate(min.getDate() + (+book.dataset.min || 0));
    const max = new Date(hoje); max.setDate(max.getDate() + 90);
    f("data").min = iso(min); f("data").max = iso(max);
    const dias = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
    const unidade = () => cfg[f("unidade").value];
    const proximoAberto = (desde = min) => { const d = new Date(Math.max(desde, min)); for (let i = 0; i < 60; i++) { if ((unidade().dias[d.getDay()] || []).length) return d; d.setDate(d.getDate() + 1); } return null; };
    const slotsBox = $(".r-slots", book);
    let hora = "";
    function slots() {
      hora = "";
      const v = f("data").value;
      if (!v) { slotsBox.innerHTML = '<p class="r-hint">Escolha a data para ver os horários.</p>'; return; }
      const d = new Date(v + "T12:00:00"), lista = unidade().dias[d.getDay()] || [];
      if (!lista.length) {
        const p = proximoAberto(d);
        slotsBox.innerHTML = `<p class="r-hint closed">${unidade().nome} não abre ${["no", "na", "na", "na", "na", "na", "no"][d.getDay()]} ${dias[d.getDay()]}.${p ? ` Próxima data com mesa: ${p.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "2-digit" })}.` : ""}</p>`;
        return;
      }
      slotsBox.innerHTML = lista.map((h) => `<button type="button" class="r-slot" role="radio" aria-checked="false">${h}</button>`).join("");
      $$(".r-slot", slotsBox).forEach((b) => b.addEventListener("click", () => {
        $$(".r-slot", slotsBox).forEach((x) => { x.classList.remove("on"); x.setAttribute("aria-checked", "false"); });
        b.classList.add("on"); b.setAttribute("aria-checked", "true"); hora = b.textContent;
      }));
    }
    const ir = (n) => { steps.forEach((s) => s.classList.toggle("on", +s.dataset.step === n)); dots.forEach((d, k) => d.classList.toggle("on", k < n)); book.scrollIntoView({ behavior: "smooth", block: "nearest" }); };
    f("data").addEventListener("change", slots);
    f("unidade").addEventListener?.("change", slots);
    const aviso = (msg) => { let p = $(".r-warn", book); if (!p) { p = document.createElement("p"); p.className = "r-warn"; slotsBox.after(p); } p.textContent = msg; setTimeout(() => p.remove(), 3500); };
    $(".r-next", book).addEventListener("click", () => {
      if (!f("data").value) return aviso("Escolha a data da reserva.");
      if (!hora) return aviso("Escolha um horário disponível.");
      ir(2);
    });
    $(".r-back", book).addEventListener("click", () => ir(1));
    $(".r-again", book).addEventListener("click", () => { form.reset(); const p = proximoAberto(); if (p) f("data").value = iso(p); slots(); ir(1); });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const d = new Date(f("data").value + "T12:00:00");
      const quando = d.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" });
      const nome = f("nome").value.trim() || "(seu nome)";
      const extras = $$("[name^='extra-']", form).map((i) => [i.closest("label").querySelector("span").textContent, i.value.trim()]).filter(([, v]) => v);
      const itens = [["Unidade", unidade().nome], ["Data", quando], ["Horário", hora], ["Pessoas", f("pessoas").value], ...(f("ocasiao").value ? [["Ocasião", f("ocasiao").value]] : []), ...extras, ...(f("obs").value.trim() ? [["Observações", f("obs").value.trim()]] : [])];
      $(".r-tktitle", book).textContent = `${nome} · ${f("pessoas").value} ${+f("pessoas").value === 1 ? "pessoa" : "pessoas"}`;
      $(".r-tkdl", book).innerHTML = itens.map(([k, v]) => `<div><dt>${k}</dt><dd>${v.replace(/</g, "&lt;")}</dd></div>`).join("");
      const msg = `Olá! Gostaria de reservar uma mesa no ${book.dataset.nome}.\n\n${itens.map(([k, v]) => `${k}: ${v}`).join("\n")}\nNome: ${nome}${unidade().obs ? `\n\n${unidade().obs}` : ""}`;
      $(".r-bubble", book).textContent = msg;
      $(".r-send", book).href = `https://wa.me/${book.dataset.wa}?text=${encodeURIComponent(msg)}`;
      ir(3);
    });
    // Data inicial: a próxima com mesa.
    const p = proximoAberto(); if (p) { f("data").value = iso(p); slots(); }
  }

  // ---------- Galeria ----------
  const lb = document.getElementById("r-lightbox");
  if (lb && typeof lb.showModal === "function") {
    $$("[data-full]").forEach((b) => b.addEventListener("click", () => {
      let img = $("img", lb);
      if (!img) { img = document.createElement("img"); lb.insertBefore(img, $("p", lb)); }
      img.src = b.dataset.full; img.alt = b.querySelector("img")?.alt || ""; $("p", lb).textContent = b.dataset.cap || "";
      lb.showModal();
    }));
    $(".r-lbx", lb).addEventListener("click", () => lb.close());
    lb.addEventListener("click", (e) => { if (e.target === lb) lb.close(); });
  }
})();
