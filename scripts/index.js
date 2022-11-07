/* 
Idea: CONTROL DE GASTOS PERSONALES
Voy a armar un sistema de control de gastos personales que acumule todos los gastos
cargados en una google spreadsheet a traves de su API.
La idea principal es que se pueda registrar un gasto con la menor cantidad de clicks posibles.
- 1ra pantalla: Va a ser un teclado para ingresar el monto gastado
- 2da pantalla: Botones para seleccionar el origen del dinero gastado (efectivo, debito, credito)
- 3ra pantalla: Botones para seleccionar la categoría del gasto y un detalle opcional.
*/

//Almaceno en constantes los nodos a utilizar
const montoSection = document.querySelector('.montoSection');
const origenSection = document.querySelector('.origenSection');
const categSection = document.querySelector('.categSection');
const categList = document.querySelector('.categList');
const gastoOKSection = document.querySelector('.gastoOkSection');
const fecha = document.querySelector('.fecha');
const disp = document.querySelector('.monto p'); 
const botns = document.querySelectorAll('.bot');

//Agrego eventos en los botones del teclado
botns.forEach(btn => btn.addEventListener('click', e => botonera(e.target)));

//Seteo la fecha de hoy
const hoy = new Date().toLocaleDateString('es-us', { weekday:"long", year:"numeric", month:"long", day:"numeric"}) 
fecha.innerHTML = `<p><i class="fa-regular fa-calendar"></i> ${hoy}</p>`;

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
    setCateg(cat){
        this.categoria = cat;
    }

    send(){
        //Metodo que enviará el gasto a la spreadsheet.
    }

    reset(){
        //Metodo que permite resetear las variables
        this.monto = 0;
        this.medioName = '';
        this.medioType = '';
        this.categoria = '';
    }
}

//Instancio un nuevo objeto llamado gasto de la clase Gasto
const gasto = new Gasto();


//Logica de la botonera
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
    } else if (btn.classList.contains('okBot') && disp.innerHTML > 0){
        //El usuario termina de ingresar el gasto y presiona OK
        //Luego almaceno el gasto dentro del objeto, oculto la sección del teclado y desoculto la siguiente seción.
        gasto.setAmount(parseFloat(disp.innerHTML));
        montoSection.classList.add('off');
        origenSection.classList.remove('off');
        //Resetea el monto del teclado 
        disp.innerHTML = 0;
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
    icon: 'fa-solid fa-martini-glass-citrus', 
    ppto: 20000,
    gastoAcum: 8234
},
{
    name: 'Supermercado',
    icon: 'fa-solid fa-cart-shopping', 
    ppto: 40000,
    gastoAcum: 12343
},
{
    name: 'Combustible',
    icon: 'fa-solid fa-gas-pump', 
    ppto: 10000,
    gastoAcum: 5634
},
{
    name: 'Farmacia',
    icon: 'fa-solid fa-house-medical', 
    ppto: 2000,
    gastoAcum: 400
},
{
    name: 'Regalos',
    icon: 'fa-solid fa-gift', 
    ppto: 8000,
    gastoAcum: 1500
},
{
    name: 'Delivery',
    icon: 'fa-solid fa-motorcycle', 
    ppto: 15000,
    gastoAcum: 14800
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



const renderCat = cat => {
    const div = document.createElement('div');
    div.classList.add('cat');
    div.innerHTML =`
        <div class="catName"><p>${cat.name}</p></div>
        <div class="catIcon">
            <i class="${cat.icon}"></i>
        </div>
        <div class="catGasto">${
            cat.gastoAcum.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            })
        }</div>
        <div class="catPpto">${
            cat.ppto.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            })
        }</div>
    `;

    const btn = document.createElement('button');
    btn.dataset.cat = cat.name;
    div.append(btn);

    //Determino el % de consumo de la categoría
    let pcj;
    if ((cat.gastoAcum / cat.ppto) * 100 > 100){
        pcj = 100;
    } else {
        pcj = Math.trunc((cat.gastoAcum / cat.ppto) * 100);
    }

    //En función del % defino el color del semaforo entre verde amarillo y rojo
    if (pcj <= 50){
        color = 'rgb(55, 200, 45)'; //Verde
    } else if(pcj > 50 && pcj < 75){
        color = 'rgb(220, 120, 40)'; //Amarillo
    } else {
        color = 'rgb(220, 40, 40)'; //Rojo
    }
    //Genero el efecto de color del semaforo de acuerdo al % de presupuesto gastado
    const bgi = `linear-gradient(to top, ${color} ${pcj}%, rgb(70, 70, 70) ${pcj}%)`;
    //Asigno el mismo color de semaforo a la letra
    div.querySelector('.catIcon').style.backgroundImage = bgi;
    div.querySelector('.catGasto').style.color = color;
    btn.addEventListener('click', e => {
        //Carge la categoría en el objeto gasto a traves del método setCateg
        gasto.setCateg(e.target.dataset.cat);
        //Oculto la seccion de categoría y desoculto la sección de gastoOK
        categSection.classList.add('off');
        gastoOKSection.classList.remove('off');
        console.log('Objeto gasto:', gasto);        
    });
    return div;
}

categories.forEach(cat => {
    categList.append(renderCat(cat));
});


//Funcionalidad que captura el final de la animación y permite comenzar de nuevo el proceso cargando un nuevo gasto
const animation = document.querySelector('.cargaOK');
animation.addEventListener('animationend', () =>{
    //Una vez finalizada la animación la desactiva y activa nuevamente el teclado
    gastoOKSection.classList.add('off');
    montoSection.classList.remove('off');
    //Reseteo el objeto gasto        
    gasto.reset();
});
