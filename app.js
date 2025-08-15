// JavaScript corregido para la Presentación Académica Naval - Armada del Ecuador

// Variables globales
let currentSection = 'caratula';
let navButtons, sections, sidebar, mainContent, mobileToggle;

// Inicialización de elementos DOM
function initDOMElements() {
  navButtons = document.querySelectorAll('.nav-btn');
  sections = document.querySelectorAll('.section');
  sidebar = document.querySelector('.sidebar');
  mainContent = document.querySelector('.main-content');
}

// Crear botón de navegación móvil
function createMobileNavToggle() {
  // Remover botón existente si ya existe
  const existingToggle = document.querySelector('.mobile-nav-toggle');
  if (existingToggle) {
    existingToggle.remove();
  }

  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'mobile-nav-toggle';
  toggleBtn.innerHTML = '☰';
  toggleBtn.setAttribute('aria-label', 'Abrir menú de navegación');
  toggleBtn.setAttribute('title', 'Menú de navegación');
  toggleBtn.style.cssText = `
    display: none;
    position: fixed;
    top: 16px;
    left: 16px;
    z-index: 200;
    background: #FFD700;
    border: none;
    border-radius: 50px;
    width: 50px;
    height: 50px;
    color: #003366;
    font-size: 18px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    align-items: center;
    justify-content: center;
  `;
  
  // Mostrar en móvil
  const mediaQuery = window.matchMedia('(max-width: 1024px)');
  if (mediaQuery.matches) {
    toggleBtn.style.display = 'flex';
  }
  
  document.body.appendChild(toggleBtn);
  
  mobileToggle = toggleBtn;
  mobileToggle.addEventListener('click', toggleSidebar);
  mobileToggle.addEventListener('touchstart', toggleSidebar, { passive: true });
  
  // Actualizar en cambio de tamaño
  mediaQuery.addListener((e) => {
    if (e.matches) {
      toggleBtn.style.display = 'flex';
    } else {
      toggleBtn.style.display = 'none';
      closeSidebar();
    }
  });
}

// Alternar sidebar en móvil
function toggleSidebar(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  
  if (!sidebar || !mobileToggle) return;
  
  const isOpen = sidebar.classList.contains('open');
  
  if (isOpen) {
    closeSidebar();
  } else {
    openSidebar();
  }
}

// Abrir sidebar
function openSidebar() {
  if (sidebar && mobileToggle) {
    sidebar.classList.add('open');
    mobileToggle.innerHTML = '✕';
    mobileToggle.setAttribute('aria-label', 'Cerrar menú de navegación');
    createOverlay();
  }
}

// Cerrar sidebar
function closeSidebar() {
  if (sidebar && mobileToggle) {
    sidebar.classList.remove('open');
    mobileToggle.innerHTML = '☰';
    mobileToggle.setAttribute('aria-label', 'Abrir menú de navegación');
    removeOverlay();
  }
}

