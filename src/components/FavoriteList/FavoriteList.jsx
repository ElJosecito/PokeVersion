import React, { useEffect } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { fetchFavorite } from "../../Redux/slices/GetFavoriteSlice";

//import components
import FavCard from "../Cards/FavoriteCard/FavCard";

function FavoriteList() {
  const dispatch = useDispatch();
  const favPokemon = useSelector((state) => state.GetFavoritePokemon.list);



  useEffect(() => {
    const existingUsers = JSON.parse(localStorage.getItem("users"));

    const currentUser = localStorage.getItem("currentUser");

    const userWithEmail = existingUsers.find(
      (user) => user.email === currentUser
    );

    const array = userWithEmail.favoritos;

    dispatch(fetchFavorite(array));
  }, [dispatch]);
  return (
    <section className="w-full min-h-screen h-fit flex justify-center bg-[#F2E9E4] pt-16">
      <div className="max-w-screen-xl w-full min-h-full">
        <div className="w-full py-10 flex flex-wrap justify-center">
          {favPokemon.length > 0 ? (
            favPokemon.map((pokemon) => {
              return (
                <FavCard
                  key={pokemon.id}
                  id={pokemon.id}
                  name={pokemon.name}
                  img={pokemon.sprites.front_default}
                />
              );
            })
          ) : (
            <h1 className="text-2xl text-center">
              No tienes pokemones favoritos
            </h1>
          )}
        </div>
      </div>
    </section>
  );
}

export default FavoriteList;
