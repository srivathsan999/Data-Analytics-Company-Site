// Theme management for light/dark mode

(function() {
  'use strict';

  const html = document.documentElement;

  // Get all theme toggle buttons (desktop and mobile)
  function getThemeToggles() {
    return document.querySelectorAll('[id="theme-toggle"], .theme-toggle');
  }

  // Get saved theme or system preference
  function getInitialTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Apply theme
  function setTheme(theme) {
    if (theme === 'dark') {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    updateToggleIcons();
    // Dispatch event for other scripts
    document.dispatchEvent(new CustomEvent('themeChanged'));
  }

  // Update toggle icons for all buttons
  function updateToggleIcons() {
    const themeToggles = getThemeToggles();
    if (themeToggles.length === 0) return;
    
    const isDark = html.classList.contains('dark');
    const sunIcon = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>';
    const moonIcon = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>';
    
    themeToggles.forEach(toggle => {
      toggle.innerHTML = isDark ? sunIcon : moonIcon;
    });
  }

  // Initialize theme
  function initTheme() {
    const theme = getInitialTheme();
    setTheme(theme);
  }

  // Toggle theme
  function toggleTheme() {
    const isDark = html.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
  }

  // Initialize on load
  function init() {
    initTheme();
    
    // Attach toggle handlers to all theme toggle buttons
    const themeToggles = getThemeToggles();
    themeToggles.forEach(toggle => {
      toggle.addEventListener('click', toggleTheme);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Watch for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
})();

