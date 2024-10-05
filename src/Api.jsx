import { useState, useEffect } from "react";

export async function getpoke() {
  //const [data,setData]=useState([]);
  //const [images,setImages]=useState([]);
  //If useState were used in getpoke, the data would change, but since getpoke is not a React component, it wouldn’t trigger any re-render in the UI, and the data wouldn’t be reflected in the interface.
  
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=8");//Main link where poke names available
        const data = await response.json();
     

        const pokemons = data.results.map((pokemon) =>  //each pokemon url fetched separately
          fetch(pokemon.url).then((res) => res.json())
        );

        const results = await Promise.all(pokemons);    //Promise.all is used here to wait for all the promises (each representing a fetch request) to resolve. It ensures that all Pokémon URLs have been fetched successfully before moving on to the next step.
        const images = results.map((pokemon) => pokemon.sprites.front_default );  //Creates a new array images containing the image urls for all pokemons
    
        console.log(images);
      
        return {images, data};

      } catch (error) {
        console.log("Error fetching data", error);
        return { images: [], data: { results: [] } }; 
      }
    

  

}
