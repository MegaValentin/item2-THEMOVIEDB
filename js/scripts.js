const apiKey = 'api_key=f20c7a97c2da5bb0664de5237dddda8a'
const baseURL = 'https://api.themoviedb.org/3'
const imgURL = 'https://image.tmdb.org/t/p/w500'

const API_URL = baseURL + '/person/popular?' + apiKey + '&page=7'
console.log(API_URL)
const main = document.getElementById('main')
const div = document.getElementById('info')

getPelicula(API_URL)
function getPelicula(url){
    fetch(url).then(res => res.json()).then(dato => {
        console.log(dato.results)
        mostrarPelicula(dato.results)
    })
}

function mostrarPelicula(dato){
    main.innerHTML = ` `

    dato.forEach(persona => {
        const {name, profile_path, popularity, id, known_for_department, biography, known_for } = persona;
        const personaDiv = document.createElement('div');
        personaDiv.classList.add('card-actores');
        console.log(`${name}`)
        personaDiv.innerHTML =  
        `
            
       
        <img src="${imgURL + profile_path}" alt="${name}">
        <div class="actor-info">
            <h3>${name}</h3>
            <span class="seguidores">${popularity}</span>
        </div>
        <div class="vista-general">
            <h3>${name}</h3>
            
            <br>
            <button class="leer-mas" id="${id}">Leer mas</button>
        </div>

       
        
        `;
        main.appendChild(personaDiv);
        
        document.getElementById(id).addEventListener('click', () =>{
            console.log(id);
            
            abrirNav(persona)
        })
    });
}

const cubirContenido = document.getElementById('cubrir-contenido');
function abrirNav(persona){
    let id = persona.id;
    

    fetch(baseURL + `/person/${id}?` + apiKey).then(res => res.json()).then(personaData => {
        
        
        
        if(personaData){
            document.getElementById("informacion").style.width = "100%";
            posters = []
            nombrePosters = []
            for(conocido in persona.known_for){
                const poster= imgURL + persona.known_for[conocido].poster_path;
                const nombrePoster = persona.known_for[conocido].name;
                posters.push(poster)
                nombrePosters.push(nombrePoster)
                
            }
            //console.log(`${property}: ${serieData[property]}`);
            cubirContenido.innerHTML = `
            <div class="contenido-actor">
                <div class="poster-actor">
                    <img src="${imgURL + personaData.profile_path}" alt="${personaData.name}">  
                </div>
                <div class="informacion-actor">
                    <h1 class="nombre-actor">${personaData.name}</h1>
                    <br>
                    <div class="bloque-rol">
                        <span class="rol span">${personaData.known_for_department}</span>
                    </div>
                    <div class="bloque-biografia">
                        <h4 class="texto">Biography</h4>
                        <p class="biografia">${personaData.biography}</p>
                    </div>
                    <div class="bloque-posters">
                        <img src="${posters[0]}" alt="${nombrePosters[0]}" class="posterPelicula">  
                        <img src="${posters[1]}" alt="${nombrePosters[1]}" class="posterPelicula">  
                        <img src="${posters[2]}" alt="${nombrePosters[2]}" class="posterPelicula">  
                    </div>
                </div>

            </div> 
                

            ` ;
        }else{
            cubirContenido.innerHTML = `
                <div class="notfound">
                    <h1>Error</h1>
                </div>
            ` 
        }
        
    })
}

function cerrarNav(){
    document.getElementById("informacion").style.width = "0%";
}