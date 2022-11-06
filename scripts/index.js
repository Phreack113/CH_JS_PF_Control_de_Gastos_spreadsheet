/* 
Idea: CONTROL DE GASTOS PERSONALES
Voy a armar un sistema de control de gastos personales que acumule todos los gastos
cargados en una google spreadsheet a traves de su API.
La idea principal es que se pueda registrar un gasto con la menor cantidad de clicks posibles.
 - 1ra pantalla: Va a ser un teclado para ingresar el monto gastado
 - 2da pantalla: Botones para seleccionar el origen del dinero gastado (efectivo, debito, credito)
 - 3ra pantalla: Botones para seleccionar la categoría del gasto y un detalle opcional.
*/

const disp = document.querySelector('.monto p'); 
const botns = document.querySelectorAll('.bot');
botns.forEach(btn => btn.addEventListener('click', e => botonera(e.target)));


//Clase constructora de gastos
class Gasto {
    constructor (monto, medioName, medioType, categoria){
        this.monto = monto;
        this.medioName = medioName;
        this.medioType = medioType;
        this.categoria = categoria;
    }

    send(){
        //Metodo que enviará el gasto a la spreadsheet.
    }

    newSpend(){
        //Metodo que permite ingresar un nuevo gasto
    }
}

//Instancio un nuevo objeto llamado gasto de la clase Gasto
const gasto = new Gasto();

const botonera = btn => {
    if (btn.classList.contains('num')){
        if (disp.innerHTML > 0){
            disp.innerHTML += btn.innerHTML;
        } else {
            disp.innerHTML = btn.innerHTML;
        }
    } else if (btn.classList.contains('bb')){
        disp.innerHTML = 0;
    } else if (btn.classList.contains('bPunto') || btn.classList.contains('b0')){
        if (disp.innerHTML != 0 && disp.innerHTML.indexOf('.') < 0){
            disp.innerHTML += btn.innerHTML;
        }
    } else if (btn.classList.contains('ok')){
        // console.log(disp.innerHTML);
    }
}


/* Array de objetos de medios de pago que llegará desde una hoja de la spreadsheet con una conección a tavez de su API*/
const mediosPago = [
    {
        name: 'Efectivo',
        type: 'Cash',
        icon: 'fa-solid fa-money-bill'
    },
    {
        name: 'Santander',
        type: 'Debito',
        icon: 'fa-regular fa-credit-card'
    },
    {
        name: 'BBVA',
        type: 'Debito',
        icon: 'fa-regular fa-credit-card'
    },
    {
        name: 'Visa BBVA',
        type: 'Credito',
        icon: 'fa-solid fa-credit-card'
    },
    {
        name: 'Visa Santander',
        type: 'Credito',
        icon: 'fa-solid fa-credit-card'
    }
];


const origen = document.querySelector('.origen');

const origenPago = mediosPago => {
    origen.innerHTML = '';
    mediosPago.forEach( medio => {
        origen.append(oriBtn(medio));
    });
};

const oriBtn = medio => {
    const btnSrc = document.createElement('button');
    btnSrc.innerHTML =`
    <div class="oriCard">
        <div class="ico">
            <i class="${medio.icon}"></i>
        </div>
        <div class="oriDetail">
            <div class="oriName">${medio.name}</div>
            <div class="oriType">${medio.type}</div>
        </div>
    </div>
    `;
    btnSrc.addEventListener('click', e => {
        alert('pepe');
    });
    return btnSrc;
}

origenPago(mediosPago);



