(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var year = document.getElementById("year");
  var navLinks = nav ? nav.querySelectorAll("a") : [];

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  function setNavOpen(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") !== "true";
      setNavOpen(open);
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        setNavOpen(false);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setNavOpen(false);
    });
  }

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var sections = ["about", "path", "work", "projects", "book", "contact"]
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length && navLinks.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.id;
          navLinks.forEach(function (link) {
            var match = link.getAttribute("href") === "#" + id;
            if (match) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // Horizontal scroll panels (scroll-linked), same idea as devindurrant.com
  var scrollers = document.querySelectorAll(".horizontal-scroll-scroller");
  if (scrollers.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    function updateScroller(scroller, track) {
      var vh = window.innerHeight;
      var scrollY = window.scrollY;
      var rect = scroller.getBoundingClientRect();
      var top = rect.top + scrollY;
      var h = scroller.offsetHeight;
      var range = Math.max(1, h - vh);
      var p = (scrollY - top) / range;
      p = Math.min(1, Math.max(0, p));
      var maxX = Math.max(0, track.scrollWidth - window.innerWidth);
      track.style.transform = "translate3d(" + -p * maxX + "px, 0, 0)";
    }

    var pairs = [];
    scrollers.forEach(function (scroller) {
      var track = scroller.querySelector("[data-horizontal-track]");
      if (track) pairs.push({ scroller: scroller, track: track });
    });

    var raf = 0;
    function tick() {
      raf = 0;
      pairs.forEach(function (pair) {
        updateScroller(pair.scroller, pair.track);
      });
    }

    function schedule() {
      if (!raf) raf = requestAnimationFrame(tick);
    }

    if ("ResizeObserver" in window) {
      var ro = new ResizeObserver(schedule);
      pairs.forEach(function (pair) {
        ro.observe(pair.scroller);
        ro.observe(pair.track);
      });
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
  }
})();
