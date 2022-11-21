//Almaceno en constantes los nodos a utilizar
const montoSection = document.querySelector('.montoSection');
const fecha = document.querySelector('.fecha');

const disp = document.querySelector('.monto p'); 
const botns = document.querySelectorAll('.bot');

//Agrego eventos en los botones del teclado
botns.forEach(btn => btn.addEventListener('click', e => botonera(e.target)));

//Seteo la fecha de hoy
const hoy = new Date().toLocaleDateString('es-us', { weekday:"long", year:"numeric", month:"long", day:"numeric"}) 
fecha.innerHTML = `<p><i class="fa-regular fa-calendar"></i> ${hoy}</p>`;

//Lógica de la botonera 
const botonera = btn => {
    if (btn.classList.contains('num')){
        if (disp.innerHTML > 0){ //Botones numericos
            disp.innerHTML += btn.innerHTML;
        } else {
            disp.innerHTML = btn.innerHTML;
        }
    } else if (btn.classList.contains('bb')){ //Boton de borrado
        disp.innerHTML = 0;
    } else if (btn.classList.contains('bPunto') || btn.classList.contains('b0')){
        if (disp.innerHTML != 0 && disp.innerHTML.indexOf('.') < 0){
            disp.innerHTML += btn.innerHTML;
        }
    } else if (btn.classList.contains('okBot') && disp.innerHTML > 0){
        //El usuario termina de ingresar el gasto y presiona OK
        //Luego almaceno el gasto dentro del objeto, oculto la sección del teclado y desoculto la siguiente seción.
        gasto.setAmount(parseFloat(disp.innerHTML));
        changeScreen(origenSection);
        //Resetea el monto del teclado 
        disp.innerHTML = 0;
    }
}