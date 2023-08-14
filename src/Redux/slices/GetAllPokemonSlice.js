import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { list: [] };

const GetAllPokemon = createSlice({
  name: "GetAllPokemon",
  initialState,
  reducers: {
    setAllPokemon: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setAllPokemon } = GetAllPokemon.actions;
export default GetAllPokemon.reducer;

export const fetchAllPokemon = (id) => async (dispatch) => {
  const pokemonArray = [];

  for (let i = 1; i <= id; i++) {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${i}`
      );

      const pokemon = response.data;
      pokemonArray.push(pokemon);
    } catch (error) {
      console.log(error);
    }
  }

  dispatch(setAllPokemon(pokemonArray));
  console.log(pokemonArray);
};
