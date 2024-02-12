import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Alerta from "../components/Alerta";
export default function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();

  const [errores, setErrores] = useState([]);
  const { login } = useAuth({
    middleware: "guest",
    url: "/",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    login(datos, setErrores);
  };
  return (
    <>
      <h1 className="text-4xl font-black">Iniciar Sesión</h1>
      <p className="">Para crear un pedido debes iniciar sesión</p>
      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form action="" className="" onSubmit={handleSubmit} noValidate>
          {errores
            ? errores.map((error, index) => (
                <Alerta key={index}>{error}</Alerta>
              ))
            : null}
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="email">
              Correo:
            </label>
            <input
              type="email"
              id="email"
              className="mt-2 black p-3 bg-gray-100 w-full"
              name="email"
              placeholder="Tu coreo"
              ref={emailRef}
            />
          </div>
          {/*  */}
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="password">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              className="mt-2 black p-3 bg-gray-100 w-full"
              name="password"
              placeholder="Tu contraseña"
              ref={passwordRef}
            />
          </div>

          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-indigo-600 hover:bg-indigo-800 text-white uppercase font-bold p-3 rounded w-full cursor-pointer"
          />
        </form>
      </div>
      <nav className="mt-5">
        <Link to="/auth/registro" className="">
          ¿No tienes cuenta crea una?
        </Link>
      </nav>
    </>
  );
}
