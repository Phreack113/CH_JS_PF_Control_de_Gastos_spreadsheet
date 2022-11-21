//Almaceno en constantes los nodos a utilizar
const origenSection = document.querySelector('.origenSection');
const desc = document.querySelector('.desc');

//Prepara la interface cada botón de origen de pago
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
        changeScreen(categSection);      
        desc.classList.remove('off'); 
    });
    return btnSrc;
}

//Renderiza cada boton en el front
const origenPago = mediosPago => {
    origenSection.innerHTML = '';
    mediosPago.forEach( medio => {
        origenSection.append(oriBtn(medio));
    });
};