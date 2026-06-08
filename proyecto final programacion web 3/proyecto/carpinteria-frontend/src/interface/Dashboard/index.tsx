import { useState, useEffect } from "react";
import "./dashboard.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import Cliente from "../Cliente/index";
import Empleado from "../Empleado/index";
import Proveedor from "../Proveedor/index";
import Categoria from "../Categoria/index";
import Producto from "../Producto/index";
import Venta from "../Venta/index";
import Compra from "../Compra/index";

interface DashboardProps {

  cambiarPagina: React.Dispatch<
    React.SetStateAction<string>
  >;
}

function Dashboard({cambiarPagina}: DashboardProps) {

  const [pagina, setPagina] = useState("dashboard");
  const tienda = JSON.parse(localStorage.getItem("tienda") || "null");
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
  console.log("mi tienda es ",tienda);
  console.log("mi idTienda es",tienda.idTienda);
  // PRODUCTOS
  const [numeroProductos, setNumeroProducto] = useState(0);

  const obtenerNumeroProductos = async () => {
    try {
      const respuesta = await fetch(
        `http://localhost:3000/api/producto/tienda/${tienda.idTienda}`
      );
      const data = await respuesta.json();
      console.log("el numero de productos es ",data);
      setNumeroProducto(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  // CLIENTES
  const [numeroClientes, setNumeroCliente] = useState(0);

  const obtenerNumeroClientes = async () => {
    try {
      const respuesta = await fetch(
        "http://localhost:3000/api/cliente"
      );
      const data = await respuesta.json();
      console.log("el numero de clientes es ",data);
      setNumeroCliente(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  // VENTAS
  const [numeroVentas, setNumeroVenta] = useState(0);

  const obtenerNumeroVentas = async () => {

    try {

      const respuesta = await fetch(
        `http://localhost:3000/api/venta/tienda/${tienda.idTienda}`
      );

      const data = await respuesta.json();

      console.log("el numero de ventas es ",data);

      setNumeroVenta(data.length);

    } catch (error) {
      console.log(error);
    }
  };

  // COMPRAS
  const [numeroCompras, setNumeroCompra] = useState(0);

  const obtenerNumeroCompras = async () => {
    try {

      const respuesta = await fetch(
        `http://localhost:3000/api/compra/tienda/${tienda.idTienda}`
      );

      const data = await respuesta.json();

      console.log("el numero de compras es ",data);

      setNumeroCompra(data.length);

    } catch (error) {
      console.log(error);
    }

  };

  // EMPLEADOS
  const [numeroEmpleados, setNumeroEmpleado] = useState(0);

  const obtenerNumeroEmpleados = async () => {
    try {

      const respuesta = await fetch(
        "http://localhost:3000/api/empleado"
      );

      const data = await respuesta.json();

      console.log("el numero de empleados es ",data);
      setNumeroEmpleado(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  // PROVEEDORES
  const [numeroProveedores, setNumeroProveedor] = useState(0);

  const obtenerNumeroProveedores = async () => {
    try {
      const respuesta = await fetch(
        "http://localhost:3000/api/proveedor"
      );

      const data = await respuesta.json();

      console.log("el numero de proveedores es ",data);
      setNumeroProveedor(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  // DATOS DEL GRAFICO
  const datos = [

    {
      nombre: "Productos",
      cantidad: numeroProductos
    },

    {
      nombre: "Clientes",
      cantidad: numeroClientes
    },

    {
      nombre: "Ventas",
      cantidad: numeroVentas
    },

    {
      nombre: "Compras",
      cantidad: numeroCompras
    },

    {
      nombre: "Empleados",
      cantidad: numeroEmpleados
    },

    {
      nombre: "Proveedores",
      cantidad: numeroProveedores
    }

  ];

  const cerrarSesion = async() => {
    try {
      const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
      console.log("el usuario es ",usuario);
      await fetch(
        "http://localhost:3000/api/acceso",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ip:"::1",
            evento:"SALIDA",
            navegador:navigator.userAgent,
            idCuenta: usuario.idCuenta
          })
        }
      );
      localStorage.removeItem("usuario");
      localStorage.removeItem("tienda");

      cambiarPagina("login");
    } catch (error) {
      console.log(error);
    }
  }

  // CARGAR DATOS
  useEffect(() => {

    obtenerNumeroProductos();

    obtenerNumeroClientes();

    obtenerNumeroVentas();

    obtenerNumeroCompras();

    obtenerNumeroEmpleados();

    obtenerNumeroProveedores();

  }, []);

  return (

    <div className="dashboard">

      {/* MENU IZQUIERDO */}
      <div className="sidebar">

        <button
          className="menu-btn"
          onClick={() =>
            setPagina("dashboard")
          }
        >
          Dashboard
        </button>

        <button
          className="menu-btn"
          onClick={() =>
            setPagina("productos")
          }
        >
          Productos
        </button>

        <button
          className="menu-btn"
          onClick={() =>
            setPagina("categorias")
          }
        >
          Categoria
        </button>

        <button
          className="menu-btn"
          onClick={() =>
            setPagina("clientes")
          }
        >
          Clientes
        </button>

        <button
          className="menu-btn"
          onClick={() =>
            setPagina("ventas")
          }
        >
          Ventas
        </button>

        <button className="menu-btn"
          onClick={()=>
            setPagina("compras")
          }
        >
          Compras
        </button>

        <button
          className="menu-btn"
          onClick={() =>
            setPagina("empleados")
          }
        >
          Empleados
        </button>


        <button
          className="menu-btn"
          onClick={() =>
            setPagina("proveedores")
          }
        >
          Proveedores
        </button>
        {usuario?.rol === "admin" && (
          <button
            className="menu-btn"
            onClick={() => {
              localStorage.removeItem("tienda");
              cambiarPagina("tienda");
            }}
          >
            Cambiar Tienda
          </button>
        )}
{/*<button
          className="menu-btn"
          onClick={() => {
            localStorage.removeItem("tienda");
            cambiarPagina("tienda");
          }}
        >
        Cambiar Tienda
        </button>*/}
        

        <button
          className="menu-btn logout-btn"
          onClick={cerrarSesion}
        >
        Cerrar Sesión
        </button>
      </div>

      {/* CONTENIDO DERECHO */}
      <div className="content">

        {pagina === "dashboard" && (

          <>

            <h1>
              Dashboard Principal
            </h1>

            <p>
              Usted se encuentra en : 
              {" "+tienda.nombre}
            </p>

            {/* TARJETAS */}
            <div className="cards">

              <div className="card">
                <h2>{numeroProductos}</h2>
                <p>Productos</p>
              </div>

              <div className="card">
                <h2>{numeroClientes}</h2>
                <p>Clientes</p>
              </div>

              <div className="card">
                <h2>{numeroVentas}</h2>
                <p>Ventas</p>
              </div>

              <div className="card">
                <h2>{numeroCompras}</h2>
                <p>Compras</p>
              </div>

              <div className="card">
                <h2>{numeroEmpleados}</h2>
                <p>Empleados</p>
              </div>

              <div className="card">
                <h2>{numeroProveedores}</h2>
                <p>Proveedores</p>
              </div>

            </div>

            {/* GRAFICO */}

            <div
              style={{
                width: "100%",
                height: 400,
                marginTop: "40px",
                background: "white",
                padding: "20px",
                borderRadius: "10px"
              }}
            >

              <h2
                style={{
                  marginBottom: "20px"
                }}
              >
                Resumen General
              </h2>

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart data={datos}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis dataKey="nombre" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="cantidad"
                    fill="#8884d8"
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </>

        )}

        {pagina === "productos" && (
          <Producto />
        )}

        {pagina === "categorias" && (
          <Categoria />
        )}

        {pagina === "clientes" && (
          <Cliente />
        )}

        {pagina === "ventas" && (
          <Venta />
        )}

        {pagina === "compras" && (
          <Compra />
        )}

        {pagina === "empleados" && (
          <Empleado />
        )}

        {pagina === "proveedores" && (
          <Proveedor />
        )}

      </div>

    </div>

  );
}

export default Dashboard;