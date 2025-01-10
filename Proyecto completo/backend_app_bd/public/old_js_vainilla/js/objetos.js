class Tipo {
    constructor(idtipo, tipo, descripcion) {
        this.idtipo = idtipo;
        this.tipo = tipo;
        this.descripcion = descripcion;
    }
}

class Componente {
    constructor(idcomponente, nombre, descripcion, precio, idtipo) {
        this.idcomponente = idcomponente;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.idtipo = idtipo;
        
    }
}

class Empresa {
    async altaTipo(oTipo) {
        let datos = new FormData();

        datos.append("tipo", oTipo.tipo);
        datos.append("descripcion", oTipo.descripcion);

        let respuesta = await peticionPOST("alta_tipo.php", datos);

        return respuesta;
    }

    async modificarComponente(oComponente) {
        let datos = new FormData();

        // Se podría pasar campo a campo al servidor
        // pero en esta ocasión vamos a pasar todos los datos 
        // en un solo parámetro cuyos datos van en formato JSON
        datos.append("componente",JSON.stringify(oComponente));
       
        let respuesta = await peticionPOST("modificar_componente.php", datos);

        return respuesta;
    }
    
    async altaComponente(oComponente) {
        let datos = new FormData();

        // Se pasa el objeto que se enviará como JSON
        let respuesta = await peticionPOSTJSON("/componentes", oComponente);

        return respuesta;
    }

    async getTipos() {
        let datos = new FormData();

        let respuesta = await peticionGET("/tipos", datos);

        return respuesta;
    }

    async buscarComponente(idComponente) {
        let datos = new FormData();

        datos.append("relations", true); // Petición con datos relacionados

        let respuesta = await peticionGET(`/componentes/${idComponente}`, datos);

        return respuesta;
    }

    async borrarComponente(idComponente) {
        
        let respuesta = await peticionDELETE(`/componentes/${idComponente}`);

        return respuesta;
    }

    async listadoTipoComponentes() {
        let listado = "";

        let respuesta = await peticionGET("/tipos", new FormData());

        if (! respuesta.ok) {
            listado = respuesta.mensaje;
        } else {
            listado = "<table class='table table-striped'>";
            listado += "<thead><tr><th>IDTIPO</th><th>TIPO</th><th>DESCRIPCIÓN</th></tr></thead>";
            listado += "<tbody>";

            for (let tipo of respuesta.datos) {
                listado += "<tr><td>" + tipo.idtipo + "</td>";
                listado += "<td>" + tipo.tipo + "</td>";
                listado += "<td>" + tipo.descripcion + "</td></tr>";
            }
            listado += "</tbody></table>";
        }

        return listado;
    }

    async listadoPorTipo(idTipo){
        let datos = new FormData();

        datos.append("idtipo",idTipo);

        let respuesta = await peticionGET("get_componentes_por_tipo.php", datos);

        return respuesta;
    }

    async listadoComponentes() {
        let listado = "";

        let datos = new FormData();

        datos.append("listado", true);

        let respuesta = await peticionGET("/componentes", datos);

        if (! respuesta.ok) {
            listado = respuesta.mensaje;
        } else {
            listado = "<table class='table table-striped'>";
            listado += "<thead><tr><th>IDCOMPONENTE</th><th>NOMBRE</th><th>DESCRIPCIÓN</th><th>PRECIO</th><th>TIPO</th></tr></thead>";
            listado += "<tbody>";
            	
            for (let componente of respuesta.datos) {
                listado += "<tr><td>" + componente.idcomponente + "</td>";
                listado += "<td>" + componente.nombre + "</td>";
                listado += "<td>" + componente.descripcion + "</td>";
                listado += "<td>" + componente.precio + "</td>";
                listado += "<td>" + componente.tipo_descripcion + "</td></tr>";
            }
            listado += "</tbody></table>";
        }

        return listado;
    }
}
