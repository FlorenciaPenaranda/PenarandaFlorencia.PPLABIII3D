
import crearTabla from "./tabla.js";
import Anuncio from "./anuncio.js";


let listaAnuncios;
let frmAnuncio;

let proximoId;
let divTabla;

window.addEventListener('load', inicializarManejadores);


function inicializarManejadores() {

    listaAnuncios = obtenerAnuncios();
    console.log(listaAnuncios);
    proximoId = obtenerId();

    divTabla = document.getElementById("divTabla");
    actualizarLista();
    //referencia la formulario
    frmAnuncio = document.forms[0];

    frmAnuncio.addEventListener('submit', e => { // trae referencia del formulario
        e.preventDefault();

        //alta
        if (e.submitter.id == "guardar") {

            const nuevoAnuncio = altaAnuncio();
            if (nuevoAnuncio) {
                listaAnuncios.push(nuevoAnuncio);
                proximoId++;
                guardardatos();
                actualizarLista();
            }
        } else if (e.submitter.id == "borrar") { // 
            bajaPersona(e.target.parentNode.dataset.id);
        }




        //aca el alta de la persona
        //console.log(frmPersona.nombre.value); // referenmcia al name de la propiedad del html para construir la persona
    });

}

function obtenerAnuncios(lista) { //se fija si en el local stoare si ya hay cargada una lista y la va a leer, o la inicializar una lista vacia

    return JSON.parse(localStorage.getItem('gente')) || [];
}

function obtenerId() {
    //se fija si en el local stoare si ya hay cargada una lista y la va a leer, o la inicializar una lista vacia

    return JSON.parse(localStorage.getItem('nextId')) || 1;
}


function altaAnuncio() {// hacer en la lase persona

    const nuevoAnuncio = new Anuncio(proximoId,
        frmAnuncio.titulo.value,
        document.querySelector('input[name="gander"]:checked').value,
        frmAnuncio.descripcion.value,
        frmAnuncio.precio.value,
        document.querySelector("#txtPuertas").value,
        document.querySelector("#txtKms").value,
        document.querySelector("#txtPotencia").value
        /* frmAnuncio.puertas,
         frmAnuncio.kms,
         frmAnuncio.potencia*/

        //document.querySelector("#txtEmail").value,// o Document.querySelector("txtEmail").value
    ); // construirlo con lo que tomamos del frm.Persona

    //una vez que agrego una persona la agrego a al lista 
    console.log(nuevoAnuncio);
    return nuevoAnuncio;

}

function bajaPersona(id) {// hacer en la lase persona

    le = localStorage.getItem('gente');
    le = le.filter(x => {
        return x.Id != id;
    })
    actualizarLista();
    localStorage.setItem('gente', JSON.stringify(listaAnuncios));

}

function guardardatos() {
    localStorage.setItem('gente', JSON.stringify(listaAnuncios));
    localStorage.setItem('nextId', proximoId);

}

function actualizarLista() {
    divTabla.innerHTML = ""  //elimina el constenido de MUY mala forma. MEJORAR
    divTabla.appendChild(crearTabla(listaAnuncios));
}



