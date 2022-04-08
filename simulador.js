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
    eliminarLote(){
        let nodo = document.getElementById(this.id);
        nodo.remove();
    }
    editarLote(){
        let nodo = document.getElementById(this.id);
        this.nombre = prompt("Ingrese el nombre del lote");
        this.coordenadaLatitud = prompt("Ingrese la coordenada latitud del lote");
        this.coordenadaLongitud = prompt("Ingrese la coordenada longitud del lote");
        this.nota = prompt("Ingrese la nota del lote");
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
        this.agregaEventoBoton()
    }
    agregaEventoBoton(){
        let botonEliminar = document.getElementsByClassName(`BotonEliminar${this.id}`)[0];
        botonEliminar.addEventListener("click", () => {
            this.eliminarLote();
        });
        let botonEditar = document.getElementsByClassName(`BotonEditar${this.id}`)[0];
        botonEditar.addEventListener("click", () => {
            this.editarLote();
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
            nuevoLote.agregaEventoBoton();
        });
    }
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