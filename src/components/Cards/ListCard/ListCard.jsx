import React from "react";
//Import Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Import Icons
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartNoSolid } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

//useState
import { useState, useEffect } from "react";

//Import Aos


//component
function ListCard({ name, img, id }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const transformarNumero = (numero, longitud) => {
    const numeroStr = numero.toString();
    const cerosFaltantes = Math.max(0, longitud - numeroStr.length);
    const ceros = "0".repeat(cerosFaltantes);
    return `#${ceros}${numeroStr}`;
  };

  const handlerFavorite = () => {
    const updatedIsFavorite = !isFavorite;
    setIsFavorite(updatedIsFavorite);

    const existingUsers = JSON.parse(localStorage.getItem("users"));
    const currentUser = localStorage.getItem("currentUser");

    if (existingUsers && currentUser) {
      const userWithEmail = existingUsers.find(
        (user) => user.email === currentUser
      );

      if (userWithEmail) {
        const newFavoritos = updatedIsFavorite
          ? [...userWithEmail.favoritos, id]
          : userWithEmail.favoritos.filter((favId) => favId !== id);

        userWithEmail.favoritos = newFavoritos;

        // Actualizar el array de usuarios en el localStorage
        localStorage.setItem("users", JSON.stringify(existingUsers));
      }
    }
  };

  useEffect(() => {
    // Verificar si el número está en el array de favoritos
    const existingUsers = JSON.parse(localStorage.getItem("users"));
    const currentUser = localStorage.getItem("currentUser");
    const userWithEmail = existingUsers.find(
      (user) => user.email === currentUser
    );

    const numeroBuscado = id; // Cambia esto al número que quieras buscar
    const contieneNumero = userWithEmail.favoritos.includes(numeroBuscado);

    if (contieneNumero) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, []);

  useEffect(() => {
    
  }, []);

  return (
    <div className="w-72 h-96 my-10 mx-5 relative " data-aos="fade-left">
      <div className="absolute w-72 ">
        <img src={img} alt={name} className="w-full" />
      </div>
      <div className="w-full flex justify-between px-5 py-2 z-10 relative">
        <h2 className="font-bold text-lg">{transformarNumero(id, 4)}</h2>
        <p>
          
        </p>
      </div>
      <div className="relative z-10 h-64 flex justify-center items-end">
        <h3 className="font-black text-3xl mb-3">{name}</h3>
      </div>
      <div className="w-full flex justify-center py-5">
        
          {!isFavorite ? (
            <FontAwesomeIcon
              icon={faHeartNoSolid}
              className="text-red-600 text-3xl cursor-pointer"
              onClick={handlerFavorite}
            />
          ) : (
            <FontAwesomeIcon
              icon={faHeart}
              className="text-red-600 text-3xl cursor-pointer"
              onClick={handlerFavorite}
            />
          )}
      </div>
    </div>
  );
}

export default ListCard;
