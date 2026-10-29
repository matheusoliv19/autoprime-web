/* =============================================
   AUTOPRIME - DETALHES.JS
   Galeria de fotos, especificações, opcionais,
   simulador de financiamento e veículos relacionados
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('detailsPage')) return;

  const id    = new URLSearchParams(window.location.search).get('id');
  const carro = id ? CarrosDB.porId(id) : null;

  if (!carro) {
    document.getElementById('detailsPage').innerHTML = `
      <div style="text-align:center; padding: 6rem 2rem;">
        <i class="fas fa-car-crash" style="font-size:4rem; color:var(--border); display:block; margin-bottom:1rem;"></i>
        <h2>Veículo não encontrado</h2>
        <p style="color:var(--gray-light); margin: .75rem 0 1.5rem;">O veículo que você está buscando não existe ou foi removido.</p>
        <a href="catalogo.html" class="btn btn-primary">Voltar ao Catálogo</a>
      </div>
    `;
    return;
  }

  // ---- Atualiza título da aba ----
  document.title = `${carro.marca} ${carro.modelo} ${carro.ano} - AutoPrime`;

  // ---- Breadcrumb ----
  document.getElementById('breadcrumbCar').textContent = `${carro.marca} ${carro.modelo}`;

  // ---- Badges ----
  let badgesHTML = `<span class="badge badge-tipo">${carro.tipo}</span>`;
  if (carro.novo) badgesHTML += `<span class="badge badge-novo">Novo em estoque</span>`;
  if (carro.destaque) badgesHTML += `<span class="badge badge-destaque">⭐ Destaque</span>`;
  document.getElementById('carBadges').innerHTML = badgesHTML;

  // ---- Título e subtítulo ----
  document.getElementById('carTitle').textContent = `${carro.marca} ${carro.modelo}`;
  document.getElementById('carSubtitle').textContent = `${carro.versao} • ${carro.ano} • ${Fmt.km(carro.km)}`;

  // ---- Preço ----
  const parcela = Fmt.parcela(carro.preco, 0, 48, 0.0119);
  document.getElementById('carPrice').textContent = Fmt.preco(carro.preco);
  document.getElementById('carParcel').innerHTML = `ou <strong style="color:var(--success)">${Fmt.preco(parcela)}</strong>/mês em 48x`;

  // ---- Specs rápidos ----
  const specs = [
    { icon: 'fa-calendar-alt', label: 'Ano',        val: carro.ano },
    { icon: 'fa-road',         label: 'Quilômetros', val: Fmt.km(carro.km) },
    { icon: 'fa-gas-pump',     label: 'Combustível', val: carro.combustivel },
    { icon: 'fa-cogs',         label: 'Câmbio',      val: carro.cambio },
    { icon: 'fa-bolt',         label: 'Potência',    val: carro.potencia },
    { icon: 'fa-arrows-spin',  label: 'Tração',      val: carro.tracao },
  ];
  document.getElementById('quickSpecs').innerHTML = specs.map(s => `
    <div class="qs-item">
      <i class="fas ${s.icon}"></i>
      <div><small>${s.label}</small><span>${s.val}</span></div>
    </div>
  `).join('');

  // ---- Botão WhatsApp com mensagem ----
  const msgWA = encodeURIComponent(`Olá! Tenho interesse no ${carro.marca} ${carro.modelo} ${carro.ano} (${Fmt.preco(carro.preco)}). Poderia me passar mais informações?`);
  document.getElementById('whatsappBtn').href = `https://wa.me/5548999998888?text=${msgWA}`;

  // ---- GALERIA ----
  const fotos = carro.fotos && carro.fotos.length > 0
    ? carro.fotos
    : [''];

  const mainImg = document.getElementById('mainPhoto');
  mainImg.src = fotos[0];
  mainImg.alt = `${carro.marca} ${carro.modelo}`;

  document.getElementById('galleryBadge').textContent = carro.tipo;

  const thumbsEl = document.getElementById('galleryThumbs');
  thumbsEl.innerHTML = fotos.map((foto, i) => `
    <div class="gallery-thumb ${i === 0 ? 'active' : ''}" data-idx="${i}">
      ${foto
        ? `<img src="${foto}" alt="Foto ${i + 1}" loading="lazy" />`
        : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--gray);font-size:.7rem;">Foto ${i+1}</div>`
      }
    </div>
  `).join('');

  thumbsEl.querySelectorAll('.gallery-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const idx = parseInt(thumb.dataset.idx);
      mainImg.style.opacity = '0';
      setTimeout(() => {
        mainImg.src = fotos[idx];
        mainImg.style.opacity = '1';
      }, 200);
      thumbsEl.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

  // ---- ESPECIFICAÇÕES ----
  const specsData = [
    { label: 'Marca',       val: carro.marca },
    { label: 'Modelo',      val: carro.modelo },
    { label: 'Versão',      val: carro.versao },
    { label: 'Ano',         val: carro.ano },
    { label: 'Quilômetros', val: Fmt.km(carro.km) },
    { label: 'Cor',         val: carro.cor },
    { label: 'Motor',       val: carro.motor },
    { label: 'Potência',    val: carro.potencia },
    { label: 'Câmbio',      val: carro.cambio },
    { label: 'Combustível', val: carro.combustivel },
    { label: 'Tração',      val: carro.tracao },
    { label: 'Portas',      val: carro.portas },
    { label: 'Tipo',        val: carro.tipo },
    { label: 'Preço',       val: Fmt.preco(carro.preco) },
  ];
  document.getElementById('specsGrid').innerHTML = specsData.map(s => `
    <div class="spec-row">
      <small>${s.label}</small>
      <span>${s.val}</span>
    </div>
  `).join('');

  // ---- OPCIONAIS ----
  const opcionaisEl = document.getElementById('opcionaisGrid');
  if (carro.opcionais && carro.opcionais.length > 0) {
    opcionaisEl.innerHTML = carro.opcionais.map(op => `
      <div class="opcional-item">
        <i class="fas fa-check-circle"></i> ${op}
      </div>
    `).join('');
  } else {
    opcionaisEl.innerHTML = '<p style="color:var(--gray-light)">Informações de opcionais não disponíveis.</p>';
  }

  // ---- SIMULADOR DE FINANCIAMENTO ----
  const simValorEl = document.getElementById('simValorVeiculo');
  if (simValorEl) {
    simValorEl.value = Fmt.preco(carro.preco);

    document.getElementById('simEntrada')?.addEventListener('input', atualizarEntradaPercent);

    document.getElementById('simCalcular')?.addEventListener('click', calcularFinanciamento);

    function atualizarEntradaPercent() {
      const entrada = parseFloat(document.getElementById('simEntrada').value) || 0;
      const pct     = ((entrada / carro.preco) * 100).toFixed(1);
      document.getElementById('simEntradaPercent').textContent =
        entrada > 0 ? `${pct}% do valor do veículo` : '';
    }

    function calcularFinanciamento() {
      const entrada    = parseFloat(document.getElementById('simEntrada').value) || 0;
      const meses      = parseInt(document.getElementById('simParcelas').value);
      const taxa       = parseFloat(document.getElementById('simTaxa').value) / 100;
      const financiado = carro.preco - entrada;

      if (entrada >= carro.preco) {
        showToast('A entrada não pode ser maior ou igual ao valor do veículo.', 'error');
        return;
      }
      if (financiado <= 0) return;

      const parcela = Fmt.parcela(carro.preco, entrada, meses, taxa);
      const total   = parcela * meses + entrada;
      const juros   = total - carro.preco;

      document.getElementById('resFinanciado').textContent = Fmt.preco(financiado);
      document.getElementById('resParcela').textContent    = Fmt.preco(parcela);
      document.getElementById('resTotal').textContent      = Fmt.preco(total);
      document.getElementById('resJuros').textContent      = Fmt.preco(juros);

      document.getElementById('simResult').style.opacity = '0';
      setTimeout(() => {
        document.getElementById('simResult').style.opacity = '1';
        document.getElementById('simResult').style.transition = 'opacity .3s ease';
      }, 50);
    }
  }

  // ---- VEÍCULOS RELACIONADOS ----
  const relacionados = CarrosDB.relacionados(carro.id, carro.tipo, carro.marca);
  const relGrid = document.getElementById('relatedCars');
  if (relGrid && relacionados.length > 0) {
    relGrid.innerHTML = relacionados.map(criarCardCarro).join('');
    animateCards(relGrid);
  } else if (relGrid) {
    relGrid.closest('.related-section').style.display = 'none';
  }

  // ---- TABS: scroll para simulador via link ----
  document.querySelector('a[href="#simulador"]')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('[data-tab="simulador"]')?.click();
    document.querySelector('.details-tabs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
