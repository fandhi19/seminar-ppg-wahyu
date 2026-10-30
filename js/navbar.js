/**
 * NAVBAR CONTROLLER
 * Menangani interaksi menu hamburger mobile/tablet,
 * accessibility attributes, auto-close behavior, dan theme toggle.
 */

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const mainNavbar = document.querySelector(".navbar");

  if (navToggle && navLinks) {
    // Fungsi buka / tutup navigasi
    const toggleNav = (e) => {
      if (e) e.stopPropagation();
      const isOpen = navLinks.classList.toggle("show");
      navToggle.classList.toggle("active", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      navToggle.setAttribute("aria-label", isOpen ? "Tutup Navigasi" : "Buka Navigasi");
      navToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    };

    // Fungsi tutup navigasi
    const closeNav = () => {
      if (navLinks.classList.contains("show")) {
        navLinks.classList.remove("show");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Buka Navigasi");
        navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    };

    // Event listener tombol hamburger
    navToggle.addEventListener("click", toggleNav);

    // Tutup menu saat salah satu link diklik (terutama anchor link)
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeNav();
      });
    });

    // Tutup menu saat klik di luar area navbar
    document.addEventListener("click", (e) => {
      if (mainNavbar && !mainNavbar.contains(e.target)) {
        closeNav();
      }
    });

    // Tutup menu saat menekan tombol Escape (Keyboard Accessibility)
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" || e.key === "Esc") {
        closeNav();
      }
    });

    // Auto-tutup jika layar di-resize kembali ke desktop (> 992px)
    window.addEventListener("resize", () => {
      if (window.innerWidth > 992 && navLinks.classList.contains("show")) {
        closeNav();
      }
    });
  }
});

