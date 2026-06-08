import { Router } from "express";
import { CompraController } from "../controller/CompraController";
import { CompraService } from "../service/CompraService";
import { CompraServiceImpl } from "../service/implements/CompraServiceImpl";
import { CompraDaoImpl } from "../dao/implements/CompraDaoImpl";

const router = Router();

// Instanciar el DAO
const compraDao = new CompraDaoImpl();

// Instancia del service
const compraService: CompraService = new CompraServiceImpl(compraDao);

// Instancia del controller
const compraController = new CompraController(compraService);

// Rutas

router.post('/', compraController.registrarCompra);

router.put('/:id', compraController.actualizarCompra);

router.delete('/:id', compraController.eliminarCompra);

router.get('/', compraController.mostrarCompra);

// NUEVA RUTA: mostrar compras por tienda
router.get('/tienda/:idTienda', compraController.mostrarCompraPorTienda);

export default router;