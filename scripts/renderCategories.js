//Almaceno en constantes los nodos a utilizar
const categSection = document.querySelector('.categSection');
const categList = document.querySelector('.categList');

//Crea la estructura HTML de las categorías con los semaforos y los lisners
const catTag = cat => {
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
        //Con esta comparación detecto en que flujo estoy (cargando un gasto o consultando gastos)
        if (gasto.queryAmount()){
            //Flujo de consulta

        }else{
            //Flujo gasto
            //Carge la categoría en el objeto gasto a traves del método setCateg
            gasto.setCateg(e.target.dataset.cat);
            //Oculto la seccion de categoría y desoculto la sección de gastoOK
            categSection.classList.add('off');
            gastoOKSection.classList.remove('off');
            console.log('Objeto gasto:', gasto);        
        }
    });
    return div;
}

//Renderiza las categorías
const renderCat = categories => {
    categories.forEach(cat => {
        categList.append(catTag(cat));
    });
}