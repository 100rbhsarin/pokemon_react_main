import { useEffect, useState } from "react"
import { PokemonCards } from "./PokemonCards"; 



export const Pokemon = ()=> {

    const [pokemon, setPokemon] = useState([])
    const [loding,setLoding] = useState(true)
    const [error, setError] = useState (null)
    const [search, setSearch] = useState("")

    const API = "https://pokeapi.co/api/v2/pokemon?offset=24&limit=204";


const fetchPokemon = async ()=>{
    try{
        const res = await fetch(API)
        const data = await res.json()
        // console.log(data)



        // const detailedPokemonData = await Promise.all(
        //     data.results.map(async (curPokemon) => {
        //         const res = await fetch(curPokemon.url);
        //         const pokemonData = await res.json();
        //         return pokemonData; // Collect the resolved data
        //     })
        // );
        // console.log(detailedPokemonData)

        const detailedPokemonData = data.results.map( async (curPokemon)=>{
            // console.log(curPokemon.url)
            const res = await fetch(curPokemon.url)
            const data = await res.json()
            return data
        })


       const getAllData = await Promise.all(detailedPokemonData)
    //    Ensures that the code waits for all the fetch operations to complete before proceeding
       console.log(getAllData)
       setPokemon(getAllData)
       setLoding(false)
}
    catch (error){
console.log(error)
setLoding(false)
setError(error)
    }
}



    useEffect (()=>{
        fetchPokemon()
    },[])


    // search process

    const PokemonSearch = pokemon.filter((curPokemon)=> 
        curPokemon.name.toLowerCase().includes(search.toLowerCase()))

    if(loding){
        return( 
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    if(error){
        return( 
            <div>
                <h1>{error.message}</h1>
            </div>
        )
    }





    return(
        <>
<section className="container">
    <header>
        <h1>Pokemon catch</h1>
    </header>
    
     
    <div className="pokemon-search">
          <input
            type="text"
            placeholder="search Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
   

    <div>
        <ul className="cards">
        {/* {pokemon.map((curPokemon)=>{ */}

            {PokemonSearch.map((curPokemon)=>{

               return <PokemonCards 
               key={curPokemon.id}
                pokemonData={curPokemon}
                />
            })}
        </ul>
    </div>
</section>
        </>
    )
}