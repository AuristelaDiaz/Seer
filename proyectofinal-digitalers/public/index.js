const dialog = document.querySelector('dialog');
const openButton = document.querySelector('.open');
const closeButton = document.querySelector('.close');

console.log(dialog)

const closeDialog = () => {
    dialog.close();
}

const openDialog = () => {
    dialog.showModal()
}

openButton.addEventListener('click', ()=> openDialog());
closeButton.addEventListener('click', ()=> closeDialog());
