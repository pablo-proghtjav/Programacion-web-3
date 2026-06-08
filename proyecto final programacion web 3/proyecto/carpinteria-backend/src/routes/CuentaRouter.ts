import { Router } from "express";
import { CuentaController } from "../controller/CuentaController";
import { CuentaService } from "../service/CuentaService";
import { CuentaServiceImpl } from "../service/implements/CuentaServiceImpl";
import { CuentaDaoImpl } from "../dao/implements/CuentaDaoImpl";

import { AccesoService } from "../service/AccesoService";
import { AccesoServiceImpl } from "../service/implements/AccesoServiceImpl";
import { AccesoDaoImpl } from "../dao/implements/AccesoDaoImpl";

const router = Router();

// Instanciar el DAO
const cuentaDao = new CuentaDaoImpl();
const accesoDao = new AccesoDaoImpl();

// Instancia del service
const cuentaService: CuentaService = new CuentaServiceImpl(cuentaDao);
const accesoService: AccesoService = new AccesoServiceImpl(accesoDao);

// Instancia del controller
const cuentaController = new CuentaController(cuentaService,accesoService);

// Rutas

// registrar
router.post('/', cuentaController.registrarCuenta);

// actualizar
router.put('/:id', cuentaController.actualizarCuenta);

// eliminar
router.delete('/:id', cuentaController.eliminarCuenta);

// mostrar
router.get('/', cuentaController.mostrarCuenta);

//login
router.post('/login', cuentaController.login);

//devolver por idEmpelado
router.get('/empleado/:id', cuentaController.devolverPorIdEmpleado);

export default router;