/**
 * Aplicação Central - Somma Imóveis (2026 Edition)
 * Arquitetura SPA sem recarregamento, rotas hash, gerenciamento de estado e conversão
 */

class SommaApp {
  constructor() {
    this.currentRoute = 'home';
    this.favorites = this.loadFavorites();
    this.searchEngine = new SommaSearchEngine();
    this.calculator = new SommaFinancingCalculator();
    this.activeProperty = null;

    this.init();
  }

  init() {
    // Event listeners
    window.addEventListener('hashchange', () => this.handleRouting());
    window.addEventListener('scroll', () => this.handleScroll());

    // Initialize Components
    this.renderHomeFeatured();
    this.initSearchFiltersUI();
    this.initCalculatorUI();
    this.updateFavoritesCount();

    // Initial Route
    this.handleRouting();
  }

  /* ================= ROUTING ================= */
  navigateTo(route) {
    window.location.hash = route;
  }

  handleRouting() {
    const rawHash = window.location.hash.replace(/^#\/?/, '') || 'home';
    const parts = rawHash.split('/');
    const viewName = parts[0] || 'home';
    const param = parts[1];

    this.currentRoute = viewName;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Hide all views
    document.querySelectorAll('.page-view').forEach(el => el.classList.remove('active'));

    // Update navigation active states
    document.querySelectorAll('.nav-link, .bottom-nav-item, .drawer-link').forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href === `#${viewName}` || (viewName === 'home' && (href === '#' || href === '#home'))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Close mobile drawer if open
    this.closeMobileDrawer();

    // View specific handlers
    switch (viewName) {
      case 'home':
        this.showView('view-home');
        break;

      case 'venda':
        this.showView('view-catalog');
        this.searchEngine.setFilter('purpose', 'venda');
        this.updateCatalogHeader('Imóveis à Venda em Ibirité e Região', 'Confira as melhores oportunidades de casas e apartamentos para compra');
        break;

      case 'locacao':
        this.showView('view-catalog');
        this.searchEngine.setFilter('purpose', 'locacao');
        this.updateCatalogHeader('Imóveis para Locação', 'Aluguel facilitado e sem fiador burocrático na Somma Imóveis');
        break;

      case 'buscar':
        this.showView('view-catalog');
        this.updateCatalogHeader('Pesquisa Completa de Imóveis', 'Encontre o imóvel exato pelo tipo, cidade, bairro ou código de referência');
        this.searchEngine.apply();
        break;

      case 'imovel':
        if (param) {
          this.renderPropertyDetail(param);
          this.showView('view-property-detail');
        } else {
          this.navigateTo('buscar');
        }
        break;

      case 'sobre':
        this.showView('view-sobre');
        break;

      case 'seu-imovel':
        this.showView('view-seu-imovel');
        break;

      case 'financiamento':
      case 'correspondente':
      case 'calculadora':
        this.showView('view-calculadora');
        break;

      case 'contato':
        this.showView('view-contato');
        break;

      case 'favoritos':
        this.showView('view-catalog');
        this.renderFavoritesCatalog();
        break;

      default:
        this.showView('view-home');
        break;
    }
  }

  showView(viewId) {
    const el = document.getElementById(viewId);
    if (el) {
      el.classList.add('active');
    }
  }

  updateCatalogHeader(title, desc) {
    const t = document.getElementById('catalog-title');
    const d = document.getElementById('catalog-desc');
    if (t) t.innerText = title;
    if (d) d.innerText = desc;
  }

  /* ================= FAVORITES ================= */
  loadFavorites() {
    try {
      return JSON.parse(localStorage.getItem('somma_favs') || '[]');
    } catch (e) {
      return [];
    }
  }

  saveFavorites() {
    localStorage.setItem('somma_favs', JSON.stringify(this.favorites));
    this.updateFavoritesCount();
  }

  toggleFavorite(propertyId) {
    const idStr = String(propertyId);
    const index = this.favorites.indexOf(idStr);
    if (index >= 0) {
      this.favorites.splice(index, 1);
      this.showToast('Imóvel removido dos favoritos');
    } else {
      this.favorites.push(idStr);
      this.showToast('Imóvel adicionado aos favoritos!');
    }
    this.saveFavorites();

    // Re-render favorite buttons in active cards
    document.querySelectorAll(`.property-card[data-id="${idStr}"] .btn-card-favorite`).forEach(btn => {
      btn.classList.toggle('favorited');
    });

    if (this.currentRoute === 'favoritos') {
      this.renderFavoritesCatalog();
    }
  }

  getFavorites() {
    return this.favorites;
  }

  updateFavoritesCount() {
    const count = this.favorites.length;
    document.querySelectorAll('.favorites-count').forEach(el => {
      el.innerText = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  renderFavoritesCatalog() {
    this.updateCatalogHeader('Meus Imóveis Favoritos', 'Consulte os imóveis que você salvou para comparar ou agendar visita');
    const favProps = PROPERTIES_DATA.filter(p => this.favorites.includes(p.id));
    const container = document.getElementById('catalog-properties-grid');
    const countEl = document.getElementById('search-results-count');

    if (countEl) {
      countEl.innerText = `${favProps.length} ${favProps.length === 1 ? 'imóvel salvo' : 'imóveis salvos'}`;
    }

    if (favProps.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #FFFFFF; border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
          <div style="font-size: 3rem; margin-bottom: 16px;">❤️</div>
          <h3 style="font-size: 1.5rem; color: var(--secondary); margin-bottom: 8px;">Nenhum imóvel favoritado ainda</h3>
          <p style="color: var(--text-muted); max-width: 480px; margin: 0 auto 24px;">Clique no ícone de coração nos cards de imóveis para salvá-los e acessá-los facilmente aqui.</p>
          <button class="btn btn-primary" onclick="window.sommaApp.navigateTo('buscar');">Explorar Imóveis</button>
        </div>
      `;
      return;
    }

    this.searchEngine.renderCards(container, favProps);
  }

  /* ================= HOME PAGE ================= */
  renderHomeFeatured() {
    const container = document.getElementById('home-featured-grid');
    if (!container) return;
    const featured = getFeaturedProperties();
    this.searchEngine.renderCards(container, featured.slice(0, 6));
  }

  /* ================= PROPERTY DETAIL VIEW ================= */
  renderPropertyDetail(propertyId) {
    const property = getPropertyById(propertyId);
    if (!property) {
      this.showToast('Imóvel não encontrado', 'error');
      this.navigateTo('buscar');
      return;
    }

    this.activeProperty = property;
    const isFav = this.favorites.includes(property.id);

    // Update document title for SEO
    document.title = `${property.title} (#${property.code}) | Somma Imóveis`;

    // Breadcrumb
    const breadcrumbTitle = document.getElementById('detail-breadcrumb-title');
    if (breadcrumbTitle) breadcrumbTitle.innerText = property.title;

    // Header info
    document.getElementById('detail-prop-title').innerText = property.title;
    document.getElementById('detail-prop-code').innerText = `#${property.code}`;
    document.getElementById('detail-prop-address').innerText = property.address;
    document.getElementById('detail-prop-price').innerHTML = formatCurrency(property.price) + (property.purpose === 'locacao' ? '<span style="font-size: 1rem; font-weight: normal; color: var(--text-muted);"> /mês</span>' : '');
    document.getElementById('detail-prop-purpose').innerText = property.purpose === 'venda' ? 'Venda' : 'Locação';

    // Tags
    const tagsContainer = document.getElementById('detail-tags-wrap');
    if (tagsContainer) {
      tagsContainer.innerHTML = `
        <span class="badge badge-primary">${property.purpose === 'venda' ? 'Venda' : 'Locação'}</span>
        ${property.tags.map(t => `<span class="badge badge-dark">${t}</span>`).join('')}
      `;
    }

    // Favorite Button in Detail
    const favBtn = document.getElementById('detail-fav-btn');
    if (favBtn) {
      favBtn.className = `btn btn-outline ${isFav ? 'btn-danger' : ''}`;
      favBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? '#EF4444' : 'none'}" stroke="${isFav ? '#EF4444' : 'currentColor'}" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        ${isFav ? 'Salvo nos Favoritos' : 'Salvar Imóvel'}
      `;
      favBtn.onclick = () => {
        this.toggleFavorite(property.id);
        this.renderPropertyDetail(property.id);
      };
    }

    // Gallery
    const mainImg = document.getElementById('detail-main-img');
    const subGrid = document.getElementById('detail-sub-grid');
    if (mainImg) {
      mainImg.src = property.images[0];
      mainImg.onclick = () => this.openLightbox(property.images[0]);
    }
    if (subGrid) {
      subGrid.innerHTML = property.images.slice(1, 3).map((img, i) => `
        <div class="gallery-sub-item" onclick="window.sommaApp.openLightbox('${img}')">
          <img src="${img}" alt="${property.title} - Foto ${i+2}">
        </div>
      `).join('');
    }

    // Specifications
    document.getElementById('detail-spec-area').innerText = `${property.area} m²`;
    document.getElementById('detail-spec-bedrooms').innerText = property.bedrooms;
    document.getElementById('detail-spec-suites').innerText = property.suites;
    document.getElementById('detail-spec-bathrooms').innerText = property.bathrooms;
    document.getElementById('detail-spec-parking').innerText = property.parkingSpots;
    document.getElementById('detail-spec-condo').innerText = property.condoFee ? formatCurrency(property.condoFee) : 'Isento';
    document.getElementById('detail-spec-iptu').innerText = property.iptu ? formatCurrency(property.iptu) : 'Isento';

    // Description & Features
    document.getElementById('detail-description').innerText = property.description;
    const featContainer = document.getElementById('detail-features-grid');
    if (featContainer) {
      featContainer.innerHTML = property.features.map(f => `
        <div class="feature-chip-item">
          <div class="feature-chip-check">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span>${f}</span>
        </div>
      `).join('');
    }

    // Inline Financing Teaser
    const teaserBox = document.getElementById('detail-financing-teaser');
    if (teaserBox) {
      if (property.purpose === 'venda') {
        const estCalc = this.calculator.calculate({
          propertyValue: property.price,
          downPayment: property.price * 0.2,
          termYears: 30,
          annualRate: 9.99,
          system: 'sac'
        });
        document.getElementById('detail-calc-installment').innerText = `a partir de ${formatCurrency(estCalc.firstInstallment)}/mês`;
        teaserBox.style.display = 'flex';
      } else {
        teaserBox.style.display = 'none';
      }
    }

    // WhatsApp Direct Button with pre-filled text
    const waBtn = document.getElementById('detail-whatsapp-btn');
    if (waBtn) {
      waBtn.href = this.getWhatsAppPropertyLink(property);
    }

    // Pre-fill sidebar contact form message
    const msgArea = document.getElementById('sidebar-form-msg');
    if (msgArea) {
      msgArea.value = `Olá! Gostaria de receber mais informações e agendar uma visita para o imóvel ${property.title} (Código #${property.code}).`;
    }

    // Render Similar Properties
    const similarContainer = document.getElementById('detail-similar-grid');
    if (similarContainer) {
      const similars = PROPERTIES_DATA
        .filter(p => p.id !== property.id && (p.city === property.city || p.purpose === property.purpose))
        .slice(0, 3);
      this.searchEngine.renderCards(similarContainer, similars);
    }
  }

  getWhatsAppPropertyLink(property) {
    const text = `Olá, Somma Imóveis! Vi no novo site o imóvel *${property.title}* (Código: *#${property.code}*) no valor de *${formatCurrency(property.price)}* localizado em *${property.neighborhood}, ${property.city}* e gostaria de agendar uma visita ou tirar dúvidas!`;
    return `https://api.whatsapp.com/send?phone=${SOMMA_INFO.whatsappNumber}&text=${encodeURIComponent(text)}`;
  }

  /* ================= SEARCH FILTERS UI ================= */
  initSearchFiltersUI() {
    // Tab switching (Comprar, Alugar, Código)
    document.querySelectorAll('.search-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.search-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const purpose = btn.dataset.purpose;
        this.searchEngine.currentFilters.purpose = purpose;
      });
    });

    // Handle Hero Search form submit
    const heroForm = document.getElementById('hero-search-form');
    if (heroForm) {
      heroForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const type = document.getElementById('hero-filter-type').value;
        const city = document.getElementById('hero-filter-city').value;
        const maxPrice = document.getElementById('hero-filter-maxprice').value;
        const code = document.getElementById('hero-filter-code').value;

        if (type) this.searchEngine.currentFilters.type = type;
        if (city) this.searchEngine.currentFilters.city = city;
        if (maxPrice) this.searchEngine.currentFilters.maxPrice = Number(maxPrice);
        if (code) this.searchEngine.currentFilters.searchCode = code;

        this.navigateTo('buscar');
      });
    }

    // Handle Catalog Filter inputs
    const catalogInputs = [
      { id: 'catalog-filter-purpose', key: 'purpose' },
      { id: 'catalog-filter-type', key: 'type' },
      { id: 'catalog-filter-city', key: 'city' },
      { id: 'catalog-filter-bedrooms', key: 'bedrooms' },
      { id: 'catalog-filter-bathrooms', key: 'bathrooms' },
      { id: 'catalog-filter-parking', key: 'parkingSpots' },
      { id: 'catalog-filter-sort', key: 'sortBy' }
    ];

    catalogInputs.forEach(({ id, key }) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('change', (e) => {
          this.searchEngine.setFilter(key, e.target.value);
        });
      }
    });

