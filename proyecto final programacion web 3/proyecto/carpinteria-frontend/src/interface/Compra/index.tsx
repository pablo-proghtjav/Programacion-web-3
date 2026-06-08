import { useEffect, useState } from "react";
import "./compra.css";

interface ProveedorType {
  idProveedor?: number;
  nombre: string;
  telefono: string;
}

interface ProductoType {
  idProducto?: number;
  nombre: string;
  precio: number;
  stock: number;
}

interface DetalleCompraType {
  idDetalleCompra?: number;
  cantidad: number;
  precio: number;
  subTotal: number;
  idCompra?: number;
  idProducto: number;
}

interface CompraType {
  idCompra?: number;
  fechaC: string;
  total: number;
  idProveedor: number;
}

function Compra() {
  const tienda = JSON.parse(localStorage.getItem("tienda") || "null");

  // LISTAS
  const [compras, setCompras] = useState<CompraType[]>([]);

  const [proveedores, setProveedores] =
    useState<ProveedorType[]>([]);

  const [productos, setProductos] =
    useState<ProductoType[]>([]);

  const [detalles, setDetalles] =
    useState<DetalleCompraType[]>([]);

  const [detalleActual, setDetalleActual] =
    useState<DetalleCompraType[]>([]);

  // INPUTS
  const [fechaC, setFechaC] = useState("");

  const [total, setTotal] = useState(0);

  const [idProveedor, setIdProveedor] =
    useState<number | null>(null);

  // MENUS
  const [mostrarProveedores, setMostrarProveedores] =
    useState(false);

  const [mostrarProductos, setMostrarProductos] =
    useState(false);

  const [mostrarDetalles, setMostrarDetalles] =
    useState(false);

  const [menuAbierto, setMenuAbierto] =
    useState<number | null>(null);

  // OBTENER COMPRAS
  const obtenerCompras = async () => {

    const response = await fetch(
      `http://localhost:3000/api/compra/tienda/${tienda.idTienda}`
    );

    const data = await response.json();

    setCompras(data);

  };

  // OBTENER PROVEEDORES
  const obtenerProveedores = async () => {

    const response = await fetch(
      "http://localhost:3000/api/proveedor"
    );

    const data = await response.json();

    setProveedores(data);

  };

  // OBTENER PRODUCTOS
  const obtenerProductos = async () => {

    const response = await fetch(
      `http://localhost:3000/api/producto/tienda/${tienda.idTienda}`
    );

    const data = await response.json();

    setProductos(data);

  };

  // CARGAR AL INICIO
  useEffect(() => {

    obtenerCompras();

    obtenerProveedores();

    obtenerProductos();

  }, []);

  // SELECCIONAR PROVEEDOR
  const seleccionarProveedor = (proveedor: ProveedorType) => {

    setIdProveedor(
      proveedor.idProveedor!
    );

    setMostrarProveedores(false);

  };

  // AGREGAR PRODUCTO
  const agregarProducto = (producto: ProductoType) => {

    const productoExistente = detalles.find(
      (detalle) =>
        detalle.idProducto ===
        producto.idProducto
    );

    if (productoExistente) {

      const nuevosDetalles = detalles.map(
        (detalle) => {

          if (
            detalle.idProducto ===
            producto.idProducto
          ) {

            const nuevaCantidad =
              detalle.cantidad + 1;

            return {

              ...detalle,

              cantidad: nuevaCantidad,

              subTotal:
                nuevaCantidad *
                detalle.precio

            };

          }

          return detalle;

        }
      );

      setDetalles(nuevosDetalles);

    } else {

      const nuevoDetalle = {

        cantidad: 1,

        precio: producto.precio,

        subTotal: producto.precio,

        idProducto:
          producto.idProducto!

      };

      setDetalles([
        ...detalles,
        nuevoDetalle
      ]);

    }

    // ACTUALIZAR TOTAL
    setTotal(
      total + producto.precio
    );

    setMostrarProductos(false);

  };

  // AGREGAR COMPRA
  const agregarCompra = async () => {

    const nuevaCompra = {
      fechaC,
      total,
      idProveedor,
      idTienda: tienda.idTienda
    };

    try {

      // GUARDAR COMPRA
      const responseCompra =
        await fetch(
          "http://localhost:3000/api/compra",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify(
              nuevaCompra
            )
          }
        );

      const compraGuardada = await responseCompra.json();
      console.log("Compra ",compraGuardada)
      const idCompra = compraGuardada.compra.idCompra;
      console.log("el ide de la compra es ",idCompra);
      // GUARDAR DETALLES
      for (const detalle of detalles) {
        const detalleFinal = {
          cantidad: Number(detalle.cantidad),
          precio: Number(detalle.precio),
          subTotal: Number(detalle.subTotal),
          idCompra: Number(idCompra),
          idProducto: Number(detalle.idProducto)
        };
        await fetch(
          "http://localhost:3000/api/detalleCompra",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify(
              detalleFinal
            )
          }
        );

        // ACTUALIZAR STOCK
        const producto = productos.find(
          (p) =>
            p.idProducto ===
            detalle.idProducto
        );

        if (producto) {

          const nuevoStock = producto.stock + detalle.cantidad;

          await fetch(
            `http://localhost:3000/api/producto/${producto.idProducto}`,
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({
                ...producto,
                stock: nuevoStock,
                idTienda: tienda.idTienda
              })
            }
          );

        }

      }

      obtenerCompras();

      limpiarFormulario();

      alert(
        "Compra registrada"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Error al registrar"
      );

    }

  };

  // VER DETALLES
  const verDetalles = async (
    idCompra: number
  ) => {

    const response = await fetch(
      `http://localhost:3000/api/detalleCompra/${idCompra}`
    );

    const data = await response.json();

    setDetalleActual(data);

    setMostrarDetalles(true);

  };

  // LIMPIAR
  const limpiarFormulario = () => {

    setFechaC("");

    setTotal(0);

    setIdProveedor(null);

    setDetalles([]);

  };

  return (

    <div className="cliente-container">

      <h1 className="titulo">
        Gestión de Compra
      </h1>

      {/* FORMULARIO */}
      <div className="formulario">

        <input
          type="date"
          value={fechaC}
          onChange={(e) =>
            setFechaC(
              e.target.value
            )
          }
        />

        {/* PROVEEDOR */}
        <button
          onClick={() =>
            setMostrarProveedores(
              !mostrarProveedores
            )
          }
        >
          Seleccionar Proveedor
        </button>

        {mostrarProveedores && (

          <div className="lista-categorias">

            {proveedores.map(
              (proveedor) => (

              <button
                key={
                  proveedor.idProveedor
                }
                onClick={() =>
                  seleccionarProveedor(
                    proveedor
                  )
                }
              >
                {proveedor.nombre}
              </button>

            ))}

          </div>

        )}

        {idProveedor && (

          <p>

            Proveedor seleccionado:

            {" "}

            {proveedores.find(
              (p) =>
                p.idProveedor ===
                idProveedor
            )?.nombre}

          </p>

        )}

        {/* PRODUCTOS */}
        <button
          onClick={() =>
            setMostrarProductos(
              !mostrarProductos
            )
          }
        >
          Agregar Producto
        </button>

        {mostrarProductos && (

          <div className="lista-categorias">

            {productos.map(
              (producto) => (

              <button
                key={
                  producto.idProducto
                }
                onClick={() =>
                  agregarProducto(
                    producto
                  )
                }
              >

                {producto.nombre}

                {" - Bs "}

                {producto.precio}

              </button>

            ))}

          </div>

        )}

        {/* PRODUCTOS */}
        <div className="productos-agregados">

          {detalles.map(
            (detalle, index) => {

            const producto =
              productos.find(
                (p) =>
                  p.idProducto ===
                  detalle.idProducto
              );

            return (

              <div
                className="producto-item"
                key={index}
              >

                {producto?.nombre}

                {" x"}

                {detalle.cantidad}

                {" - Bs "}

                {detalle.subTotal}

              </div>

            );

          })}

        </div>

        <p>

          Total:

          {" "}

          Bs {total}

        </p>

        <button
          onClick={agregarCompra}
        >
          Registrar Compra
        </button>

      </div>

      {/* TABLA */}
      <div className="tabla-container">

        <table>

          <thead>

            <tr>

              <th>Fecha</th>

              <th>Total</th>

              <th>ID Proveedor</th>

              <th>Acciones</th>

            </tr>

          </thead>

          <tbody>

            {compras.map(
              (compra) => (

              <tr
                key={compra.idCompra}
              >

                <td>
                  {compra.fechaC}
                </td>

                <td>
                  Bs {compra.total}
                </td>

                <td>
                  {compra.idProveedor}
                </td>

                <td>

                  <div className="acciones">

                    <button
                      className="menu-icon"
                      onClick={() =>
                        setMenuAbierto(

                          menuAbierto ===
                          compra.idCompra

                            ? null

                            : compra.idCompra!
                        )
                      }
                    >
                      ⋮
                    </button>

                    {menuAbierto ===
                      compra.idCompra && (

                      <div className="dropdown">

                        <button
                          onClick={() =>
                            verDetalles(
                              compra.idCompra!
                            )
                          }
                        >
                          Detalles
                        </button>

                      </div>

                    )}

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* MODAL */}
      {mostrarDetalles && (

        <div className="modal-overlay">

          <div className="modal-box">

            <h2>
              Detalle de Compra
            </h2>

            {detalleActual.length === 0 ? (

              <p>
                No hay detalles
              </p>

            ) : (

              <table>

                <thead>

                  <tr>

                    <th>Cantidad</th>

                    <th>Precio</th>

                    <th>SubTotal</th>

                    <th>ID Compra</th>

                    <th>ID Producto</th>

                  </tr>

                </thead>

                <tbody>

                  {detalleActual.map(
                    (detalle) => (

                    <tr
                      key={
                        detalle.idDetalleCompra
                      }
                    >

                      <td>
                        {detalle.cantidad}
                      </td>

                      <td>
                        {detalle.precio}
                      </td>

                      <td>
                        {detalle.subTotal}
                      </td>

                      <td>
                        {detalle.idCompra}
                      </td>

                      <td>
                        {detalle.idProducto}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

            <button
              className="cerrar-btn"
              onClick={() =>
                setMostrarDetalles(
                  false
                )
              }
            >
              Cerrar
            </button>

          </div>

        </div>

      )}

    </div>

  );

}

export default Compra;