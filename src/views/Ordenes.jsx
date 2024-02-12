import useSWR from "swr";
import clienteAxios from "../config/axios";
import ClipLoader from "react-spinners/ClipLoader";
import { formatearDinero } from "../helpers";
import useQuisco from "../hooks/useQuisco";

export default function Ordenes() {
  const { handleClickCompletarPedido } = useQuisco();
  const token = localStorage.getItem("AUTH_TOKEN");
  const fetcher = () =>
    clienteAxios("/api/pedidos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  const { data, error, isLoading } = useSWR("api/pedidos", fetcher, {
    refreshInterval: 1000,
  });
  if (isLoading) return <ClipLoader color="black" size={30} />; // Muestra el spinner mientras isLoading es true
  return (
    <div>
      <h1 className="text-4xl font-black">Ordenes</h1>
      <p className=" text-2xl my-10">Administra las Ordenes desde aquí</p>
      <div className="grid grid-cols-2 gap-3">
        {data?.data?.data?.map((pedido) => (
          <div
            key={pedido.id}
            className="p-5 bg-white shadow space-y-2 border-b"
          >
            <p className="text-xl font-bold">Contenido del Pedido</p>
            {pedido.productos.map((producto) => (
              <div
                key={producto.id}
                className="border-dashed border-b border-b-slate-600 last-of-type:border-none py-4"
              >
                <p className="text-sm">ID: {producto.id}</p>
                <p className="font-bold"> {producto.nombre}</p>
                <p className="">
                  Cantidad{" "}
                  <span className="font-bold">{producto.pivot.cantidad}</span>
                </p>
              </div>
            ))}
            <p className="text-lg font-bold text-slate-600">
              Cliente:
              <span className="font-normal"> {pedido.user.name}</span>
            </p>
            <p className="text-lg font-bold text-amber-600">
              Total a Pagar:
              <span className="font-normal text-slate-600">
                {" "}
                {formatearDinero(pedido.total)}
              </span>
            </p>
            <button
              onClick={() => {
                handleClickCompletarPedido(pedido.id);
              }}
              type="button"
              className="text-white font-bold p-3 uppercase rounded cursor-pointer bg-indigo-500 w-full"
            >
              Completaar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
