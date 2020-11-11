import React, { createContext, useReducer } from "react";
import { pokemonReducer } from "../reducers/PokemonReducer";

export const PokemonContext = createContext();

const pokemonState = {
    defaultImagePath: "/pokemons/poke-01.png", 
    pokemons: []
};

const PokemonContextProvider = props => {

    const [state, dispatch] = useReducer(pokemonReducer, pokemonState);

    return (
        <PokemonContext.Provider value={{ state, dispatch }}>
            {props.children}
        </PokemonContext.Provider>
    );
}

export default PokemonContextProvider;

