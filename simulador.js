//Quiero que mi trabajo final sea una pagina tipo CRUD donde una persona pueda agregar lotes de campo y dejar notas al respecto de estos mismos. No encuentro donde aplicar una funcion o metodo de operaciones matematicas la verdad.
const Contenedor = document.getElementsByClassName("Contenedor")[0]; 


class Lote {
    constructor(nombre, coordenadaLatitud, coordenadaLongitud, nota, id) {
        this.nombre = nombre;
        this.coordenadaLatitud = coordenadaLatitud;
        this.coordenadaLongitud = coordenadaLongitud;
        this.nota = nota;
        this.id = id;
    }
    creaNodo (){
        let nodo = document.createElement("div");
        nodo.classList.add("Lote");
        nodo.id = this.id;
        nodo.innerHTML = `
        <div class="Nombre">${this.nombre}</div>
        <div class="Coordenadas">${this.coordenadaLatitud}</div>
        <div class="Coordenadas">${this.coordenadaLongitud}</div>
        <div class="Nota">${this.nota}</div>
        <div class="Boton">
            <button class="BotonEliminar">Eliminar</button>
            <button class="BotonEditar">Editar</button>
        </div>
        `;
        return nodo;
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
        arrayDeLotes.push(lote.creaNodo());
        let respuesta = prompt("Desea agregar otro lote? (si/no)");
        if(respuesta == "no"){
            controlador = false;
        }
    }
    return arrayDeLotes;
}




let arrayLotes = agregadorDeLotes();
arrayLotes.forEach(lote => {
    Contenedor.appendChild(lote);
})