import { Router } from "express";
import { EmpleadoController } from "../controller/EmpleadoController";
import { EmpleadoService } from "../service/EmpleadoService";
import { EmpleadoServiceImpl } from "../service/implements/EmpleadoServiceImpl";
import { EmpleadoDaoImpl } from "../dao/implements/EmpleadoDaoImpl";

const router = Router();

// Instanciar el DAO
const empleadoDao = new EmpleadoDaoImpl();

// Instancia del service
const empleadoService: EmpleadoService = new EmpleadoServiceImpl(empleadoDao);

// Instancia del controller
const empleadoController = new EmpleadoController(empleadoService);

// Rutas

// registrar
router.post('/', empleadoController.registrarEmpleado);

// actualizar
router.put('/:id', empleadoController.actualizarEmpleado);

// eliminar
router.delete('/:id', empleadoController.eliminarEmpleado);

// mostrar
router.get('/', empleadoController.mostrarEmpleado);

export default router;