(function () {
  "use strict";

  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "scroll-top-btn";
  btn.setAttribute("aria-label", "Retour en haut de la page");
  btn.setAttribute("title", "Retour en haut");
  btn.innerHTML = "&#8593;";
  document.body.appendChild(btn);

  function toggle() {
    btn.classList.toggle("is-visible", window.scrollY > 320);
  }

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", toggle, { passive: true });
  toggle();
})();
