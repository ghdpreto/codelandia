const btnOpenModal = document.querySelector('[data-js = btnOpenModal]')
const btnCloseModal = document.querySelector('[data-js = btnCloseModal') 
const modal = document.querySelector('[data-js = modal]')

btnOpenModal.addEventListener('click',  () => {
    modal.classList.toggle('visible')
})

btnCloseModal.addEventListener('click', () => {
    modal.classList.toggle('visible')
})


