import tabName from "../assets/tabName";
require("dotenv").config();

class Navigation {
  constructor() {
    this.element = document.createElement("nav");
    this.renderTabs("전체보기");
  }

  renderTabs(tabText) {
    console.log(tabText);
    const ul = document.createElement("ul");
    tabName.forEach((tabName) => {
      const li = document.createElement("li");
      li.innerHTML = `<div>${tabName.ko}</div>`;
      if (tabName.ko === tabText) {
        li.className = "active";
      }
      ul.appendChild(li);
    });
    this.element.innerHTML = "";
    this.element.appendChild(ul);
  }

  fetchNews(tabText) {
    console.log(tabText);
    let apiURL;
    const selectedTab = tabName.find((tab) => tab.ko === tabText);
    if (selectedTab.en === "all") {
      apiURL = `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${process.env.API_KEY}`;
    } else {
      apiURL = `https://newsapi.org/v2/top-headlines?country=kr&category=${
        tabName.find((tab) => tab.ko === tabText).en
      }&apiKey=${process.env.API_KEY}`;
    }
    return fetch(apiURL)
      .then((response) => response.json())
      .then((data) => data.articles)
      .catch((error) => {
        console.error("Error fetching news:", error);
        throw error;
      });
  }

  addToPage() {
    const appElement = document.getElementById("app");
    appElement.appendChild(this.element);
  }
}

export default Navigation;
