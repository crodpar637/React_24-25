
import { Chart, ChartTitle, ChartSeries, ChartSeriesItem, ChartCategoryAxis, ChartCategoryAxisTitle, ChartCategoryAxisItem } from '@progress/kendo-react-charts';
import 'hammerjs';
import { useEffect, useState } from 'react';
import { peticionGET } from '../utils/ajax.js';

// const firstSeries = [1, 12, -2, 34, 23];
// const categories = ["DISCOS" ,"MEMORIAS" ,"PLACAS BASE","PROCESADORES" ,"REDES" ];

function Grafica() {
    const [categorias,setCategorias] = useState([]);
    const [serieDatos,setSerieDatos] = useState([]);

    useEffect(() => {

        async function fetchData() {
            try {
                let parametros = new FormData();
                parametros.append("grafica","true");

                let respuesta = await peticionGET("/componentes", parametros);

                if (respuesta.ok) {
                    const datos = respuesta.datos;
                    let categoriasAux = [];
                    let serieDatosAux = [];

                    for ( let {tipo, stock} of datos){
                        categoriasAux.push(tipo);
                        serieDatosAux.push(stock);
                    }
                    
                    setCategorias(categoriasAux);
                    setSerieDatos(serieDatosAux);

                } else {
                   alert("Hubo un error al obtener los datos de componentes");
                }
            } catch (error) {
               alert("No pudimos hacer la solicitud los datos de componentes");
            }
        }

        fetchData();

    }, []); // Solo se ejecuta en el primer renderizado



    return (<Chart>
        <ChartTitle text="Unidades en stock" />
        <ChartCategoryAxis>
            <ChartCategoryAxisItem categories={categorias}>
                <ChartCategoryAxisTitle text="Tipos de componentes" />
            </ChartCategoryAxisItem>
        </ChartCategoryAxis>
        <ChartSeries>
            <ChartSeriesItem type="column" gap={2} spacing={0.25} data={serieDatos} />
            {/* <ChartSeriesItem type="bar" data={secondSeries} />
            <ChartSeriesItem type="bar" data={thirdSeries} />
            <ChartSeriesItem type="bar" data={fourthSeries} /> */}
        </ChartSeries>
    </Chart>)
}

export default Grafica;