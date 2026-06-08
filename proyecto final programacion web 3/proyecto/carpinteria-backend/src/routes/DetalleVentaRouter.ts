import { Router } from "express";
import { DetalleVentaController } from "../controller/DetalleVentaController";
import { DetalleVentaService } from "../service/DetalleVentaService";
import { DetalleVentaServiceImpl } from "../service/implements/DetalleVentaServiceImpl";
import { DetalleVentaDaoImpl } from "../dao/implements/DetalleVentaDaoImpl";

const router = Router();

// Instanciar el DAO
const detalleVentaDao = new DetalleVentaDaoImpl();

// Instancia del service
const detalleVentaService: DetalleVentaService =
    new DetalleVentaServiceImpl(detalleVentaDao);

// Instancia del controller
const detalleVentaController = new DetalleVentaController(
    detalleVentaService
);

// Rutas

// registrar
router.post('/', detalleVentaController.registrarDetalleVenta);

// actualizar
router.put('/:id', detalleVentaController.actualizarDetalleVenta);

// eliminar
router.delete('/:id', detalleVentaController.eliminarDetalleVenta);

// mostrar
router.get('/', detalleVentaController.mostrarDetalleVenta);

//mostrar por id venta
router.get('/:idVenta', detalleVentaController.buscarPorIdVenta);

export default router;