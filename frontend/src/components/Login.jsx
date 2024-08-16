import { Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import "../estilos.css";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import axios from "axios";

function Login({ setLoggedUser }) {
  const navigation = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");

  const iniciarSesion = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://login-responsivo-fullstack.onrender.com/iniciar",
        {
          usuario: usuario,
          contraseña: contraseña,
        }
      );
      localStorage.setItem("token", response.data.token);
      setLoggedUser(usuario);
      alert("Login exitoso");
      navigation("/main");
    } catch (error) {
      if (error.response) {
        if (error.response === 409) {
          alert(error.response.data);
        } else {
          alert("Error al ingresar: " + error.response.data);
        }
      } else if (error.request) {
        alert("No se recibio respuesta del servidor");
      }
    }
  };

  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div className="grid grid-cols-2">
      <div className="col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 md:block hidden">
        <div className="h-screen bg-stone-950 flex justify-center items-center flex-col">
          <div className="mb-6">
            <h1 id="titulo" className="text-6xl font-bold text-white">
              ¡HOLA!
            </h1>
          </div>
          <div className="mb-20 px-8">
            <h2 className="text-base text-center text-white">
              Se parte de nosotros, inicia sesión en el siguiente formulario
            </h2>
          </div>
          <div data-aos="fade-up" className="flex justify-center">
            <img style={{ width: "350px" }} src="/fondo.png" alt="" />
          </div>
        </div>
      </div>

      <div className="col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1">
        <div className="h-screen flex justify-center items-center flex-col ">
          <div className="w-11/12 md:w-8/12">
            <div
              data-aos="fade-up-right"
              className="flex justify-center mb-16 block md:hidden"
            >
              <img style={{ width: "88px" }} src="/nave.png" alt="" />
            </div>
            <div className="mb-12 ">
              <h1
                id="titulo"
                className="text-center text-3xl font-bold md:text-5xl"
              >
                INICIO DE SESIÓN
              </h1>
            </div>
            <form onSubmit={iniciarSesion}>
              <div className="flex justify-center mb-5 px-12 md:px-2">
                <Input
                  required
                  value={usuario}
                  onChange={(e) => {
                    setUsuario(e.target.value);
                  }}
                  type="text"
                  label="Usuario"
                />
              </div>
              <div className="flex justify-center mb-12 px-12 md:px-2">
                <Input
                  required
                  value={contraseña}
                  onChange={(e) => {
                    setContraseña(e.target.value);
                  }}
                  type="password"
                  label="Contraseña"
                />
              </div>
              <div className="flex justify-center">
                <button type="submit" id="boton">
                  INGRESAR
                </button>
              </div>
            </form>
            <div className="flex justify-center mt-9 mb-2">
              <a href="#">
                <p className="text-center underline text-sm md:text-base">
                  ¿Olvidaste tu contraseña?
                </p>
              </a>
            </div>
            <div className="flex justify-center">
              <p className="text-sm md:text-base">
                ¿No puedes iniciar sesión?{" "}
                <a
                  id="mano"
                  className="text-center"
                  onClick={() => navigation("/registro")}
                >
                  <span className="underline">Pulsa aquí</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
