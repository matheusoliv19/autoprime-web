/* =============================================
   AUTOPRIME - MAIN.JS
   Funções globais: navbar, scroll, FAQ,
   newsletter, cards de carro, busca rápida
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ---- NAVBAR: scroll + hamburger ----
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    document.getElementById('scrollTop')?.classList.toggle('visible', window.scrollY > 400);
  });

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Fecha menu ao clicar em link
  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // ---- BOTÃO SCROLL TOP ----
  document.getElementById('scrollTop')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- FAQ ----
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Fecha todos
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      // Abre o clicado (se estava fechado)
      if (!isOpen) item.classList.add('open');
    });
  });

  // ---- NEWSLETTER ----
  document.getElementById('newsletterForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input[type="email"]');
    showToast(`✅ ${input.value} cadastrado com sucesso!`);
    input.value = '';
  });

  // ---- BUSCA RÁPIDA (index.html) ----
  document.getElementById('quickSearchForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const marca = document.getElementById('searchMarca').value;
    const preco = document.getElementById('searchPreco').value;
    const ano   = document.getElementById('searchAno').value;
    const tipo  = document.getElementById('searchTipo').value;
    const params = new URLSearchParams();
    if (marca) params.set('marca', marca);
    if (preco) params.set('preco', preco);
    if (ano)   params.set('ano', ano);
    if (tipo)  params.set('tipo', tipo);
    window.location.href = 'catalogo.html?' + params.toString();
  });

  // ---- RENDERIZAR DESTAQUES (index.html) ----
  const featuredGrid = document.getElementById('featuredCars');
  if (featuredGrid && typeof CarrosDB !== 'undefined') {
    const destaques = CarrosDB.destaques();
    featuredGrid.innerHTML = destaques.map(criarCardCarro).join('');
    animateCards(featuredGrid);
  }

  // ---- TABS (detalhes.html) ----
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + tab)?.classList.add('active');
    });
  });

});

// =============================================
// FUNÇÃO: Criar card de carro (usada em todo o site)
// =============================================
function criarCardCarro(carro) {
  const preco   = Fmt.preco(carro.preco);
  const parcela = Fmt.preco(Fmt.parcela(carro.preco));
  const km      = Fmt.km(carro.km);
  const foto    = carro.fotos?.[0] || '';
  const badge   = carro.novo ? 'badge-novo' : (carro.destaque ? 'badge-destaque' : '');
  const badgeText = carro.novo ? 'Novo' : (carro.destaque ? 'Destaque' : '');

  return `
    <article class="car-card fade-in" onclick="window.location.href='detalhes.html?id=${carro.id}'">
      <div class="car-card-img">
        ${foto
          ? `<img src="${foto}" alt="${carro.marca} ${carro.modelo}" loading="lazy" />`
          : `<div class="car-img-placeholder"><i class="fas fa-car"></i><span>${carro.marca} ${carro.modelo}</span></div>`
        }
        ${badgeText ? `<span class="car-badge ${badge}">${badgeText}</span>` : ''}
      </div>
      <div class="car-card-body">
        <div class="car-card-brand">${carro.marca}</div>
        <div class="car-card-title">${carro.modelo}</div>
        <div class="car-card-version">${carro.versao}</div>
        <div class="car-card-specs">
          <span class="car-spec-item"><i class="fas fa-calendar-alt"></i> ${carro.ano}</span>
          <span class="car-spec-item"><i class="fas fa-road"></i> ${km}</span>
          <span class="car-spec-item"><i class="fas fa-gas-pump"></i> ${carro.combustivel}</span>
          <span class="car-spec-item"><i class="fas fa-cogs"></i> ${carro.cambio}</span>
        </div>
        <div class="car-card-footer">
          <div class="car-price">
            <span class="car-price-value">${preco}</span>
            <span class="car-price-parcel">ou <strong>${parcela}/mês</strong></span>
          </div>
          <button class="btn btn-primary btn-card" onclick="event.stopPropagation(); window.location.href='detalhes.html?id=${carro.id}'">
            Ver detalhes
          </button>
        </div>
      </div>
    </article>
  `;
}

// =============================================
// FUNÇÃO: Toast de notificação
// =============================================
function showToast(msg, tipo = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.cssText = `
    position: fixed; bottom: 7rem; left: 50%; transform: translateX(-50%);
    background: ${tipo === 'success' ? '#22c55e' : '#e63946'};
    color: #fff; padding: .75rem 1.5rem; border-radius: 50px;
    font-weight: 600; font-size: .88rem; z-index: 9999;
    box-shadow: 0 4px 20px rgba(0,0,0,.3);
    animation: toastIn .3s ease forwards;
  `;
  toast.textContent = msg;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes toastIn {
      from { opacity: 0; transform: translateX(-50%) translateY(20px); }
      to   { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// =============================================
// FUNÇÃO: Animar cards ao entrar na viewport
// =============================================
function animateCards(container) {
  if (!container) return;
  const cards = container.querySelectorAll('.car-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity .4s ease, transform .4s ease';
    observer.observe(card);
  });
}

// =============================================
// FORMULÁRIO DE CONTATO (contato.html)
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Máscara para telefone
  const telefoneEl = document.getElementById('telefone');
  telefoneEl?.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 10) {
      v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (v.length > 6) {
      v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (v.length > 2) {
      v = v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    }
    e.target.value = v;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validarFormContato()) {
      // Simula envio
      const btn = document.getElementById('submitBtn');
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      btn.disabled = true;

      setTimeout(() => {
        form.style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
        window.scrollTo({ top: document.getElementById('formSuccess').offsetTop - 100, behavior: 'smooth' });
      }, 1500);
    }
  });

  // Limpa erro ao digitar
  form.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => limparErro(el.id));
  });
});

function validarFormContato() {
  let valido = true;

  const nome = document.getElementById('nome');
  if (!nome?.value.trim() || nome.value.trim().length < 3) {
    setErro('erroNome', 'Por favor, informe seu nome completo.');
    valido = false;
  }

  const email = document.getElementById('email');
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email?.value.trim() || !emailReg.test(email.value)) {
    setErro('erroEmail', 'Informe um e-mail válido.');
    valido = false;
  }

  const tel = document.getElementById('telefone');
  if (!tel?.value.trim() || tel.value.replace(/\D/g, '').length < 10) {
    setErro('erroTelefone', 'Informe um telefone com DDD.');
    valido = false;
  }

  const msg = document.getElementById('mensagem');
  if (!msg?.value.trim() || msg.value.trim().length < 10) {
    setErro('erroMensagem', 'Por favor, escreva uma mensagem com pelo menos 10 caracteres.');
    valido = false;
  }

  const aceito = document.getElementById('aceito');
  if (!aceito?.checked) {
    setErro('erroAceito', 'Você precisa aceitar a política de privacidade.');
    valido = false;
  }

  return valido;
}

function setErro(elId, msg) {
  const el = document.getElementById(elId);
  if (el) el.textContent = msg;
}

function limparErro(inputId) {
  const mapa = { nome: 'erroNome', email: 'erroEmail', telefone: 'erroTelefone', mensagem: 'erroMensagem', aceito: 'erroAceito' };
  const erroId = mapa[inputId];
  if (erroId) {
    const el = document.getElementById(erroId);
    if (el) el.textContent = '';
  }
}
