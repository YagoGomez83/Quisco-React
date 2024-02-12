import useQuisco from "../hooks/useQuisco";
import { useAuth } from "../hooks/useAuth";
import ResumenProducto from "./ResumenProducto";
import { formatearDinero } from "../helpers";
export default function Resumen() {
  const { pedido, total, handleSubmitNuevaOrden } = useQuisco();
  const { logout } = useAuth({});
  const comprobarPedido = () => pedido.length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitNuevaOrden(logout);
  };

  return (
    <aside className="md:w-72 h-screen overflow-y-scroll p-5">
      <h1 className="text-4xl font-black">Mi pedido</h1>
      <p className="text-lg my-5">
        Aquí podras ver el resumen y totales de tu pedido
      </p>
      <div className="py-10">
        {pedido.length === 0 ? (
          <p className="text-center text-2xl">
            No hay elementos en tu pedido aún
          </p>
        ) : (
          pedido.map((producto, index) => (
            <ResumenProducto key={index} producto={producto} />
          ))
        )}
      </div>
      <p className="text-xl mt-10">
        Total:{""}
        {formatearDinero(total)}
      </p>
      <form action="" className="w-full" onSubmit={handleSubmit}>
        <div className="mt-5 flex justify-center">
          <input
            type="submit"
            className={` ${
              comprobarPedido()
                ? "bg-indigo-100"
                : "bg-indigo-600 hover:bg-indigo-800"
            } text-white font-bold p-3 uppercase rounded cursor-pointer`}
            disabled={comprobarPedido()}
            value={"Confirmar Pedido"}
          />
        </div>
      </form>
    </aside>
  );
}
