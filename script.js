(function () {
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      mobileMenu.classList.toggle("open", !isOpen);
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        mobileMenu.classList.remove("open");
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const selector = anchor.getAttribute("href");
      if (!selector || selector === "#") return;
      const target = document.querySelector(selector);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const startCarousel = (carousel, interval) => {
    const slides = Array.from(carousel.querySelectorAll(".slide"));
    if (slides.length < 2) return;
    let current = 0;
    window.setInterval(() => {
      slides[current].classList.remove("active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("active");
    }, interval);
  };

  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    startCarousel(carousel, carousel.dataset.carousel === "faq" ? 5000 : 2000);
  });

  const processCards = Array.from(document.querySelectorAll("[data-process] .process-card"));
  if (processCards.length) {
    let activeStep = 0;
    window.setInterval(() => {
      processCards[activeStep].classList.remove("active");
      activeStep = (activeStep + 1) % processCards.length;
      processCards[activeStep].classList.add("active");
    }, 5000);
  }

  document.querySelectorAll("[data-accordion] .faq-item button").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const content = item.querySelector(".faq-content");
      const isOpen = item.classList.contains("open");

      document.querySelectorAll("[data-accordion] .faq-item").forEach((other) => {
        other.classList.remove("open");
        other.querySelector("button").setAttribute("aria-expanded", "false");
        other.querySelector(".faq-content").style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add("open");
        button.setAttribute("aria-expanded", "true");
        content.style.maxHeight = `${content.scrollHeight}px`;
      }
    });
  });

  const contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(contactForm);
      const lines = [
        "Hola, me gustaría conversar sobre los productos de merchandising. ¿Me pueden ayudar con una cotización?",
        "",
        `Nombre: ${data.get("name") || ""}`,
        `Apellido: ${data.get("lname") || ""}`,
        `Teléfono: ${data.get("tel") || ""}`,
        `Email: ${data.get("email") || ""}`,
        `Mensaje: ${data.get("message") || ""}`
      ];
      window.open(`https://api.whatsapp.com/send?phone=51960154227&text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
    });
  }

  const chat = document.querySelector("[data-chat]");
  if (chat) {
    const toggle = chat.querySelector("[data-chat-toggle]");
    const close = chat.querySelector("[data-chat-close]");
    window.setTimeout(() => {
      chat.hidden = false;
    }, 3000);

    toggle.addEventListener("click", () => {
      chat.classList.toggle("open");
    });

    close.addEventListener("click", () => {
      chat.classList.remove("open");
    });
  }

  const revealTargets = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });

    revealTargets.forEach((target) => observer.observe(target));
  } else {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  }
}());
