/* =============================================
   AUTOPRIME - CATALOGO.JS
   Filtros, busca, ordenação, paginação e
   toggle de visualização
   ============================================= */

const ITENS_POR_PAGINA = 9;
let paginaAtual = 1;
let carrosFiltrados = [];

document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('catalogGrid')) return;

  // Carrega parâmetros da URL (vindo da busca rápida ou categorias)
  carregarParamsURL();

  // Renderiza catálogo inicial
  aplicarFiltros();

  // ---- EVENTOS DOS FILTROS ----
  document.getElementById('searchText')?.addEventListener('input', debounce(aplicarFiltros, 350));
  document.getElementById('filterPreco')?.addEventListener('input', atualizarLabelPreco);
  document.getElementById('filterPreco')?.addEventListener('change', aplicarFiltros);
  document.getElementById('filterAnoMin')?.addEventListener('change', aplicarFiltros);
  document.getElementById('filterAnoMax')?.addEventListener('change', aplicarFiltros);
  document.getElementById('sortSelect')?.addEventListener('change', () => { paginaAtual = 1; renderizarGrid(); });
  document.getElementById('applyFilters')?.addEventListener('click', aplicarFiltros);
  document.getElementById('clearFilters')?.addEventListener('click', limparFiltros);
  document.getElementById('resetFilters')?.addEventListener('click', limparFiltros);

  // Checkboxes: aplicar ao mudar
  document.querySelectorAll('.checkbox-list input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', aplicarFiltros);
  });

  // ---- TOGGLE VISUALIZAÇÃO ----
  document.getElementById('viewGrid')?.addEventListener('click', () => {
    document.getElementById('catalogGrid').classList.remove('list-view');
    document.getElementById('viewGrid').classList.add('active');
    document.getElementById('viewList').classList.remove('active');
  });
  document.getElementById('viewList')?.addEventListener('click', () => {
    document.getElementById('catalogGrid').classList.add('list-view');
    document.getElementById('viewList').classList.add('active');
    document.getElementById('viewGrid').classList.remove('active');
  });

  // ---- SIDEBAR MOBILE ----
  document.getElementById('btnFilterMobile')?.addEventListener('click', () => {
    document.getElementById('filtersSidebar').classList.add('open');
    document.getElementById('filtersOverlay').classList.add('active');
  });
  document.getElementById('filtersOverlay')?.addEventListener('click', fecharSidebar);
  document.querySelector('.filters-header .btn-clear-filters')?.addEventListener('click', fecharSidebar);
});

// =============================================
// APLICAR FILTROS
// =============================================
function aplicarFiltros() {
  paginaAtual = 1;

  const marcasSel    = getChecked('filterMarca');
  const tiposSel     = getChecked('filterTipo');
  const combustSel   = getChecked('filterCombustivel');
  const cambiosSel   = getChecked('filterCambio');
  const precoMax     = parseInt(document.getElementById('filterPreco')?.value || 500000);
  const anoMin       = parseInt(document.getElementById('filterAnoMin')?.value || 2015);
  const anoMax       = parseInt(document.getElementById('filterAnoMax')?.value || 2025);
  const texto        = document.getElementById('searchText')?.value.trim() || '';

  carrosFiltrados = CarrosDB.filtrar({
    marcas: marcasSel,
    tipos: tiposSel,
    precoMax,
    anoMin,
    anoMax,
    combustiveis: combustSel,
    cambios: cambiosSel,
    texto
  });

  atualizarTagsFiltros({ marcasSel, tiposSel, combustSel, cambiosSel, precoMax, texto });
  renderizarGrid();
}

// =============================================
// RENDERIZAR GRID
// =============================================
function renderizarGrid() {
  const grid      = document.getElementById('catalogGrid');
  const emptyEl   = document.getElementById('emptyState');
  const countEl   = document.getElementById('resultsCount');
  const sortVal   = document.getElementById('sortSelect')?.value || 'relevancia';

  const ordenados = CarrosDB.ordenar(carrosFiltrados, sortVal);
  const total     = ordenados.length;
  const inicio    = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const fim       = inicio + ITENS_POR_PAGINA;
  const pagina    = ordenados.slice(inicio, fim);

  countEl.innerHTML = `<strong>${total}</strong> veículo${total !== 1 ? 's' : ''} encontrado${total !== 1 ? 's' : ''}`;

  if (total === 0) {
    grid.innerHTML = '';
    emptyEl.style.display = 'block';
    document.getElementById('pagination').innerHTML = '';
    return;
  }

  emptyEl.style.display = 'none';
  grid.innerHTML = pagina.map(criarCardCarro).join('');
  animateCards(grid);
  renderizarPaginacao(total);
}

