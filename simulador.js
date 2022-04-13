//Quiero que mi trabajo final sea una pagina tipo CRUD donde una persona pueda agregar lotes de campo y dejar notas al respecto de estos mismos. No encuentro donde aplicar una funcion o metodo de operaciones matematicas la verdad.

//Llamar DOM
const botonAgregar = document.getElementById("agregar");
const nombre = document.getElementById("nombre");
const latitud = document.getElementById("latitud");
const longitud = document.getElementById("longitud");
const notas = document.getElementById("nota"); 
const contenedor = document.getElementsByClassName("contenedorDeCositas")[0];

//Array de lotes
let lotes = [];
if(localStorage.getItem("lotes") === null){
    localStorage.setItem("lotes", JSON.stringify(lotes));
}else{
    lotes = JSON.parse(localStorage.getItem("lotes"));
}


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
            <button class="BotonEliminar${this.id}">Eliminar</button>
            <button class="BotonEditar${this.id}">Editar</button>
        </div>
        `;
        return nodo;
    }

    agregaEventoBoton(eliminarLote, editarLote){
        let botonEliminar = document.getElementsByClassName(`BotonEliminar${this.id}`)[0];
        botonEliminar.addEventListener("click", () => {
            eliminarLote(this.id);
        });
        let botonEditar = document.getElementsByClassName(`BotonEditar${this.id}`)[0];
        botonEditar.addEventListener("click", () => {
            editarLote(this.id);
        });
    }
}

const generadorDeId = () => {
    let id = Math.floor(Math.random() * 10000000);
    return id;
}

const cargarLotes = () => {
    contenedor.innerHTML = "";
    arrayLotes = JSON.parse(localStorage.getItem("lotes"));
    if (arrayLotes === null) {
        arrayLotes = [];
    }else{
        arrayLotes.forEach(lote => {
            let nuevoLote = new Lote(lote.nombre, lote.coordenadaLatitud, lote.coordenadaLongitud, lote.nota, lote.id);
            contenedor.appendChild(nuevoLote.creaNodo());
            nuevoLote.agregaEventoBoton(eliminarLote, editarLote);
        });
    }
}

//Hasta que no encuentre una forma efectiva de hacer que esto funcione sin un promt, lo dejo comentado
const editarLote = (id) => {
    let lote = lotes.find(lote => lote.id === id);
    lote.nombre = prompt("Nombre del lote");
    lote.coordenadaLatitud = prompt("Latitud");
    lote.coordenadaLongitud = prompt("Longitud");
    lote.nota = prompt("Nota");
    localStorage.setItem("lotes", JSON.stringify(lotes));
    cargarLotes();
}


const eliminarLote = (id) => {
    lotes = lotes.filter(lote => lote.id !== id);
    localStorage.setItem("lotes", JSON.stringify(lotes));
    guardarLote();
}

const guardarLote = () => {
    localStorage.setItem("lotes", JSON.stringify(lotes));
    nombre.value = "";
    latitud.value = "";
    longitud.value = "";
    notas.value = "";
    cargarLotes();
}

botonAgregar.addEventListener("click", (e) => {
    e.preventDefault();
    let nombreLote = nombre.value;
    let latitudLote = latitud.value;
    let longitudLote = longitud.value;
    let notaLote = nota.value;
    let id = generadorDeId();
    let objeto = {
        nombre: nombreLote,
        coordenadaLatitud: latitudLote,
        coordenadaLongitud: longitudLote,
        nota: notaLote,
        id: id
    }
    lotes.push(objeto);
    guardarLote()
})


document.addEventListener("DOMContentLoaded", cargarLotes)