// Crear overlay para móvil
function createOverlay() {
  let overlay = document.querySelector('.sidebar-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay active';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 99;
      display: block;
    `;
    document.body.appendChild(overlay);
  }
  overlay.classList.add('active');
  overlay.addEventListener('click', closeSidebar);
  overlay.addEventListener('touchstart', closeSidebar, { passive: true });
}

// Remover overlay
function removeOverlay() {
  const overlay = document.querySelector('.sidebar-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }, 300);
  }
}

// Función principal de navegación - CORREGIDA
function navigateToSection(sectionId) {
  console.log('Navegando a sección:', sectionId);
  
  if (!sectionId) {
    console.error('ID de sección no válido');
    return;
  }
  
  // Actualizar elementos DOM cada vez
  const allSections = document.querySelectorAll('.section');
  const allNavButtons = document.querySelectorAll('.nav-btn');
  
  // Ocultar todas las secciones
  allSections.forEach(section => {
    section.classList.remove('active');
    section.style.display = 'none';
  });
  
  // Remover clase active de todos los botones de navegación
  allNavButtons.forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Mostrar sección objetivo
  const targetSection = document.getElementById(sectionId);
  console.log('Sección objetivo:', targetSection);
  
  if (targetSection) {
    targetSection.classList.add('active');
    targetSection.style.display = 'block';
    currentSection = sectionId;
    
    // Activar botón de navegación correspondiente
    const targetNavBtn = document.querySelector(`[data-section="${sectionId}"]`);
    if (targetNavBtn) {
      targetNavBtn.classList.add('active');
    }
    
    // Scroll al inicio del contenido principal
    if (mainContent) {
      mainContent.scrollTop = 0;
    } else {
      window.scrollTo(0, 0);
    }
    
    // Cerrar sidebar en móvil después de navegación
    if (window.innerWidth <= 1024) {
      setTimeout(closeSidebar, 300);
    }
    
    // Inicializar características específicas de la sección
    setTimeout(() => {
      initSectionSpecificFeatures(sectionId);
    }, 100);
    
    // Actualizar indicador de progreso
    updateProgressIndicator();
    
    console.log('Navegación exitosa a:', sectionId);
  } else {
    console.error('Sección no encontrada:', sectionId);
  }
}

// Inicializar características específicas por sección
function initSectionSpecificFeatures(sectionId) {
  switch(sectionId) {
    case 'caratula':
      initCoverPageFeatures();
      break;
    case 'agenda':
      initAgendaFeatures();
      break;
    case 'introduccion':
      initIntroductionFeatures();
      break;
    case 'desarrollo':
      initDevelopmentFeatures();
      break;
    case 'conclusiones':
      initConclusionsFeatures();
      break;
    case 'bibliografia':
      initBibliographyFeatures();
      break;
  }
}

// Características de la carátula
function initCoverPageFeatures() {
  const institutionalHeader = document.querySelector('.institutional-header');
  const thesisTitle = document.querySelector('.thesis-title');
  const membersSection = document.querySelector('.members-section');
  
  // Animaciones de entrada
  if (institutionalHeader) {
    institutionalHeader.style.animation = 'fadeIn 1s ease-out';
  }
  
  if (thesisTitle) {
    thesisTitle.style.animation = 'fadeIn 1s ease-out 0.3s both';
  }
  
  if (membersSection) {
    membersSection.style.animation = 'fadeIn 1s ease-out 0.6s both';
  }
}

// Características de la agenda
function initAgendaFeatures() {
  const agendaItems = document.querySelectorAll('.agenda-item');
  
  agendaItems.forEach((item, index) => {
    // Añadir evento de click para navegación
    const clickHandler = () => {
      const sectionId = item.getAttribute('data-section');
      if (sectionId) {
        navigateToSection(sectionId);
      }
    };
    
    // Remover listeners existentes y añadir nuevos
    item.removeEventListener('click', clickHandler);
    item.addEventListener('click', clickHandler);
    item.addEventListener('touchstart', clickHandler, { passive: true });
    
    // Añadir eventos de teclado
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        clickHandler();
      }
    });
    
    // Hacer clickeable visualmente
    item.style.cursor = 'pointer';
  });
}

// Características de la introducción
function initIntroductionFeatures() {
  const statNumber = document.querySelector('.stat-number-intro');
  if (statNumber && !statNumber.dataset.animated) {
    animateNumber(statNumber, 85, 2000);
    statNumber.dataset.animated = 'true';
  }
}

// Características del desarrollo
function initDevelopmentFeatures() {
  // Animar estadísticas navales
  const navalStats = document.querySelectorAll('.stat-number-naval');
  navalStats.forEach(stat => {
    if (!stat.dataset.animated) {
      const text = stat.textContent.replace(/[^\d]/g, '');
      const targetNumber = parseInt(text);
      if (targetNumber) {
        animateNumber(stat, targetNumber, 2000);
        stat.dataset.animated = 'true';
      }
    }
  });
  
  // Animar porcentajes de salud mental naval
  const mentalStats = document.querySelectorAll('.stat-percentage-naval');
  mentalStats.forEach(stat => {
    if (!stat.dataset.animated) {
      const text = stat.textContent.replace(/[^\d]/g, '');
      const targetNumber = parseInt(text);
      if (targetNumber) {
        animatePercentage(stat, targetNumber, 2000);
        stat.dataset.animated = 'true';
      }
    }
  });
}

// Características de conclusiones
function initConclusionsFeatures() {
  const findingItems = document.querySelectorAll('.finding-item');
  findingItems.forEach((item, index) => {
    item.style.animation = `fadeIn 0.6s ease-out ${index * 0.2}s both`;
  });
}

// Características de bibliografía
function initBibliographyFeatures() {
  const referenceItems = document.querySelectorAll('.reference-item');
  referenceItems.forEach((item, index) => {
    item.style.animation = `fadeIn 0.4s ease-out ${index * 0.1}s both`;
    
    // Funcionalidad de click para expandir
    item.addEventListener('click', () => {
      item.classList.toggle('expanded');
    });
  });
  
  // Crear búsqueda si no existe
  createBibliographySearch();
}

// Crear búsqueda de bibliografía
function createBibliographySearch() {
  const bibliographySection = document.getElementById('bibliografia');
  if (!bibliographySection || bibliographySection.querySelector('.bibliography-search')) {
    return;
  }
  
  const searchContainer = document.createElement('div');
  searchContainer.className = 'bibliography-search card';
  searchContainer.style.marginBottom = 'var(--space-24)';
  searchContainer.innerHTML = `
    <div class="card__body">
      <h3>🔍 Buscar Referencias</h3>
      <input type="text" class="form-control" placeholder="Buscar por título, autor o año..." id="bibliography-search-input">
    </div>
  `;
  
  const sectionHeader = bibliographySection.querySelector('.section-header');
  sectionHeader.insertAdjacentElement('afterend', searchContainer);
  
  const searchInput = document.getElementById('bibliography-search-input');
  searchInput.addEventListener('input', filterBibliographyReferences);
}

// Filtrar referencias de bibliografía
function filterBibliographyReferences(event) {
  const searchTerm = event.target.value.toLowerCase();
  const referenceItems = document.querySelectorAll('.reference-item');
  
  referenceItems.forEach(item => {
    const title = item.querySelector('.reference-title')?.textContent.toLowerCase() || '';
    const author = item.querySelector('.reference-author')?.textContent.toLowerCase() || '';
    const year = item.querySelector('.reference-year')?.textContent.toLowerCase() || '';
    
    const matchesSearch = title.includes(searchTerm) || 
                         author.includes(searchTerm) || 
                         year.includes(searchTerm);
    
    item.style.display = matchesSearch ? 'block' : 'none';
  });
}

// Animar números
function animateNumber(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    
    element.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

// Animar porcentajes
function animatePercentage(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    
    element.textContent = Math.floor(current) + '%';
  }, 16);
}

// Inicializar navegación - CORREGIDA
function initNavigation() {
  console.log('Inicializando navegación...');
  
  // Usar delegación de eventos más específica
  const navMenu = document.querySelector('.nav-menu');
  if (navMenu) {
    navMenu.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const navBtn = e.target.closest('.nav-btn');
      if (navBtn) {
        const sectionId = navBtn.getAttribute('data-section');
        console.log('Click en botón nav:', sectionId);
        if (sectionId) {
          navigateToSection(sectionId);
        }
      }
    });
    
    // También manejar eventos táctiles
    navMenu.addEventListener('touchstart', (e) => {
      const navBtn = e.target.closest('.nav-btn');
      if (navBtn) {
        e.preventDefault();
        const sectionId = navBtn.getAttribute('data-section');
        if (sectionId) {
          setTimeout(() => navigateToSection(sectionId), 100);
        }
      }
    }, { passive: false });
  }
  
  // Navegación por teclado global
  document.addEventListener('keydown', handleKeyboardNavigation);
  
  console.log('Navegación inicializada');
}

// Manejar navegación por teclado - MEJORADA
function handleKeyboardNavigation(e) {
  const sections = ['caratula', 'agenda', 'introduccion', 'desarrollo', 'conclusiones', 'bibliografia'];
  const currentIndex = sections.indexOf(currentSection);
  
  switch(e.key) {
    case 'ArrowRight':
    case 'ArrowDown':
    case ' ':
    case 'PageDown':
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % sections.length;
      navigateToSection(sections[nextIndex]);
      break;
    case 'ArrowLeft':
    case 'ArrowUp':
    case 'PageUp':
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
      navigateToSection(sections[prevIndex]);
      break;
    case 'Home':
      e.preventDefault();
      navigateToSection('caratula');
      break;
    case 'End':
      e.preventDefault();
      navigateToSection('bibliografia');
      break;
    case 'Escape':
      if (window.innerWidth <= 1024) {
        closeSidebar();
      }
      break;
  }
  
  // Navegación por números
  const numKey = parseInt(e.key);
  if (numKey >= 1 && numKey <= 6) {
    e.preventDefault();
    navigateToSection(sections[numKey - 1]);
  }
}

// Manejar cambios de tamaño de ventana
function handleWindowResize() {
  if (window.innerWidth > 1024) {
    closeSidebar();
  }
}

// Inicializar indicador de progreso
function initProgressIndicator() {
  const existingProgress = document.querySelector('.progress-indicator');
  if (existingProgress) {
    existingProgress.remove();
  }

  const progressIndicator = document.createElement('div');
  progressIndicator.className = 'progress-indicator';
  progressIndicator.innerHTML = '<div class="progress-bar"></div>';
  
  progressIndicator.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: rgba(0, 51, 102, 0.2);
    z-index: 1001;
  `;
  
  const progressBar = progressIndicator.querySelector('.progress-bar');
  progressBar.style.cssText = `
    height: 100%;
    background: linear-gradient(90deg, #FFD700 0%, #003366 100%);
    width: 0;
    transition: width 0.3s ease;
  `;
  
  document.body.appendChild(progressIndicator);
  updateProgressIndicator();
}

// Actualizar indicador de progreso
function updateProgressIndicator() {
  const sections = ['caratula', 'agenda', 'introduccion', 'desarrollo', 'conclusiones', 'bibliografia'];
  const currentIndex = sections.indexOf(currentSection);
  const progress = ((currentIndex + 1) / sections.length) * 100;
  
  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) {
    progressBar.style.width = progress + '%';
  }
}

