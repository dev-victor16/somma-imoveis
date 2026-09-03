/**
 * Módulo de Busca e Filtros Reativos - Somma Imóveis 2026
 * Gerencia filtros multifacetados, ordenação, renderização de cards e histórico
 */

class SommaSearchEngine {
  constructor() {
    this.currentFilters = {
      purpose: "todos",
      type: "todos",
      city: "todas",
      neighborhood: "todos",
      minPrice: null,
      maxPrice: null,
      bedrooms: "todos",
      bathrooms: "todos",
      parkingSpots: "todos",
      searchCode: "",
      sortBy: "featured" // "featured" | "price_asc" | "price_desc" | "area_desc"
    };
  }

  setFilter(key, value) {
    this.currentFilters[key] = value;
    this.apply();
  }

  resetFilters() {
    this.currentFilters = {
      purpose: "todos",
      type: "todos",
      city: "todas",
      neighborhood: "todos",
      minPrice: null,
      maxPrice: null,
      bedrooms: "todos",
      bathrooms: "todos",
      parkingSpots: "todos",
      searchCode: "",
      sortBy: "featured"
    };
    this.apply();
  }

  getResults() {
    let list = filterProperties(this.currentFilters);

    // Apply Sorting
    switch (this.currentFilters.sortBy) {
      case "price_asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "area_desc":
        list.sort((a, b) => b.area - a.area);
        break;
      default: // featured
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return list;
  }

  renderCards(containerElement, propertiesList, isCompact = false) {
    if (!containerElement) return;

    if (propertiesList.length === 0) {
      containerElement.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #FFFFFF; border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
          <div style="font-size: 3rem; margin-bottom: 16px;">🔍</div>
          <h3 style="font-size: 1.5rem; color: var(--secondary); margin-bottom: 8px;">Nenhum imóvel encontrado</h3>
          <p style="color: var(--text-muted); max-width: 480px; margin: 0 auto 24px;">Não encontramos nenhum imóvel com os critérios selecionados. Tente ajustar os filtros ou limpar a pesquisa.</p>
          <button class="btn btn-primary" onclick="window.sommaApp.searchEngine.resetFilters();">Limpar todos os filtros</button>
        </div>
      `;
      return;
    }

    const favorites = window.sommaApp ? window.sommaApp.getFavorites() : [];

    containerElement.innerHTML = propertiesList.map(p => {
      const isFav = favorites.includes(p.id);
      const purposeBadge = p.purpose === "venda" ? "Venda" : "Locação";
      const mainTag = p.tags && p.tags.length > 0 ? p.tags[0] : "";
      const priceFormatted = formatCurrency(p.price) + (p.purpose === "locacao" ? '<span style="font-size: 0.85rem; font-weight: normal; color: var(--text-muted);">/mês</span>' : '');

      return `
        <article class="property-card" data-id="${p.id}" id="property-${p.id}">
          <div class="card-media-wrap">
            <img src="${p.images[0]}" alt="${p.title}" class="card-img" loading="lazy">
            <div class="card-top-badges">
              <div class="card-tags">
                <span class="badge badge-primary">${purposeBadge}</span>
                ${mainTag ? `<span class="badge badge-dark">${mainTag}</span>` : ''}
              </div>
              <button class="btn-card-favorite ${isFav ? 'favorited' : ''}" onclick="event.stopPropagation(); window.sommaApp.toggleFavorite('${p.id}');" title="Adicionar aos favoritos">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>
            <span class="card-code-pill">#${p.code}</span>
          </div>

          <div class="card-content">
            <div class="card-price-row">
              <div class="card-price">${priceFormatted}</div>
              <span class="card-price-purpose">${p.type}</span>
            </div>

            <h3 class="card-title" title="${p.title}">
              <a href="#imovel/${p.id}" onclick="window.sommaApp.navigateTo('imovel/${p.id}'); return false;">${p.title}</a>
            </h3>

            <div class="card-location">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>${p.neighborhood}, ${p.city}</span>
            </div>

            <div class="card-specs-grid">
              <div class="spec-item" title="${p.bedrooms} Dormitórios">
                <div class="spec-icon-wrap">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"></path>
                  </svg>
                </div>
                <span class="spec-val">${p.bedrooms}</span>
                <span class="spec-label">Quartos</span>
              </div>

              <div class="spec-item" title="${p.bathrooms} Banheiros">
                <div class="spec-icon-wrap">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 6h6a2 2 0 0 1 2 2v10H7V8a2 2 0 0 1 2-2zM7 10h10"></path>
                  </svg>
                </div>
                <span class="spec-val">${p.bathrooms}</span>
                <span class="spec-label">Banh</span>
              </div>

              <div class="spec-item" title="${p.parkingSpots} Vagas">
                <div class="spec-icon-wrap">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                    <path d="M2 10h20M7 15h.01M17 15h.01"></path>
                  </svg>
                </div>
                <span class="spec-val">${p.parkingSpots}</span>
                <span class="spec-label">Vagas</span>
              </div>

              <div class="spec-item" title="${p.area} m² de área">
                <div class="spec-icon-wrap">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 3H3v18h18V3zM3 9h18M9 21V9"></path>
                  </svg>
                </div>
                <span class="spec-val">${p.area}m²</span>
                <span class="spec-label">Área</span>
              </div>
            </div>

            <div class="card-actions">
              <a href="#imovel/${p.id}" onclick="window.sommaApp.navigateTo('imovel/${p.id}'); return false;" class="btn btn-outline btn-sm">
                Ver Detalhes
              </a>
              <a href="${window.sommaApp.getWhatsAppPropertyLink(p)}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm">
                WhatsApp
              </a>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  apply() {
    if (typeof document === 'undefined') return;
    const list = this.getResults();
    const container = document.getElementById("catalog-properties-grid");
    const countEl = document.getElementById("search-results-count");
    
    if (countEl) {
      countEl.innerText = `${list.length} ${list.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}`;
    }

    if (container) {
      this.renderCards(container, list);
    }
  }
}

window.SommaSearchEngine = SommaSearchEngine;
