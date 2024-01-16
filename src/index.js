import "./styles";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Section from "./components/Section";

class App {
  constructor() {
    const header = new Header("LINKHU", "-NEWS");
    header.addToPage();
    this.navigation = new Navigation();
    this.section = new Section();
    this.navigation
      .fetchNews("전체보기")
      .then((data) => {
        this.section.handleNewsData(data);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });

    this.navigation.element.addEventListener("click", (event) => {
      if (event.target.tagName === "DIV") {
        event.preventDefault();

        this.navigation.renderTabs(event.target.innerText);
        this.navigation
          .fetchNews(event.target.innerText)
          .then((data) => {
            this.section.handleNewsData(data);
          })
          .catch((error) => {
            console.error("Error fetching news:", error);
          });
      }
    });

    this.navigation.addToPage();
    this.section.addToPage();
  }
}

const app = new App();
