import React from "react";
import { useEffect, useState } from "react";
import ListCard from "../Cards/ListCard/ListCard";

//redux
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPokemon } from "../../Redux/slices/GetAllPokemonSlice";
import { fetchSingle } from "../../Redux/slices/GetSingleSlice";

//import fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


function PokemonList() {
  const dispatch = useDispatch();
  const pokemonData = useSelector((state) => state.GetAllPokemon.list);

  const singlePokemon = useSelector((state) => state.GetSinglePokemon.list);

  const [loading, setLoading] = useState(false);

  // Variables para el infinite scroll
  const [prev, setPrev] = useState(0);
  const [next, setNext] = useState(10);
  let myVar = 0;

  // Variable para el input
  const [input, setInput] = useState("");

  //Se ejecuta para actualizar busqueda en submit
  const [search, setSearch] = useState("");

  //toggle para mostrar el resultado de la busqueda
  const [toggle, setToggle] = useState(false);

  //Funcion para actualizar busqueda en submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setInput(search);
    setToggle(!toggle);
  };

  useEffect(() => {
    dispatch(fetchAllPokemon(next));
  }, [dispatch, next]);

  useEffect(() => {
    if (pokemonData.length > 0) {
      setLoading(false);
    }
  }, [pokemonData]);

  useEffect(() => {
    if (input !== "") {
      dispatch(fetchSingle(input));
    }
  }, [dispatch, toggle]);

  // Función que verifica si se llegó al final de la página
  const isBottomOfPage = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    return scrollTop + windowHeight >= documentHeight;
  };

  // Función que se ejecuta cuando se llega al final de la página
  const handleChangeVariable = () => {
    if (isBottomOfPage()) {
      myVar += 10;
      setNext((myVar += 10));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleChangeVariable);
  }, []);

  //handler para el input
  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  return (
    <section className="w-full min-h-screen h-fit flex justify-center bg-[#F2E9E4] pt-16">
      <div className="max-w-screen-xl w-full min-h-full">
        <form action="" onSubmit={handleSubmit} className="flex items-center">
          <div className="my-10 mx-2 border-b-4 border-solid border-[#22223B]">
            <input type="text" placeholder="Busqueda por Id y nombre" onChange={handleInput} className="h-10 w-80 focus:outline-none px-3 bg-transparent text-lg font-semibold text-[#22223B]"/>
          </div>
          <button onChange={handleSubmit}  className="bg-blue-500 mx-4 w-20 text-white font-bold py-2 text-xl rounded-lg hover:bg-blue-600 transition-colors duration-150">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>

        <div className="w-full py-10 flex flex-wrap justify-center ">
          {input !== "" ? (
            // Renderizar el resultado de la búsqueda
            singlePokemon.error ? (
              singlePokemon.error === "404" ? (
                <p>No se ha encontrado ningún Pokémon con ese nombre o ID.</p>
              ) : (
                <p>Ocurrió un error al buscar el Pokémon.</p>
              )
            ) : (
              // Renderizar los detalles del Pokémon encontrado
              Object.keys(singlePokemon).length > 0 && (
                <ListCard
                  name={singlePokemon.name}
                  img={singlePokemon.sprites.front_default}
                  id={singlePokemon.id}
                />
              )
            )
          ) : (
            // Renderizar los Pokémon desde pokemonData
            pokemonData.length > 0 &&
            pokemonData
              .slice(prev, next)
              .map((pokemon, index) => (
                <ListCard
                  key={index}
                  name={pokemon.name}
                  img={pokemon.sprites.front_default}
                  id={pokemon.id}
                />
              ))
          )}
        </div>
      </div>
    </section>
  );
}

export default PokemonList;
