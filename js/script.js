const btnOpenModal = document.querySelector("[data-js = btnOpenModal]");
const btnCloseModal = document.querySelector("[data-js = btnCloseModal");
const btnSave = document.querySelector("[data-js = btnSave]");
const modal = document.querySelector("[data-js = modal]");
const container = document.querySelector("[data-js=container]");

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

function getLocalStorage() {
  const value = JSON.parse(localStorage.getItem("codelandia"));
  const emptyImg = document.querySelector("[data-js=emptyImg]");

  if (!value) {
    emptyImg.classList.add("visible");
  } else {
    if (emptyImg) {
      // remove o retorno quando nao tem valores
      emptyImg.parentNode.removeChild(emptyImg);
    }

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

getLocalStorage();

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
