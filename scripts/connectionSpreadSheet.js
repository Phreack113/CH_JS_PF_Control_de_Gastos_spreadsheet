
const x = document.querySelector('.fa-solid.fa-xmark.aj');
const spiner = document.querySelector('.spiner');   

//Solicitamos los datos a la planilla de google sheet
const req = async (param) => {
    //Seteamos url para la consulta a la spreadsheet
    try{
        x.classList.add('off');
        spiner.classList.remove('off');
        const url = 'https://script.google.com/macros/s/AKfycbwJYfG7qvOliQFSZp7nkI4WKN5O0McTsUoDFjQjOrD9sX3TieaFmKpvFAcxxNJcQdZv/exec';
        const res = await fetch(url + param);
        const resJson = await res.json(); 
        return resJson;
    }
    finally{
        x.classList.remove('off');
        spiner.classList.add('off');
    }
}