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
})();
