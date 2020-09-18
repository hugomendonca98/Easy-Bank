class EasyBank {
  constructor() {
    this.btnMenu = document.querySelector(".menu-icon");
    this.menuOpen();
  }

  menuOpen() {
    if (!this.btnMenu) return false;
    this.btnMenu.addEventListener("click", e => {
      this.navMenu = document.querySelector(".menu");
      this.iconToggle = document.querySelector('.menu-icon');
      this.navMenu.classList.toggle("toggle-menu");
      this.iconToggle.classList.toggle("toggle-icon");
    });
  }
}