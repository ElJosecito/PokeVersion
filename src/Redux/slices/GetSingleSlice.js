import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { list: [] };

const GetSinglePokemon = createSlice({
  name: "GetSinglePokemon",
  initialState,
  reducers: {
    setSinglePokemon: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setSinglePokemon } = GetSinglePokemon.actions;
export default GetSinglePokemon.reducer;

export const fetchSingle = (id) => async (dispatch) => {

    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        dispatch(setSinglePokemon(response.data));
        console.log(response.data);
      } catch (error) {
        // Si ocurre un error en la API, maneja el caso del bad request
        if (error.response && error.response.status === 404) {
          dispatch(setSinglePokemon({ error: "404" }));
        } else {
          dispatch(setSinglePokemon({ error: "unknown" }));
        }
        console.log(error);
      }
};