    // Real-time Text Search input
    const searchCodeInput = document.getElementById('catalog-search-code');
    if (searchCodeInput) {
      searchCodeInput.addEventListener('input', (e) => {
        this.searchEngine.setFilter('searchCode', e.target.value);
      });
    }
  }

  /* ================= CALCULATOR UI ================= */
  initCalculatorUI() {
    const valInput = document.getElementById('calc-slider-val');
    const downInput = document.getElementById('calc-slider-down');
    const yearsInput = document.getElementById('calc-slider-years');
    const rateInput = document.getElementById('calc-slider-rate');

    if (!valInput || !downInput || !yearsInput) return;

    const runCalc = () => {
      const propVal = Number(valInput.value);
      const downPercent = Number(downInput.value);
      const downVal = (propVal * downPercent) / 100;
      const years = Number(yearsInput.value);
      const rate = Number(rateInput ? rateInput.value : 9.99);
      const activeSystem = document.querySelector('.system-btn.active')?.dataset.system || 'sac';

      // Update Labels
      document.getElementById('calc-display-val').innerText = formatCurrency(propVal);
      document.getElementById('calc-display-down').innerText = `${formatCurrency(downVal)} (${downPercent}%)`;
      document.getElementById('calc-display-years').innerText = `${years} anos (${years * 12} meses)`;
      if (document.getElementById('calc-display-rate')) {
        document.getElementById('calc-display-rate').innerText = `${rate.toFixed(2)}% a.a.`;
      }

      const res = this.calculator.calculate({
        propertyValue: propVal,
        downPayment: downVal,
        termYears: years,
        annualRate: rate,
        system: activeSystem
      });

      // Update results
      document.getElementById('res-first-installment').innerText = formatCurrency(res.firstInstallment);
      document.getElementById('res-last-installment').innerText = formatCurrency(res.lastInstallment);
      document.getElementById('res-loan-amount').innerText = formatCurrency(res.loanAmount);
      document.getElementById('res-total-interest').innerText = formatCurrency(res.totalInterest);
      document.getElementById('res-total-paid').innerText = formatCurrency(res.totalPaid);

      // Render Schedule Table
      const schedBody = document.getElementById('calc-schedule-tbody');
      if (schedBody && res.schedulePreview) {
        schedBody.innerHTML = res.schedulePreview.map(item => `
          <tr>
            <td>Mês ${item.month} (Ano ${item.year})</td>
            <td><strong>${formatCurrency(item.installment)}</strong></td>
            <td>${formatCurrency(item.amortization)}</td>
            <td>${formatCurrency(item.interest)}</td>
            <td>${formatCurrency(item.balance)}</td>
          </tr>
        `).join('');
      }

      // WhatsApp Quote Link
      const waBtn = document.getElementById('calc-whatsapp-quote-btn');
      if (waBtn) {
        const leadName = document.getElementById('calc-lead-name')?.value || '';
        const leadPhone = document.getElementById('calc-lead-phone')?.value || '';
        const waMsg = this.calculator.generateWhatsAppMessage({
          propertyTitle: this.activeProperty ? this.activeProperty.title : 'Simulação de Financiamento',
          propertyCode: this.activeProperty ? this.activeProperty.code : '',
          propertyValue: propVal,
          downPayment: downVal,
          result: res,
          leadName,
          leadPhone
        });
        waBtn.href = `https://api.whatsapp.com/send?phone=${SOMMA_INFO.whatsappNumber}&text=${waMsg}`;
      }
    };

    valInput.addEventListener('input', runCalc);
    downInput.addEventListener('input', runCalc);
    yearsInput.addEventListener('input', runCalc);
    if (rateInput) rateInput.addEventListener('input', runCalc);

    // SAC vs Price toggles
    document.querySelectorAll('.system-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.system-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        runCalc();
      });
    });

    // Run initial calculation
    runCalc();
  }

  /* ================= UI HELPERS & MODALS ================= */
  handleScroll() {
    const header = document.querySelector('.main-header');
    if (header) {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }

  toggleMobileDrawer() {
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('mobile-drawer-overlay');
    if (drawer && overlay) {
      const isOpen = drawer.classList.contains('open');
      if (isOpen) {
        this.closeMobileDrawer();
      } else {
        drawer.classList.add('open');
        overlay.classList.add('open');
      }
    }
  }

  closeMobileDrawer() {
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('mobile-drawer-overlay');
    if (drawer && overlay) {
      drawer.classList.remove('open');
      overlay.classList.remove('open');
    }
  }

  openLightbox(imgSrc) {
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    if (modal && img) {
      img.src = imgSrc;
      modal.classList.add('open');
    }
  }

  closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) modal.classList.remove('open');
  }

  showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span style="color: ${type === 'success' ? '#10B981' : '#EF4444'};">●</span>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  handleFormSubmit(event, formType) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const name = data.get('nome') || data.get('name') || 'Cliente';

    // Show confirmation
    if (formType === 'contato') {
      this.showToast(`Obrigado, ${name}! Sua mensagem foi enviada à equipe da Somma Imóveis.`);
    } else if (formType === 'seu-imovel') {
      this.showToast(`Excelente, ${name}! Seu imóvel foi cadastrado para avaliação de nossa equipe.`);
    } else if (formType === 'proposta') {
      this.showToast(`Perfeito, ${name}! Nossa equipe entrará em contato via WhatsApp para confirmar a visita.`);
    }

    form.reset();
  }
}

// Global bootstrap
document.addEventListener('DOMContentLoaded', () => {
  window.sommaApp = new SommaApp();
});
