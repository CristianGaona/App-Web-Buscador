// Variables 
const marca  = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo  = document.querySelector('#minimo');
const maximo  = document.querySelector('#maximo');
const puertas  = document.querySelector('#puertas');
const transmision  = document.querySelector('#transmision');
const color  = document.querySelector('#color');

// Contenedor para los resultados
const resultado = document.querySelector('#resultado');



const max = new Date().getFullYear();
const min  = max - 10;

const marcaArray = [] ;
const colorArray = [] ;

// Generar un objeto
const datosBusqueda = {
    marca : '',
    year : '',
    minimo : '',
    maximo : '',
    puertas : '',
    transmision : '',
    color : '',
}

//Eventos
document.addEventListener('DOMContentLoaded', ()=>{
    mostrarAutos(autos); // Muestra los automoviles al cargar la página

    // llena las opciones de años
    llenarSelect();

    // llenar la marca de la db de autos
    llenarMarca(marcaArray);

    // Llenar con los colores de la db de autos
    llenarColor(colorArray)
})

//Event listeners para los formularios de búsqueda 
marca.addEventListener('change', e =>{
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
  
});

year.addEventListener('change', e =>{
    datosBusqueda.year = e.target.value;
    filtrarAuto();
});

minimo.addEventListener('change', e=>{
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
});
maximo.addEventListener('change', e =>{
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
});
puertas.addEventListener('change', e =>{
    datosBusqueda.puertas = e.target.value;
    filtrarAuto();
});
transmision.addEventListener('change', e =>{
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
 
});
color.addEventListener('change', e =>{
    datosBusqueda.color = e.target.value;
    filtrarAuto();
});


// Funciones
// Permite recorre los datos de db.js
function mostrarAutos(autos){
    limpiarhtml() // elimina el HTML previo
    autos.forEach(auto => {
        const { marca, modelo, year, puertas, transmision, precio, color} = auto;
        const autoHTML = document.createElement('p');
        autoHTML.textContent = `
        ${marca} ${modelo} - ${year} - ${puertas} puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}
        `;
        marcaArray.push(marca);
        colorArray.push(color);
        

        // insertar en el html
        resultado.appendChild(autoHTML);
       
    })


}
// Limpiar HTML
function limpiarhtml(){
    while (resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }

}

//Generar los años para el Combox
function llenarSelect(){
    
    for(let i = max; i >= min; i--){
        const opcion = document.createElement('option'); // Crear eiqueta para el html
        opcion.value = i; // asignar el valor para cada opción
        opcion.textContent=i // asiganr el valor como texto para visualización
        year.appendChild(opcion) // Agregar la etiqueta creada al html

    }
}

// Función para llenar los comboBox con las marcas de autos
function llenarMarca(marca){
    // Filtrar o descartar datos repetidos del Array
    filtroRepetidos = marca.filter((valor, indice)=>{
        
       return marca.indexOf(valor) === indice;
    })
    filtroRepetidos.sort(); // ordenar
    for(let i = 0; i < filtroRepetidos.length; i++){
        const marcaSelect = document.createElement('option');
        marcaSelect.text = filtroRepetidos[i];
        this.marca.appendChild(marcaSelect)


    }
}


function llenarColor(color){
    // Filtrar o descartar datos repetidos del Array
    filtroRepetidos = color.filter((valor, indice)=>{
        
       return color.indexOf(valor) === indice;
    })
    filtroRepetidos.sort(); // ordenar
    for(let i = 0; i < filtroRepetidos.length; i++){
        const colorSelect = document.createElement('option');
        colorSelect.text = filtroRepetidos[i];
        this.color.appendChild(colorSelect)


    }
}

// Función de busqueda
function filtrarAuto(){
    const resultado = autos.filter( filtrarMarca  ).filter( filterYear)
                           .filter( filterMinimo).filter(filterMaximo).filter(filterPuertas)
                           .filter(filterTransmision).filter(filterColor);
    if (resultado.length){
        mostrarAutos(resultado);
    }else{
        noResultado();
    }
   
}

function noResultado(){
    limpiarhtml();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados, intenta con otros términos de búsqueda';
    resultado.appendChild(noResultado);
}

// Filtro por Marca
function filtrarMarca(auto){
    if ( datosBusqueda.marca){
        return auto.marca === datosBusqueda.marca;
    }

    return auto;
}

// Filtro por anio
function filterYear(auto){
    if ( datosBusqueda.year){
        return auto.year=== parseInt(datosBusqueda.year);
    }

    return auto;
}

// Filtro por minimo valor
function filterMinimo(auto){
    if ( datosBusqueda.minimo){
        return auto.precio >= datosBusqueda.minimo;
    }

    return auto;
}
// Filtro máximo valor
function filterMaximo(auto){
    if ( datosBusqueda.maximo){
        return auto.precio <= datosBusqueda.maximo;
    }

    return auto;
}

// Filtro puertas
function filterPuertas(auto){
    if ( datosBusqueda.puertas){
        return auto.puertas === parseInt(datosBusqueda.puertas);
    }

    return auto;
}

// Filtro puertas
function filterTransmision(auto){
    if ( datosBusqueda.transmision){
        return auto.transmision === datosBusqueda.transmision;
    }

    return auto;
}

// Filtro por color
function filterColor(auto){
    if ( datosBusqueda.color){
        return auto.color === datosBusqueda.color;
    }

    return auto;
}