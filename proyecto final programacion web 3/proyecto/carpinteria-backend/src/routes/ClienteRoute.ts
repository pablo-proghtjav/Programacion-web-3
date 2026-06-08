import { Router } from "express";
import { ClienteController } from "../controller/ClienteController";
import { ClienteService } from "../service/ClienteService";
import { ClienteServiceImpl } from "../service/implements/ClienteServiceImpl";
import { ClienteDaoImpl } from "../dao/implements/ClienteDaoImpl";

const router = Router();

// Instanciar el DAO
const clienteDao = new ClienteDaoImpl();

// Instancia del service
const clienteService: ClienteService = new ClienteServiceImpl(clienteDao);

// Instancia del controller
const clienteController = new ClienteController(clienteService);

// Rutas

// registrar
router.post('/', clienteController.registrarCliente);

// actualizar
router.put('/:id', clienteController.actualizarCliente);

// eliminar
router.delete('/:id', clienteController.eliminarCliente);

// mostrar
router.get('/', clienteController.mostrarCliente);

export default router;