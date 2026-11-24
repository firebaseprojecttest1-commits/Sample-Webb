// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle with localStorage persistence
const htmlEl = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");

function applyTheme(theme) {
  htmlEl.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️ Light" : "🌙 Dark";
}

if (savedTheme === "dark" || savedTheme === "light") {
  applyTheme(savedTheme);
}

themeToggle.addEventListener("click", () => {
  const nextTheme = htmlEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
});

// Mobile navigation toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Contact form handling
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formStatus.style.color = "#dc2626";
    formStatus.textContent = "Please fill out all fields.";
    return;
  }

  formStatus.style.color = "#16a34a";
  formStatus.textContent = `Thanks, ${name}! Your message has been received.`;
  contactForm.reset();
});