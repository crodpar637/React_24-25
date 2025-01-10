import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { peticionGET, peticionPOSTJSON } from '../utils/ajax';
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

function AltaComponente() {
    const objetoValidacion = { nombre: true, descripcion: true, precio: true };
    const [isCamposValidos, setCamposValidos] = useState(objetoValidacion);
    const [tipoComponente, setTipoComponente] = useState("");
    const [tiposComponente, setTiposComponente] = useState([]);
    const [isError, setIsError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setTipoComponente(event.target.value);
    };

    const handleSubmit = async (event) => {
        // Evito el envío de datos al servidor (no hay action) 
        // y tampoco quiero se recargue la página
        event.preventDefault();
        // Recuperar todos los datos de los input del formulario en un FormData
        const data = new FormData(event.currentTarget);

        if (validarDatos(data)) {
            // Construir objeto literal (lo ideal sería tener la clase)
            let oComponente = {
                idcomponente: null,
                nombre: data.get('nombre').trim(),
                descripcion: data.get('descripcion').trim(),
                precio: parseFloat(data.get('precio').trim()),
                idtipo: tipoComponente  // Componente controlado -- recojemos de variable de estado
            }
            // Llamada para registrar el componente en el backend
            // Se pasa el objeto que se enviará como JSON
            let respuesta = await peticionPOSTJSON("/componentes", oComponente);

            alert(respuesta.mensaje);

            if (respuesta.ok)
                navigate("/");
        }
    };

    function validarDatos(datos) {
        let bValido = true;
        // Copia del objeto de validación
        let errores = { ...objetoValidacion };

        // Recuperar los datos a validar
        let nombre = datos.get('nombre').trim();
        let descripcion = datos.get('descripcion').trim();
        let precio = datos.get('precio').trim();

        // Validar nombre, incluye espacios, apostrofes, el símbolo º , entre 1 y 50 caracteres
        let expNombre = /^[0-9A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]{1,25}$/;

        if (!expNombre.test(nombre)) { // Si no cumple la expresion regular
            bValido = false;

            // Copia el objeto y actualiza la propiedad nombre
            errores = { ...errores, nombre: false };
        }

        // Validar descripcion, incluye espacios, apostrofes, el símbolo º , entre 1 y 50 caracteres
        let expDescripcion = /^[0-9A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]{1,200}$/;

        if (!expDescripcion.test(descripcion)) { // Si no cumple la expresion regular
            bValido = false;

            // Copia el objeto y actualiza la propiedad apellidos
            errores = { ...errores, descripcion: false };
        }

        // Validar precio, numérico con dos decimales opcionales
        let expPrecio = /^\d+(\.\d{1,2})?$/;

        if (!expPrecio.test(precio)) { // Si no cumple la expresion regular
            bValido = false;

            // Copia el objeto y actualiza la propiedad direccion
            errores = { ...errores, precio: false };
        }

        if (!bValido)
            setCamposValidos(errores);

        return bValido;
    }

    useEffect(() => {

        async function fetchData() {
            try {
                let respuesta = await peticionGET("/tipos", new FormData());

                if (respuesta.ok) {
                    const datos = respuesta.datos;
                    
                    setTiposComponente(datos);
                    // Si vienen datos en el array de componentes
                    if(datos.length > 0){
                        // Establezco como seleccionado en el SELECT el primero
                        setTipoComponente(datos[0].idtipo);
                    }

                } else {
                    setIsError("Hubo un error al obtener los tipos de componente");
                }
            } catch (error) {
                setIsError("No pudimos hacer la solicitud los tipos de componente");
            }
        }

        fetchData();

    }, []); // Solo se ejecuta en el primer renderizado

    if (isError)
        return <h4>{isError}</h4>;

    return (<>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, p: 5 }} >
            <Typography variant="h4" gutterBottom>
                Alta de componente
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={7}>
                    <TextField
                        required
                        fullWidth
                        id="nombre"
                        label="Nombre"
                        name="nombre"
                        type="text"
                        inputProps={{ maxLength: 25 }}
                        error={!isCamposValidos.nombre}
                        helperText={!isCamposValidos.nombre && 'Compruebe el formato del nombre.'}
                    />
                </Grid>
                <Grid item xs={7}>
                    <TextField
                        required
                        fullWidth
                        name="descripcion"
                        label="Descripcion"
                        type="text"
                        inputProps={{ maxLength: 200 }}
                        id="descripcion"
                        error={!isCamposValidos.descripcion}
                        helperText={!isCamposValidos.descripcion && 'Compruebe el formato de la descripción'}
                    />
                </Grid>
                <Grid item xs={7}>
                    <TextField
                        required
                        fullWidth
                        name="precio"
                        label="Precio"
                        type="text"
                        id="precio"
                        error={!isCamposValidos.precio}
                        helperText={!isCamposValidos.precio && 'Escriba correctamente un importe'}
                    />
                </Grid>
                <Grid item xs={7}>
                    <FormControl fullWidth>
                        <InputLabel id="lblTipo">Tipo</InputLabel>
                        <Select
                            labelId="lblTipo"
                            id="tipo"
                            name="tipo"
                            value={tipoComponente}
                            label="Tipo"
                            onChange={handleChange}
                        >

                            {tiposComponente.map(tipo => <MenuItem
                                key={tipo.idtipo}
                                value={tipo.idtipo}>
                                {tipo.tipo}
                            </MenuItem>)}

                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3 }}>
                Aceptar
            </Button>
        </Box>
    </>);
}

export default AltaComponente;