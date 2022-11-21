//Clase constructora del objeto gastos
class Gasto {
    constructor (monto, medioName, medioType, categoria, desc){
        this.monto = monto;
        this.medioName = medioName;
        this.medioType = medioType;
        this.categoria = categoria;
        this.desc = desc;
    }

    setAmount(monto){
        //Metodo utilizado para cargar el gasto en el objeto
        this.monto = monto;
    }
    setOrigen(name, type){
        this.medioName = name;
        this.medioType = type;
    }
    setCateg(cat, desc){
        this.categoria = cat;
        this.desc = desc;
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
    queryAmount(){ //Lo uso para saber si hay algún gasto inicializado
        return this.monto == 0;
    }
}