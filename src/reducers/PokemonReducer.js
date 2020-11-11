import env from "../env";

export const pokemonReducer = (state, action) => {
    const { type, value } = action;
    switch (type) {
        case env.ACTION_CREATE_CANDIDATES:
            return {
                ...state,
                pokemons: value
            }
        case env.ACTION_UPDATE_CANDIDATES:
            return {
                ...state,
                pokemons: value
            }
        case env.ACTION_UPDATE_FORM_IMAGE:
            return {
                ...state,
                defaultImagePath: value
            }
        default:
            return state;
    }
};
