import { configureStore } from "@reduxjs/toolkit";

//slices
import GetAllPokemon from "./slices/GetAllPokemonSlice";
import GetSinglePokemon from "./slices/GetSingleSlice";
import GetFavoritePokemon from "./slices/GetFavoriteSlice";


export default configureStore({
    reducer: {
        GetAllPokemon: GetAllPokemon,
        GetSinglePokemon: GetSinglePokemon,
        GetFavoritePokemon: GetFavoritePokemon
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
      })
})