// Añadir efectos a las tarjetas
function initCardEffects() {
  const style = document.createElement('style');
  style.textContent = `
    .card:hover {
      transform: translateY(-4px) !important;
      transition: transform 0.3s ease, box-shadow 0.3s ease !important;
      box-shadow: 0 8px 25px rgba(0, 51, 102, 0.15) !important;
    }
  `;
  document.head.appendChild(style);
}

// Función de inicialización principal - CORREGIDA
function init() {
  console.log('Iniciando presentación académica naval...');
  
  // Esperar a que el DOM esté completamente cargado
  setTimeout(() => {
    // Inicializar elementos DOM
    initDOMElements();
    
    // Crear navegación móvil
    createMobileNavToggle();
    
    // Inicializar todas las características
    initNavigation();
    initCardEffects();
    initProgressIndicator();
    
    // Event listeners
    window.addEventListener('resize', handleWindowResize);
    
    // Comenzar con la carátula activa - ASEGURAR QUE FUNCIONE
    setTimeout(() => {
      console.log('Activando carátula inicial...');
      navigateToSection('caratula');
      
      // Verificar que se activó correctamente
      setTimeout(() => {
        const caratulaSection = document.getElementById('caratula');
        const caratulaBtn = document.querySelector('[data-section="caratula"]');
        
        if (caratulaSection && !caratulaSection.classList.contains('active')) {
          console.log('Forzando activación de carátula...');
          caratulaSection.classList.add('active');
          caratulaSection.style.display = 'block';
        }
        
        if (caratulaBtn && !caratulaBtn.classList.contains('active')) {
          caratulaBtn.classList.add('active');
        }
      }, 200);
    }, 100);
    
    console.log('Presentación académica naval inicializada exitosamente');
  }, 100);
}

// Hacer la función de navegación globalmente disponible
window.navigateToSection = navigateToSection;

// Navegación adicional por clicks en elementos específicos
document.addEventListener('DOMContentLoaded', () => {
  // Hacer que los elementos de agenda sean clickeables
  setTimeout(() => {
    const agendaItems = document.querySelectorAll('.agenda-item');
    agendaItems.forEach(item => {
      item.style.cursor = 'pointer';
      item.addEventListener('click', () => {
        const sectionId = item.getAttribute('data-section');
        if (sectionId) {
          navigateToSection(sectionId);
        }
      });
    });
  }, 500);
});

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Funciones de utilidad para debugging
window.debugNavigation = () => {
  console.log('Estado actual:', {
    currentSection,
    activeSection: document.querySelector('.section.active')?.id,
    activeButton: document.querySelector('.nav-btn.active')?.getAttribute('data-section'),
    allSections: Array.from(document.querySelectorAll('.section')).map(s => ({id: s.id, active: s.classList.contains('active')}))
  });
};

window.forceNavigateTo = (sectionId) => {
  console.log('Forzando navegación a:', sectionId);
  navigateToSection(sectionId);
};

console.log('Script cargado - Funciones de debug disponibles: debugNavigation(), forceNavigateTo(sectionId)');