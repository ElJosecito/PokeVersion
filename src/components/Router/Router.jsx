import React, { useEffect, useState } from "react";
//Import Router
import { Routes, Route, Navigate } from "react-router-dom";
//Import Provider
import { Provider } from "react-redux";
//Import Store
import store from "../../Redux/store";
//Import Components
import Login from "../Login/Login";
import PokemonList from "../PokemonList/PokemonList";
import FavoriteList from "../FavoriteList/FavoriteList";

//error 404
import NotFound from "../Cards/404/NotFound";

function Router() {
  const [render, setRender] = useState(Number(localStorage.getItem("token")));

  useEffect(() => {
    setRender(Number(localStorage.getItem("token")));
    if (render === 0) {
      localStorage.setItem("currentUser", null);
      localStorage.setItem("token", 0);
    }
  }, [render]);

  return (
    <Provider store={store}>
      <header className="w-full h-16 flex items-center px-5 fixed  bg-blue-500 z-50">
        <div className="max-w-screen-xl w-full h-full flex items-center">
          <h1 className="text-2xl font-bold text-white hidden md:block">PokeVersion</h1>
        </div>
        <ul className="flex items-center">
          {render === 1 ? (
            <>
              <li className="mx-3 md:text-xl font-bold text-white transition-colors duration-200 hover:text-[#22223B]">
                <a href="/pokemonlist">Pokemones</a>
              </li>
              <li className="mx-3 md:text-xl font-bold text-white transition-colors duration-200 hover:text-[#22223B]">
                <a href="/favoritelist">Favoritos</a>
              </li>
              {" "}
              <a
                href="/"
                onClick={() => {
                  localStorage.setItem("token", 0);
                }}
              >
                <li className="mx-3 p-2 w-20 bg-red-600 text-white text-center text-normal font-semibold rounded-lg">Logout</li>
              </a>
            </>
          ) : (
            <></>
          )}
        </ul>
      </header>
      <Routes>
        {localStorage.getItem("token") === "1" ? (
          <>
            <Route path="/pokemonlist" element={<PokemonList />} />
            <Route path="/favoritelist" element={<FavoriteList />} />
            <Route path="/" element={<Navigate to="/pokemonlist" />} />
          </>
        ) : (
          <>
            <Route path="/pokemonlist" element={<NotFound />} />
            <Route path="/favoritelist" element={<NotFound />} />
            <Route path="/" element={<Login />} />
          </>
        )}
      </Routes>
    </Provider>
  );
}

export default Router;
