(() => {
  const burger = document.getElementById("burger");
  const drawer = document.getElementById("drawer");
  if (burger && drawer) {
    burger.addEventListener("click", () => {
      const open = drawer.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
    });
    drawer.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        drawer.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  const items = [...document.querySelectorAll(".rv")];
  if ("IntersectionObserver" in window && items.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add("in"));
  }
  /* carrossel */
  const slides = [...document.querySelectorAll(".slide")];
  const dots = [...document.querySelectorAll(".dots button")];
  if (slides.length) {
    let at = 0, timer = null;
    const go = (n) => {
      at = (n + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle("on", i === at));
      dots.forEach((d, i) => d.classList.toggle("on", i === at));
    };
    const auto = () => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      clearInterval(timer);
      timer = setInterval(() => go(at + 1), 6500);
    };
    document.querySelector(".next")?.addEventListener("click", () => { go(at + 1); auto(); });
    document.querySelector(".prev")?.addEventListener("click", () => { go(at - 1); auto(); });
    dots.forEach((d, i) => d.addEventListener("click", () => { go(i); auto(); }));
    const box = document.querySelector(".carousel");
    box?.addEventListener("mouseenter", () => clearInterval(timer));
    box?.addEventListener("mouseleave", auto);
    auto();
  }

  /* busca do catálogo */
  const inputs = [...document.querySelectorAll(".search input, .msearch input")];
  const cards = [...document.querySelectorAll(".prod")];
  const nores = document.querySelector(".nores");
  const filter = (q) => {
    let shown = 0;
    cards.forEach((c) => {
      const hit = !q || c.textContent.toLowerCase().includes(q);
      c.hidden = !hit;
      if (hit) shown++;
    });
    if (nores) nores.hidden = shown > 0;
  };
  inputs.forEach((inp) => {
    inp.addEventListener("input", () => filter(inp.value.trim().toLowerCase()));
    inp.form?.addEventListener("submit", (e) => {
      e.preventDefault();
      filter(inp.value.trim().toLowerCase());
      document.getElementById("ofertas")?.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* lista de compras */
  const money = (n) => n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const KEY = "forte-lista-v1";
  let list = [];
  try { list = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { list = []; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {} };
  const lista = document.getElementById("lista");
  const litems = document.getElementById("litems");
  const ltotal = document.getElementById("ltotal");
  const count = document.getElementById("count");
  const toast = (msg) => {
    const t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg; t.classList.add("on");
    clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove("on"), 2200);
  };
  const render = () => {
    if (count) count.textContent = list.reduce((a, i) => a + i.qty, 0);
    if (litems) {
      litems.innerHTML = list.length
        ? list.map((i) => `<div class="li"><span class="n">${i.qty}× ${i.name}</span><span class="p">R$ ${money(i.price * i.qty)}</span><button class="lrem" data-id="${i.id}" aria-label="Remover">×</button></div>`).join("")
        : '<p class="vazia">Sua lista está vazia. Adicione produtos nas ofertas.</p>';
    }
    if (ltotal) ltotal.textContent = "R$ " + money(list.reduce((a, i) => a + i.price * i.qty, 0));
  };
  document.querySelectorAll(".add").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id, name = btn.dataset.name, price = parseFloat(btn.dataset.price);
      const item = list.find((i) => i.id === id);
      if (item) item.qty++; else list.push({ id, name, price, qty: 1 });
      save(); render(); toast(name + " adicionado à lista");
    });
  });
  litems?.addEventListener("click", (e) => {
    const b = e.target.closest(".lrem");
    if (!b) return;
    list = list.filter((i) => i.id !== b.dataset.id); save(); render();
  });
  const abrirLista = () => { lista?.classList.add("open"); lista?.setAttribute("aria-hidden", "false"); };
  document.getElementById("listaBtn")?.addEventListener("click", abrirLista);
  document.getElementById("roundLista")?.addEventListener("click", (e) => { e.preventDefault(); abrirLista(); });
  document.getElementById("lclose")?.addEventListener("click", () => { lista?.classList.remove("open"); lista?.setAttribute("aria-hidden", "true"); });
  document.getElementById("lclear")?.addEventListener("click", () => { list = []; save(); render(); });
  document.getElementById("lcopy")?.addEventListener("click", async () => {
    const total = list.reduce((a, i) => a + i.price * i.qty, 0);
    const txt = list.length ? "Lista Forte:\n" + list.map((i) => `${i.qty}x ${i.name} — R$ ${money(i.price * i.qty)}`).join("\n") + `\nTotal: R$ ${money(total)}` : "Lista vazia";
    try { await navigator.clipboard.writeText(txt); toast("Lista copiada"); } catch (e) { toast("Não deu para copiar"); }
  });
  document.getElementById("contaBtn")?.addEventListener("click", () => toast("Área do cliente na versão final"));
  const cookies = document.getElementById("cookies");
  try { if (localStorage.getItem("forte-cookies") === "1") cookies?.classList.add("hide"); } catch (e) {}
  document.getElementById("cookieOk")?.addEventListener("click", () => { cookies?.classList.add("hide"); try { localStorage.setItem("forte-cookies", "1"); } catch (e) {} });
  render();
})();