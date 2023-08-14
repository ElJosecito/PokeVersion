import React from "react";
import { useState, useEffect } from "react";

//import fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Login() {
  //Variables para el Register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  //
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [haveAccount, setHaveAccount] = useState(false);

  //Variables para el Login
  const[currentLogin, setCurrentLogin] = useState(0);

  const procesarDatos = (e) => {
    e.preventDefault();

    // Verificar si el email ya existe en el localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userWithEmail = existingUsers.find((user) => user.email === email);

    if (userWithEmail) {
      setError(true);
      setErrorMessage("El email ya está registrado");
      return;
    }

    // Si el email es único, agregar el usuario al localStorage
    const newUser = {
      email: email,
      name: name,
      password: password,
      favoritos: [],
    };

    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setError(null); // Limpiar el mensaje de error
    setHaveAccount(!haveAccount);
    limpiarDatosRegister();
  };

  const limpiarDatosLogin = () => {
    document.getElementById("login-form").reset();
    setHaveAccount(!haveAccount);
  };

  const limpiarDatosRegister = () => {
    document.getElementById("register-form").reset();
    setHaveAccount(!haveAccount);
  }

  const handlerEmail = (e) => {
    setEmail(e.target.value.toLowerCase().trim());
    // console.log(e.target.value.toLowerCase());
  };

  const handlerName = (e) => {
    setName(e.target.value.toLowerCase().trim());
    // console.log(e.target.value.toLowerCase());
  };

  const handlerPassword = (e) => {
    setPassword(e.target.value.toLowerCase().trim());
    // console.log(e.target.value.toLowerCase());
  };


  //variables para el login
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const procesarDatosLogin = (e) => {
    e.preventDefault();    
    
    // Verificar si el email ya existe en el localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users"));

    const userWithEmail = existingUsers.find(
      (user) => user.email === emailLogin
    );
    const userWithPassword = existingUsers.find(
      (user) => user.password === passwordLogin
    );

    if (userWithEmail && userWithPassword) {
      console.log("Login exitoso");
      console.log(userWithEmail);

      
      localStorage.setItem("currentUser", emailLogin);
      localStorage.setItem("token", 1);
      
      
      window.location.href = "/pokemonlist";
    } else {
      console.log("Usuario o contraseña incorrectos");
      setError(true)
      setErrorMessage("Usuario o contraseña incorrectos")
      localStorage.setItem("token", 0);
    }
    
    
  };

  const handlerEmailLogin = (e) => {
    setEmailLogin(e.target.value.toLowerCase().trim());
    // console.log(e.target.value.toLowerCase().trim());
  };

  const handlerPasswordLogin = (e) => {
    setPasswordLogin(e.target.value);
    // console.log(e.target.value.toLowerCase().trim());
  };

  useEffect(() => {

    if (error) {
      alert(errorMessage);
    }

    setTimeout(() => {
      setError(false);
      setErrorMessage("");
    }, 3000);

  }, [error]);

  return (
    <>
      <section className="w-full min-h-screen h-fit flex justify-center bg-[#F2E9E4]">
        <div className="max-w-screen-xl w-full min-h-full flex justify-center items-center">
          {haveAccount ? (
            <div className="max-w-xl w-full flex flex-col items-center">
              
              <h2 className="text-[#22223B] font-bold text-3xl ">
                Registrarse
              </h2>
              <form
                action="submit"
                id="register-form"
                onSubmit={procesarDatos}
                className=" w-80 text-center"
              >
                <div className="my-10 mx-2 border-b-4 border-solid border-[#22223B]">
                  <input
                    type="email"
                    placeholder="Correo"
                    onChange={handlerEmail}
                    className="h-10 w-full focus:outline-none px-3 bg-transparent text-lg font-semibold text-[#22223B]"
                  />
                </div>
                <div className="my-10 mx-2 border-b-4 border-solid border-[#22223B]">
                  <input
                    type="text"
                    placeholder="Nombre"
                    onChange={handlerName}
                    className="h-10 w-full focus:outline-none px-3 bg-transparent text-lg font-semibold text-[#22223B]"
                  />
                </div>

                <div className="my-10 mx-2 border-b-4 border-solid border-[#22223B]">
                  <input
                    type="password"
                    placeholder="Contraseña"
                    onChange={handlerPassword}
                    className="h-10 w-full focus:outline-none px-3 bg-transparent text-lg font-semibold text-[#22223B]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 w-40 text-white font-bold py-3 text-xl rounded-lg hover:bg-blue-600 transition-colors duration-150"
                >
                  Registrate
                </button>
              </form>

              <div className="flex justify-between py-4">
                <p className="text-[#22223B] font-semibold text-lg mb-5">
                  ¿Ya tienes una cuenta?{" "}
                  <span
                    onClick={limpiarDatosRegister}
                    className="text-blue-600 hover:text-blue-700 hover:cursor-pointer"
                  >
                    Log in
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-xl w-full flex flex-col items-center">
              
              <h2 className="text-[#22223B] font-bold text-3xl">
                Ingresar
              </h2>
              <form
                action="submit"
                id="login-form"
                onSubmit={procesarDatosLogin}
                className=" w-80 text-center"
              >
                <div className="my-10 mx-2 border-b-4 border-solid border-[#22223B]">
                  <input type="email" placeholder="Email" onChange={handlerEmailLogin} className="h-10 w-full focus:outline-none px-3 bg-transparent text-lg font-semibold text-[#22223B]"/>
                </div>
                <div className="my-10 mx-2 border-b-4 border-solid border-[#22223B]">
                  <input type="password" placeholder="Contraseña" onChange={handlerPasswordLogin} className="h-10 w-full focus:outline-none px-3 bg-transparent text-lg font-semibold text-[#22223B]" />
                </div>
                <button type="submit"  className="bg-blue-500 w-40 text-white font-bold py-3 text-xl rounded-lg hover:bg-blue-600 transition-colors duration-150">Ingresar</button>
              </form>

              <div className="flex justify-between py-4">
                <p className="text-[#22223B] font-semibold text-lg mb-5">
                  ¿No Tienes una cuenta?{" "}
                  <span
                    onClick={limpiarDatosLogin}
                    className="text-blue-600 hover:text-blue-700 hover:cursor-pointer"
                  >
                    Registrate
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Login;
