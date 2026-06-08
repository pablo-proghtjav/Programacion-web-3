import { Router } from "express";
import { ProveedorController } from "../controller/ProveedorController";
import { ProveedorService } from "../service/ProveedorService";
import { ProveedorServiceImpl } from "../service/implements/ProveedorServiceImpl";
import { ProveedorDaoImpl } from "../dao/implements/ProveedorDaoImpl";

const router = Router();

// Instanciar el DAO
const proveedorDao = new ProveedorDaoImpl();

// Instancia del service
const proveedorService: ProveedorService =new ProveedorServiceImpl(proveedorDao);

// Instancia del controller
const proveedorController =new ProveedorController(proveedorService);

// Rutas

// registrar
router.post('/',proveedorController.registrarProveedor);

// actualizar
router.put('/:id',proveedorController.actualizarProveedor);

// eliminar
router.delete('/:id',proveedorController.eliminarProveedor);

// mostrar
router.get('/',proveedorController.mostrarProveedor);

export default router;