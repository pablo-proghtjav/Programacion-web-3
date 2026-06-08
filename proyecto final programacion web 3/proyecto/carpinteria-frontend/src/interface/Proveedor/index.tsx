import { useEffect, useState } from "react";
import "./proveedor.css";

interface ProveedorType {
  idProveedor?: number;
  nombre: string;
  apellido: string;
  celular: string;
  direccion: string;
}

function Proveedor() {

  // LISTA DE PROVEEDORES
  const [proveedores, setProveedores] =
    useState<ProveedorType[]>([]);

  // INPUTS
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [celular, setCelular] = useState("");
  const [direccion, setDireccion] = useState("");

  // MENU
  const [menuAbierto, setMenuAbierto] =
    useState<number | null>(null);

  // ID EDITAR
  const [idEditar, setIdEditar] =
    useState<number | null>(null);

  // OBTENER PROVEEDORES
  const obtenerProveedores = async () => {

    const response = await fetch(
      "http://localhost:3000/api/proveedor"
    );

    const data = await response.json();

    setProveedores(data);
  };

  // CARGAR AL INICIO
  useEffect(() => {
    obtenerProveedores();
  }, []);

  // AGREGAR PROVEEDOR
  const agregarProveedor = async () => {

    const nuevoProveedor = {
      nombre,
      apellido,
      celular,
      direccion
    };

    await fetch(
      "http://localhost:3000/api/proveedor",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(nuevoProveedor)
      }
    );

    // RECARGAR TABLA
    obtenerProveedores();

    // LIMPIAR INPUTS
    limpiarFormulario();
  };

  // ELIMINAR
  const eliminarProveedor = async (
    id: number
  ) => {

    await fetch(
      `http://localhost:3000/api/proveedor/${id}`,
      {
        method: "DELETE"
      }
    );

    // RECARGAR TABLA
    obtenerProveedores();
  };

  // CARGAR DATOS PARA EDITAR
  const cargarProveedor = (
    proveedor: ProveedorType
  ) => {

    setIdEditar(proveedor.idProveedor!);

    setNombre(proveedor.nombre);
    setApellido(proveedor.apellido);
    setCelular(proveedor.celular);
    setDireccion(proveedor.direccion);
  };

  // ACTUALIZAR
  const actualizarProveedor = async () => {

    const proveedorActualizado = {
      nombre,
      apellido,
      celular,
      direccion
    };

    await fetch(
      `http://localhost:3000/api/proveedor/${idEditar}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(proveedorActualizado)
      }
    );

    obtenerProveedores();

    limpiarFormulario();

    setIdEditar(null);
  };

  // LIMPIAR
  const limpiarFormulario = () => {

    setNombre("");
    setApellido("");
    setCelular("");
    setDireccion("");
  };

  return (
    <div className="cliente-container">

      {/* TITULO */}
      <h1 className="titulo">
        Gestión de Proveedor
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
          placeholder="Apellido"
          value={apellido}
          onChange={(e) =>
            setApellido(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Celular"
          value={celular}
          onChange={(e) =>
            setCelular(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Dirección"
          value={direccion}
          onChange={(e) =>
            setDireccion(e.target.value)
          }
        />

        {idEditar === null ? (

          <button onClick={agregarProveedor}>
            Agregar Proveedor
          </button>

        ) : (

          <button onClick={actualizarProveedor}>
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
              <th>Apellido</th>
              <th>Celular</th>
              <th>Dirección</th>
              <th>Acciones</th>
            </tr>

          </thead>

          <tbody>

            {proveedores.map((proveedor) => (

              <tr key={proveedor.idProveedor}>

                <td>{proveedor.nombre}</td>

                <td>{proveedor.apellido}</td>

                <td>{proveedor.celular}</td>

                <td>{proveedor.direccion}</td>

                <td>

                  <div className="acciones">

                    <button
                      className="menu-icon"
                      onClick={() =>
                        setMenuAbierto(
                          menuAbierto ===
                          proveedor.idProveedor
                            ? null
                            : proveedor.idProveedor!
                        )
                      }
                    >
                      ⋮
                    </button>

                    {menuAbierto ===
                      proveedor.idProveedor && (

                      <div className="dropdown">

                        <button
                          onClick={() =>
                            cargarProveedor(
                              proveedor
                            )
                          }
                        >
                          Editar
                        </button>

                        <button
                          onClick={() =>
                            eliminarProveedor(
                              proveedor.idProveedor!
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

export default Proveedor;