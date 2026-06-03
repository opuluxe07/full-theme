class ThemeToggle extends HTMLElement {
  connectedCallback() {
    const button = this.querySelector('.theme-toggle-btn');
    if (!button) return;

    button.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      // Update theme attribute and classes on root
      document.documentElement.setAttribute('data-theme', newTheme);
      if (newTheme === 'dark') {
        document.documentElement.classList.add('theme-dark');
      } else {
        document.documentElement.classList.remove('theme-dark');
      }

      // Save user's preference in localStorage
      localStorage.setItem('theme', newTheme);

      // Dispatch custom event for any other elements that might want to react to theme change
      this.dispatchEvent(new CustomEvent('theme-change', {
        bubbles: true,
        detail: { theme: newTheme }
      }));
    });
  }
}

if (!customElements.get('theme-toggle')) {
  customElements.define('theme-toggle', ThemeToggle);
}
