import { useEffect, useState } from "react";
import "./empleado.css";

interface EmpleadoType {
  idEmpleado?: number;
  nombre: string;
  apellido: string;
  dni: string;
}

function Empleado() {

  // MODAL
  const [mostrarModalCuenta, setMostrarModalCuenta] = useState(false);

// EMPLEADO SELECCIONADO
  const [empleadoSeleccionado,setEmpleadoSeleccionado] = useState<EmpleadoType | null>(null);

// CUENTAS
  const [cuentas, setCuentas] = useState([]);

// INPUTS CUENTA
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState("");

//-----------------------------------------
// Acceso
const [mostrarModalAcceso, setMostrarModalAcceso] = useState(false);
const [accesos, setAccesos] = useState([]);


  const obtenerFortaleza = (password: string) => {
  let puntos = 0;

  if (password.length >= 8) puntos++;
  if (/[A-Z]/.test(password)) puntos++;
  if (/[0-9]/.test(password)) puntos++;
  if (/[^A-Za-z0-9]/.test(password)) puntos++;

  console.log("password:", password);
  console.log("puntos:", puntos);

  if (puntos <= 1) return "Débil";
  if (puntos <= 3) return "Media";
  return "Fuerte";
};


  const abrirModalCuenta = async (empleado: EmpleadoType) => {

    setEmpleadoSeleccionado(empleado);
    //console.log("el empleado seleccionado es ",empleado);
    //console.log("el ide del empleado es ",empleado.idEmpleado);
    setMostrarModalCuenta(true);

    const response = await fetch(
      `http://localhost:3000/api/cuenta/empleado/${empleado.idEmpleado}`
    );

    const data = await response.json();
    console.log("los datos son ",data);
    setCuentas(data.data);
  };

  //-------MODAL ABRIR ACCESO
  const abrirModalAcceso = async (empleado: EmpleadoType) => {
    //console.log("click modal acceso")
    console.log("La cuenta empleado es ",empleado);
    
    setEmpleadoSeleccionado(empleado);
    //console.log("antes",mostrarModalAcceso);
    setMostrarModalAcceso(true);
    //console.log("despues");

    const responseCuenta = await fetch(
    `http://localhost:3000/api/cuenta/empleado/${empleado.idEmpleado}`
    );

    const dataCuenta = await responseCuenta.json();
    console.log("cuenta:", dataCuenta);
    console.log("id de la cuenta es ",dataCuenta.data[0].idCuenta);
    const response = await fetch(
      `http://localhost:3000/api/acceso/cuenta/${dataCuenta.data[0].idCuenta}`
    );

    const data = await response.json();

    setAccesos(data.data);
  };

  const registrarCuenta = async () => {

    const nuevaCuenta = {

      usuario,

      contrasena,

      rol,

      idEmpleado: empleadoSeleccionado?.idEmpleado
    };

    await fetch(
      "http://localhost:3000/api/cuenta",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify(
          nuevaCuenta
        )
      }
    );

    abrirModalCuenta(
      empleadoSeleccionado!
    );

    setUsuario("");
    setContrasena("");
    setRol("");
  };

  //------------------------------------------------------
  // LISTA DE EMPLEADOS
  const [empleados, setEmpleados] = useState<EmpleadoType[]>([]);

  // INPUTS
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");

  // MENU
  const [menuAbierto, setMenuAbierto] =
    useState<number | null>(null);

  // ID EDITAR
  const [idEditar, setIdEditar] =
    useState<number | null>(null);

  // OBTENER EMPLEADOS
  const obtenerEmpleados = async () => {

    const response = await fetch(
      "http://localhost:3000/api/empleado"
    );

    const data = await response.json();

    setEmpleados(data);
  };

  // CARGAR AL INICIO
  useEffect(() => {
    obtenerEmpleados();
  }, []);

  // AGREGAR EMPLEADO
  const agregarEmpleado = async () => {

    const nuevoEmpleado = {
      nombre,
      apellido,
      dni,
      idTienda: 1
    };

    await fetch(
      "http://localhost:3000/api/empleado",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(nuevoEmpleado)
      }
    );

    // RECARGAR TABLA
    obtenerEmpleados();

    // LIMPIAR INPUTS
    limpiarFormulario();
  };

  // ELIMINAR
  const eliminarEmpleado = async (
    id: number
  ) => {

    await fetch(
      `http://localhost:3000/api/empleado/${id}`,
      {
        method: "DELETE"
      }
    );

    // RECARGAR TABLA
    obtenerEmpleados();
  };

  // CARGAR DATOS PARA EDITAR
  const cargarEmpleado = (
    empleado: EmpleadoType
  ) => {

    setIdEditar(empleado.idEmpleado!);

    setNombre(empleado.nombre);
    setApellido(empleado.apellido);
    setDni(empleado.dni);
  };

  // ACTUALIZAR
  const actualizarEmpleado = async () => {

    const empleadoActualizado = {
      nombre,
      apellido,
      dni,
      idTienda: 1
    };

    await fetch(
      `http://localhost:3000/api/empleado/${idEditar}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(
          empleadoActualizado
        )
      }
    );

    obtenerEmpleados();

    limpiarFormulario();

    setIdEditar(null);
  };

  // LIMPIAR
  const limpiarFormulario = () => {

    setNombre("");
    setApellido("");
    setDni("");
  };
  
  return (
    <div className="cliente-container">

      {/* TITULO */}
      <h1 className="titulo">
        Gestión de Empleado
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
          placeholder="Cédula"
          value={dni}
          onChange={(e) =>
            setDni(e.target.value)
          }
        />

        {idEditar === null ? (

          <button onClick={agregarEmpleado}>
            Agregar Empleado
          </button>

        ) : (

          <button onClick={actualizarEmpleado}>
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
              <th>Cédula</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>

            {empleados.map((empleado) => (

              <tr key={empleado.idEmpleado}>

                <td>{empleado.nombre}</td>

                <td>{empleado.apellido}</td>

                <td>{empleado.dni}</td>

                <td>

                  <div className="acciones">

                    <button
                      className="menu-icon"
                      onClick={() =>
                        setMenuAbierto(
                          menuAbierto === empleado.idEmpleado
                            ? null
                            : empleado.idEmpleado!
                        )
                      }
                    >
                      ⋮
                    </button>

                    {menuAbierto === empleado.idEmpleado && (

                      <div className="dropdown">

                      <button
                        onClick={()=>
                          abrirModalCuenta(empleado)
                        }
                      >
                        Cuenta
                      </button>

                      <button
                        onClick={() =>
                          abrirModalAcceso(empleado)
                        }
                      >
                        Accesos
                      </button>

                        <button
                          onClick={() =>
                            cargarEmpleado(empleado)
                          }
                        >
                          Editar
                        </button>

                        <button
                          onClick={() =>
                            eliminarEmpleado(
                              empleado.idEmpleado!
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
        





      {
      mostrarModalCuenta && (

    <div className="modal-overlay">

      <div className="modal">

        <h2>
          Cuentas de
          {" "}
          {empleadoSeleccionado?.nombre}
        </h2>

        <div className="form-cuenta">

          <input
            placeholder="Usuario"
            value={usuario}
            onChange={(e) =>
              setUsuario(
                e.target.value
              )
            }
          />

          <input
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) =>
              setContrasena(
                e.target.value
              )
            }
          />
          <p>
            Fortaleza: {obtenerFortaleza(contrasena)}
          </p>
          <select
            value={rol}
            onChange={(e) =>
              setRol(
                e.target.value
              )
            }
          >
            <option value="">
              Seleccione rol
            </option>

            <option value="ADMIN">
              ADMIN
            </option>

            <option value="EMPLEADO">
              EMPLEADO
            </option>

            <option value="EMPLEADO">
              VENDEDOR
            </option>

          </select>

          <button
              onClick={
              registrarCuenta
            }        
          >
            Registrar Cuenta
          </button>

        </div>

        <table>

          <thead>

            <tr>
              <th>Usuario</th>
              <th>Contraseña</th>
              <th>Rol</th>
            </tr>

          </thead>

          <tbody>

            {cuentas.map(
              (cuenta: any) => (

                <tr
                  key={
                    cuenta.idCuenta
                  }
                >

                  <td>
                    {cuenta.usuario}
                  </td>

                  <td>
                    {cuenta.contrasena}
                  </td>

                  <td>
                    {cuenta.rol}
                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

        <button
          className="cerrar-modal"
          onClick={() =>
            setMostrarModalCuenta(
              false
            )
          }
        >
          Cerrar
        </button>

      </div>

      


    </div>

  )
}



      {
        mostrarModalAcceso && (

        <div className="modal-overlay">

          <div className="modal">

            <h2>
              Accesos de
              {" "}
              {empleadoSeleccionado?.nombre}
            </h2>

            <table>

              <thead>

                <tr>
                  <th>Evento</th>
                  <th>IP</th>
                  <th>Fecha</th>
                  <th>Navegador</th>
                </tr>

              </thead>

              <tbody>

                {accesos.map(
                  (acceso:any) => (

                    <tr
                      key={acceso.idAcceso}
                    >

                      <td>
                        {acceso.evento}
                      </td>

                      <td>
                        {acceso.ip}
                      </td>

                      <td>
                        {
                          new Date(
                            acceso.fechaHora
                          ).toLocaleString()
                        }
                      </td>

                      <td>
                        {acceso.navegador}
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

            <button
              className="cerrar-modal"
              onClick={() =>
                setMostrarModalAcceso(
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

export default Empleado;