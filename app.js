// Application JavaScript for OMAI Ecuador Presentation

// DOM Elements
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');

// Create mobile navigation toggle
function createMobileNavToggle() {
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'mobile-nav-toggle';
  toggleBtn.innerHTML = '☰';
  toggleBtn.setAttribute('aria-label', 'Abrir menú de navegación');
  document.body.appendChild(toggleBtn);
  
  toggleBtn.addEventListener('click', toggleSidebar);
}

// Toggle sidebar for mobile
function toggleSidebar() {
  sidebar.classList.toggle('open');
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  toggleBtn.innerHTML = sidebar.classList.contains('open') ? '✕' : '☰';
}

// Close sidebar when clicking outside (mobile)
function closeSidebarOnClickOutside(event) {
  if (window.innerWidth <= 1024) {
    if (!sidebar.contains(event.target) && !event.target.classList.contains('mobile-nav-toggle')) {
      sidebar.classList.remove('open');
      const toggleBtn = document.querySelector('.mobile-nav-toggle');
      if (toggleBtn) {
        toggleBtn.innerHTML = '☰';
      }
    }
  }
}

// Navigate to specific section
function navigateToSection(sectionId) {
  // Hide all sections
  sections.forEach(section => {
    section.classList.remove('active');
  });
  
  // Remove active class from all nav buttons
  navButtons.forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show target section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
    
    // Add active class to corresponding nav button
    const targetNavBtn = document.querySelector(`[data-section="${sectionId}"]`);
    if (targetNavBtn) {
      targetNavBtn.classList.add('active');
    }
    
    // Scroll to top of main content
    mainContent.scrollTop = 0;
    
    // Close sidebar on mobile after navigation
    if (window.innerWidth <= 1024) {
      sidebar.classList.remove('open');
      const toggleBtn = document.querySelector('.mobile-nav-toggle');
      if (toggleBtn) {
        toggleBtn.innerHTML = '☰';
      }
    }
    
    // Add animation class
    targetSection.style.animation = 'none';
    targetSection.offsetHeight; // Trigger reflow
    targetSection.style.animation = 'fadeIn 0.5s ease-in-out';
  }
}

// Initialize navigation event listeners
function initNavigation() {
  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = btn.getAttribute('data-section');
      navigateToSection(sectionId);
    });
  });
}

// Add hover effects to cards
function initCardEffects() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-2px)';
      card.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
}

// Add interactive effects to statistics
function initStatEffects() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const animateNumber = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      // Format number based on content
      if (element.textContent.includes('%')) {
        element.textContent = Math.floor(current) + '%';
      } else if (element.textContent.includes(',')) {
        element.textContent = Math.floor(current).toLocaleString();
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  };
  
  // Intersection Observer for number animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const text = element.textContent;
        let targetNumber = parseInt(text.replace(/[^\d]/g, ''));
        
        if (targetNumber && !element.dataset.animated) {
          element.dataset.animated = 'true';
          element.textContent = '0';
          animateNumber(element, targetNumber);
        }
      }
    });
  });
  
  statNumbers.forEach(stat => observer.observe(stat));
}

// Add smooth scrolling for internal links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Add keyboard navigation support
function initKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    if (e.altKey) {
      const currentActive = document.querySelector('.nav-btn.active');
      const navButtonsArray = Array.from(navButtons);
      const currentIndex = navButtonsArray.indexOf(currentActive);
      
      switch(e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % navButtonsArray.length;
          const nextSection = navButtonsArray[nextIndex].getAttribute('data-section');
          navigateToSection(nextSection);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          const prevIndex = (currentIndex - 1 + navButtonsArray.length) % navButtonsArray.length;
          const prevSection = navButtonsArray[prevIndex].getAttribute('data-section');
          navigateToSection(prevSection);
          break;
      }
    }
    
    // Escape key to close mobile sidebar
    if (e.key === 'Escape' && window.innerWidth <= 1024) {
      sidebar.classList.remove('open');
      const toggleBtn = document.querySelector('.mobile-nav-toggle');
      if (toggleBtn) {
        toggleBtn.innerHTML = '☰';
      }
    }
  });
}

// Add loading animation to images
function initImageLoading() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    if (!img.complete) {
      img.classList.add('loading');
      img.addEventListener('load', () => {
        img.classList.remove('loading');
      });
      img.addEventListener('error', () => {
        img.classList.remove('loading');
        img.style.display = 'none';
      });
    }
  });
}

