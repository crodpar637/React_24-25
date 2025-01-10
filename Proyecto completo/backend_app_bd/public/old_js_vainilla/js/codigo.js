"use strict";

// MAIN PROGRAM
var oEmpresa = new Empresa();

registrarEventos();

// Registro de eventos
function registrarEventos() {
    // Opciones de menú
    document
        .querySelector("#mnuAltaTipo")
        .addEventListener("click", mostrarFormulario);
    document
        .querySelector("#mnuBuscarComponente")
        .addEventListener("click", mostrarFormulario);
    document
        .querySelector("#mnuListadoTipo")
        .addEventListener("click", mostrarListadoTipo);
    document.querySelector("#mnuListadoComponente").addEventListener("click",mostrarListadoComponentes);
    document.querySelector("#mnuListadoPorTipo").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuAltaComponente").addEventListener("click", mostrarFormulario);

    // Botones
    frmAltaTipo.btnAceptarAltaTipo.addEventListener("click", procesarAltaTipo);
    frmBuscarComponente.btnBuscarComponente.addEventListener("click", procesarBuscarComponente);
    frmListadoTipo.btnAceptarListadoPorTipo.addEventListener("click", procesarListadoPorTipo);
    frmModificarComponente.btnAceptarModComponente.addEventListener("click", procesarModificarComponente);
    frmAltaComponente.btnAceptarAltaComponente.addEventListener("click", procesarAltaComponente);
}

function mostrarFormulario(oEvento) {
    let opcionMenu = oEvento.target.id; // Opción de menú pulsada (su id)

    ocultarFormularios();

    switch (opcionMenu) {
        case "mnuAltaTipo":
            frmAltaTipo.style.display = "block";
            break;
        case "mnuBuscarComponente":
            frmBuscarComponente.style.display = "block";
            break;
        case "mnuListadoPorTipo":
            frmListadoTipo.style.display = "block";
            actualizarDesplegableTipos(undefined);
            break;
        case "mnuAltaComponente":
            frmAltaComponente.style.display = "block";
            actualizarDesplegableTipos(undefined);
            break;
    }
}

function ocultarFormularios() {
    frmAltaTipo.style.display = "none";
    frmBuscarComponente.style.display = "none";
    frmListadoTipo.style.display = "none";
    frmModificarComponente.style.display = "none";
    frmAltaComponente.style.display = "none";
    // Borrado del contenido de capas con resultados
    document.querySelector("#resultadoBusqueda").innerHTML = "";
    document.querySelector("#listados").innerHTML = "";
}

async function actualizarDesplegableTipos(idTipoSeleccionado) {

    let respuesta = await oEmpresa.getTipos();
    let options = "";

    for (let tipo of respuesta.datos) {
        if (idTipoSeleccionado && idTipoSeleccionado == tipo.idtipo) { // Si llega el parámetro ( != undefined )
            options += "<option selected value='" + tipo.idtipo + "' >" + tipo.tipo + "</option>";
        } else {
            options += "<option value='" + tipo.idtipo + "' >" + tipo.tipo + "</option>";
        }

    }
    // Agrego los options generados a partir del contenido de la BD
    frmListadoTipo.lstTipo.innerHTML = options;
    // Aprovecho y actualizo todos los desplegables se vea o no el formulario
    frmModificarComponente.lstModTipo.innerHTML = options;
    frmAltaComponente.lstAltaTipo.innerHTML = options;
}

// Procesos de botones
async function procesarBuscarComponente() {
    if (validarBuscarComponente()) {
        let idComponente = parseInt(frmBuscarComponente.txtIdComponente.value.trim());

        let respuesta = await oEmpresa.buscarComponente(idComponente);

        if (respuesta.ok) { // Si NO hay error
            let resultadoBusqueda = document.querySelector("#resultadoBusqueda");

            // Escribimos resultado
            let tablaSalida = "<table class='table'>";
            tablaSalida += "<thead><tr><th>IDCOMPONENTE</th><th>NOMBRE</th><th>DESCRIPCION</th><th>PRECIO</th><th>TIPO</th><th>ACCION</th></tr></thead>";
            tablaSalida += "<tbody><tr>";
            tablaSalida += "<td>" + respuesta.datos.idcomponente + "</td>"
            tablaSalida += "<td>" + respuesta.datos.nombre + "</td>"
            tablaSalida += "<td>" + respuesta.datos.descripcion + "</td>"
            tablaSalida += "<td>" + respuesta.datos.precio + "</td>"
            tablaSalida += "<td>" + respuesta.datos.tipo + "</td>"
            tablaSalida += "<td><input type='button' class='btn btn-danger' value='Borrar' id='btnBorrarComponente' data-idcomponente='" + respuesta.datos.idcomponente + "'></td>";
            tablaSalida += "</tr></tbody></table>";

            resultadoBusqueda.innerHTML = tablaSalida;
            resultadoBusqueda.style.display = 'block';

            // Registrar evento para el botón borrar
            document.querySelector("#btnBorrarComponente").addEventListener("click", borrarComponente);

        } else { // Si hay error
            alert(respuesta.mensaje);
        }

    }
}

