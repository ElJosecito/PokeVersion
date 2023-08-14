import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { list: [] };

const GetFavoritePokemon = createSlice({
  name: "GetFavoritePokemon",
  initialState,
  reducers: {
    setFavoritePokemon: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setFavoritePokemon } = GetFavoritePokemon.actions;
export default GetFavoritePokemon.reducer;

export const fetchFavorite = (id) => async (dispatch) => {
  const array = id;
  let pokemonArray = [];

  for (let i = 0; i < array.length; i++) {
    try {
        const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${array[i]}`
          );
          const pokemon = response.data;
          pokemonArray.push(pokemon);
    } catch (error) {
        console.log(error)
    }
  }

  dispatch(setFavoritePokemon(pokemonArray));
    console.log(pokemonArray)
};
