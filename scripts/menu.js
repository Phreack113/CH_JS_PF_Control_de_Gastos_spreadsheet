const gastosCat = document.querySelector('.gastosCat');
const keyboard = document.querySelector('.keyboard');
const gastosDia = document.querySelector('.gastosDia');

gastosCat.addEventListener('click', () => {
    changeScreen(categSection);
});

keyboard.addEventListener('click', () => {
    changeScreen(montoSection);
});

gastosDia.addEventListener('click', () => {
    changeScreen(gastoDiaDetalle);
});

const changeScreen = sectionOn => {
    origenSection.classList.add('off');
    categSection.classList.add('off');
    montoSection.classList.add('off');
    gastoDiaDetalle.classList.add('off');
    gastoOKSection.classList.add('off')
    sectionOn.classList.remove('off');
}

