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
const fadeEls = document.querySelectorAll('.card, .proj-card, .sobre-stat, .passo');
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

// Dados dos projetos
const projetos = {
  barberhub: {
    nome: 'BarberHub',
    tag: 'Sistema Web',
    status: '● Live',
    imagem: 'img/barberhub-thumb.jpg',
    descricao: 'Sistema de agendamento online para barbearias, com fluxo mobile-first em 3 etapas: escolha de serviços, seleção de data e horário, e confirmação com dados do cliente. Suporte a multi-serviços, cálculo automático de disponibilidade e painel admin completo com dashboard, agenda e gestão de clientes.',
    techs: ['Node.js', 'Express', 'JavaScript', 'CSS', 'REST API', 'JWT'],
    live: 'https://barberhub-production-a848.up.railway.app',
    repo: 'https://github.com/DeAndrade15/barberhub',
  }
};

function abrirProjeto(id) {
  const p = projetos[id];
  if (!p) return;
  document.getElementById('modalImg').src     = p.imagem;
  document.getElementById('modalImg').alt     = p.nome;
  document.getElementById('modalTag').textContent    = p.tag;
  document.getElementById('modalStatus').textContent = p.status;
  document.getElementById('modalNome').textContent   = p.nome;
  document.getElementById('modalDesc').textContent   = p.descricao;
  document.getElementById('modalLive').href  = p.live;
  document.getElementById('modalRepo').href  = p.repo;
  const techs = document.getElementById('modalTechs');
  techs.innerHTML = p.techs.map(t => `<span>${t}</span>`).join('');
  document.getElementById('projModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function fecharProjeto(e, force) {
  if (!force && e && e.target !== document.getElementById('projModal')) return;
  document.getElementById('projModal').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') fecharProjeto(null, true);
});