// Add interactive tooltips for complex terms
function initTooltips() {
  const terms = {
    'OMAI': 'Operaciones Militares de Apoyo Institucional',
    'DDHH': 'Derechos Humanos',
    'DIH': 'Derecho Internacional Humanitario',
    'FFAA': 'Fuerzas Armadas',
    'CAMEX': 'Control de Armas, Municiones y Explosivos'
  };
  
  Object.keys(terms).forEach(term => {
    const elements = document.querySelectorAll(`*:not(script):not(style)`);
    elements.forEach(element => {
      if (element.children.length === 0 && element.textContent.includes(term)) {
        element.innerHTML = element.textContent.replace(
          new RegExp(`\\b${term}\\b`, 'g'),
          `<span class="tooltip-term" title="${terms[term]}">${term}</span>`
        );
      }
    });
  });
  
  // Add tooltip styles
  const style = document.createElement('style');
  style.textContent = `
    .tooltip-term {
      border-bottom: 1px dotted #0066CC;
      cursor: help;
      position: relative;
    }
    
    .tooltip-term:hover::after {
      content: attr(title);
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      background: var(--color-charcoal-800);
      color: white;
      padding: var(--space-8) var(--space-12);
      border-radius: var(--radius-sm);
      font-size: var(--font-size-sm);
      white-space: nowrap;
      z-index: 1000;
      box-shadow: var(--shadow-lg);
    }
  `;
  document.head.appendChild(style);
}

// Handle window resize
function handleResize() {
  if (window.innerWidth > 1024) {
    sidebar.classList.remove('open');
    const toggleBtn = document.querySelector('.mobile-nav-toggle');
    if (toggleBtn) {
      toggleBtn.innerHTML = '☰';
    }
  }
}

// Progress indicator
function initProgressIndicator() {
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  progressBar.innerHTML = '<div class="progress-fill"></div>';
  document.body.appendChild(progressBar);
  
  const style = document.createElement('style');
  style.textContent = `
    .progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: rgba(255, 215, 0, 0.2);
      z-index: 1000;
    }
    
    .progress-fill {
      height: 100%;
      background: #FFD700;
      width: 0;
      transition: width 0.3s ease;
    }
  `;
  document.head.appendChild(style);
  
  // Update progress based on current section
  const updateProgress = () => {
    const activeBtn = document.querySelector('.nav-btn.active');
    const navButtonsArray = Array.from(navButtons);
    const currentIndex = navButtonsArray.indexOf(activeBtn);
    const progress = ((currentIndex + 1) / navButtonsArray.length) * 100;
    
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
      progressFill.style.width = progress + '%';
    }
  };
  
  // Update progress on navigation
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(updateProgress, 100);
    });
  });
  
  updateProgress();
}

// Initialize application
function init() {
  // Create mobile navigation
  createMobileNavToggle();
  
  // Initialize all features
  initNavigation();
  initCardEffects();
  initStatEffects();
  initSmoothScrolling();
  initKeyboardNavigation();
  initImageLoading();
  initTooltips();
  initProgressIndicator();
  
  // Event listeners
  document.addEventListener('click', closeSidebarOnClickOutside);
  window.addEventListener('resize', handleResize);
  
  // Start with the first section active
  navigateToSection('inicio');
  
  // Add accessibility announcements
  const announceNavigation = (sectionName) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Navegado a la sección: ${sectionName}`;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };
  
  // Override navigateToSection to include announcements
  const originalNavigate = navigateToSection;
  navigateToSection = function(sectionId) {
    originalNavigate(sectionId);
    const sectionTitle = document.querySelector(`#${sectionId} h2`)?.textContent || 
                        document.querySelector(`[data-section="${sectionId}"]`)?.textContent || 
                        sectionId;
    announceNavigation(sectionTitle);
  };
}

// Make navigateToSection globally available
window.navigateToSection = navigateToSection;

// Start the application when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Add service worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Service worker would be implemented here for offline functionality
    console.log('Application loaded successfully');
  });
}

// Analytics and user interaction tracking (placeholder)
function trackInteraction(action, section) {
  // Placeholder for analytics
  console.log(`User interaction: ${action} in section: ${section}`);
}

// Add interaction tracking to navigation
navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const section = btn.getAttribute('data-section');
    trackInteraction('navigation', section);
  });
});

// Handle print functionality
window.addEventListener('beforeprint', () => {
  // Show all sections for printing
  sections.forEach(section => {
    section.style.display = 'block';
    section.style.pageBreakAfter = 'always';
  });
});

window.addEventListener('afterprint', () => {
  // Restore normal view after printing
  sections.forEach((section, index) => {
    if (index === 0) {
      section.classList.add('active');
      section.style.display = 'block';
    } else {
      section.classList.remove('active');
      section.style.display = 'none';
    }
  });
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    navigateToSection,
    toggleSidebar,
    init
  };
}