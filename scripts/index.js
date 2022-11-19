/* 
Idea: CONTROL DE GASTOS PERSONALES
Voy a armar un sistema de control de gastos personales que acumule todos los gastos
cargados en una google spreadsheet a traves de su API.
La idea principal es que se pueda registrar un gasto con la menor cantidad de clicks posibles.
- 1ra pantalla: Va a ser un teclado para ingresar el monto gastado
- 2da pantalla: Botones para seleccionar el origen del dinero gastado (efectivo, debito, credito)
- 3ra pantalla: Botones para seleccionar la categoría del gasto y un detalle opcional.
*/

//Instancio un nuevo objeto llamado gasto de la clase Gasto
//La clase constructora está en el file objGasto.js
const gasto = new Gasto();
gasto.setAmount(0); //Seteo un valor inicial

//Renderiza la botonera con los medios de pago
origenPago(mediosPago);

//Renderiza la botonera de categorías
renderCat(categories);






