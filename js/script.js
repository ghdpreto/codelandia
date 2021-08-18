const btnOpenModal = document.querySelector('[data-js = btnOpenModal]')
const btnCloseModal = document.querySelector('[data-js = btnCloseModal') 
const modal = document.querySelector('[data-js = modal]')

btnOpenModal.addEventListener('click',  () => {
    modal.classList.toggle('visible')
})

btnCloseModal.addEventListener('click', () => {
    modal.classList.toggle('visible')
})



const formModal = document.querySelector('#form')
const btn = document.querySelector('[data-js = btnSave]')
const item = []


btn.addEventListener('click', (e) => {
    e.preventDefault()
    const title = document.querySelector("#title")
    const date = document.querySelector('#date')
    const description = document.querySelector('#description')
    

    let value = {
        title: title.value,
        date: date.value,
        description: description.value,
        like: false
    }

    
    const local = localStorage.getItem('codelandia')
    
    console.log(local)
    item.push(value)

    // VERIFICAR
    if(!localStorage) {
        localStorage.setItem('codelandia',JSON.stringify(item))
    } else {
        localStorage.setItem('codelandia', JSON.stringify(item))        
    }

})


function getLocalStorage() {
    const value = JSON.parse(localStorage.getItem('codelandia'))
    if(!value ) {
        console.log('nada consta')
    } else {

        value.forEach(item => {
            
            const dateSecond = Date.parse(item.date)
            
            
            //formatando a data
            const dateFormater = new Date(dateSecond).toLocaleDateString('pt-br', {
                year: 'numeric',
                month: 'short',
                day: '2-digit'
            })
            
            //fazendo uma copia do array
            let array = item
        //criando um novo array com a data formatada
        array.date = dateFormater

        //exibindo as informações no html
        const container = document.querySelector('[data-js=container]')
        const html = `
        <section class="c-card">
        <div class="c-card__header">
          <p class="c-card__date">${array.date}</p>
          <div class="c-card__icon">
          ${
            array.like? '<img src="./assets/heart.svg" alt="Curtir" />' : '<img src="./assets/heart-outlined.svg" alt="Curtir" />'
          }
        
        
          </div>
          </div>
          
          <div>
          <h1 class="c-card__title">${array.title}</h1>
          <p class="c-card__description">
          ${array.description}
          </p>
          </div>
          </section>
          `
          container.innerHTML += html
        }
        );
    }
}


getLocalStorage()
