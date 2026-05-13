// Formulário → WhatsApp
function enviarWhatsApp(e) {
  e.preventDefault();
  const nome     = document.getElementById('nome').value.trim();
  const empresa  = document.getElementById('empresa').value.trim();
  const email    = document.getElementById('email').value.trim();
  const servico  = document.getElementById('servico').value;
  const mensagem = document.getElementById('mensagem').value.trim();

  let texto = `Olá Douglas! 👋\n\n`;
  texto += `*Nome:* ${nome}\n`;
  if (empresa) texto += `*Empresa:* ${empresa}\n`;
  if (email)   texto += `*E-mail:* ${email}\n`;
  texto += `*Serviço:* ${servico}\n\n`;
  texto += `*Projeto:*\n${mensagem}`;

  const url = `https://wa.me/5521982892993?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank');
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Fade-up on scroll for cards and sections
const fadeEls = document.querySelectorAll('.card, .projeto-card, .sobre-stat, .passo');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObserver.observe(el);
});
