(function () {
  const products = [
    {
      title: "Cannolo siciliano",
      description: "Ricotta di pecora vera con gocce di cioccolato dentro e sopra.",
      src: "assets/02-dish-1778947605887-cannolosiciliano.jpg",
      alt: "Cannolo siciliano con ricotta di pecora e gocce di cioccolato"
    },
    {
      title: "Arancina",
      description: "Riso cremoso, prosciutto, mozzarella filante e besciamella che cola al primo morso.",
      src: "assets/01-dish-1778947559886-arancina.jpg",
      alt: "Arancina aperta con mozzarella filante"
    },
    {
      title: "Cassata al forno",
      description: "Dorata e fragrante fuori, con un cuore di ricotta cremosa che conquista al primo morso.",
      src: "assets/04-dish-1778947670803-cassataalforno.jpg",
      alt: "Cassata al forno con ripieno di ricotta"
    },
    {
      title: "Iris fritte",
      description: "Croccanti fuori, soffici e super ripiene, con ricotta di pecora fresca.",
      src: "assets/05-dish-1778947701398-irisfritte.jpg",
      alt: "Iris fritte ripiene di ricotta"
    },
    {
      title: "Parmigiana siciliana",
      description: "Strati di melanzane fritte, salsa di pomodoro fresco e parmigiano.",
      src: "assets/03-dish-1778947642230-parmigianasiciliana.jpg",
      alt: "Parmigiana siciliana con melanzane fritte e pomodoro"
    }
  ];

  const openingHours = {
    monday: null,
    tuesday: [{ open: "10:00", close: "20:00" }],
    wednesday: [{ open: "10:00", close: "20:00" }],
    thursday: [{ open: "10:00", close: "20:00" }],
    friday: [{ open: "10:00", close: "20:00" }],
    saturday: [{ open: "10:00", close: "20:00" }],
    sunday: null
  };

  const dayMap = {
    Mon: "monday",
    Tue: "tuesday",
    Wed: "wednesday",
    Thu: "thursday",
    Fri: "friday",
    Sat: "saturday",
    Sun: "sunday"
  };

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initNavigation() {
    const toggle = document.querySelector(".nav-toggle");
    const menu = document.querySelector("[data-menu]");
    const header = document.querySelector("[data-header]");

    if (!toggle || !menu) {
      return;
    }

    const closeMenu = () => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Apri la navigazione");
      menu.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    };

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Apri la navigazione" : "Chiudi la navigazione");
      menu.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    if (header) {
      const updateHeader = () => {
        header.classList.toggle("is-scrolled", window.scrollY > 16);
      };
      updateHeader();
      window.addEventListener("scroll", updateHeader, { passive: true });
    }
  }

  function timeToMinutes(value) {
    const parts = value.split(":").map(Number);
    return parts[0] * 60 + parts[1];
  }

  function getRomeParts() {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Rome",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });

    const parts = formatter.formatToParts(new Date());
    const weekday = parts.find((part) => part.type === "weekday").value;
    const hour = Number(parts.find((part) => part.type === "hour").value);
    const minute = Number(parts.find((part) => part.type === "minute").value);

    return { day: dayMap[weekday], minutes: hour * 60 + minute };
  }

  function isOpen() {
    const now = getRomeParts();
    const ranges = openingHours[now.day];

    if (!ranges) {
      return false;
    }

    return ranges.some((range) => {
      const open = timeToMinutes(range.open);
      const close = timeToMinutes(range.close);
      return now.minutes >= open && now.minutes < close;
    });
  }

  function initOpenStatus() {
    const badge = document.querySelector("[data-open-status]");
    if (!badge) {
      return;
    }

    const update = () => {
      const open = isOpen();
      badge.textContent = open ? "Aperto ora" : "Chiuso ora";
      badge.classList.toggle("is-open", open);
      badge.classList.toggle("is-closed", !open);
    };

    update();
    window.setInterval(update, 60000);
  }

  function initSlider() {
    const slider = document.querySelector("[data-slider]");
    if (!slider) {
      return;
    }

    const image = slider.querySelector("#slider-image");
    const title = slider.querySelector("[data-slide-title]");
    const description = slider.querySelector("[data-slide-description]");
    const count = slider.querySelector("[data-slide-count]");
    const previous = slider.querySelector("[data-slide-prev]");
    const next = slider.querySelector("[data-slide-next]");
    let index = 0;
    let touchStartX = 0;
    let touchStartY = 0;

    const render = () => {
      const product = products[index];
      if (!product) {
        return;
      }

      image.src = product.src;
      image.alt = product.alt;
      title.textContent = product.title;
      description.textContent = product.description;
      count.textContent = `${String(index + 1).padStart(2, "0")} / ${String(products.length).padStart(2, "0")}`;
    };

    const goTo = (nextIndex) => {
      index = (nextIndex + products.length) % products.length;
      render();
    };

    if (products.length <= 1) {
      previous.disabled = true;
      next.disabled = true;
      render();
      return;
    }

    previous.addEventListener("click", () => goTo(index - 1));
    next.addEventListener("click", () => goTo(index + 1));

    slider.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(index - 1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(index + 1);
      }
    });

    slider.addEventListener("touchstart", (event) => {
      const touch = event.changedTouches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    }, { passive: true });

    slider.addEventListener("touchend", (event) => {
      const touch = event.changedTouches[0];
      const diffX = touch.clientX - touchStartX;
      const diffY = touch.clientY - touchStartY;

      if (Math.abs(diffX) > 42 && Math.abs(diffX) > Math.abs(diffY)) {
        goTo(diffX < 0 ? index + 1 : index - 1);
      }
    }, { passive: true });

    render();
  }

  function initReveal() {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      return;
    }

    const targets = document.querySelectorAll(".menu-board, .split-slider, .craft-copy, .craft-image, .visit-grid, .final-cta");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });

    targets.forEach((target) => {
      target.classList.add("reveal");
      observer.observe(target);
    });
  }

  function initParallax() {
    if (reduceMotion || window.matchMedia("(max-width: 980px)").matches) {
      return;
    }

    const items = Array.from(document.querySelectorAll("[data-parallax]"));
    if (!items.length) {
      return;
    }

    let ticking = false;

    const update = () => {
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const viewport = window.innerHeight || document.documentElement.clientHeight;
        const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport;
        const offset = Math.max(-18, Math.min(18, progress * -28));
        item.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
      ticking = false;
    };

    const requestUpdate = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
  }

  function initImageFallbacks() {
    document.querySelectorAll("img[data-fallback]").forEach((image) => {
      image.addEventListener("error", () => {
        image.classList.add("is-missing");
        image.alt = image.alt || "Immagine non disponibile";
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initOpenStatus();
    initSlider();
    initReveal();
    initParallax();
    initImageFallbacks();
  });
})();
