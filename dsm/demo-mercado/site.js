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
})();
