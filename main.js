
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

// Dados dos projetos — case studies estruturados
const projetos = {
  pulsemetrics: {
    nome: 'PulseMetrics',
    tag: 'SaaS Multi-tenant',
    status: '● Live',
    imagem: 'img/pulsemetrics-thumb.svg',
    descricao: 'Plataforma SaaS de gestão financeira e operacional para vendedores autônomos — pensada inicialmente para um amigo que vende perfumes importados e perdia o controle do que clientes deviam.',
    problema: 'Vendedores autônomos perdem dinheiro porque controlam vendas em caderno ou WhatsApp. Não sabem quanto receberam vs quanto têm a receber, esquecem cobranças, perdem o histórico de estoque e não conseguem identificar quais produtos vendem mais.',
    solucao: 'Dashboard com KPIs financeiros em tempo real, registro de vendas linkado a produtos (com baixa automática de estoque) e a clientes reais (com histórico de pedidos e gasto total), sistema de cobrança via WhatsApp com 4 templates editáveis e variáveis dinâmicas, catálogo público compartilhável por slug, e painel admin para gerenciar contas e planos.',
    features: [
      'Auth com email/senha + Google OAuth (PKCE flow)',
      'Multi-tenant com isolamento via Row Level Security do Postgres',
      'Dashboard com cards de Recebido / A Receber / Vendas e lista de devedores',
      'Vendas linkadas a produtos com controle automático de estoque e vendidos',
      'Cobrança via WhatsApp (link wa.me) com templates personalizáveis',
      'Catálogo público com slug-based routing (/catalogo/:loja)',
      'Painel admin: lista de contas, promoção/rebaixamento de plano',
      'Plan limits (Starter/Business) com modal de upgrade',
      'PWA instalável no celular',
      'Validação de senha contra base do HaveIBeenPwned + CAPTCHA',
    ],
    desafios: 'Implementar segurança nível produção sem servidor próprio: combinei RLS do Supabase (isolamento por user_id), validação client-side de senhas vazadas usando k-anonymity (só envia 5 chars do hash SHA-1 — equivale ao Pro do Supabase, mas gratuito), CAPTCHA no signup e rotação de OAuth secret. Outro desafio foi o auto-update de estoque/contadores: ao criar/deletar uma venda, transações em cascata atualizam o produto vendido e os totais do cliente, mantendo consistência sem race conditions.',
    techs: ['React 18', 'TypeScript', 'Vite', 'Supabase', 'PostgreSQL', 'Row Level Security', 'Recharts', 'Lucide Icons', 'PWA', 'Vercel'],
    live: 'https://pulsemetrics-sable.vercel.app',
    repo: 'https://github.com/DeAndrade15/pulsemetrics',
  },

  barberhub: {
    nome: 'BarberHub',
    tag: 'Sistema Web Completo',
    status: '● Live',
    imagem: 'img/barberhub-thumb.jpg',
    descricao: 'Sistema completo de agendamento online para barbearias, com fluxo público mobile-first de 3 etapas e painel administrativo para o dono da barbearia.',
    problema: 'Barbearias dependem de WhatsApp e telefone pra agendar, o que gera ligações perdidas, horários conflitantes e zero histórico de cliente. Donos não têm visibilidade do faturamento ou de quem são seus melhores clientes.',
    solucao: 'Página pública mobile-first onde o cliente escolhe serviços (com cards e fotos), data e horário (disponibilidade calculada automaticamente em tempo real considerando duração dos serviços), e confirma com nome e WhatsApp. No backend, painel admin com dashboard, agenda, gestão de clientes e relatórios.',
    features: [
      'Fluxo público em 3 steps com auto-cálculo de disponibilidade',
      'Suporte a múltiplos serviços por agendamento (somatório de duração)',
      'Painel admin com dashboard, agenda, clientes',
      'Autenticação JWT para o admin',
      'API REST documentada',
      'Dark theme editorial premium',
    ],
    desafios: 'Calcular disponibilidade considerando duração variável dos serviços selecionados e bloqueando horários sobrepostos exigiu lógica de "slots disponíveis" que filtra a agenda contra os agendamentos existentes em tempo real conforme o cliente seleciona/desseleciona serviços. Também implementei rate limiting básico no endpoint de agendamento para evitar spam.',
    techs: ['Node.js', 'Express', 'JavaScript', 'CSS3', 'REST API', 'JWT', 'Railway'],
    live: 'https://barberhub-production-a848.up.railway.app',
    repo: 'https://github.com/DeAndrade15/barberhub',
  },

  quoteforge: {
    nome: 'QuoteForge',
    tag: 'SaaS com IA',
    status: '● Live',
    imagem: 'img/quoteforge-thumb.png',
    descricao: 'Gerador de propostas comerciais profissionais usando IA generativa. Arquitetura em três camadas: frontend React, backend Express e API isolada para integração com Gemini.',
    problema: 'Freelancers e pequenas agências perdem horas montando propostas comerciais do zero, com qualidade inconsistente e copy ruim. Templates prontos do Word não escalam e não personalizam por contexto.',
    solucao: 'O usuário preenche um formulário com dados do projeto (cliente, escopo, prazo, orçamento) e o sistema chama a API Gemini através de um backend intermediário, retornando uma proposta completa estruturada (escopo detalhado, cronograma, investimento, termos). Pode ser editada inline e exportada para PDF.',
    features: [
      'Geração via Gemini AI com prompts estruturados',
      'Arquitetura separada em /api, /backend, /frontend',
      'Editor inline da proposta gerada',
      'Exportação para PDF preservando formatação',
      'Modelos prontos por tipo de serviço',
    ],
    desafios: 'A separação em três camadas (frontend / backend / API isolada) foi feita pra esconder a chave da API do Gemini do cliente e permitir que o backend valide o input antes de gastar tokens. Implementei rate limiting por sessão e validação de schema do output da IA antes de devolver ao frontend, pra evitar respostas malformadas quebrarem o renderizador.',
    techs: ['React', 'TypeScript', 'Vite', 'Node.js', 'Express', 'Gemini AI', 'Vercel'],
    live: 'https://quoteforge-xi.vercel.app',
    repo: 'https://github.com/DeAndrade15/quoteforge',
  },

  patrickdaher: {
    nome: 'Patrick Daher',
    tag: 'Site Institucional',
    status: '● Live',
    imagem: 'img/patrickdaher-thumb.png',
    descricao: 'Site institucional premium para Patrick Daher, especialista em marketing audiovisual. Apresenta portfólio de vídeos, artes e marcas atendidas com integração de IA.',
    problema: 'Profissional de audiovisual precisava de uma vitrine online que respeitasse a estética do trabalho dele (premium, com pretos profundos, animações cinematográficas) e fosse rápida o suficiente para carregar vídeos em qualidade alta sem travar.',
    solucao: 'Single-page application com lazy loading de vídeos, transições suaves entre seções, dark/light mode com persistência, e seção "Fale com a IA" usando Gemini pra responder dúvidas sobre os serviços. Projeto colaborativo onde fiquei responsável por arquitetura frontend e integração com a IA.',
    features: [
      'Dark/light mode com persistência em localStorage',
      'Lazy loading de vídeos com placeholder blur',
      'Animações fluidas (Framer Motion / CSS transitions)',
      'Chatbot integrado via Gemini sobre os serviços',
      'Layout responsivo desktop/tablet/mobile',
    ],
    desafios: 'Carregar vídeos pesados sem matar performance no mobile exigiu poster frames, preload="metadata" e intersection observer pra só dar load nos vídeos quando entram na viewport. O dark/light mode foi feito via CSS variables com transição animada — não só toggle binário.',
    techs: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Express', 'Gemini AI', 'Vercel'],
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

  // Case study sections (problema / solução / features / desafios)
  const caseEl = document.getElementById('modalCase');
  if (caseEl) {
    let html = '';
    if (p.problema) {
      html += `<div class="case-section"><h4>Problema</h4><p>${p.problema}</p></div>`;
    }
    if (p.solucao) {
      html += `<div class="case-section"><h4>Solução</h4><p>${p.solucao}</p></div>`;
    }
    if (p.features && p.features.length) {
      html += `<div class="case-section"><h4>Principais funcionalidades</h4><ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul></div>`;
    }
    if (p.desafios) {
      html += `<div class="case-section"><h4>Desafios técnicos</h4><p>${p.desafios}</p></div>`;
    }
    caseEl.innerHTML = html;
  }

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
