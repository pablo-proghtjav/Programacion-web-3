import { Router } from "express";
import { DetalleCompraController } from "../controller/DetalleCompraController";
import { DetalleCompraService } from "../service/DetalleCompraService";
import { DetalleCompraServiceImpl } from "../service/implements/DetalleCompraServiceImpl";
import { DetalleCompraDaoImpl } from "../dao/implements/DetalleCompraDaoImpl";

const router = Router();

// Instanciar el DAO
const detalleCompraDao = new DetalleCompraDaoImpl();

// Instancia del service
const detalleCompraService: DetalleCompraService = new DetalleCompraServiceImpl(detalleCompraDao);

// Instancia del controller
const detalleCompraController = new DetalleCompraController(detalleCompraService);

// Rutas

// registrar
router.post('/', detalleCompraController.registrarDetalleCompra);

// actualizar
router.put('/:id', detalleCompraController.actualizarDetalleCompra);

// eliminar
router.delete('/:id', detalleCompraController.eliminarDetalleCompra);

// mostrar
router.get('/', detalleCompraController.mostrarDetalleCompra);

//mostrar por id compra
router.get('/:idCompra', detalleCompraController.buscarPorIdCompra);

export default router;