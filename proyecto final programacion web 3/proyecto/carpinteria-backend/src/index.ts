import express from "express";
import cors from "cors";
import categoriaRoute from "./routes/CategoriaRouter";
import tiendaRoute from "./routes/TiendaRouter";
import empleadoRoute from "./routes/EmpleadoRouter";
import cuentaRoute from "./routes/CuentaRouter";
import productoRoute from "./routes/ProductoRouter";
import clienteRoute from "./routes/ClienteRoute";
import ventaRoute from "./routes/VentaRoute";
import detalleVentaRoute from "./routes/DetalleVentaRouter";
import proveedorRoute from "./routes/ProveedorRouter"
import compraRoute from "./routes/CompraRouter";
import detalleCompraRoute from "./routes/DetalleCompraRouter";
import accesoRoute from "./routes/AccesoRouter";
import ventaDocumentRoute from "./routes/VentaDocumentRoute";

const app = express();
app.use(cors());
app.use(express.json());

//ruta categoria
app.use("/api/categoria", categoriaRoute);

//ruta tienda
app.use("/api/tienda", tiendaRoute);
//ruta empleado
app.use("/api/empleado",empleadoRoute);
//ruta cuenta
app.use("/api/cuenta",cuentaRoute);
//ruta producto
app.use("/api/producto",productoRoute);
//ruta cliente
app.use("/api/cliente",clienteRoute);
//ruta venta
app.use("/api/venta",ventaRoute);
//ruta detalleVenta
app.use("/api/detalleVenta",detalleVentaRoute);
//ruta proveedor
app.use("/api/proveedor",proveedorRoute);
//ruta compra
app.use("/api/compra",compraRoute);
//ruta detalleCompra
app.use("/api/detalleCompra",detalleCompraRoute);
//ruta acceso
app.use("/api/acceso",accesoRoute);
//ruta generar venta pdf
app.use("/api/document",ventaDocumentRoute);


app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});

