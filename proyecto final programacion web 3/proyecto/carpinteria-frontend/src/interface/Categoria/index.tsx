import { useEffect, useState } from "react";
import "./categoria.css";

interface CategoriaType {
  idCategoria?: number;
  nombre: string;
  tipo: string;
}

function Categoria() {

  // LISTA DE CATEGORIAS
  const [categorias, setCategorias] =
    useState<CategoriaType[]>([]);

  // INPUTS
  const [nombre, setNombre] =
    useState("");

  const [tipo, setTipo] =
    useState("");

  // MENU
  const [menuAbierto, setMenuAbierto] =
    useState<number | null>(null);

  // ID EDITAR
  const [idEditar, setIdEditar] =
    useState<number | null>(null);

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
    obtenerCategorias();
  }, []);

  // AGREGAR
  const agregarCategoria = async () => {

    const nuevaCategoria = {
      nombre,
      tipo
    };

    await fetch(
      "http://localhost:3000/api/categoria",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(nuevaCategoria)
      }
    );

    obtenerCategorias();

    limpiarFormulario();
  };

  // ELIMINAR
  const eliminarCategoria = async (
    id: number
  ) => {

    await fetch(
      `http://localhost:3000/api/categoria/${id}`,
      {
        method: "DELETE"
      }
    );

    obtenerCategorias();
  };

  // CARGAR PARA EDITAR
  const cargarCategoria = (
    categoria: CategoriaType
  ) => {

    setIdEditar(categoria.idCategoria!);

    setNombre(categoria.nombre);

    setTipo(categoria.tipo);
  };

  // ACTUALIZAR
  const actualizarCategoria = async () => {

    const categoriaActualizada = {
      nombre,
      tipo
    };

    await fetch(
      `http://localhost:3000/api/categoria/${idEditar}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(categoriaActualizada)
      }
    );

    obtenerCategorias();

    limpiarFormulario();

    setIdEditar(null);
  };

  // LIMPIAR
  const limpiarFormulario = () => {

    setNombre("");

    setTipo("");
  };

  return (
    <div className="cliente-container">

      {/* TITULO */}
      <h1 className="titulo">
        Gestión de Categoría
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
          placeholder="Tipo"
          value={tipo}
          onChange={(e) =>
            setTipo(e.target.value)
          }
        />

        {idEditar === null ? (

          <button onClick={agregarCategoria}>
            Agregar Categoría
          </button>

        ) : (

          <button onClick={actualizarCategoria}>
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
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>

          </thead>

          <tbody>

            {categorias.map((categoria) => (

              <tr key={categoria.idCategoria}>

                <td>{categoria.nombre}</td>

                <td>{categoria.tipo}</td>

                <td>

                  <div className="acciones">

                    <button
                      className="menu-icon"
                      onClick={() =>
                        setMenuAbierto(
                          menuAbierto ===
                          categoria.idCategoria
                            ? null
                            : categoria.idCategoria!
                        )
                      }
                    >
                      ⋮
                    </button>

                    {menuAbierto ===
                      categoria.idCategoria && (

                      <div className="dropdown">

                        <button
                          onClick={() =>
                            cargarCategoria(
                              categoria
                            )
                          }
                        >
                          Editar
                        </button>

                        <button
                          onClick={() =>
                            eliminarCategoria(
                              categoria.idCategoria!
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

export default Categoria;