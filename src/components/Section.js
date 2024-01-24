class Section {
  constructor() {
    this.element = document.createElement("section");
    this.modal = this.createModal();
  }

  createModal() {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "modal";

    return modal;
  }

  handleNewsData(newsData) {
    this.element.innerHTML = "";
    newsData.forEach((article, index) => {
      const articleElement = document.createElement("div");
      articleElement.className = "card";
      const imageUrl = article.urlToImage?.endsWith("/")
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

      articleElement.addEventListener("click", () => {
        this.handleArticleClick(article, index);
      });

      this.element.appendChild(articleElement);
    });
  }

  handleArticleClick(article, index) {
    this.modal.style.display = "block";

    const opinions = JSON.parse(localStorage.getItem("opinions")) || {};

    if (opinions[article.title]) {
      this.modal.innerHTML = `
      <div class="modal-content">
      <span class="close-modal">&times;</span>
      <div class="my_title">${opinions[article.title].title}</div>
      <div class="my_article">${article.title}</div>
      <div class="my_content">${opinions[article.title].opinion}</div>
        <div id="buttons">
          <button id="editOpinion">Edit</button>
          <button id="deleteOpinion">Delete</button>
        </div>
      </div>`;
      const deleteButton = this.modal.querySelector("#deleteOpinion");
      deleteButton.addEventListener("click", () => {
        delete opinions[article.title];
        localStorage.setItem("opinions", JSON.stringify(opinions));
        modal.style.display = "none";
      });

      const editButton = this.modal.querySelector("#editOpinion");
      editButton.addEventListener("click", () => {
        const editModalContent = `
        <div class="modal-content">
          <span class="close-modal">&times;</span>
          <h2>의견 수정하기</h2>
          <label for="opinionTitle">제목</label>
          <input type="text" id="opinionTitle" value="${
            opinions[article.title].title
          }">
          <label for="opinionText">내용</label>
          <textarea id="opinionText">${
            opinions[article.title].opinion
          }</textarea>
          <button id="saveOpinion">Save</button>
        </div>`;

        this.modal.innerHTML = editModalContent;
        modal.querySelector(".close-modal")?.addEventListener("click", () => {
          modal.style.display = "none";
        });
        const saveButton = this.modal.querySelector("#saveOpinion");
        saveButton.addEventListener("click", () => {
          const editedTitle = document.getElementById("opinionTitle").value;
          const editedOpinion = document.getElementById("opinionText").value;

          opinions[article.title] = {
            title: editedTitle,
            opinion: editedOpinion,
          };
          localStorage.setItem("opinions", JSON.stringify(opinions));

          this.modal.style.display = "none";
        });
      });
    } else {
      this.modal.innerHTML = `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h2>의견 남기기</h2>
        <label for="opinionTitle">제목</label>
        <input type="text" id="opinionTitle">
        <label for="opinionText">내용</label>
        <textarea id="opinionText"></textarea>
        <button id="saveOpinion">Save</button>
      </div>`;

      const titleInput = document.getElementById("opinionTitle");
      const opinionInput = document.getElementById("opinionText");

      const saveButton = this.modal.querySelector("#saveOpinion");
      saveButton.addEventListener("click", () => {
        const title = titleInput.value;
        const opinion = opinionInput.value;

        opinions[article.title] = { title, opinion };

        localStorage.setItem("opinions", JSON.stringify(opinions));

        titleInput.value = "";
        opinionInput.value = "";

        this.modal.style.display = "none";
      });
    }

    modal.querySelector(".close-modal")?.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  addToPage() {
    const appElement = document.getElementById("app");
    appElement.appendChild(this.element);
    document.body.appendChild(this.modal);
  }
}

export default Section;
