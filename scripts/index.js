/* 
Idea: CONTROL DE GASTOS PERSONALES
Voy a armar un sistema de control de gastos personales que acumule todos los gastos
cargados en una google spreadsheet a traves de su API.
La idea principal es que se pueda registrar un gasto con la menor cantidad de clicks posibles.
- 1ra pantalla: Va a ser un teclado para ingresar el monto gastado
- 2da pantalla: Botones para seleccionar el origen del dinero gastado (efectivo, debito, credito)
- 3ra pantalla: Botones para seleccionar la categoría del gasto y un detalle opcional.
*/

//Almaceno en constantes los nodos de cada sección
const montoSection = document.querySelector('.montoSection');
const origenSection = document.querySelector('.origenSection');
const categSection = document.querySelector('.categSection');


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

    setAmount(monto){
        //Metodo utilizado para cargar el gasto en el objeto
        this.monto = monto;
    }
    setOrigen(name, type){
        this.medioName = name;
        this.medioType = type;
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
    } else if (btn.classList.contains('okBot')){
        //El usuario termina de ingresar el gasto y presiona OK
        //Luego almaceno el gasto dentro del objeto, oculto la sección del teclado y desoculto la siguiente seción.
        gasto.setAmount(parseFloat(disp.innerHTML));
        montoSection.classList.add('off');
        origenSection.classList.remove('off');

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

//Array con categorías disponibles que llegaran desde la spreadsheet a traves de la API
const categories = [
{
    name: 'Salidas',
    ppto: 20000,
    gastoAcum: 8234
},
{
    name: 'Supermercado',
    ppto: 40000,
    gastoAcum: 12343
},
{
    name: 'Combustible',
    ppto: 10000,
    gastoAcum: 5634
}
];

const origenPago = mediosPago => {
    // origenSection.innerHTML = '';
    mediosPago.forEach( medio => {
        origenSection.append(oriBtn(medio));
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
        //Tomo el valor de nombre y tipo de pago seleccionado
        const oriName = e.target.querySelector('.oriName').innerHTML;
        const oriType = e.target.querySelector('.oriType').innerHTML;
        //Lo cargo en el objeto gasto a traves del método setOrigen
        gasto.setOrigen(oriName, oriType);
        //Oculto la seccion de origen y desoculto la sección de categoría
        origenSection.classList.add('off');
        categSection.classList.remove('off');        
    });
    return btnSrc;
}

origenPago(mediosPago);



