class Header {
  constructor(title, sub) {
    this.title = title;
    this.sub = sub;
    this.element = document.createElement("header");
    this.element.innerHTML = `<header>${this.title}<span>${this.sub}</span></header>`;
  }

  addToPage() {
    const appElement = document.getElementById("app");
    appElement.appendChild(this.element);
  }
}

export default Header;
