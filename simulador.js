//Quiero que mi trabajo final sea una pagina tipo CRUD donde una persona pueda agregar lotes de campo y dejar notas al respecto de estos mismos. No encuentro donde aplicar una funcion o metodo de operaciones matematicas la verdad.



class Lote {
    constructor(nombre, coordenadaLatitud, coordenadaLongitud, nota, id) {
        this.nombre = nombre;
        this.coordenadaLatitud = coordenadaLatitud;
        this.coordenadaLongitud = coordenadaLongitud;
        this.nota = nota;
        this.id = id;
    }
}

const generadorDeId = () => {
    let id = Math.floor(Math.random() * 10000000);
    return id;
}

const agregadorDeLotes = () => {
    let controlador = true
    let arrayDeLotes = [];
    while(controlador){
        let nombre = prompt("Ingrese el nombre del lote");
        let coordenadaLatitud = prompt("Ingrese la coordenada latitud del lote");
        let coordenadaLongitud = prompt("Ingrese la coordenada longitud del lote");
        let nota = prompt("Ingrese la nota del lote");
        let id = generadorDeId();
        let lote = new Lote(nombre, coordenadaLatitud, coordenadaLongitud, nota, id);
        arrayDeLotes.push(lote);
        let respuesta = prompt("Desea agregar otro lote? (si/no)");
        if(respuesta == "no"){
            controlador = false;
        }
    }
    return arrayDeLotes;
}

const imprimeLotes = (arrayDeLotes) => {
    arrayDeLotes.forEach(lote => {
        document.write(`<p> Lote ${lote.nombre} en la posicion ${lote.coordenadaLatitud}/${lote.coordenadaLongitud} <br> Tiene los siguentes problemas: ${lote.nota} </p> <br>`);
        console.log(lote);
    });
}


let arrayLotes = agregadorDeLotes();
imprimeLotes(arrayLotes);