// =============================================
// PAGINAÇÃO
// =============================================
function renderizarPaginacao(total) {
  const pagEl   = document.getElementById('pagination');
  const totalPg = Math.ceil(total / ITENS_POR_PAGINA);
  if (totalPg <= 1) { pagEl.innerHTML = ''; return; }

  let html = '';

  // Anterior
  html += `<button class="page-btn" ${paginaAtual === 1 ? 'disabled' : ''} onclick="irParaPagina(${paginaAtual - 1})">
             <i class="fas fa-chevron-left"></i>
           </button>`;

  // Números
  const delta = 2;
  for (let i = 1; i <= totalPg; i++) {
    if (i === 1 || i === totalPg || (i >= paginaAtual - delta && i <= paginaAtual + delta)) {
      html += `<button class="page-btn ${i === paginaAtual ? 'active' : ''}" onclick="irParaPagina(${i})">${i}</button>`;
    } else if (i === paginaAtual - delta - 1 || i === paginaAtual + delta + 1) {
      html += `<span class="page-btn" style="cursor:default;opacity:.4">…</span>`;
    }
  }

  // Próxima
  html += `<button class="page-btn" ${paginaAtual === totalPg ? 'disabled' : ''} onclick="irParaPagina(${paginaAtual + 1})">
             <i class="fas fa-chevron-right"></i>
           </button>`;

  pagEl.innerHTML = html;
}

function irParaPagina(n) {
  paginaAtual = n;
  renderizarGrid();
  document.querySelector('.catalog-main')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// =============================================
// TAGS DE FILTROS ATIVOS
// =============================================
function atualizarTagsFiltros({ marcasSel, tiposSel, combustSel, cambiosSel, precoMax, texto }) {
  const container = document.getElementById('activeFilters');
  if (!container) return;

  let tags = [];

  marcasSel.forEach(m   => tags.push({ label: m,               tipo: 'marca',      val: m }));
  tiposSel.forEach(t    => tags.push({ label: t,               tipo: 'tipo',       val: t }));
  combustSel.forEach(c  => tags.push({ label: c,               tipo: 'combustivel', val: c }));
  cambiosSel.forEach(c  => tags.push({ label: c,               tipo: 'cambio',     val: c }));
  if (precoMax < 500000) tags.push({ label: `Até ${Fmt.preco(precoMax)}`, tipo: 'preco', val: precoMax });
  if (texto)             tags.push({ label: `"${texto}"`,      tipo: 'texto',      val: texto });

  container.innerHTML = tags.map(tag => `
    <span class="filter-tag">
      ${tag.label}
      <button onclick="removerTag('${tag.tipo}', '${tag.val}')" title="Remover filtro">
        <i class="fas fa-times"></i>
      </button>
    </span>
  `).join('');
}

function removerTag(tipo, val) {
  switch (tipo) {
    case 'marca':
    case 'tipo':
    case 'combustivel':
    case 'cambio':
      const mapa = { marca: 'filterMarca', tipo: 'filterTipo', combustivel: 'filterCombustivel', cambio: 'filterCambio' };
      const container = document.getElementById(mapa[tipo]);
      const cb = container?.querySelector(`input[value="${val}"]`);
      if (cb) cb.checked = false;
      break;
    case 'preco':
      const rangeEl = document.getElementById('filterPreco');
      if (rangeEl) { rangeEl.value = 500000; atualizarLabelPreco(); }
      break;
    case 'texto':
      const textEl = document.getElementById('searchText');
      if (textEl) textEl.value = '';
      break;
  }
  aplicarFiltros();
}

// =============================================
// LABEL DO RANGE DE PREÇO
// =============================================
function atualizarLabelPreco() {
  const val = document.getElementById('filterPreco')?.value;
  if (val) {
    document.getElementById('precoLabel').textContent = Fmt.preco(parseInt(val));
  }
}

// =============================================
// LIMPAR FILTROS
// =============================================
function limparFiltros() {
  document.querySelectorAll('.checkbox-list input[type="checkbox"]').forEach(cb => cb.checked = false);
  const preco = document.getElementById('filterPreco');
  if (preco) { preco.value = 500000; atualizarLabelPreco(); }
  const text = document.getElementById('searchText');
  if (text) text.value = '';
  const anoMin = document.getElementById('filterAnoMin');
  if (anoMin) anoMin.value = '2015';
  const anoMax = document.getElementById('filterAnoMax');
  if (anoMax) anoMax.value = '2024';
  aplicarFiltros();
}

// =============================================
// CARREGAR PARÂMETROS DA URL
// =============================================
function carregarParamsURL() {
  const params = new URLSearchParams(window.location.search);

  const marca = params.get('marca');
  const tipo  = params.get('tipo');
  const preco = params.get('preco');
  const ano   = params.get('ano');

  if (marca) {
    const cb = document.querySelector(`#filterMarca input[value="${marca}"]`);
    if (cb) cb.checked = true;
  }
  if (tipo) {
    const cb = document.querySelector(`#filterTipo input[value="${tipo}"]`);
    if (cb) cb.checked = true;
  }
  if (preco) {
    const rangeEl = document.getElementById('filterPreco');
    if (rangeEl) { rangeEl.value = preco; atualizarLabelPreco(); }
  }
  if (ano) {
    const anoMin = document.getElementById('filterAnoMin');
    if (anoMin) anoMin.value = ano;
  }
}

// =============================================
// FECHAR SIDEBAR MOBILE
// =============================================
function fecharSidebar() {
  document.getElementById('filtersSidebar')?.classList.remove('open');
  document.getElementById('filtersOverlay')?.classList.remove('active');
}

// =============================================
// DEBOUNCE
// =============================================
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// =============================================
// HELPERS
// =============================================
function getChecked(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return [];
  return Array.from(el.querySelectorAll('input:checked')).map(cb => cb.value);
}
