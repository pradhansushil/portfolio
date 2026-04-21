const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("isOpen");
  if (navMenu.classList.contains("isOpen")) {
    menuToggle.setAttribute("aria-expanded", "true");
  } else {
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("isOpen");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});
