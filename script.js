/**
 * Comprehensive JavaScript File
 * Interactive Elements, Animations, and Features
 * Created: 2025-12-27
 */

// ============================================================================
// GLOBAL CONFIGURATION
// ============================================================================

const CONFIG = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 250,
  SCROLL_THRESHOLD: 50,
  API_TIMEOUT: 5000,
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Debounce function to limit function execution frequency
 */
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle function to control function execution rate
 */
const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Generate unique ID
 */
const generateId = () => `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

/**
 * Deep clone an object
 */
const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

/**
 * Safe JSON parse with error handling
 */
const safeParse = (jsonString, fallback = null) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('JSON parse error:', error);
    return fallback;
  }
};

/**
 * Format date to readable string
 */
const formatDate = (date, format = 'YYYY-MM-DD HH:MM:SS') => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('MM', minutes)
    .replace('SS', seconds);
};

/**
 * Check if element is in viewport
 */
const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Smooth scroll to element
 */
const scrollToElement = (element, offset = 0) => {
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth',
  });
};

// ============================================================================
// ANIMATION UTILITIES
// ============================================================================

/**
 * Fade in animation
 */
const fadeIn = (element, duration = CONFIG.ANIMATION_DURATION) => {
  element.style.opacity = '0';
  element.style.transition = `opacity ${duration}ms ease-in`;
  element.offsetHeight; // Trigger reflow
  element.style.opacity = '1';
};

/**
 * Fade out animation
 */
const fadeOut = (element, duration = CONFIG.ANIMATION_DURATION) => {
  element.style.opacity = '1';
  element.style.transition = `opacity ${duration}ms ease-out`;
  element.offsetHeight; // Trigger reflow
  element.style.opacity = '0';
};

/**
 * Slide in animation
 */
const slideIn = (element, direction = 'left', duration = CONFIG.ANIMATION_DURATION) => {
  const positions = {
    left: { from: '-100%', to: '0' },
    right: { from: '100%', to: '0' },
    top: { from: '-100%', to: '0' },
    bottom: { from: '100%', to: '0' },
  };

  const pos = positions[direction] || positions.left;
  element.style.transform = `translate${direction === 'left' || direction === 'right' ? 'X' : 'Y'}(${pos.from})`;
  element.style.transition = `transform ${duration}ms ease-out`;
  element.offsetHeight; // Trigger reflow
  element.style.transform = `translate${direction === 'left' || direction === 'right' ? 'X' : 'Y'}(${pos.to})`;
};

/**
 * Scale animation
 */
const scaleElement = (element, scale = 1, duration = CONFIG.ANIMATION_DURATION) => {
  element.style.transform = `scale(${scale})`;
  element.style.transition = `transform ${duration}ms ease-in-out`;
};

/**
 * Pulse animation
 */
const pulse = (element, duration = 1000, iterations = Infinity) => {
  element.style.animation = `pulse ${duration}ms ease-in-out ${iterations}`;
};

// ============================================================================
// DOM MANIPULATION
// ============================================================================

/**
 * Class for DOM element management
 */
class DOMManager {
  /**
   * Add event listener with automatic cleanup
   */
  static addEventListener(element, event, handler, options = {}) {
    if (!element) return;
    element.addEventListener(event, handler, options);
    return () => element.removeEventListener(event, handler, options);
  }

  /**
   * Delegate event handling
   */
  static delegateEvent(parentSelector, eventType, childSelector, handler) {
    const parent = document.querySelector(parentSelector);
    if (!parent) return;

    parent.addEventListener(eventType, (e) => {
      const target = e.target.closest(childSelector);
      if (target) {
        handler.call(target, e);
      }
    });
  }

  /**
   * Create and append element
   */
  static createElement(tag, attributes = {}, parent = null) {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'class') {
        element.className = value;
      } else if (key === 'style') {
        Object.assign(element.style, value);
      } else if (key.startsWith('data-')) {
        element.setAttribute(key, value);
      } else {
        element[key] = value;
      }
    });

    if (parent) {
      parent.appendChild(element);
    }
    return element;
  }

  /**
   * Remove element
   */
  static removeElement(element) {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }

  /**
   * Toggle class
   */
  static toggleClass(element, className) {
    element.classList.toggle(className);
  }

  /**
   * Add multiple classes
   */
  static addClasses(element, ...classes) {
    element.classList.add(...classes);
  }

  /**
   * Remove multiple classes
   */
  static removeClasses(element, ...classes) {
    element.classList.remove(...classes);
  }

  /**
   * Check if element has class
   */
  static hasClass(element, className) {
    return element.classList.contains(className);
  }
}

// ============================================================================
// LOCAL STORAGE MANAGEMENT
// ============================================================================

/**
 * Class for local storage operations
 */
class StorageManager {
  /**
   * Set item in local storage
   */
  static setItem(key, value) {
    try {
      const serialized = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.error('Storage error:', error);
      return false;
    }
  }

  /**
   * Get item from local storage
   */
  static getItem(key, parseJSON = true) {
    try {
      const value = localStorage.getItem(key);
      if (value === null) return null;
      return parseJSON ? safeParse(value, value) : value;
    } catch (error) {
      console.error('Storage error:', error);
      return null;
    }
  }

  /**
   * Remove item from local storage
   */
  static removeItem(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Storage error:', error);
      return false;
    }
  }

  /**
   * Clear all items from local storage
   */
  static clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Storage error:', error);
      return false;
    }
  }
}

// ============================================================================
// FORM HANDLING
// ============================================================================

/**
 * Class for form management
 */
class FormManager {
  constructor(formSelector) {
    this.form = document.querySelector(formSelector);
    this.errors = {};
    this.validators = {};
  }

  /**
   * Add field validator
   */
  addValidator(fieldName, validatorFunction) {
    this.validators[fieldName] = validatorFunction;
  }

  /**
   * Validate form
   */
  validate() {
    this.errors = {};
    const formData = new FormData(this.form);

    for (const [name, value] of formData.entries()) {
      if (this.validators[name]) {
        const error = this.validators[name](value);
        if (error) {
          this.errors[name] = error;
        }
      }
    }

    return Object.keys(this.errors).length === 0;
  }

  /**
   * Get form data as object
   */
  getFormData() {
    const formData = new FormData(this.form);
    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    return data;
  }

  /**
   * Reset form
   */
  reset() {
    this.form.reset();
    this.errors = {};
  }

  /**
   * Display errors
   */
  displayErrors() {
    // Clear previous errors
    document.querySelectorAll('.form-error').forEach((el) => {
      DOMManager.removeElement(el);
    });

    // Add new errors
    Object.entries(this.errors).forEach(([fieldName, errorMessage]) => {
      const field = this.form.querySelector(`[name="${fieldName}"]`);
      if (field) {
        const errorElement = DOMManager.createElement('div', {
          class: 'form-error',
          textContent: errorMessage,
          style: { color: 'red', fontSize: '12px', marginTop: '4px' },
        });
        field.parentNode.appendChild(errorElement);
      }
    });
  }
}

// ============================================================================
// HTTP REQUESTS
// ============================================================================

/**
 * Class for HTTP requests
 */
class HTTPClient {
  static async request(url, options = {}) {
    const {
      method = 'GET',
      headers = {},
      body = null,
      timeout = CONFIG.API_TIMEOUT,
    } = options;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : null,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Request error:', error);
      throw error;
    }
  }

  static async get(url, options = {}) {
    return this.request(url, { ...options, method: 'GET' });
  }

  static async post(url, body, options = {}) {
    return this.request(url, { ...options, method: 'POST', body });
  }

  static async put(url, body, options = {}) {
    return this.request(url, { ...options, method: 'PUT', body });
  }

  static async delete(url, options = {}) {
    return this.request(url, { ...options, method: 'DELETE' });
  }
}

// ============================================================================
// INTERACTIVE COMPONENTS
// ============================================================================

/**
 * Modal dialog component
 */
class Modal {
  constructor(options = {}) {
    this.options = {
      title: 'Modal',
      content: '',
      onConfirm: () => {},
      onCancel: () => {},
      ...options,
    };

    this.createModal();
  }

  createModal() {
    this.modal = DOMManager.createElement('div', {
      class: 'modal',
      style: {
        display: 'none',
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '1000',
        justifyContent: 'center',
        alignItems: 'center',
      },
    });

    const container = DOMManager.createElement('div', {
      class: 'modal-content',
      style: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        width: '90%',
      },
    });

    const title = DOMManager.createElement('h2', {
      textContent: this.options.title,
      style: { marginTop: '0' },
    });

    const content = DOMManager.createElement('div', {
      innerHTML: this.options.content,
      style: { marginBottom: '20px' },
    });

    const buttonContainer = DOMManager.createElement('div', {
      style: { display: 'flex', gap: '10px', justifyContent: 'flex-end' },
    });

    const confirmBtn = DOMManager.createElement('button', {
      textContent: 'Confirm',
      style: {
        padding: '8px 16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      },
    });

    const cancelBtn = DOMManager.createElement('button', {
      textContent: 'Cancel',
      style: {
        padding: '8px 16px',
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      },
    });

    confirmBtn.addEventListener('click', () => {
      this.options.onConfirm();
      this.close();
    });

    cancelBtn.addEventListener('click', () => {
      this.options.onCancel();
      this.close();
    });

    buttonContainer.appendChild(confirmBtn);
    buttonContainer.appendChild(cancelBtn);

    container.appendChild(title);
    container.appendChild(content);
    container.appendChild(buttonContainer);

    this.modal.appendChild(container);
    document.body.appendChild(this.modal);
  }

  open() {
    this.modal.style.display = 'flex';
    fadeIn(this.modal);
  }

  close() {
    fadeOut(this.modal);
    setTimeout(() => {
      this.modal.style.display = 'none';
    }, CONFIG.ANIMATION_DURATION);
  }

  destroy() {
    DOMManager.removeElement(this.modal);
  }
}

/**
 * Notification/Toast component
 */
class Toast {
  constructor(message, type = 'info', duration = 3000) {
    this.message = message;
    this.type = type;
    this.duration = duration;
    this.createToast();
  }

  createToast() {
    const colors = {
      success: '#28a745',
      error: '#dc3545',
      info: '#17a2b8',
      warning: '#ffc107',
    };

    this.toast = DOMManager.createElement('div', {
      textContent: this.message,
      style: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '15px 20px',
        backgroundColor: colors[this.type] || colors.info,
        color: this.type === 'warning' ? 'black' : 'white',
        borderRadius: '4px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: '2000',
        minWidth: '250px',
      },
    });

    document.body.appendChild(this.toast);
    fadeIn(this.toast);

    if (this.duration > 0) {
      setTimeout(() => this.close(), this.duration);
    }
  }

  close() {
    fadeOut(this.toast);
    setTimeout(() => {
      DOMManager.removeElement(this.toast);
    }, CONFIG.ANIMATION_DURATION);
  }
}

// ============================================================================
// SCROLL ANIMATIONS & LAZY LOADING
// ============================================================================

/**
 * Intersection Observer for lazy loading and scroll animations
 */
class ScrollObserver {
  constructor(options = {}) {
    this.options = {
      threshold: 0.1,
      rootMargin: '0px',
      ...options,
    };

    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: this.options.threshold,
        rootMargin: this.options.rootMargin,
      }
    );
  }

  observe(elements) {
    if (typeof elements === 'string') {
      elements = document.querySelectorAll(elements);
    }

    elements.forEach((element) => {
      this.observer.observe(element);
    });
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;

        // Lazy load images
        if (element.dataset.src && element.tagName === 'IMG') {
          element.src = element.dataset.src;
          element.removeAttribute('data-src');
        }

        // Trigger animation
        if (element.dataset.animation) {
          this.applyAnimation(element, element.dataset.animation);
        }

        // Mark as loaded
        DOMManager.addClasses(element, 'loaded');
        this.observer.unobserve(element);
      }
    });
  }

  applyAnimation(element, animationType) {
    const animations = {
      fadeIn: () => fadeIn(element),
      slideInLeft: () => slideIn(element, 'left'),
      slideInRight: () => slideIn(element, 'right'),
      slideInTop: () => slideIn(element, 'top'),
      slideInBottom: () => slideIn(element, 'bottom'),
      scaleUp: () => scaleElement(element, 1.1),
    };

    if (animations[animationType]) {
      animations[animationType]();
    }
  }

  disconnect() {
    this.observer.disconnect();
  }
}

// ============================================================================
// EVENT HANDLERS
// ============================================================================

/**
 * Initialize all interactive features
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('Application initialized');

  // Initialize scroll observer for lazy loading
  const scrollObserver = new ScrollObserver({ threshold: 0.1 });
  scrollObserver.observe('[data-animation]');
  scrollObserver.observe('img[data-src]');

  // Handle smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        scrollToElement(targetElement, 20);
      }
    });
  });

  // Add keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Esc to close modals
    if (e.key === 'Escape') {
      // Handle escape key
    }

    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      // Handle search activation
    }
  });

  // Responsive menu toggle
  const setupMenuToggle = () => {
    const menuToggle = document.querySelector('[data-toggle="menu"]');
    const menu = document.querySelector('[data-menu]');

    if (menuToggle && menu) {
      menuToggle.addEventListener('click', () => {
        DOMManager.toggleClass(menu, 'active');
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
          DOMManager.removeClasses(menu, 'active');
        }
      });
    }
  };

  setupMenuToggle();

  // Initialize tooltips
  const initializeTooltips = () => {
    document.querySelectorAll('[data-tooltip]').forEach((element) => {
      element.addEventListener('mouseenter', (e) => {
        const tooltipText = element.getAttribute('data-tooltip');
        const tooltip = DOMManager.createElement('div', {
          textContent: tooltipText,
          class: 'tooltip',
          style: {
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            zIndex: '1001',
            pointerEvents: 'none',
          },
        });

        document.body.appendChild(tooltip);

        const rect = element.getBoundingClientRect();
        tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
        tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';

        fadeIn(tooltip);

        element.addEventListener('mouseleave', () => {
          fadeOut(tooltip);
          setTimeout(() => {
            DOMManager.removeElement(tooltip);
          }, CONFIG.ANIMATION_DURATION);
        });
      });
    });
  };

  initializeTooltips();

  // Update clock
  const updateClock = () => {
    const clockElement = document.querySelector('[data-clock]');
    if (clockElement) {
      clockElement.textContent = formatDate(new Date(), 'YYYY-MM-DD HH:MM:SS');
    }
  };

  updateClock();
  setInterval(updateClock, 1000);
});

// ============================================================================
// EXPORT FOR MODULE USE
// ============================================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    debounce,
    throttle,
    generateId,
    deepClone,
    safeParse,
    formatDate,
    isInViewport,
    scrollToElement,
    fadeIn,
    fadeOut,
    slideIn,
    scaleElement,
    pulse,
    DOMManager,
    StorageManager,
    FormManager,
    HTTPClient,
    Modal,
    Toast,
    ScrollObserver,
  };
}
