class CAGOVThemeSwitcher extends window.HTMLElement {
  connectedCallback() {
    // write radio buttons or select menu with theme options
    // when selected the css theme file is switched out
    this.storagekey = 'theme_style';
    this.currentTheme = 'cannabis';
    let themes = ['cannabis','drought','cagov','experimental']
    if(sessionStorage.getItem(this.storagekey)) {
      this.currentTheme = sessionStorage.getItem(this.storagekey)
      this.resetTheme();
    }

    this.innerHTML = `<label for="theme_init">Theme</label> <select id="theme_init">
        ${themes.map(item => `<option value="${item}" ${item === this.currentTheme ? 'selected' : ''}>${item}</option>`).join('\n      ')}
      </select>`;

    this.querySelector('#theme_init').addEventListener('change', (event) => {
      event.preventDefault();
      this.currentTheme = event.target.value;
      this.resetTheme();
    });
  }

  resetTheme() {
    const style = document.querySelector('#theme-stylesheet');
    const newStyle = `/css/themes/${this.currentTheme}.css`;
    style.setAttribute('href', newStyle);
    sessionStorage.setItem(this.storagekey, this.currentTheme);
  }
}
window.customElements.define('cagov-theme-switcher', CAGOVThemeSwitcher);
