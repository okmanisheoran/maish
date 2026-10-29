const portfolioName = "Manish Sheoran";
const portfolioEmail = "your-email@example.com";

const brandName = document.querySelector("#brand-name");
const brandMark = document.querySelector("#brand-mark");
const footerBrand = document.querySelector("#footer-brand");
const emailLink = document.querySelector("#email-link");

document.title = `${portfolioName} — Developer in Progress`;
document.querySelectorAll(".editable-name").forEach((element) => {
  element.textContent = portfolioName;
});
brandName.replaceChildren(document.createTextNode(portfolioName));
const period = document.createElement("span");
period.className = "brand-period";
period.textContent = ".";
brandName.append(period);
footerBrand.replaceChildren(document.createTextNode(portfolioName));
const footerPeriod = document.createElement("span");
footerPeriod.className = "brand-period";
footerPeriod.textContent = ".";
footerBrand.append(footerPeriod);
document.querySelector("#contact-signature").textContent = `${portfolioName.toUpperCase()} / 2026`;
brandMark.textContent = portfolioName
  .trim()
  .split(/\s+/)
  .slice(0, 2)
  .map((part) => part[0])
  .join("")
  .toUpperCase();
emailLink.href = `mailto:${portfolioEmail}`;

const header = document.querySelector(".site-header");
const scrollProgressBar = document.querySelector("#scroll-progress-bar");
const menuToggle = document.querySelector("#menu-toggle");
const siteNav = document.querySelector("#site-nav");
const navLinks = [...document.querySelectorAll(".nav-link")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  siteNav.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  siteNav.classList.toggle("is-open", !isOpen);
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));
window.addEventListener("resize", () => {
  if (window.innerWidth > 700) closeMenu();
});

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 12);

  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  scrollProgressBar.style.transform = `scaleX(${progress})`;
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const sections = [...document.querySelectorAll("main section[id]")];
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("is-active", isActive);
        if (isActive) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
  sections.forEach((section) => sectionObserver.observe(section));
}

const revealElements = document.querySelectorAll(".reveal");
if (reducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
}

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((filterButton) => {
      const selected = filterButton === button;
      filterButton.classList.toggle("is-selected", selected);
      filterButton.setAttribute("aria-pressed", String(selected));
    });
    document.querySelectorAll(".project-card").forEach((card) => {
      const visible = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !visible);
    });
  });
});

const heroVisual = document.querySelector("#hero-visual");
if (!reducedMotion && window.matchMedia("(pointer: fine)").matches) {
  heroVisual.addEventListener("pointermove", (event) => {
    const bounds = heroVisual.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    heroVisual.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${y * -5}deg)`;
  });
  heroVisual.addEventListener("pointerleave", () => {
    heroVisual.style.transform = "";
  });
}

const copyStatus = document.querySelector("#copy-status");
document.querySelector("#copy-email").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(portfolioEmail);
    copyStatus.textContent = "Email copied to clipboard.";
  } catch {
    copyStatus.textContent = `Add your email in script.js: ${portfolioEmail}`;
  }
});