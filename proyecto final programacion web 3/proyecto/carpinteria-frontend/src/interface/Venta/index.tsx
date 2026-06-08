import { useEffect, useState } from "react";
import "./venta.css";

interface ClienteType {
  idCliente?: number;
  nombre: string;
  apellido: string;
}

interface ProductoType {
  idProducto?: number;
  nombre: string;
  precio: number;
  stock: number;
}

interface DetalleType {
  idDetalleVenta?: number;
  cantidad: number;
  precio: number;
  subTotal: number;
  idVenta?: number;
  idProducto: number;
}

interface VentaType {
  idVenta?: number;
  fechaV: string;
  total: number;
  idCliente: number;
}

function Venta() {
  const tienda = JSON.parse(localStorage.getItem("tienda") || "null");
  // LISTAS
  const [ventas, setVentas] = useState<VentaType[]>([]);

  const [clientes, setClientes] = useState<ClienteType[]>([]);

  const [productos, setProductos] = useState<ProductoType[]>([]);

  const [detalles, setDetalles] = useState<DetalleType[]>([]);

  const [detalleActual, setDetalleActual] = useState<DetalleType[]>([]);

  // INPUTS
  const [fechaV, setFechaV] = useState("");

  const [total, setTotal] = useState(0);

  const [idCliente, setIdCliente] = useState<number | null>(null);

  // MENUS
  const [mostrarClientes,setMostrarClientes] = useState(false);

  const [mostrarProductos, setMostrarProductos] = useState(false);

  const [mostrarDetalles,setMostrarDetalles] = useState(false);

  const [menuAbierto,setMenuAbierto] = useState<number | null>(null);

  // OBTENER VENTAS
  const obtenerVentas = async () => {
    const response = await fetch(
      `http://localhost:3000/api/venta/tienda/${tienda.idTienda}`
    );
    const data = await response.json();
    setVentas(data);
  };

  // OBTENER CLIENTES
  const obtenerClientes = async () => {

    const response = await fetch(
      "http://localhost:3000/api/cliente"
    );
    const data = await response.json();
    setClientes(data);
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
    obtenerVentas();
    obtenerClientes();
    obtenerProductos();
  }, []);

  // SELECCIONAR CLIENTE
  const seleccionarCliente = (cliente: ClienteType) => {
    setIdCliente(
      cliente.idCliente!
    );
    setMostrarClientes(false);
  };

  // AGREGAR PRODUCTO
  const agregarProducto = (producto: ProductoType) => {
    if (producto.stock <= 0) {
      alert("Producto sin stock");
      return;
    }
    // BUSCAR SI YA EXISTE
    const productoExistente = detalles.find(
      (detalle) =>
        detalle.idProducto === producto.idProducto
    );
    // SI YA EXISTE
    if (productoExistente) {
      const nuevosDetalles = detalles.map(
        (detalle) => {
          if (detalle.idProducto === producto.idProducto) {
            const nuevaCantidad = detalle.cantidad + 1;
            return {
              ...detalle,
              cantidad: nuevaCantidad,
              subTotal:nuevaCantidad *detalle.precio
            };
          }
          return detalle;
        }
      );
      setDetalles(nuevosDetalles);
    } else {
      // SI NO EXISTE
      const nuevoDetalle = {
        cantidad: 1,
        precio: producto.precio,
        subTotal: producto.precio,
        idProducto: producto.idProducto!
      };
      setDetalles([
        ...detalles,
        nuevoDetalle
      ]);
    }
    // ACTUALIZAR TOTAL
    setTotal(total + producto.precio);
    setMostrarProductos(false);
  };
  
  // AGREGAR VENTA
  const agregarVenta = async () => {
    const nuevaVenta = {
      fechaV,
      total,
      idCliente,
      idTienda: tienda.idTienda
    };
    try {
      // GUARDAR VENTA
      const responseVenta =
        await fetch(
          "http://localhost:3000/api/venta",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json"
            },
            body: JSON.stringify(
              nuevaVenta
            )
          }
        );
      const ventaGuardada = await responseVenta.json();
      console.log("VENTA:",ventaGuardada);
      const idVenta = ventaGuardada.venta.idVenta;
      console.log("el ide de la venta es ",idVenta);
      
      // GUARDAR DETALLES
      for (const detalle of detalles) {
        const detalleFinal = {
          cantidad: Number(detalle.cantidad),
          precio: Number(detalle.precio),
          subTotal: Number(detalle.subTotal),
          idVenta: Number(idVenta),
          idProducto: Number(detalle.idProducto)
        };
        console.log("detalle de producto ",detalleFinal);

        await fetch("http://localhost:3000/api/detalleVenta",
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
        const producto = productos.find((p) =>
              p.idProducto ===
              detalle.idProducto
        );

        if (producto) {
          const nuevoStock = producto.stock - detalle.cantidad;

          await fetch(`http://localhost:3000/api/producto/${producto.idProducto}`,
            {
              method: "PUT",
              headers: {
                "Content-Type":
                  "application/json"
              },
              body: JSON.stringify({
                ...producto,
                stock:
                  nuevoStock
              })
            }
          );
        }
      }
      // RECARGAR
      obtenerVentas();
      limpiarFormulario();
      alert(
        "Venta registrada"
      );
    } catch (error) {
      console.log(error);
      alert(
        "Error al registrar"
      );
    }
  };

  // VER DETALLES
  const verDetalles = async (idVenta: number) => {
    console.log("el ide de la venta es ",idVenta);
    const response = await fetch(
      `http://localhost:3000/api/detalleVenta/${idVenta}`
    );

    const data = await response.json();
    setDetalleActual(data);
    setMostrarDetalles(true);
  };

  // LIMPIAR
  const limpiarFormulario = () => {
    setFechaV("");
    setTotal(0);
    setIdCliente(null);
    setDetalles([]);
  };

  return (
    <div className="cliente-container">
      <h1 className="titulo">
        Gestión de Venta
      </h1>

      {/* FORMULARIO */}
      <div className="formulario">

        <input
          type="date"
          value={fechaV}
          onChange={(e) =>
            setFechaV(
              e.target.value
            )
          }
        />

        {/* CLIENTE */}
        <button
          onClick={() =>
            setMostrarClientes(
              !mostrarClientes
            )
          }
        >
          Seleccionar Cliente
        </button>

        {mostrarClientes && (

          <div className="lista-categorias">

            {clientes.map(
              (cliente) => (

              <button
                key={
                  cliente.idCliente
                }
                onClick={() =>
                  seleccionarCliente(
                    cliente
                  )
                }
              >
                {cliente.nombre}
                {" "}
                {cliente.apellido}
              </button>

            ))}

          </div>

        )}

        {idCliente && (

          <p>
            Cliente seleccionado:
            {" "}
            {clientes.find(
              (c) =>
                c.idCliente ===
                idCliente
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

        {/* PRODUCTOS AGREGADOS */}
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
          onClick={agregarVenta}
        >
          Registrar Venta
        </button>

      </div>

      {/* TABLA */}
      <div className="tabla-container">

        <table>

          <thead>

            <tr>

              <th>Fecha</th>

              <th>Total</th>

              <th>ID Cliente</th>

              <th>Acciones</th>

            </tr>

          </thead>

          <tbody>

            {ventas.map(
              (venta) => (

              <tr
                key={venta.idVenta}
              >

                <td>
                  {venta.fechaV}
                </td>

                <td>
                  Bs {venta.total}
                </td>

                <td>
                  {venta.idCliente}
                </td>

                <td>

                  <div className="acciones">

                    <button
                      className="menu-icon"
                      onClick={() =>
                        setMenuAbierto(

                          menuAbierto ===
                          venta.idVenta

                            ? null

                            : venta.idVenta!
                        )
                      }
                    >
                      ⋮
                    </button>

                    {menuAbierto ===
                      venta.idVenta && (

                      <div className="dropdown">

                        <button
                          onClick={() =>
                            verDetalles(
                              venta.idVenta!
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
              Detalle de Venta
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

                    <th>ID Venta</th>

                    <th>ID Producto</th>

                  </tr>

                </thead>

                <tbody>

                  {detalleActual.map(
                    (detalle) => (

                    <tr
                      key={
                        detalle.idDetalleVenta
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
                        {detalle.idVenta}
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

export default Venta;