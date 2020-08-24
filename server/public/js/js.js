import { CountUp } from '/public/js/countup.min.js';

var buttons = {
    create: [],
    close: [],
};

buttons.create = document.querySelectorAll('.create-exam');
buttons.close = document.querySelectorAll('.close-exam');

var createModal = document.getElementById('create-modal');

buttons.create.forEach(button => {
    button.addEventListener('click', () => {
        createModal.classList.add('is-active');
    });
})

buttons.close.forEach(button => {
    button.addEventListener('click', () => {
        createModal.classList.remove('is-active');
    });
});

var statElements = document.querySelectorAll('[amount]');
statElements.forEach(element => {
    let c = new CountUp(element.id, parseInt(element.getAttribute('amount')));
    c.start();
});