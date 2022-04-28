//Quiero que mi trabajo final sea una pagina tipo CRUD donde una persona pueda agregar lotes de campo y dejar notas al respecto de estos mismos. No encuentro donde aplicar una funcion o metodo de operaciones matematicas la verdad.

//Llamar DOM
const botonAgregar = document.getElementById("agregar");
const nombre = document.getElementById("nombre");
const latitud = document.getElementById("latitud");
const longitud = document.getElementById("longitud");
const notas = document.getElementById("nota"); 
const contenedor = document.getElementsByClassName("contenedorDeCositas")[0];
const alerta = document.getElementById("alerta");


//Array de lotes
let lotes = [];
if(localStorage.getItem("lotes") === null){
    localStorage.setItem("lotes", JSON.stringify(lotes));
}else{
    lotes = JSON.parse(localStorage.getItem("lotes"));
}


class Lote {
    constructor(nombre, coordenadaLatitud, coordenadaLongitud, nota, id, urlPokemon) {
        this.nombre = nombre;
        this.coordenadaLatitud = coordenadaLatitud;
        this.coordenadaLongitud = coordenadaLongitud;
        this.nota = nota;
        this.id = id;
    }
    async llamarPokemon(){
        
    }
    creaNodo (){
        let nodo = document.createElement("div");
        nodo.classList.add("Lote");
        nodo.id = this.id;
        nodo.innerHTML = /* html */`
        <div class="Nombre ${this.id}">${this.nombre}</div>
        <div class="Coordenadas ${this.id}">${this.coordenadaLatitud}</div>
        <div class="Coordenadas ${this.id}">${this.coordenadaLongitud}</div>
        <div class="Nota ${this.id}">${this.nota}</div>
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
    let idLote = lotes.findIndex(lote => lote.id === id);
    let componentes = document.getElementsByClassName(JSON.stringify(lote.id))
    let [nombre, latitud, longitud, nota] = componentes;
    nombre.innerHTML = `<input class="value" type="text" value="${lote.nombre}">`;
    latitud.innerHTML = `<input class="value" type="text" value="${lote.coordenadaLatitud}">`;
    longitud.innerHTML = `<input class="value" type="text" value="${lote.coordenadaLongitud}">`;
    nota.innerHTML = `<input class="value" type="text" value="${lote.nota}">`;
    let componentesValores = document.getElementsByClassName(`value`);
    let [nombreValor, latitudValor, longitudValor, notaValor] = componentesValores;
    //agrego el boton de guardar
    let botonGuardar = document.getElementsByClassName(`BotonEditar${id}`)[0];
    botonGuardar.addEventListener("click", () => {
        lotes[idLote].nombre = nombreValor.value;
        lotes[idLote].coordenadaLatitud = latitudValor.value;
        lotes[idLote].coordenadaLongitud = longitudValor.value;
        lotes[idLote].nota = notaValor.value;
        guardarLote();
    })
    botonGuardar.innerHTML = `<button class="BotonEditar${id}">Guardar</button>`;
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


const validarEntrada = (nombre, latitud, longitud, nota) => {
    if (nombre === "" || latitud === "" || longitud === "" || nota === "") {
        alerta.classList.add("aparecido");
        return false;
    } else {
        alerta.classList.remove("aparecido");
        return true;
    }
}


botonAgregar.addEventListener("click", (e) => {
    e.preventDefault();
    let nombreLote = nombre.value;
    let latitudLote = latitud.value;
    let longitudLote = longitud.value;
    let notaLote = nota.value;
    if (validarEntrada(nombreLote, latitudLote, longitudLote, notaLote)) {
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
    }else{
        swal({
            title: "Todos los campos son obligatorios",
            icon: "error",
            button: false,
        })
    }

})


document.addEventListener("DOMContentLoaded", () => {
    cargarLotes
    let lat 
    let lon
    const temperatura = document.getElementById("temperatura-valor")
    const infoTemp = document.getElementById("temperatura-texto");
    const localidad = document.getElementById("localidad");

    if(navigator.geolocation){          
        navigator.geolocation.getCurrentPosition(posicion => {
            lon = posicion.coords.longitude;
            lat = posicion.coords.latitude;
            apiKey = "ce0eb59695c56f88f943004f5c1bf917"
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=sp`;
            fetch(url)
            .then(response => response.json())
            .then(data => {
                let temperaturas = data.main.temp;
                let celsius = Math.round(temperaturas - 273.15);
                let ciudad = data.name;
                let descriptionCapitalizado = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
                temperatura.textContent = `${celsius}°C`;
                infoTemp.textContent = `${descriptionCapitalizado}`;1
                localidad.textContent = `${ciudad}`;
            })
            .catch(error => {
                console.log(error);
            })
        });
    }
})

