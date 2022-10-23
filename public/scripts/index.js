/* 
Idea: CONTROL DE GASTOS PERSONALES
Voy a armar un sistema de control de gastos personales que acumule todos los gastos
cargados en una google spreadsheet a traves de su API.
La idea principal es que se pueda registrar un gasto con la menor cantidad de clicks posibles.
 - 1ra pantalla: Va a ser un teclado para ingresar el monto gastado
 - 2da pantalla: Botones para seleccionar el origen del dinero gastado (efectivo, debito, credito)
 - 3ra pantalla: Botones para seleccionar la categoría del gasto y un detalle opcional.
*/

/* Array de objetos de medios de pago que llegará desde una hoja de la spreadsheet con una conección a tavez de su API*/
const mediosPago = [
    {
        name: 'Efectivo',
        type: 'Cash',
        icon: ''
    },
    {
        name: 'Santander',
        type: 'Debito',
        icon: ''
    },
    {
        name: 'BBVA',
        type: 'Debito',
        icon: ''
    },
    {
        name: 'Visa BBVA',
        type: 'Credito',
        icon: ''
    },
    {
        name: 'Visa Santander',
        type: 'Credito',
        icon: ''
    }
];

//Procesos que va a renderizar en pantalla la botonera con los medios de pago que lleguen desde la spreadsheet
for (const medio of mediosPago) {
    //Por el momento solo los renderizo en pantalla
    console.log(`El medio de pago ${medio.name}, es un medio de pago de ${medio.type}`);
}

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


