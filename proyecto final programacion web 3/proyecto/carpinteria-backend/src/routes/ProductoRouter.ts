import { Router } from "express";
import { ProductoController } from "../controller/ProductoController";
import { ProductoService } from "../service/ProductoService";
import { ProductoServiceImpl } from "../service/implements/ProductoServiceImpl";
import { ProductoDaoImpl } from "../dao/implements/ProductoDaoImpl";

const router = Router();

// Instanciar el DAO
const productoDao = new ProductoDaoImpl();

// Instancia del service
const productoService: ProductoService = new ProductoServiceImpl(productoDao);

// Instancia del controller
const productoController = new ProductoController(productoService);

// Rutas

// registrar
router.post('/', productoController.registrarProducto);

// actualizar
router.put('/:id', productoController.actualizarProducto);

// eliminar
router.delete('/:id', productoController.eliminarProducto);

// mostrar
router.get('/', productoController.mostrarProducto);

//obtener numero producto
router.get('/', productoController.obtenerNumeroProductos);

//obtener producto por tienda
router.get('/tienda/:idTienda', productoController.obtenerProductoPorTienda);
export default router;