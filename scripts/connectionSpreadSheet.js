
const x = document.querySelector('.fa-solid.fa-xmark.aj');
const spiner = document.querySelector('.spiner');   

//Solicitamos los datos a la planilla de google sheet
const req = async (param) => {
    //Seteamos url para la consulta a la spreadsheet
    try{
        x.classList.add('off');
        spiner.classList.remove('off');
        const url = 'https://script.google.com/macros/s/AKfycbwW2e0phOqV8qvTkwbEX9S2l1Y1MIqD3G9gmo4_s4_lZe4K3psFMFZnP_yTly1hKo_u/exec';
        const res = await fetch(url + param);
        const resJson = await res.json(); 
        return resJson;
    }
    finally{
        x.classList.remove('off');
        spiner.classList.add('off');
    }
}