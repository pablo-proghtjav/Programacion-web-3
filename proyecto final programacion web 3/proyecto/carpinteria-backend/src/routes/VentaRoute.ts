import { Router } from "express";
import { VentaController } from "../controller/VentaController";
import { VentaService } from "../service/VentaService";
import { VentaServiceImpl } from "../service/implements/VentaServiceImpl";
import { VentaDaoImpl } from "../dao/implements/VentaDaoImpl";

const router = Router();

// Instanciar el DAO
const ventaDao = new VentaDaoImpl();

// Instancia del service
const ventaService: VentaService = new VentaServiceImpl(ventaDao);

// Instancia del controller
const ventaController = new VentaController(ventaService);

// Rutas

router.post('/', ventaController.registrarVenta);

router.put('/:id', ventaController.actualizarVenta);

router.delete('/:id', ventaController.eliminarVenta);

router.get('/', ventaController.mostrarVenta);

// NUEVA RUTA: mostrar ventas por tienda
router.get('/tienda/:idTienda', ventaController.mostrarVentaPorTienda);

export default router;