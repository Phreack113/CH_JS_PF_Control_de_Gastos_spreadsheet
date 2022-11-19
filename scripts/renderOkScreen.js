//Almaceno en constantes los nodos a utilizar
const gastoOKSection = document.querySelector('.gastoOkSection');

//Funcionalidad que captura el final de la animación y permite comenzar de nuevo el proceso cargando un nuevo gasto
const animation = document.querySelector('.cargaOK');
animation.addEventListener('animationend', () =>{
    //Una vez finalizada la animación la desactiva y activa nuevamente el teclado
    gastoOKSection.classList.add('off');
    montoSection.classList.remove('off');
    //Reseteo el objeto gasto        
    gasto.reset();
});