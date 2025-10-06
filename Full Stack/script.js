/* =========================
   PORTFÓLIO 3.0 CINEMATIC UPGRADE
   Luiz Henrique Morais dos Santos
   ========================= */

// ===== Loader =====
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";
    loader.style.display = "none";
  }, 1500);
});

// ===== Scroll progress bar =====
window.addEventListener("scroll", () => {
  const progress = document.getElementById("scroll-progress");
  if (!progress) return;
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (scrollTop / scrollHeight) * 100;
  progress.style.width = scrolled + "%";
});

// ===== Navbar mobile =====
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");
burger?.addEventListener("click", () => navLinks.classList.toggle("open"));

// ===== Dynamic year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== AOS (scroll animations) =====
AOS.init({ duration: 800, once: true });

// ===== Swiper (depoimentos) =====
new Swiper(".mySwiper", {
  slidesPerView: 1,
  loop: true,
  autoplay: { delay: 4000 },
  pagination: { el: ".swiper-pagination", clickable: true },
  breakpoints: { 768: { slidesPerView: 2 } },
});

// ===== Particles.js =====
particlesJS("particles-js", {
  particles: {
    number: { value: 70 },
    color: { value: "#C8A951" },
    shape: { type: "circle" },
    opacity: { value: 0.6 },
    size: { value: 3 },
    line_linked: { enable: true, color: "#C8A951", opacity: 0.3 },
    move: { enable: true, speed: 2 },
  },
  interactivity: {
    detect_on: "canvas",
    events: { onhover: { enable: true, mode: "grab" } },
    modes: { grab: { distance: 150, line_linked: { opacity: 0.6 } } },
  },
  retina_detect: true,
});

// ===== GSAP =====
gsap.registerPlugin(ScrollTrigger);
gsap.from(".hero-content h1", { y: 30, opacity: 0, duration: 1, delay: 0.4 });
gsap.from(".hero-content p", { y: 30, opacity: 0, duration: 1, delay: 0.6 });
gsap.from(".btn", { y: 20, opacity: 0, duration: 0.8, delay: 0.9 });

document.querySelectorAll(".section").forEach((sec) => {
  gsap.fromTo(
    sec,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: { trigger: sec, start: "top 85%", once: true },
    }
  );
});

// ===== Typing Effect =====
const typingElement = document.querySelector(".typing");
if (typingElement) {
  const text = typingElement.textContent;
  typingElement.textContent = "";
  let idx = 0;
  function typing() {
    if (idx < text.length) {
      typingElement.textContent += text.charAt(idx);
      idx++;
      setTimeout(typing, 60);
    }
  }
  typing();
}

// ===== Tech Bars Animation =====
const bars = document.querySelectorAll(".fill");
window.addEventListener("scroll", () => {
  bars.forEach((bar) => {
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      const fillPercent = bar.getAttribute("data-fill");
      bar.style.width = fillPercent + "%";
    }
  });
});

// ===== Parallax Dourado =====
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  const particles = document.getElementById("particles-js");
  if (particles) particles.style.transform = `translate(${x * 10}px, ${y * 10}px) scale(1.05)`;
  const hero = document.querySelector(".hero-content");
  if (hero) hero.style.transform = `rotateY(${x * 6}deg) rotateX(${y * -6}deg)`;
});

// ===== Glow Dourado =====
const glowLayer = document.createElement("div");
glowLayer.id = "gold-glow";
document.body.appendChild(glowLayer);
document.addEventListener("mousemove", (e) => {
  glowLayer.style.left = e.clientX + "px";
  glowLayer.style.top = e.clientY + "px";
});

// ===== Tilt 3D nos Cards =====
document.querySelectorAll("[data-tilt]").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / 20) * -1;
    const rotateY = (x - rect.width / 2) / 20;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  });
});

// ===== EmailJS + SweetAlert =====
(function () {
  emailjs.init({ publicKey: "85ILrQBPOXrTQJrC9w3NH" }); // ✅ tua chave pública
})();
const form = document.getElementById("contact-form");
form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  Swal.fire({
    title: "Enviando...",
    text: "Aguarde enquanto processamos sua mensagem 💫",
    background: "#000",
    color: "#C8A951",
    didOpen: () => Swal.showLoading(),
    allowOutsideClick: false,
  });
  try {
    await emailjs.sendForm("service_jf7hz3s", "template_portfolio", "#contact-form");
    Swal.fire({
      icon: "success",
      title: "Mensagem enviada com sucesso! 🚀",
      text: "Obrigado por entrar em contato!",
      background: "#111",
      color: "#C8A951",
      confirmButtonColor: "#C8A951",
    });
    form.reset();
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Erro ao enviar ❌",
      text: "Tente novamente mais tarde.",
      background: "#111",
      color: "#C8A951",
      confirmButtonColor: "#C8A951",
    });
  }
});
