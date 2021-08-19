const btnOpenModal = document.querySelector("[data-js = btnOpenModal]");
const btnCloseModal = document.querySelector("[data-js = btnCloseModal");
const btnSave = document.querySelector("[data-js = btnSave]");
const modal = document.querySelector("[data-js = modal]");
const container = document.querySelector("[data-js=container]");
const inputSearch = document.querySelector("[data-js=inputSearch");
const emptyImg = document.querySelector("[data-js=emptyImg]");
let textSearch = "";

btnOpenModal.addEventListener("click", () => {
  modal.classList.toggle("visible");
});

btnCloseModal.addEventListener("click", () => {
  modal.classList.toggle("visible");
});

btnSave.addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title");
  const date = document.querySelector("#date");
  const description = document.querySelector("#description");

  const value = {
    title: title.value,
    date: date.value,
    description: description.value,
    like: false,
  };

  setLocalStorage(value);

  // exibe/escodne o modal
  modal.classList.toggle("visible");

  getLocalStorage();
});

inputSearch.addEventListener("keyup", (e) => {
  let text = inputSearch.value;
  let filtered = filterLocalStorage(text);

  if (text.length === 0) {
    return getLocalStorage();
  }

  if (filtered.length === 0) {
    container.innerHTML = "";
    notFoundImg(true);
    console.log("aqui2");
  } else {
    container.innerHTML = "";
    // desenhando os cards
    filtered.forEach((item) => {
      const formattedDate = formatDate(item.date);

      //passando a data formatada para desenhar no card
      item.date = formattedDate;

      renderCard(item);
    });
  }
});

function getLocalStorage() {
  const value = JSON.parse(localStorage.getItem("codelandia"));

  if (!value) {
    notFoundImg(true);
  } else {
    notFoundImg(false);
    // if (emptyImg) {
    //   // remove o retorno quando nao tem valores
    // }
    console.log("aqui");
    //remove os cards para gerar conforme a lista atualizada
    container.innerHTML = "";

    // desenhando os cards
    value.forEach((item) => {
      const formattedDate = formatDate(item.date);

      //passando a data formatada para desenhar no card
      item.date = formattedDate;

      renderCard(item);
    });
  }
}

function setLocalStorage(item) {
  let listItem = [];
  if (localStorage.hasOwnProperty("codelandia")) {
    listItem = JSON.parse(localStorage.getItem("codelandia"));
  }

  //cria um id
  item.id = listItem.length + 1;
  listItem.push(item);

  //ordenando por data
  listItem = listItem.sort(orderDate);
  localStorage.setItem("codelandia", JSON.stringify(listItem));
}

function filterLocalStorage(item) {
  const listItem = JSON.parse(localStorage.getItem("codelandia"));

  let filtered = listItem.filter((el) => el.title === item);
  return filtered;
}

function renderCard(item) {
  //exibindo as informações no html
  const html = `
  <section class="c-card">
  <div class="c-card__header">
  <p class="c-card__date">${item.date}</p>
  <div class="c-card__icon">
  ${
    item.like
      ? '<img src="./assets/heart.svg" alt="Curtir" />'
      : '<img src="./assets/heart-outlined.svg" alt="Curtir" />'
  }
        </div>
        </div>
      
        <div>
        <h1 class="c-card__title">${item.title}</h1>
        <p class="c-card__description">
        ${item.description}
        </p>
      </div>
      </section>
      `;
  container.innerHTML += html;
}

//### FUNCOES EXTRAS ###
function orderDate(a, b) {
  return a.date < b.date;
}

function formatDate(date) {
  const value = new Date(date);

  // transforma em segundos
  const dateSecond = Date.parse(value);

  // formata em pt-br
  const dateFormater = new Date(dateSecond).toLocaleDateString("pt-br", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return dateFormater;
}

function notFoundImg(boolean) {
  if (emptyImg) {
    if (boolean) {
      container.appendChild(emptyImg);
      emptyImg.classList.add("visible");
    } else {
      container.removeChild(emptyImg);
    }
  }
}

//### INIT ###
getLocalStorage();
