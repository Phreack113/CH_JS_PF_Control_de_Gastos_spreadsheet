const gastosCat = document.querySelector('.gastosCat');
const keyboard = document.querySelector('.keyboard');
const gastosDia = document.querySelector('.gastosDia');

gastosCat.addEventListener('click', () => {
    categSection.classList.remove('off');
    montoSection.classList.add('off');
    gastoDiaDetalle.classList.add('off');
});

keyboard.addEventListener('click', () => {
    montoSection.classList.remove('off');
    gastoDiaDetalle.classList.add('off');
    categSection.classList.add('off');
});

gastosDia.addEventListener('click', () => {
    gastoDiaDetalle.classList.remove('off');
    montoSection.classList.add('off');
    categSection.classList.add('off');
});