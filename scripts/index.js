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

//Aca guardo los gastos para luego filtrarlos
let spendArr = [];

const data = async () => {
  //Hace la consulta a la spredsheet desde la función en el file connectionSpreadSheet.js
  const obj = await req('?action=getAll');
  // const obj = await req('');
  console.log(obj);
  
  //Seteo el estado inicial
  renderAll(obj);

};
data();

const newSpend = async objGasto => {
  const parametros = `?action=setSpend&origen=${objGasto.medioName}&categoria=${objGasto.categoria}&desc=${objGasto.desc}&monto=${objGasto.monto}`;
  const newState = await req(parametros.replace(' ','%20'));
  console.log(newState);
  
  //Seteo el nuevo estado
  renderAll(newState);
}

const renderAll = obj => {
  //Renderiza la botonera de la sección de origenes de pago
  origenPago(obj.origins);
    
  //Renderiza la botonera de categorías
  renderCat(obj.categories);

  //Renderizo los botones del filtro de categorías
  renderCatFilter(obj.categories);

  //Renderizo los filtros de mes
  renderMonthFilter(obj.spend);

  //Almaceno el array de gasto
  spendArr = obj.spend;
  //Renderizo gastos diarios
  // const options = { year: 'numeric', month: 'short'};
  // const mesActual = new Date().toLocaleDateString("es-ES", options);
  renderDailySpend(spendArr);
}