async function procesarListadoPorTipo() {
    // Recuperar idTipo seleccionado
    let idTipo = frmListadoTipo.lstTipo.value;

    let respuesta = await oEmpresa.listadoPorTipo(idTipo);

    let tabla = "<table class='table table-striped' id='listadoPorTipo'>";
    tabla += "<thead><tr><th>IDCOMPONENTE</th><th>NOMBRE</th><th>DESCRIPCION</th><th>PRECIO</th><th>TIPO</th><th>ACCION</th></tr></thead><tbody>";

    for (let componente of respuesta.datos) {
        tabla += "<tr><td>" + componente.idcomponente + "</td>";
        tabla += "<td>" + componente.nombre + "</td>";
        tabla += "<td>" + componente.descripcion + "</td>";
        tabla += "<td>" + componente.precio + "</td>";
        tabla += "<td>" + componente.tipo + "</td>";

        tabla += "<td><button class='btn btn-primary' data-componente='" + JSON.stringify(componente) + "'><i class='bi bi-pencil-square'></i></button></td></tr>";
    }

    tabla += "</tbody></table>";

    // Agregamos el contenido a la capa de listados
    document.querySelector("#listados").innerHTML = tabla;
    // Agregar manejador de evento para toda la tabla
    document.querySelector("#listadoPorTipo").addEventListener('click', procesarBotonEditarComponente);

}

function procesarBotonEditarComponente(oEvento) {
    let boton = null;

    // Verificamos si han hecho clic sobre el botón o el icono
    if (oEvento.target.nodeName == "I" || oEvento.target.nodeName == "button") {
        if (oEvento.target.nodeName == "I") {
            // Pulsacion sobre el icono
            boton = oEvento.target.parentElement; // El padre es el boton
        } else {
            boton = oEvento.target;
        }

        // 1.Ocultar todos los formularios
        ocultarFormularios();
        // 2.Mostrar el formulario de modificación de componentes
        frmModificarComponente.style.display = "block";
        // 3. Rellenar los datos de este formulario con los del componente
        let componente = JSON.parse(boton.dataset.componente);

        frmModificarComponente.txtModIdComponente.value = componente.idcomponente;
        frmModificarComponente.txtModNombre.value = componente.nombre;
        frmModificarComponente.txtModDescripcion.value = componente.descripcion;
        frmModificarComponente.txtModPrecio.value = componente.precio;
        actualizarDesplegableTipos(componente.idtipo);


    }
}

async function procesarModificarComponente() {
    // Recuperar datos del formulario frmModificarComponente
    let idComponente = frmModificarComponente.txtModIdComponente.value.trim();
    let nombre = frmModificarComponente.txtModNombre.value.trim();
    let descripcion = frmModificarComponente.txtModDescripcion.value.trim();
    let precio = parseFloat(frmModificarComponente.txtModPrecio.value.trim());
    let idTipo = frmModificarComponente.lstModTipo.value;

    // Validar datos del formulario
    if (validarModComponente()) {
        let respuesta = await oEmpresa.modificarComponente(new Componente(idComponente, nombre, descripcion, precio, idTipo));

        alert(respuesta.mensaje);

        if (!respuesta.error) { // Si NO hay error
            //Resetear formulario
            frmModificarComponente.reset();
            // Ocultar el formulario
            frmModificarComponente.style.display = "none";
        }

    }
}

