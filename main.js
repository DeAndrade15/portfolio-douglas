
// TECH BADGES
const techMap = {
  'Node.js':      { icon: 'devicon-nodejs-plain',          color: '#6cc24a' },
  'Express':      { icon: 'devicon-express-original',      color: '#9ca3af' },
  'JavaScript':   { icon: 'devicon-javascript-plain',      color: '#f7df1e' },
  'CSS':          { icon: 'devicon-css3-plain',             color: '#1572b6' },
  'React':        { icon: 'devicon-react-original',        color: '#61dafb' },
  'TypeScript':   { icon: 'devicon-typescript-plain',      color: '#3178c6' },
  'Tailwind CSS': { icon: 'devicon-tailwindcss-original',  color: '#06b6d4' },
  'Vite':         { icon: 'devicon-vitejs-plain',           color: '#646cff' },
  'REST API':     { icon: 'devicon-fastapi-plain',          color: '#f59e0b' },
  'JWT':          { icon: null,                             color: '#e879f9' },
  'Gemini AI':    { icon: null,                             color: '#8e75b2' },
};

function renderTechBadge(name) {
  const t = techMap[name] || { color: '#6b6b88' };
  const ico = t.icon ? `<i class="${t.icon}"></i>` : '';
  return `<span class="tech-badge" style="--tc:${t.color}">${ico}${name}</span>`;
}

function upgradeTechSpans(container) {
  container.querySelectorAll('.proj-techs span:not(.tech-badge)').forEach(span => {
    span.outerHTML = renderTechBadge(span.textContent.trim());
  });
}

document.querySelectorAll('.proj-card').forEach(upgradeTechSpans);

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
        // remove inline styles after animation so CSS :hover can take over
        setTimeout(() => {
          entry.target.style.opacity = '';
          entry.target.style.transform = '';
          entry.target.style.transition = '';
        }, 600);
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
  },
  quoteforge: {
    nome: 'QuoteForge',
    tag: 'IA / SaaS',
    status: '● Live',
    imagem: 'img/quoteforge-thumb.png',
    descricao: 'Gerador de propostas comerciais profissionais usando inteligência artificial (Gemini). O usuário preenche dados do projeto e a IA cria uma proposta completa com escopo, cronograma, investimento e termos — pronta para enviar ao cliente. Inclui exportação para PDF.',
    techs: ['React', 'TypeScript', 'Vite', 'Node.js', 'Express', 'Gemini AI'],
    live: 'https://quoteforge-xi.vercel.app',
    repo: 'https://github.com/DeAndrade15/quoteforge',
  },
  patrickdaher: {
    nome: 'Patrick Daher',
    tag: 'Site Institucional',
    status: '● Live',
    imagem: 'img/patrickdaher-thumb.png',
    descricao: 'Site institucional para Patrick Daher, especialista em marketing e audiovisual. Apresenta portfólio de vídeos, artes e marcas atendidas, com design premium dark/light mode, animações fluidas e integração com IA Gemini. Projeto colaborativo.',
    techs: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Express', 'Gemini AI'],
    live: 'https://opatrickdaher.vercel.app',
    repo: 'https://github.com/ptkdaherr/opatrickdaher',
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
  techs.innerHTML = p.techs.map(renderTechBadge).join('');
  document.getElementById('projModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function fecharProjeto(e, force) {
  if (!force && e && e.target !== document.getElementById('projModal')) return;
  document.getElementById('projModal').classList.remove('open');
  setTimeout(() => { document.body.style.overflow = ''; }, 300);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') fecharProjeto(null, true);
});

// Slideshow nos cards
document.querySelectorAll('.proj-card[data-slides]').forEach(card => {
  const slides = JSON.parse(card.dataset.slides);
  if (slides.length < 2) return;

  const img      = card.querySelector('.proj-thumb img');
  const dotsEl   = card.querySelector('.proj-dots');
  const progress = card.querySelector('.proj-progress');
  let current = 0;
  let timer   = null;

  slides.forEach((_, i) => {
    const d = document.createElement('span');
    d.className = 'proj-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', e => { e.stopPropagation(); goSlide(i); });
    dotsEl.appendChild(d);
  });

  function resetProgress() {
    progress.classList.remove('running');
    void progress.offsetWidth; // reflow para reiniciar animação
    progress.classList.add('running');
  }

  function goSlide(n) {
    if (n === current) return;
    img.classList.add('fading');
    setTimeout(() => {
      current = (n + slides.length) % slides.length;
      img.src = slides[current];
      img.classList.remove('fading');
      dotsEl.querySelectorAll('.proj-dot').forEach((d, i) =>
        d.classList.toggle('active', i === current)
      );
      resetProgress();
    }, 200);
  }

  function startAuto() {
    resetProgress();
    timer = setInterval(() => goSlide(current + 1), 2000);
  }

  function stopAuto() {
    clearInterval(timer);
    timer = null;
    progress.classList.remove('running');
    goSlide(0);
  }

  card.addEventListener('mouseenter', startAuto);
  card.addEventListener('mouseleave', stopAuto);
});
