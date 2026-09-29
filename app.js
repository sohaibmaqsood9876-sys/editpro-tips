/**
 * EditPro Tips - Core Application & Interactive Engine
 * Brand: EditPro Tips | Edit Better. Create More.
 */

(function () {
  'use strict';

  // --- State Management ---
  const state = {
    theme: localStorage.getItem('editpro_theme') || 'dark',
    currentView: 'home',
    activePostSlug: null,
    activeCategory: null,
    searchQuery: '',
    displayedPostsCount: 6,
    allPosts: window.POSTS_DATA || []
  };

  // --- DOM Elements Cache ---
  const DOM = {
    html: document.documentElement,
    themeToggleBtn: document.getElementById('theme-toggle-btn'),
    scrollProgress: document.getElementById('scroll-progress'),
    mainContentArea: document.getElementById('main-content-area'),
    searchToggleBtn: document.getElementById('search-toggle-btn'),
    searchModalOverlay: document.getElementById('search-modal-overlay'),
    searchModalClose: document.getElementById('search-modal-close'),
    searchModalInput: document.getElementById('search-modal-input'),
    searchResultsArea: document.getElementById('search-results-area'),
    mobileMenuToggle: document.getElementById('mobile-menu-toggle'),
    mobileDrawerOverlay: document.getElementById('mobile-drawer-overlay'),
    mobileDrawer: document.getElementById('mobile-drawer'),
    mobileDrawerClose: document.getElementById('mobile-drawer-close'),
    backToTopBtn: document.getElementById('back-to-top-btn'),
    whatsappFloatingBtn: document.getElementById('whatsapp-floating-btn'),
    toastMsg: document.getElementById('toast-msg')
  };

  // --- SVG Icons Map ---
  const ICONS = {
    sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
    moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
    arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
    clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
    calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
    user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
    search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
    layers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`,
    film: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>`,
    cpu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`,
    hardDrive: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line></svg>`,
    playCircle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>`,
    downloadCloud: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 17 12 21 16 17"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"></path></svg>`
  };

  // --- Theme Management ---
  function initTheme() {
    DOM.html.setAttribute('data-theme', state.theme);
    updateThemeIcon();
  }

  function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    DOM.html.setAttribute('data-theme', state.theme);
    localStorage.setItem('editpro_theme', state.theme);
    updateThemeIcon();
  }

  function updateThemeIcon() {
    if (!DOM.themeToggleBtn) return;
    DOM.themeToggleBtn.innerHTML = state.theme === 'dark' ? ICONS.sun : ICONS.moon;
    DOM.themeToggleBtn.setAttribute('title', `Switch to ${state.theme === 'dark' ? 'Light' : 'Dark'} Mode`);
  }

  // --- Toast Notification ---
  function showToast(message, duration = 3000) {
    if (!DOM.toastMsg) return;
    DOM.toastMsg.textContent = message;
    DOM.toastMsg.classList.add('show');
    setTimeout(() => {
      DOM.toastMsg.classList.remove('show');
    }, duration);
  }

  // --- Scroll Tracking & Progress ---
  function initScrollTracking() {
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      if (DOM.scrollProgress) {
        DOM.scrollProgress.style.width = scrolled + '%';
      }

      if (DOM.backToTopBtn) {
        if (winScroll > 400) {
          DOM.backToTopBtn.classList.add('visible');
        } else {
          DOM.backToTopBtn.classList.remove('visible');
        }
      }
    }, { passive: true });

    if (DOM.backToTopBtn) {
      DOM.backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // --- WhatsApp Floating Button Init ---
  function initWhatsApp() {
    if (!DOM.whatsappFloatingBtn) return;
    const number = window.BLOG_CONFIG?.whatsappNumber || 'YOUR_WHATSAPP_NUMBER';
    const cleanNumber = number.replace(/[^0-9]/g, '');
    const defaultText = encodeURIComponent('Hello EditPro Tips! I have a question regarding video editing / tutorials.');
    DOM.whatsappFloatingBtn.href = cleanNumber 
      ? `https://wa.me/${cleanNumber}?text=${defaultText}` 
      : `https://wa.me/YOUR_WHATSAPP_NUMBER?text=${defaultText}`;
  }

  // --- Search System ---
  function initSearch() {
    if (DOM.searchToggleBtn) {
      DOM.searchToggleBtn.addEventListener('click', () => {
        openSearchModal();
      });
    }

    if (DOM.searchModalClose) {
      DOM.searchModalClose.addEventListener('click', closeSearchModal);
    }

    if (DOM.searchModalOverlay) {
      DOM.searchModalOverlay.addEventListener('click', (e) => {
        if (e.target === DOM.searchModalOverlay) closeSearchModal();
      });
    }

    if (DOM.searchModalInput) {
      DOM.searchModalInput.addEventListener('input', (e) => {
        handleSearchInput(e.target.value);
      });

      DOM.searchModalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const query = DOM.searchModalInput.value.trim();
          if (query) {
            closeSearchModal();
            navigateTo(`search?q=${encodeURIComponent(query)}`);
          }
        } else if (e.key === 'Escape') {
          closeSearchModal();
        }
      });
    }

    // Keyboard shortcut '/' or 'Ctrl+K'
    document.addEventListener('keydown', (e) => {
      if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        openSearchModal();
      }
    });
  }

  function openSearchModal() {
    if (!DOM.searchModalOverlay) return;
    DOM.searchModalOverlay.classList.add('active');
    setTimeout(() => {
      DOM.searchModalInput?.focus();
      handleSearchInput(DOM.searchModalInput?.value || '');
    }, 100);
  }

  function closeSearchModal() {
    DOM.searchModalOverlay?.classList.remove('active');
  }

  function handleSearchInput(query) {
    if (!DOM.searchResultsArea) return;
    const cleanQuery = query.toLowerCase().trim();

    if (!cleanQuery) {
      DOM.searchResultsArea.innerHTML = `
        <div style="text-align: center; padding: 24px; color: var(--text-muted); font-size: 14px;">
          Type to search After Effects plugins, Premiere Pro tutorials, and AI tools...
        </div>
      `;
      return;
    }

    const matchedPosts = state.allPosts.filter(p => 
      p.title.toLowerCase().includes(cleanQuery) || 
      p.category.toLowerCase().includes(cleanQuery) ||
      p.excerpt.toLowerCase().includes(cleanQuery) ||
      (p.labels && p.labels.some(l => l.toLowerCase().includes(cleanQuery)))
    );

    if (matchedPosts.length === 0) {
      DOM.searchResultsArea.innerHTML = `
        <div style="text-align: center; padding: 30px; color: var(--text-muted);">
          No tutorials found matching "<strong>${escapeHtml(query)}</strong>".
        </div>
      `;
      return;
    }

    DOM.searchResultsArea.innerHTML = matchedPosts.map(post => `
      <a href="#/post/${post.slug}" class="search-result-item" onclick="window.EditProApp.closeSearchModal()">
        <div class="search-result-thumb">
          <img src="${post.thumbnail}" alt="${escapeHtml(post.title)}" loading="lazy">
        </div>
        <div class="search-result-info">
          <span class="search-result-meta">${post.category} • ${post.readingTime}</span>
          <h4 class="search-result-title">${escapeHtml(post.title)}</h4>
        </div>
      </a>
    `).join('');
  }

  // --- Mobile Drawer Navigation ---
  function initMobileDrawer() {
    if (DOM.mobileMenuToggle) {
      DOM.mobileMenuToggle.addEventListener('click', () => {
        DOM.mobileDrawerOverlay?.classList.add('active');
        DOM.mobileDrawer?.classList.add('active');
      });
    }

    const closeDrawer = () => {
      DOM.mobileDrawerOverlay?.classList.remove('active');
      DOM.mobileDrawer?.classList.remove('active');
    };

    DOM.mobileDrawerClose?.addEventListener('click', closeDrawer);
    DOM.mobileDrawerOverlay?.addEventListener('click', closeDrawer);

    // Submenu accordion toggles
    document.querySelectorAll('.drawer-submenu-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const submenu = btn.nextElementSibling;
        if (submenu) {
          submenu.classList.toggle('expanded');
          btn.querySelector('.arrow')?.classList.toggle('rotated');
        }
      });
    });
  }

  // --- Router & View Rendering ---
  function initRouter() {
    window.addEventListener('hashchange', handleHashRoute);
    handleHashRoute();
  }

  function handleHashRoute() {
    const rawHash = window.location.hash.slice(1);
    const hash = rawHash.startsWith('/') ? rawHash.slice(1) : rawHash;

    if (!hash || hash === 'home') {
      renderHomeView();
    } else if (hash.startsWith('post/')) {
      const slug = hash.replace('post/', '');
      renderArticleView(slug);
    } else if (hash.startsWith('category/')) {
      const cat = decodeURIComponent(hash.replace('category/', ''));
      renderCategoryView(cat);
    } else if (hash.startsWith('search')) {
      const urlParams = new URLSearchParams(hash.replace('search', ''));
      const q = urlParams.get('q') || '';
      renderSearchView(q);
    } else if (hash === 'about') {
      renderAboutView();
    } else if (hash === 'contact') {
      renderContactView();
    } else if (hash === 'privacy-policy') {
      renderPrivacyView();
    } else if (hash === 'disclaimer') {
      renderDisclaimerView();
    } else if (hash === 'terms') {
      renderTermsView();
    } else {
      renderHomeView();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateActiveNavLinks();
  }

  function navigateTo(route) {
    window.location.hash = '#/' + route;
  }

  function updateActiveNavLinks() {
    const hash = window.location.hash || '#/';
    document.querySelectorAll('.nav-link, .drawer-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href === hash || (hash.includes('category/') && href.includes(hash)))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // =========================================================================
  // VIEW RENDERERS
  // =========================================================================

  // 1. Homepage View
  function renderHomeView() {
    state.currentView = 'home';
    const featuredPost = state.allPosts.find(p => p.isFeatured) || state.allPosts[0];
    const latestPosts = state.allPosts.slice(0, state.displayedPostsCount);

    let html = `
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-grid">
            <div class="hero-content">
              <div class="hero-tag">
                <span class="tag-dot"></span>
                <span>Pro Video Editing & Creator Guides</span>
              </div>
              <h1 class="hero-title">
                Master <span>Video Editing</span>, After Effects & Creative Technology
              </h1>
              <p class="hero-description">
                Practical tutorials, editing techniques, AI tools, plugins, PC tips and resources for modern creators.
              </p>
              <div class="hero-buttons">
                <a href="#/category/Tutorial" class="btn btn-primary">
                  Explore Tutorials
                  ${ICONS.arrowRight}
                </a>
                <a href="#latest-articles-anchor" class="btn btn-secondary" onclick="document.getElementById('latest-articles-anchor')?.scrollIntoView({behavior: 'smooth'})">
                  Latest Articles
                </a>
              </div>
            </div>
            <div class="hero-visual">
              <div class="timeline-mockup">
                <div class="timeline-bar-top">
                  <div class="timeline-dots">
                    <span class="timeline-dot red"></span>
                    <span class="timeline-dot yellow"></span>
                    <span class="timeline-dot green"></span>
                  </div>
                  <div class="timeline-code">00:04:18:24 • 60 FPS • 4K UHD</div>
                </div>
                <div class="timeline-preview-area">
                  <img src="${featuredPost.thumbnail}" alt="Video Editing Timeline Workspace" loading="lazy">
                  <div class="timeline-track-overlay">
                    <div class="track-line"><div class="track-block b1"></div></div>
                    <div class="track-line"><div class="track-block b2"></div></div>
                    <div class="track-line"><div class="track-block b3"></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Article Section -->
      <section class="featured-section">
        <div class="container">
          <div class="section-header">
            <div class="section-title-wrap">
              <span class="section-label">Top Highlight</span>
              <h2 class="section-title">Featured Article</h2>
            </div>
          </div>
          <div class="featured-card">
            <div class="featured-thumbnail-wrap">
              <span class="featured-badge">Featured</span>
              <a href="#/post/${featuredPost.slug}">
                <img src="${featuredPost.thumbnail}" alt="${escapeHtml(featuredPost.title)}" loading="lazy">
              </a>
            </div>
            <div class="featured-content">
              <a href="#/category/${encodeURIComponent(featuredPost.category)}" class="article-category">
                ${escapeHtml(featuredPost.category)}
              </a>
              <h3 class="featured-title">
                <a href="#/post/${featuredPost.slug}">${escapeHtml(featuredPost.title)}</a>
              </h3>
              <p class="featured-excerpt">${escapeHtml(featuredPost.excerpt)}</p>
              <div class="article-meta">
                <span class="meta-item">
                  ${ICONS.user}
                  <span>${escapeHtml(featuredPost.author)}</span>
                </span>
                <span class="meta-dot"></span>
                <span class="meta-item">
                  ${ICONS.calendar}
                  <span>${featuredPost.publishedDate}</span>
                </span>
                <span class="meta-dot"></span>
                <span class="meta-item">
                  ${ICONS.clock}
                  <span>${featuredPost.readingTime}</span>
                </span>
              </div>
              <div>
                <a href="#/post/${featuredPost.slug}" class="btn btn-primary">
                  Read Article
                  ${ICONS.arrowRight}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Category Section (Explore Categories) -->
      <section class="categories-section">
        <div class="container">
          <div class="section-header">
            <div class="section-title-wrap">
              <span class="section-label">Browse By Topic</span>
              <h2 class="section-title">Explore Categories</h2>
            </div>
          </div>
          <div class="category-grid">
            ${renderCategoryCardsHTML()}
          </div>
        </div>
      </section>

      <!-- Main Layout: Latest Articles + Desktop Sidebar -->
      <section class="content-layout" id="latest-articles-anchor">
        <div class="container">
          <div class="layout-grid">
            <div class="main-articles-column">
              <div class="section-header">
                <div class="section-title-wrap">
                  <span class="section-label">Fresh Updates</span>
                  <h2 class="section-title">Latest Articles</h2>
                </div>
              </div>
              <div class="articles-grid">
                ${latestPosts.map(post => renderArticleCardHTML(post)).join('')}
              </div>

              <!-- Load More Button -->
              <div class="load-more-wrap">
                <button class="btn-load-more" id="load-more-btn" onclick="window.EditProApp.handleLoadMore()">
                  Load More Articles
                  ${ICONS.arrowRight}
                </button>
              </div>
            </div>

            <!-- Sidebar -->
            <aside class="sidebar">
              ${renderSidebarHTML()}
            </aside>
          </div>
        </div>
      </section>

      <!-- Trending Articles (Numbered 01 to 05) -->
      <section class="trending-section">
        <div class="container">
          <div class="section-header">
            <div class="section-title-wrap">
              <span class="section-label">Most Read</span>
              <h2 class="section-title">Trending Posts</h2>
            </div>
          </div>
          <div class="trending-list">
            ${window.TRENDING_ARTICLES.map(item => `
              <div class="trending-item">
                <div class="trending-thumb-wrap">
                  <span class="trending-number">${item.number}</span>
                  <a href="#/post/${item.slug}">
                    <img src="${item.thumbnail}" alt="${escapeHtml(item.title)}" loading="lazy">
                  </a>
                </div>
                <div class="trending-details">
                  <span class="trending-category">${escapeHtml(item.category)}</span>
                  <h4 class="trending-title">
                    <a href="#/post/${item.slug}">${escapeHtml(item.title)}</a>
                  </h4>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;

    DOM.mainContentArea.innerHTML = html;
  }

  // 2. Single Article View
  function renderArticleView(slug) {
    state.currentView = 'article';
    state.activePostSlug = slug;
    const post = state.allPosts.find(p => p.slug === slug) || state.allPosts[0];
    const relatedPosts = state.allPosts.filter(p => p.id !== post.id).slice(0, 3);
    const postIndex = state.allPosts.findIndex(p => p.id === post.id);
    const prevPost = postIndex > 0 ? state.allPosts[postIndex - 1] : state.allPosts[state.allPosts.length - 1];
    const nextPost = postIndex < state.allPosts.length - 1 ? state.allPosts[postIndex + 1] : state.allPosts[0];
    const currentUrl = window.location.href;

    const html = `
      <div class="article-page">
        <div class="container">
          <!-- Breadcrumb -->
          <nav class="breadcrumb" aria-label="Breadcrumb">
            <a href="#/">Home</a>
            <span class="breadcrumb-separator">/</span>
            <a href="#/category/${encodeURIComponent(post.category)}">${escapeHtml(post.category)}</a>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current">${escapeHtml(post.title)}</span>
          </nav>

          <div class="layout-grid">
            <main class="article-main-column">
              <!-- Article Header -->
              <header class="article-header">
                <a href="#/category/${encodeURIComponent(post.category)}" class="article-category">
                  ${escapeHtml(post.category)}
                </a>
                <h1 class="article-title">${escapeHtml(post.title)}</h1>
                <p class="article-excerpt-lead">${escapeHtml(post.excerpt)}</p>

                <!-- Author & Meta Bar -->
                <div class="article-author-bar">
                  <div class="author-info-group">
                    <div class="author-avatar">
                      <img src="${window.BLOG_CONFIG.authorAvatar}" alt="${escapeHtml(post.author)}">
                    </div>
                    <div class="author-details">
                      <span class="author-name">${escapeHtml(post.author)}</span>
                      <span class="article-dates">Published: ${post.publishedDate} • ${post.readingTime}</span>
                    </div>
                  </div>

                  <!-- Share Buttons -->
                  <div class="share-bar">
                    <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' ' + currentUrl)}" target="_blank" rel="noopener noreferrer" class="share-btn whatsapp" title="Share on WhatsApp">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                    </a>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}" target="_blank" rel="noopener noreferrer" class="share-btn facebook" title="Share on Facebook">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}" target="_blank" rel="noopener noreferrer" class="share-btn twitter" title="Share on X">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                    <a href="https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(post.title)}" target="_blank" rel="noopener noreferrer" class="share-btn telegram" title="Share on Telegram">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                    </a>
                    <button class="share-btn copy" onclick="window.EditProApp.copyCurrentUrl()" title="Copy Link">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    </button>
                  </div>
                </div>
              </header>

              <!-- Featured Image -->
              <div class="article-featured-image">
                <img src="${post.thumbnail}" alt="${escapeHtml(post.title)}">
              </div>

              <!-- Automated Table of Contents Box -->
              <div class="toc-box" id="article-toc-box">
                <div class="toc-header">
                  <span>Table of Contents</span>
                </div>
                <ul class="toc-list" id="article-toc-list">
                  <!-- Populated dynamically via JS -->
                </ul>
              </div>

              <!-- Article Content Body -->
              <div class="article-content" id="article-body-content">
                ${post.body}
              </div>

              <!-- Post Prev/Next Navigation -->
              <div class="post-navigation">
                <a href="#/post/${prevPost.slug}" class="post-nav-card prev">
                  <span class="post-nav-label">← Previous Article</span>
                  <span class="post-nav-title">${escapeHtml(prevPost.title)}</span>
                </a>
                <a href="#/post/${nextPost.slug}" class="post-nav-card next" style="text-align: right;">
                  <span class="post-nav-label">Next Article →</span>
                  <span class="post-nav-title">${escapeHtml(nextPost.title)}</span>
                </a>
              </div>

              <!-- Related Posts Section (You May Also Like) -->
              <div class="related-posts-section">
                <div class="section-header">
                  <div class="section-title-wrap">
                    <span class="section-label">More From EditPro Tips</span>
                    <h2 class="section-title">You May Also Like</h2>
                  </div>
                </div>
                <div class="articles-grid">
                  ${relatedPosts.map(p => renderArticleCardHTML(p)).join('')}
                </div>
              </div>
            </main>

            <!-- Sidebar -->
            <aside class="sidebar">
              ${renderSidebarHTML()}
            </aside>
          </div>
        </div>
      </div>
    `;

    DOM.mainContentArea.innerHTML = html;
    generateTableOfContents();
  }

  // 3. Category Archive View
  function renderCategoryView(categoryName) {
    state.currentView = 'category';
    state.activeCategory = categoryName;

    const catObj = window.CATEGORIES_DATA.find(c => c.name.toLowerCase() === categoryName.toLowerCase() || c.slug.toLowerCase() === categoryName.toLowerCase()) || {
      name: categoryName,
      description: `Explore all tutorials, workflow tips, and articles under the ${categoryName} category.`,
      postCount: 0
    };

    const matchedPosts = state.allPosts.filter(p => 
      p.category.toLowerCase() === categoryName.toLowerCase() ||
      (p.labels && p.labels.some(l => l.toLowerCase() === categoryName.toLowerCase()))
    );

    const html = `
      <div class="content-layout">
        <div class="container">
          <!-- Breadcrumb -->
          <nav class="breadcrumb">
            <a href="#/">Home</a>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current">Category: ${escapeHtml(catObj.name)}</span>
          </nav>

          <div class="section-header" style="margin-bottom: 36px;">
            <div class="section-title-wrap">
              <span class="section-label">Category Archive</span>
              <h1 class="section-title">${escapeHtml(catObj.name)}</h1>
              <p style="color: var(--text-secondary); margin-top: 8px; max-width: 680px;">
                ${escapeHtml(catObj.description)}
              </p>
            </div>
          </div>

          <div class="layout-grid">
            <div class="main-articles-column">
              ${matchedPosts.length > 0 ? `
                <div class="articles-grid">
                  ${matchedPosts.map(p => renderArticleCardHTML(p)).join('')}
                </div>
              ` : `
                <div style="text-align: center; padding: 60px 20px; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                  <h3>No articles published under this category yet.</h3>
                  <p style="margin-top: 10px; color: var(--text-muted);">Check back soon for new tutorials!</p>
                  <a href="#/" class="btn btn-primary" style="margin-top: 20px;">Return Home</a>
                </div>
              `}
            </div>

            <!-- Sidebar -->
            <aside class="sidebar">
              ${renderSidebarHTML()}
            </aside>
          </div>
        </div>
      </div>
    `;

    DOM.mainContentArea.innerHTML = html;
  }

  // 4. Search Results View
  function renderSearchView(query) {
    state.currentView = 'search';
    state.searchQuery = query;

    const cleanQuery = query.toLowerCase().trim();
    const matchedPosts = cleanQuery 
      ? state.allPosts.filter(p => 
          p.title.toLowerCase().includes(cleanQuery) || 
          p.category.toLowerCase().includes(cleanQuery) ||
          p.excerpt.toLowerCase().includes(cleanQuery) ||
          (p.labels && p.labels.some(l => l.toLowerCase().includes(cleanQuery)))
        )
      : [];

    const html = `
      <div class="content-layout">
        <div class="container">
          <nav class="breadcrumb">
            <a href="#/">Home</a>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current">Search Results</span>
          </nav>

          <div class="section-header" style="margin-bottom: 32px;">
            <div class="section-title-wrap">
              <span class="section-label">Search Query</span>
              <h1 class="section-title">Results for: "${escapeHtml(query)}"</h1>
              <p style="color: var(--text-muted); margin-top: 6px;">Found ${matchedPosts.length} tutorial${matchedPosts.length === 1 ? '' : 's'}</p>
            </div>
          </div>

          <div class="layout-grid">
            <div class="main-articles-column">
              ${matchedPosts.length > 0 ? `
                <div class="articles-grid">
                  ${matchedPosts.map(p => renderArticleCardHTML(p)).join('')}
                </div>
              ` : `
                <div style="text-align: center; padding: 60px 20px; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                  <h3>No tutorials found matching your search.</h3>
                  <p style="margin-top: 10px; color: var(--text-muted);">Try searching for "After Effects", "Premiere", "Plugins", or "AI".</p>
                  <a href="#/" class="btn btn-primary" style="margin-top: 20px;">Explore Latest Articles</a>
                </div>
              `}
            </div>

            <!-- Sidebar -->
            <aside class="sidebar">
              ${renderSidebarHTML()}
            </aside>
          </div>
        </div>
      </div>
    `;

    DOM.mainContentArea.innerHTML = html;
  }

  // 5. About Page
  function renderAboutView() {
    state.currentView = 'about';
    const html = `
      <div class="page-container container">
        <header class="page-header">
          <h1 class="page-title">About EditPro Tips</h1>
          <p class="page-subtitle">Edit Better. Create More.</p>
        </header>
        <div class="page-body">
          <p>Welcome to <strong>EditPro Tips</strong>—a dedicated editorial publication designed specifically for video editors, motion graphics artists, VFX creators, and modern digital storytellers.</p>

          <h2>What We Do</h2>
          <p>At EditPro Tips, we bridge the gap between technical software knowledge and creative storytelling. Whether you are learning how to animate complex dimensional 3D titles in After Effects, optimizing your Premiere Pro timeline to eliminate dropped frames, or incorporating bleeding-edge generative AI tools into your daily workflow, we provide battle-tested, no-nonsense guides created for working editors.</p>

          <h2>What You Will Find Here</h2>
          <ul>
            <li><strong>Adobe After Effects Tutorials:</strong> Detailed breakdowns of animation principles, expression scripting, particle physics, tracking, and optical VFX.</li>
            <li><strong>Adobe Premiere Pro Guides:</strong> Production-grade workflows, multi-cam editing, audio mastering with Essential Sound, and cinematic Lumetri color grading.</li>
            <li><strong>Curated Plugins & Presets:</strong> Honest recommendations of free and paid tools that actually save hours on deadlines.</li>
            <li><strong>PC & Hardware Optimization:</strong> Practical setup advice, scratch disk configurations, proxy workflows, and memory tuning to get blazing performance even on budget laptops.</li>
            <li><strong>AI & Creative Technology:</strong> Clear tutorials on modern neural tools like AI speech transcription, voice isolation, and neural rotoscoping.</li>
          </ul>

          <h2>Our Mission</h2>
          <p>Our mission is simple: to empower editors of all skill levels to master their tools, eliminate technical roadblocks, and bring their creative visions to screen without friction.</p>

          <h2>Who This Website Is For</h2>
          <p>Whether you're a beginner launching your first YouTube channel, an intermediate freelance editor speeding up turnaround times, or an experienced animator seeking advanced VFX techniques—EditPro Tips is built for you.</p>

          <h2>Contact Us</h2>
          <p>Have questions, feedback, or a tutorial topic request? We would love to hear from you. Visit our <a href="#/contact">Contact Page</a> or connect with us directly on WhatsApp.</p>
        </div>
      </div>
    `;
    DOM.mainContentArea.innerHTML = html;
  }

  // 6. Contact Page
  function renderContactView() {
    state.currentView = 'contact';
    const html = `
      <div class="page-container container">
        <header class="page-header">
          <h1 class="page-title">Contact EditPro Tips</h1>
          <p class="page-subtitle">Have a question, tutorial suggestion, or collaboration request? Get in touch with us.</p>
        </header>

        <form class="contact-form" id="editpro-contact-form" onsubmit="window.EditProApp.handleContactSubmit(event)">
          <div class="form-group">
            <label class="form-label" for="contact-name">Your Name *</label>
            <input type="text" id="contact-name" class="form-input" placeholder="e.g. Alex Miller" required>
          </div>

          <div class="form-group">
            <label class="form-label" for="contact-email">Email Address *</label>
            <input type="email" id="contact-email" class="form-input" placeholder="name@example.com" required>
          </div>

          <div class="form-group">
            <label class="form-label" for="contact-subject">Subject</label>
            <input type="text" id="contact-subject" class="form-input" placeholder="e.g. Tutorial Request / Collaboration">
          </div>

          <div class="form-group">
            <label class="form-label" for="contact-message">Message *</label>
            <textarea id="contact-message" class="form-textarea" placeholder="Write your message here..." required></textarea>
          </div>

          <button type="submit" class="btn btn-primary" style="align-self: flex-start; padding: 14px 28px;">
            Send Message
            ${ICONS.arrowRight}
          </button>

          <p style="font-size: 12px; color: var(--text-muted); margin-top: 10px;">
            Notice: In your live Blogger installation, this form connects seamlessly with the native Blogger Contact Widget, Formspree, or your Google Apps Script endpoint.
          </p>
        </form>
      </div>
    `;
    DOM.mainContentArea.innerHTML = html;
  }

  // 7. Privacy Policy
  function renderPrivacyView() {
    state.currentView = 'privacy';
    const html = `
      <div class="page-container container">
        <header class="page-header">
          <h1 class="page-title">Privacy Policy</h1>
          <p class="page-subtitle">Last updated: September 2026</p>
        </header>
        <div class="page-body">
          <p>At <strong>EditPro Tips</strong> (accessible from aftereffectsae.blogspot.com), the privacy of our visitors is of paramount importance to us. This Privacy Policy document outlines the types of personal information that is received and collected by EditPro Tips and how it is used.</p>

          <h2>Log Files</h2>
          <p>Like many other Web sites, EditPro Tips makes use of log files. The information inside the log files includes internet protocol (IP) addresses, type of browser, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and number of clicks to analyze trends, administer the site, track user's movement around the site, and gather demographic information.</p>

          <h2>Cookies and Web Beacons</h2>
          <p>EditPro Tips uses cookies to store information about visitors preferences, record user-specific information on which pages the user accesses or visits, customize Web page content based on visitors browser type or other information that the visitor sends via their browser.</p>

          <h2>Google AdSense and DoubleClick DART Cookie</h2>
          <p>Google, as a third-party vendor, uses cookies to serve ads on EditPro Tips. Google's use of the DART cookie enables it to serve ads to users based on their visit to EditPro Tips and other sites on the Internet. Users may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy.</p>

          <h2>Third-Party Privacy Policies</h2>
          <p>You should consult the respective privacy policies of these third-party ad servers for more detailed information on their practices as well as for instructions about how to opt-out of certain practices. EditPro Tips's privacy policy does not apply to, and we cannot control the activities of, such other advertisers or web sites.</p>

          <h2>Consent</h2>
          <p>By using our website, you hereby consent to our privacy policy and agree to its terms.</p>
        </div>
      </div>
    `;
    DOM.mainContentArea.innerHTML = html;
  }

  // 8. Disclaimer
  function renderDisclaimerView() {
    state.currentView = 'disclaimer';
    const html = `
      <div class="page-container container">
        <header class="page-header">
          <h1 class="page-title">Disclaimer</h1>
          <p class="page-subtitle">Important Information Regarding Tutorials & Software</p>
        </header>
        <div class="page-body">
          <p>The information provided on <strong>EditPro Tips</strong> is for educational and informational purposes only.</p>

          <h2>Software & Tutorial Responsibility</h2>
          <p>While every effort is made to ensure that technical tutorials, software configurations, and workflow tips are accurate and tested, computer hardware and software environments vary significantly. EditPro Tips is not responsible for any project loss, file corruption, software crashes, or hardware issues resulting from the implementation of techniques described on this site. Always back up your project files before installing third-party plugins or modifying system registry settings.</p>

          <h2>Trademarks & Copyrights</h2>
          <p>Adobe, Adobe After Effects, and Adobe Premiere Pro are either registered trademarks or trademarks of Adobe Inc. in the United States and/or other countries. EditPro Tips is an independent educational publication and is not affiliated with, endorsed by, or sponsored by Adobe Inc., Boris FX, Maxon, Video Copilot, or any other software developer mentioned.</p>

          <h2>External Links</h2>
          <p>EditPro Tips contains links to external websites that are not provided or maintained by or in any way affiliated with EditPro Tips. Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.</p>
        </div>
      </div>
    `;
    DOM.mainContentArea.innerHTML = html;
  }

  // 9. Terms & Conditions
  function renderTermsView() {
    state.currentView = 'terms';
    const html = `
      <div class="page-container container">
        <header class="page-header">
          <h1 class="page-title">Terms & Conditions</h1>
          <p class="page-subtitle">Rules & Guidelines for Website Usage</p>
        </header>
        <div class="page-body">
          <p>Welcome to <strong>EditPro Tips</strong>. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use.</p>

          <h2>Website Usage</h2>
          <p>The content of the pages of this website is for your general information and use only. It is subject to change without notice.</p>

          <h2>Intellectual Property</h2>
          <p>This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</p>

          <h2>User Responsibilities</h2>
          <p>You agree not to use the website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website; or in any way which is unlawful, illegal, fraudulent or harmful.</p>
        </div>
      </div>
    `;
    DOM.mainContentArea.innerHTML = html;
  }

  // =========================================================================
  // HELPER HTML GENERATORS
  // =========================================================================

  function renderCategoryCardsHTML() {
    return window.CATEGORIES_DATA.map(cat => {
      const iconSvg = ICONS[cat.icon] || ICONS.layers;
      return `
        <a href="#/category/${encodeURIComponent(cat.slug)}" class="category-card">
          <div class="category-card-top">
            <div class="category-icon-box" style="color: ${cat.badgeColor};">
              ${iconSvg}
            </div>
            <span class="category-count">${cat.postCount} Tutorials</span>
          </div>
          <h3 class="category-card-name">
            <span>${escapeHtml(cat.name)}</span>
            ${ICONS.arrowRight}
          </h3>
          <p class="category-card-desc">${escapeHtml(cat.description)}</p>
        </a>
      `;
    }).join('');
  }

  function renderArticleCardHTML(post) {
    return `
      <article class="article-card">
        <div class="card-thumbnail-wrap">
          <span class="card-category-tag">${escapeHtml(post.category)}</span>
          <a href="#/post/${post.slug}">
            <img src="${post.thumbnail}" alt="${escapeHtml(post.title)}" loading="lazy">
          </a>
        </div>
        <div class="card-body">
          <h3 class="card-title">
            <a href="#/post/${post.slug}">${escapeHtml(post.title)}</a>
          </h3>
          <p class="card-excerpt">${escapeHtml(post.excerpt)}</p>
          <div class="card-footer">
            <span>${post.readingTime}</span>
            <a href="#/post/${post.slug}" class="read-more-link">
              Read More
              ${ICONS.arrowRight}
            </a>
          </div>
        </div>
      </article>
    `;
  }

  function renderSidebarHTML() {
    const popularPosts = state.allPosts.slice(0, 4);

    return `
      <!-- Sidebar Search -->
      <div class="widget">
        <h3 class="widget-title">Search Tutorials</h3>
        <form class="search-widget-form" onsubmit="window.EditProApp.handleSidebarSearch(event)">
          <input type="text" class="search-widget-input" id="sidebar-search-input" placeholder="Search plugins, AE, AI..." required>
          <button type="submit" class="search-widget-btn" aria-label="Search">
            ${ICONS.search}
          </button>
        </form>
      </div>

      <!-- Categories Widget -->
      <div class="widget">
        <h3 class="widget-title">Categories</h3>
        <div class="sidebar-category-list">
          ${window.CATEGORIES_DATA.map(cat => `
            <a href="#/category/${encodeURIComponent(cat.slug)}" class="sidebar-category-item">
              <span>${escapeHtml(cat.name)}</span>
              <span class="count">${cat.postCount}</span>
            </a>
          `).join('')}
        </div>
      </div>

      <!-- Popular Posts Widget -->
      <div class="widget">
        <h3 class="widget-title">Popular Posts</h3>
        <div class="popular-posts-list">
          ${popularPosts.map(p => `
            <div class="popular-post-item">
              <div class="popular-post-thumb">
                <a href="#/post/${p.slug}">
                  <img src="${p.thumbnail}" alt="${escapeHtml(p.title)}" loading="lazy">
                </a>
              </div>
              <div class="popular-post-info">
                <h4 class="popular-post-title">
                  <a href="#/post/${p.slug}">${escapeHtml(p.title)}</a>
                </h4>
                <span class="popular-post-date">${p.publishedDate}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Follow Us Widget -->
      <div class="widget">
        <h3 class="widget-title">Follow EditPro Tips</h3>
        <div class="social-icons-grid">
          <a href="https://youtube.com/@editprotips" target="_blank" rel="noopener noreferrer" class="social-btn">YouTube</a>
          <a href="https://facebook.com/editprotips" target="_blank" rel="noopener noreferrer" class="social-btn">Facebook</a>
          <a href="https://twitter.com/editprotips" target="_blank" rel="noopener noreferrer" class="social-btn">X/Twitter</a>
          <a href="https://instagram.com/editprotips" target="_blank" rel="noopener noreferrer" class="social-btn">Instagram</a>
          <a href="https://t.me/editprotips" target="_blank" rel="noopener noreferrer" class="social-btn">Telegram</a>
          <a href="#whatsapp" onclick="window.EditProApp.openWhatsApp()" class="social-btn">WhatsApp</a>
        </div>
      </div>

      <!-- Newsletter Widget -->
      <div class="widget newsletter-widget">
        <h3 class="widget-title">Newsletter</h3>
        <p class="newsletter-text">Get new After Effects tutorials, Premiere Pro shortcuts, and AI editing techniques sent to your inbox.</p>
        <form class="newsletter-form" onsubmit="window.EditProApp.handleNewsletterSubmit(event)">
          <input type="email" class="newsletter-input" placeholder="Enter your email address" required>
          <button type="submit" class="newsletter-btn">Subscribe Free</button>
        </form>
      </div>
    `;
  }

  // --- Dynamic Table of Contents Generation ---
  function generateTableOfContents() {
    const content = document.getElementById('article-body-content');
    const tocBox = document.getElementById('article-toc-box');
    const tocList = document.getElementById('article-toc-list');
    if (!content || !tocList || !tocBox) return;

    const headings = content.querySelectorAll('h2, h3');
    if (headings.length < 2) {
      tocBox.style.display = 'none';
      return;
    }

    let tocHTML = '';
    headings.forEach((heading, index) => {
      let id = heading.id;
      if (!id) {
        id = 'heading-' + index + '-' + heading.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        heading.id = id;
      }

      const isH3 = heading.tagName.toLowerCase() === 'h3';
      const cleanTitle = heading.textContent.replace(/^[0-9]+\.\s*/, '');

      tocHTML += `
        <li class="toc-item ${isH3 ? 'depth-h3' : 'depth-h2'}">
          <a href="#${id}" class="toc-link" onclick="window.EditProApp.scrollToHeading(event, '${id}')">
            <span>${index + 1}.</span>
            <span>${escapeHtml(cleanTitle)}</span>
          </a>
        </li>
      `;
    });

    tocList.innerHTML = tocHTML;
  }

  function scrollToHeading(e, id) {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, null, `#${id}`);
    }
  }

  // --- Utility Functions ---
  function escapeHtml(str) {
    if (!str) return '';
    return str.toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --- Global Public Handlers ---
  window.EditProApp = {
    navigateTo,
    closeSearchModal,
    scrollToHeading,
    handleLoadMore: function () {
      const btn = document.getElementById('load-more-btn');
      if (btn) {
        btn.textContent = 'Loading More Articles...';
        btn.disabled = true;
      }

      setTimeout(() => {
        state.displayedPostsCount += 3;
        showToast('All available articles loaded from Blogger!');
        if (btn) {
          btn.textContent = 'All Articles Loaded';
          btn.disabled = true;
          btn.style.opacity = '0.6';
        }
      }, 400);
    },
    handleSidebarSearch: function (e) {
      e.preventDefault();
      const input = document.getElementById('sidebar-search-input');
      if (input && input.value.trim()) {
        navigateTo(`search?q=${encodeURIComponent(input.value.trim())}`);
      }
    },
    handleContactSubmit: function (e) {
      e.preventDefault();
      showToast('Thank you! Your message has been received.');
      e.target.reset();
    },
    handleNewsletterSubmit: function (e) {
      e.preventDefault();
      showToast('Success! You are now subscribed to EditPro Tips.');
      e.target.reset();
    },
    copyCurrentUrl: function () {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(() => {
          showToast('Article link copied to clipboard!');
        }).catch(() => {
          showToast('Link copied!');
        });
      } else {
        showToast('Link copied!');
      }
    },
    openWhatsApp: function () {
      const number = window.BLOG_CONFIG?.whatsappNumber || 'YOUR_WHATSAPP_NUMBER';
      const cleanNumber = number.replace(/[^0-9]/g, '');
      const defaultText = encodeURIComponent('Hello EditPro Tips! I am interested in video editing tutorials.');
      window.open(cleanNumber ? `https://wa.me/${cleanNumber}?text=${defaultText}` : `https://wa.me/YOUR_WHATSAPP_NUMBER?text=${defaultText}`, '_blank');
    }
  };

  // --- Initialization ---
  function init() {
    initTheme();
    initScrollTracking();
    initWhatsApp();
    initSearch();
    initMobileDrawer();
    initRouter();

    if (DOM.themeToggleBtn) {
      DOM.themeToggleBtn.addEventListener('click', toggleTheme);
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
