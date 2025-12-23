// Main JavaScript for interactions and animations

(function() {
  'use strict';

  // Fade-in on scroll
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });
  }

  // Smooth scroll for anchor links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Form validation
  function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
          if (!input.value.trim()) {
            isValid = false;
            input.classList.add('border-red-500');
          } else {
            input.classList.remove('border-red-500');
          }
        });

        if (isValid) {
          // In a real application, submit the form
          alert('Thank you for your submission. We will get back to you soon.');
          form.reset();
        }
      });
    });
  }

  // Mobile menu toggle
  function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        
        // Update icon
        const icon = menuToggle.querySelector('svg');
        if (mobileMenu.classList.contains('open')) {
          // Change to X icon
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
        } else {
          // Change to hamburger icon
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
        }
      });
      
      // Close menu when clicking on a link
      const menuLinks = mobileMenu.querySelectorAll('a');
      menuLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('open');
          const icon = menuToggle.querySelector('svg');
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
        });
      });
    }
  }

  // Home dropdown functionality (desktop)
  function initHomeDropdown() {
    const dropdownButton = document.getElementById('home-dropdown-button');
    const dropdownMenu = document.getElementById('home-dropdown-menu');
    const dropdownContainer = document.getElementById('home-dropdown');
    
    if (dropdownButton && dropdownMenu && dropdownContainer) {
      let isOpen = false;
      
      // Toggle dropdown on click
      dropdownButton.addEventListener('click', (e) => {
        e.stopPropagation();
        isOpen = !isOpen;
        updateDropdownState();
      });
      
      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!dropdownContainer.contains(e.target)) {
          isOpen = false;
          updateDropdownState();
        }
      });
      
      // Keyboard navigation
      dropdownButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          isOpen = !isOpen;
          updateDropdownState();
        } else if (e.key === 'Escape') {
          isOpen = false;
          updateDropdownState();
        }
      });
      
      // Update dropdown state
      function updateDropdownState() {
        if (isOpen) {
          dropdownMenu.classList.remove('opacity-0', 'invisible');
          dropdownMenu.classList.add('opacity-100', 'visible');
          dropdownButton.setAttribute('aria-expanded', 'true');
        } else {
          dropdownMenu.classList.remove('opacity-100', 'visible');
          dropdownMenu.classList.add('opacity-0', 'invisible');
          dropdownButton.setAttribute('aria-expanded', 'false');
        }
      }
      
      // Close on link click
      const dropdownLinks = dropdownMenu.querySelectorAll('a');
      dropdownLinks.forEach(link => {
        link.addEventListener('click', () => {
          isOpen = false;
          updateDropdownState();
        });
      });
    }
  }

  // Mobile home dropdown toggle
  function initMobileHomeDropdown() {
    const mobileToggle = document.querySelector('.mobile-home-dropdown-toggle');
    const mobileDropdown = document.querySelector('.mobile-home-dropdown');
    
    if (mobileToggle && mobileDropdown) {
      mobileToggle.addEventListener('click', () => {
        const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
        mobileToggle.setAttribute('aria-expanded', !isExpanded);
        mobileDropdown.classList.toggle('hidden');
        
        // Rotate arrow icon
        const arrow = mobileToggle.querySelector('svg');
        if (arrow) {
          arrow.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
        }
      });
    }
  }

  // Set active state for Home dropdown
  function setActiveHomeState() {
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop() || 'index.html';
    
    // Find all Home dropdown links
    const homeDefaultLink = document.querySelector('#home-dropdown-menu a[href="index.html"]');
    const homeAltLink = document.querySelector('#home-dropdown-menu a[href="home2.html"]');
    const homeButton = document.getElementById('home-dropdown-button');
    
    if (currentFile === 'index.html' || currentFile === '') {
      // On default home page
      if (homeDefaultLink) {
        homeDefaultLink.classList.add('text-[var(--primary)]', 'font-medium', 'bg-[var(--primary)]/5');
      }
      if (homeAltLink) {
        homeAltLink.classList.remove('text-[var(--primary)]', 'font-medium', 'bg-[var(--primary)]/5');
      }
      if (homeButton) {
        homeButton.classList.add('text-[var(--primary)]', 'font-medium');
      }
    } else if (currentFile === 'home2.html') {
      // On alternate home page
      if (homeAltLink) {
        homeAltLink.classList.add('text-[var(--primary)]', 'font-medium', 'bg-[var(--primary)]/5');
      }
      if (homeDefaultLink) {
        homeDefaultLink.classList.remove('text-[var(--primary)]', 'font-medium', 'bg-[var(--primary)]/5');
      }
      if (homeButton) {
        homeButton.classList.add('text-[var(--primary)]', 'font-medium');
      }
    }
    
    // Also update mobile menu active state
    const mobileHomeDefault = document.querySelector('.mobile-home-dropdown a[href="index.html"]');
    const mobileHomeAlt = document.querySelector('.mobile-home-dropdown a[href="home2.html"]');
    
    if (currentFile === 'index.html' || currentFile === '') {
      if (mobileHomeDefault) {
        mobileHomeDefault.classList.add('text-[var(--primary)]', 'font-medium');
      }
      if (mobileHomeAlt) {
        mobileHomeAlt.classList.remove('text-[var(--primary)]', 'font-medium');
      }
    } else if (currentFile === 'home2.html') {
      if (mobileHomeAlt) {
        mobileHomeAlt.classList.add('text-[var(--primary)]', 'font-medium');
      }
      if (mobileHomeDefault) {
        mobileHomeDefault.classList.remove('text-[var(--primary)]', 'font-medium');
      }
    }
  }

  // Initialize everything
  function init() {
    initScrollAnimations();
    initSmoothScroll();
    initFormValidation();
    initMobileMenu();
    initHomeDropdown();
    initMobileHomeDropdown();
    setActiveHomeState();
  }

  // Initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

