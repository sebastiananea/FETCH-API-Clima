const container  = document.querySelector('.container');
const resultado  = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () =>{
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e){
    e.preventDefault()

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad == "" || pais == ""){
        mostrarError('Ambos campos son obligatorios')
    }
    else{
        consultarApi(ciudad, pais);
    }



}

function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100');
    if(!alerta){
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4','py-3', 'rounded', 'max-wd-md', 'mx-auto', 'mt-6', 'text-center')
        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `
        container.appendChild(alerta)
        setTimeout(() => {
            alerta.remove()
        }, 5000);
    
    }
}

function consultarApi(ciudad, pais){
    const appId = '783dd495228f8e22ba14feba2b8048c9';
    const apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`
    Spinner();
    fetch(apiUrl)
        .then( respuesta => respuesta.json() )
        .then( datos => {
            console.log()
            limpiarHTML();
            if(datos.cod == "404"){
                mostrarError('Ciudad no encontrada!')
            }
            mostrarClima(datos)
        })
}

function mostrarClima(datos){
    const { name, main:
          { temp, 
            temp_max, 
            temp_min}}= datos
    const ciudad      = name;
    const centigrados = kelvinACelcius(temp);
    const max     = kelvinACelcius(temp_max);
    const min     = kelvinACelcius(temp_min); 

    //Nombre ciudad
    const nombreCiudad = document.createElement('p');
    nombreCiudad.innerHTML= `
            La temperatura en ${ciudad} es:
    `
    nombreCiudad.classList.add('font-bold', 'text-2xl')

    //Temperatura actual
    const actual      = document.createElement('p');
    actual.innerHTML  = `
        ${centigrados}&#8451
    `
    actual.classList.add('font-bold', 'text-6xl')

    //temperatura maxima
    const tempMax = document.createElement('p');
    tempMax.innerHTML = `
            ${max}&#8451
    `
    tempMax.classList.add('text-xl')

    //temperatura minima
    const tempMin = document.createElement('p');
    tempMin.innerHTML = `
            ${min}&#8451
    `
    tempMin.classList.add('text-xl')

    
    const resultadoDiv = document.createElement('div')
    resultadoDiv.classList.add('text-center', 'text-white')
    resultadoDiv.appendChild(nombreCiudad) 
    resultadoDiv.appendChild(actual)   
    resultadoDiv.appendChild(tempMax)
    resultadoDiv.appendChild(tempMin)
    resultado.appendChild(resultadoDiv)

}

function kelvinACelcius (temperatura){
    celcius = parseInt(temperatura -  273.5)
    return celcius
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

function Spinner(){
    limpiarHTML();
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML = `
    <div class="sk-circle">
    <div class="sk-circle1 sk-child"></div>
    <div class="sk-circle2 sk-child"></div>
    <div class="sk-circle3 sk-child"></div>
    <div class="sk-circle4 sk-child"></div>
    <div class="sk-circle5 sk-child"></div>
    <div class="sk-circle6 sk-child"></div>
    <div class="sk-circle7 sk-child"></div>
    <div class="sk-circle8 sk-child"></div>
    <div class="sk-circle9 sk-child"></div>
    <div class="sk-circle10 sk-child"></div>
    <div class="sk-circle11 sk-child"></div>
    <div class="sk-circle12 sk-child"></div>
    </div>
    `
    resultado.appendChild(divSpinner)
}