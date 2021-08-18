const btnOpenModal = document.querySelector("[data-js = btnOpenModal]");
const btnCloseModal = document.querySelector("[data-js = btnCloseModal");
const modal = document.querySelector("[data-js = modal]");

btnOpenModal.addEventListener("click", () => {
  modal.classList.toggle("visible");
});

btnCloseModal.addEventListener("click", () => {
  modal.classList.toggle("visible");
});

const formModal = document.querySelector("#form");
const btn = document.querySelector("[data-js = btnSave]");
const item = [];

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title");
  const date = document.querySelector("#date");
  const description = document.querySelector("#description");

  let value = {
    title: title.value,
    date: date.value,
    description: description.value,
    like: false,
  };

  item.push(value);

  // VERIFICAR
  if (!localStorage) {
    localStorage.setItem("codelandia", JSON.stringify(item));
  } else {
    localStorage.setItem("codelandia", JSON.stringify(item));
  }

  modal.classList.remove("visible");
});

function getLocalStorage() {
  const value = JSON.parse(localStorage.getItem("codelandia"));
  const emptyImg = document.querySelector("[data-js=emptyImg]");

  if (!value) {
    emptyImg.classList.add("visible");
  } else {
    // remove o retorno quando nao tem valores
    emptyImg.parentNode.removeChild(emptyImg);

    value.forEach((item) => {
      const formattedDate = formatDate(item.date);

      //criando um novo array com a data formatada
      item.date = formattedDate;

      //exibindo as informações no html
      const container = document.querySelector("[data-js=container]");
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
    });
  }
}

getLocalStorage();

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