function validarModComponente() {
    // Recuperar datos del formulario frmModificarComponente
    let idComponente = frmModificarComponente.txtModIdComponente.value.trim();
    let nombre = frmModificarComponente.txtModNombre.value.trim();
    let descripcion = frmModificarComponente.txtModDescripcion.value.trim();
    let precio = parseFloat(frmModificarComponente.txtModPrecio.value.trim());
    let idTipo = parseInt(frmModificarComponente.lstModTipo.value);

    let valido = true;
    let errores = "";

    if (isNaN(idComponente)) {
        valido = false;
        errores += "El identificador de componente debe ser numérico";
    }

    if (isNaN(precio)) {
        valido = false;
        errores += "El precio del componente debe ser numérico";
    }

    if (nombre.length == 0 || descripcion.length == 0) {
        valido = false;
        errores += "El nombre y la descripción no pueden estar vacíos";
    }

    if (!valido) {
        // Hay errores
        alert(errores);
    }

    return valido;
}


async function borrarComponente(oEvento) {
    let boton = oEvento.target;
    let idComponente = boton.dataset.idcomponente;

    let respuesta = await oEmpresa.borrarComponente(idComponente);

    alert(respuesta.mensaje);

    if (respuesta.ok) { // Si NO hay error
        // Borrado de la tabla html
        document.querySelector("#resultadoBusqueda").innerHTML = "";
    }

}

function validarBuscarComponente() {
    let idComponente = parseInt(frmBuscarComponente.txtIdComponente.value.trim());
    let valido = true;
    let errores = "";

    if (isNaN(idComponente)) {
        valido = false;
        errores += "El identificador de componente debe ser numérico";
    }

    if (!valido) {
        // Hay errores
        alert(errores);
    }

    return valido;
}


async function procesarAltaTipo() {
    if (validarAltaTipo()) {
        let tipo = frmAltaTipo.txtTipo.value.trim();
        let descripcion = frmAltaTipo.txtDescripcion.value.trim();

        let respuesta = await oEmpresa.altaTipo(new Tipo(null, tipo, descripcion));

        alert(respuesta.mensaje);

        if (!respuesta.error) { // Si NO hay error
            //Resetear formulario
            frmAltaTipo.reset();
            // Ocultar el formulario
            frmAltaTipo.style.display = "none";
        }
    }
}

function validarAltaTipo() {
    let tipo = frmAltaTipo.txtTipo.value.trim();
    let descripcion = frmAltaTipo.txtDescripcion.value.trim();
    let valido = true;
    let errores = "";

    if (tipo.length == 0 || descripcion.length == 0) {
        valido = false;
        errores += "Faltan datos por rellenar";
    }

    if (!valido) {
        // Hay errores
        alert(errores);
    }

    return valido;
}

// Mostrar listado de tipos de componentes
function mostrarListadoTipo() {
    open("listado_tipos.html ");
}

// Mostrar listado de componentes
function mostrarListadoComponentes() {
    open("listado_componentes.html ");
}


async function procesarAltaComponente() {
    // Recuperar datos del formulario frmAltaComponente
    let nombre = frmAltaComponente.txtAltaNombre.value.trim();
    let descripcion = frmAltaComponente.txtAltaDescripcion.value.trim();
    let precio = parseFloat(frmAltaComponente.txtAltaPrecio.value.trim());
    let idTipo = parseInt(frmAltaComponente.lstAltaTipo.value);

    // Validar datos del formulario
    if (validarAltaComponente()) {
        let respuesta = await oEmpresa.altaComponente(new Componente(null, nombre, descripcion, precio, idTipo)); 
        alert(respuesta.mensaje);

        if (respuesta.ok) { // Si NO hay error
            //Resetear formulario
            frmAltaComponente.reset();
            // Ocultar el formulario
            frmAltaComponente.style.display = "none";
        }

    }
}

function validarAltaComponente() {
    // Recuperar datos del formulario frmModificarComponente
    let nombre = frmAltaComponente.txtAltaNombre.value.trim();
    let descripcion = frmAltaComponente.txtAltaDescripcion.value.trim();
    let precio = parseFloat(frmAltaComponente.txtAltaPrecio.value.trim());
    let idTipo = frmAltaComponente.lstAltaTipo.value;

    let valido = true;
    let errores = "";

    if (isNaN(precio)) {
        valido = false;
        errores += "El precio del componente debe ser numérico";
    }

    if (nombre.length == 0 || descripcion.length == 0) {
        valido = false;
        errores += "El nombre y la descripción no pueden estar vacíos";
    }

    if (!valido) {
        // Hay errores
        alert(errores);
    }

    return valido;
}
