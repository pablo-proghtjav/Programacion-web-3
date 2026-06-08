import { useEffect, useState } from "react";
import "./cliente.css";

interface ClienteType {
  idCliente?: number;
  nombre: string;
  apellido: string;
  celular: string;
  direccion: string;
}

function Cliente() {

  // LISTA DE CLIENTES
  const [clientes, setClientes] = useState<ClienteType[]>([]);

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

  // OBTENER CLIENTES
  const obtenerClientes = async () => {

    const response = await fetch(
      "http://localhost:3000/api/cliente"
    );

    const data = await response.json();

    setClientes(data);
  };

  // CARGAR AL INICIO
  useEffect(() => {
    obtenerClientes();
  }, []);

  // AGREGAR CLIENTE
  const agregarCliente = async () => {

    const nuevoCliente = {
      nombre,
      apellido,
      celular,
      direccion
    };

    await fetch(
      "http://localhost:3000/api/cliente",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(nuevoCliente)
      }
    );

    // RECARGAR TABLA
    obtenerClientes();

    // LIMPIAR INPUTS
    limpiarFormulario();
  };

  // ELIMINAR
  const eliminarCliente = async (id: number) => {

    await fetch(
      `http://localhost:3000/api/cliente/${id}`,
      {
        method: "DELETE"
      }
    );

    // RECARGAR TABLA
    obtenerClientes();
  };

  // CARGAR DATOS PARA EDITAR
  const cargarCliente = (
    cliente: ClienteType
  ) => {

    setIdEditar(cliente.idCliente!);

    setNombre(cliente.nombre);
    setApellido(cliente.apellido);
    setCelular(cliente.celular);
    setDireccion(cliente.direccion);
  };

  // ACTUALIZAR
  const actualizarCliente = async () => {

    const clienteActualizado = {
      nombre,
      apellido,
      celular,
      direccion
    };

    await fetch(
      `http://localhost:3000/api/cliente/${idEditar}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(clienteActualizado)
      }
    );

    obtenerClientes();

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
        Gestión de Cliente
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

          <button onClick={agregarCliente}>
            Agregar Cliente
          </button>

        ) : (

          <button onClick={actualizarCliente}>
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

            {clientes.map((cliente) => (

              <tr key={cliente.idCliente}>

                <td>{cliente.nombre}</td>

                <td>{cliente.apellido}</td>

                <td>{cliente.celular}</td>

                <td>{cliente.direccion}</td>

                <td>

                  <div className="acciones">

                    <button
                      className="menu-icon"
                      onClick={() =>
                        setMenuAbierto(
                          menuAbierto === cliente.idCliente
                            ? null
                            : cliente.idCliente!
                        )
                      }
                    >
                      ⋮
                    </button>

                    {menuAbierto === cliente.idCliente && (

                      <div className="dropdown">

                        <button
                          onClick={() =>
                            cargarCliente(cliente)
                          }
                        >
                          Editar
                        </button>

                        <button
                          onClick={() =>
                            eliminarCliente(
                              cliente.idCliente!
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

export default Cliente;