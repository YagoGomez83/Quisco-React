import { formatearDinero } from "../helpers";
import PropTypes from "prop-types";
import useQuisco from "../hooks/useQuisco";
export default function Producto({
  producto,
  botonAgregar = false,
  botonDisponible = false,
}) {
  const { handleClickModal, handleSetProducto, handleClickProductoAgotado } =
    useQuisco();
  const { nombre, precio, imagen, id } = producto;
  return (
    <div className="border p-3 shadow bg-white hover:bg-amber-500">
      <img
        src={`/img/${imagen}.jpg`}
        alt={`imagen ${nombre}`}
        className="w-full"
      />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{nombre}</h3>
        <p className="mt-5 font-black text-3xl text-gray-600">
          {formatearDinero(precio)}
        </p>
        {botonAgregar && (
          <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 font-bold "
            onClick={() => {
              handleClickModal();
              handleSetProducto(producto);
            }}
          >
            Agregar
          </button>
        )}

        {botonDisponible && (
          <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 font-bold "
            onClick={() => {
              handleClickProductoAgotado(id);
            }}
          >
            Producto Agotado
          </button>
        )}
      </div>
    </div>
  );
}
Producto.propTypes = {
  producto: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    imagen: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};
