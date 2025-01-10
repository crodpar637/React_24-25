"use strict";

// const rutaBackend = location.origin + "/api";
const rutaBackend = "http://localhost:3000" + "/api";

/**
 * Realiza peticiones AJAX de tipo GET
 * @param {string} url 
 * @param {FormData} parametros - Objeto FormData con los parámetros de la llamada 
 * @returns response
 */

async function peticionGET(url, parametros) {
    // Creamos el objeto URL que contiene la dirección url de la petición
    // y los datos que enviamos con la petición
    let oURL = new URL(rutaBackend);
    oURL.pathname += url; // por ejemplo "/componentes/:id" --> http://localhost:3000/api/componentes/:id

    // Agregamos los datos de los parámetros que vienen en un objeto FormData 
    for (let [clave, valor] of parametros) {
        oURL.searchParams.append(clave, valor);
    } // http://localhost:3000/api/componentes/:id?p1=v1&p2=v2

    // Finalmente hacemos la petición AJAX con el método fetch
    let respuestaServidor = await fetch(oURL, { method: "GET" });
    let response; // Datos devueltos por el servidor o datos de error

    if (respuestaServidor.ok) {  // Si es una respuesta http OK (200)

         // JSON.parse de los datos recibidos
         response = await respuestaServidor.json();

    } else { // Respuesta distinta de http OK (200)
        
        if (respuestaServidor.status == 404){
            // JSON.parse de los datos recibidos
            response = await respuestaServidor.json();
            console.warn("Petición: " + oURL.toString() + " Respuesta: " + respuestaServidor.status);
        } else{
            response = {
                ok: false,
                mensaje: "Error al acceder al acceder al servidor (STATUS != 200..299) Status: " + respuestaServidor.status,
                datos: null
            };
            console.error("Petición: " + oURL.toString() + " Respuesta: " + respuestaServidor.status);
        }       
    }

    return response;
}

/**
 * Realiza peticiones AJAX de tipo POST
 * @param {string} url 
 * @param {FormData} parametros - Objeto FormData con los parámetros de la llamada 
 * @returns 
 */
async function peticionPOST(url, parametros){
    // Creamos el objeto URL que contiene la dirección url de la petición
    let oURL = new URL(rutaBackend);
    oURL.pathname += url; 

    let respuestaServidor = await fetch(oURL, {
        body: parametros,  // objeto FormData
        method: "POST"
    });
    let response;

    if (respuestaServidor.ok) {  // Si es una respuesta http OK (200)

        // JSON.parse de los datos recibidos
        response = await respuestaServidor.json();

   } else { // Respuesta distinta de http OK (200)
       console.error("Error al acceder al acceder al servidor (STATUS != 200..299).Status: " + respuestaServidor.status);
       response = {
           ok: false,
           mensaje: "Error al acceder al acceder al servidor (STATUS != 200..299). Status: " + respuestaServidor.status,
           datos: null
       };
   }

   return response;
}

/**
 * Realiza peticiones AJAX de tipo DELETE
 * @param {string} url 
 * @param {FormData} parametros - Objeto FormData con los parámetros de la llamada 
 * @returns 
 */
async function peticionDELETE(url){
    // Creamos el objeto URL que contiene la dirección url de la petición
    let oURL = new URL(rutaBackend);
    oURL.pathname += url; 

    let respuestaServidor = await fetch(oURL, { method: "DELETE" });
    let response;

    if (respuestaServidor.ok) {  // Si es una respuesta http OK (204 en caso de DELETE)

        // No se reciben datos en caso de petición DELETE, así que construimos una respuesta
        response = {
            ok: true,
            mensaje: "Borrado realizado correctamente.",
            datos: null
        };

   } else { // Respuesta distinta de http OK (200)
       console.error("Error al acceder al acceder al servidor (STATUS != 200..299).Status: " + respuestaServidor.status);
       response = {
           ok: false,
           mensaje: "Error al acceder al acceder al servidor (STATUS != 200..299). Status: " + respuestaServidor.status,
           datos: null
       };
   }

   return response;
}


/**
 * Realiza peticiones AJAX de tipo POST enviando datos JSON
 * @param {string} url 
 * @param Objeto - Objeto que se envía en formato JSON 
 * @returns 
 */
async function peticionPOSTJSON(url, objeto){
    // Creamos el objeto URL que contiene la dirección url de la petición
    let oURL = new URL(rutaBackend);
    oURL.pathname += url; 

    let respuestaServidor = await fetch(oURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objeto),
    });
    let response;

    if (respuestaServidor.ok) {  // Si es una respuesta http OK (200)

        // JSON.parse de los datos recibidos
        response = await respuestaServidor.json();

   } else { // Respuesta distinta de http OK (200)
       console.error("Error al acceder al acceder al servidor (STATUS != 200..299).Status: " + respuestaServidor.status);
       response = {
           ok: false,
           mensaje: "Error al acceder al acceder al servidor (STATUS != 200..299). Status: " + respuestaServidor.status,
           datos: null
       };
   }

   return response;
}

export {peticionDELETE, peticionGET, peticionPOSTJSON, peticionPOST};