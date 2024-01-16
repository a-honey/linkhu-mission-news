class Section {
  constructor() {
    this.element = document.createElement("section");
  }

  handleNewsData(newsData) {
    this.element.innerHTML = "";
    newsData.forEach((article) => {
      const articleElement = document.createElement("div");
      articleElement.className = "card";
      const imageUrl = article.urlToImage.endsWith("/")
        ? article.urlToImage.slice(0, -1)
        : article.urlToImage;

      articleElement.innerHTML = `
        <img src="${imageUrl}" />
        <div class="content">
          <h3>${article.title}</h3>
          <p>${article.description}</p>
          <div>
            <div>${article.author}</div>
            <div>${article.publishedAt.split("T")[0]}</div>
          </div>
        </div>`;
      this.element.appendChild(articleElement);
    });
  }

  addToPage() {
    const appElement = document.getElementById("app");
    appElement.appendChild(this.element);
  }
}

export default Section;
