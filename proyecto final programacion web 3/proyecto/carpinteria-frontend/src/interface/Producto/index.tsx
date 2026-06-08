import { useEffect, useState } from "react";
import "./producto.css";

interface ProductoType {
  idProducto?: number;

  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  material: string;
  color: string;
  fechaInicio: string;

  idCategoria: number;
  idTienda: number;
}

interface CategoriaType {
  idCategoria?: number;
  nombre: string;
  tipo: string;
}

function Producto() {
  const tienda = JSON.parse(localStorage.getItem("tienda") || "null");
  // LISTA PRODUCTOS
  const [productos, setProductos] =
    useState<ProductoType[]>([]);

  // LISTA CATEGORIAS
  const [categorias, setCategorias] =
    useState<CategoriaType[]>([]);

  // INPUTS
  const [nombre, setNombre] =
    useState("");

  const [descripcion, setDescripcion] =
    useState("");

  const [precio, setPrecio] =
    useState("");

  const [stock, setStock] =
    useState("");

  const [material, setMaterial] =
    useState("");

  const [color, setColor] =
    useState("");

  const [fechaInicio, setFechaInicio] =
    useState("");

  const [idCategoria, setIdCategoria] =
    useState<number | null>(null);

  // MENU ACCIONES
  const [menuAbierto, setMenuAbierto] =
    useState<number | null>(null);

  // MOSTRAR CATEGORIAS
  const [mostrarCategorias,
    setMostrarCategorias] =
    useState(false);

  // ID EDITAR
  const [idEditar, setIdEditar] =
    useState<number | null>(null);

  // OBTENER PRODUCTOS
  const obtenerProductos = async () => {

    const response = await fetch(
      `http://localhost:3000/api/producto/tienda/${tienda.idTienda}`
    );

    const data = await response.json();

    setProductos(data);
  };

  // OBTENER CATEGORIAS
  const obtenerCategorias = async () => {

    const response = await fetch(
      "http://localhost:3000/api/categoria"
    );

    const data = await response.json();

    setCategorias(data);
  };

  // CARGAR AL INICIO
  useEffect(() => {

    obtenerProductos();

    obtenerCategorias();

  }, []);

  // AGREGAR PRODUCTO
  const agregarProducto = async () => {

    const nuevoProducto = {
      nombre,
      descripcion,
      precio: Number(precio),
      stock: Number(stock),
      material,
      color,
      fechaInicio,
      idCategoria,
      idTienda: tienda.idTienda
    };

    await fetch(
      "http://localhost:3000/api/producto",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoProducto)
      }
    );

    obtenerProductos();
    limpiarFormulario();
  };

  // ELIMINAR
  const eliminarProducto = async (
    id: number
  ) => {

    await fetch(
      `http://localhost:3000/api/producto/${id}`,
      {
        method: "DELETE"
      }
    );

    obtenerProductos();
  };

  // CARGAR EDITAR
  const cargarProducto = (
    producto: ProductoType
  ) => {

    setIdEditar(producto.idProducto!);

    setNombre(producto.nombre);

    setDescripcion(producto.descripcion);

    setPrecio(producto.precio.toString());

    setStock(producto.stock.toString());

    setMaterial(producto.material);

    setColor(producto.color);

    setFechaInicio(producto.fechaInicio);

    setIdCategoria(producto.idCategoria);
  };

  // ACTUALIZAR
  const actualizarProducto = async () => {

    const productoActualizado = {
      nombre,
      descripcion,
      precio: Number(precio),
      stock: Number(stock),
      material,
      color,
      fechaInicio,
      idCategoria,
      idTienda: tienda.idTienda
    };

    await fetch(
      `http://localhost:3000/api/producto/${idEditar}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(productoActualizado)
      }
    );

    obtenerProductos();
    limpiarFormulario();
    setIdEditar(null);
  };

  // LIMPIAR
  const limpiarFormulario = () => {

    setNombre("");

    setDescripcion("");

    setPrecio("");

    setStock("");

    setMaterial("");

    setColor("");

    setFechaInicio("");

    setIdCategoria(null);
  };

  return (
    <div className="cliente-container">

      {/* TITULO */}
      <h1 className="titulo">
        Gestión de Producto
      </h1>

      {/* FORMULARIO */}
      <div className="formulario">

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) =>
            setNombre(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) =>
            setDescripcion(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) =>
            setPrecio(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Material"
          value={material}
          onChange={(e) =>
            setMaterial(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Color"
          value={color}
          onChange={(e) =>
            setColor(e.target.value)
          }
        />

        <input
          type="date"
          value={fechaInicio}
          onChange={(e) =>
            setFechaInicio(e.target.value)
          }
        />

        {/* BOTON CATEGORIAS */}
        <button
          type="button"
          onClick={() =>
            setMostrarCategorias(
              !mostrarCategorias
            )
          }
        >
          Seleccionar Categoría
        </button>

        {/* LISTA CATEGORIAS */}
        {mostrarCategorias && (

          <div className="lista-categorias">

            {categorias.map((categoria) => (

              <button
                key={categoria.idCategoria}
                type="button"
                onClick={() => {

                  setIdCategoria(
                    categoria.idCategoria!
                  );

                  setMostrarCategorias(false);

                }}
              >
                {categoria.nombre}
              </button>

            ))}

          </div>

        )}

        {/* MOSTRAR SELECCION */}
        {idCategoria && (
          <p>
            Categoría seleccionada:
            {idCategoria}
          </p>
        )}

        {idEditar === null ? (

          <button onClick={agregarProducto}>
            Agregar Producto
          </button>

        ) : (

          <button
            onClick={actualizarProducto}
          >
            Guardar Cambios
          </button>

        )}

      </div>

      {/* TABLA */}
      <div className="tabla-container">

        <table>

          <thead>

            <tr>

              <th>Nombre</th>

              <th>Descripción</th>

              <th>Precio</th>

              <th>Stock</th>

              <th>Material</th>

              <th>Color</th>

              <th>Fecha</th>

              <th>Categoría</th>

              <th>Acciones</th>

            </tr>

          </thead>

          <tbody>

            {productos.map((producto) => (

              <tr key={producto.idProducto}>

                <td>{producto.nombre}</td>

                <td>{producto.descripcion}</td>

                <td>{producto.precio}</td>

                <td>{producto.stock}</td>

                <td>{producto.material}</td>

                <td>{producto.color}</td>

                <td>{producto.fechaInicio}</td>

                <td>{producto.idCategoria}</td>

                <td>

                  <div className="acciones">

                    <button
                      className="menu-icon"
                      onClick={() =>
                        setMenuAbierto(
                          menuAbierto ===
                          producto.idProducto
                            ? null
                            : producto.idProducto!
                        )
                      }
                    >
                      ⋮
                    </button>

                    {menuAbierto ===
                      producto.idProducto && (

                      <div className="dropdown">

                        <button
                          onClick={() =>
                            cargarProducto(
                              producto
                            )
                          }
                        >
                          Editar
                        </button>

                        <button
                          onClick={() =>
                            eliminarProducto(
                              producto.idProducto!
                            )
                          }
                        >
                          Eliminar
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

    </div>
  );
}

export default Producto;