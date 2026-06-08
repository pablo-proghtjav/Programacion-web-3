import { Router } from "express";
import { AccesoController } from "../controller/AccesoController";
import { AccesoService } from "../service/AccesoService";
import { AccesoServiceImpl } from "../service/implements/AccesoServiceImpl";
import { AccesoDaoImpl } from "../dao/implements/AccesoDaoImpl";

const router = Router();

// Instanciar el DAO
const accesoDao = new AccesoDaoImpl();
// Instancia del service
const accesoService: AccesoService = new AccesoServiceImpl(accesoDao);
// Instancia del controller
const accesoController = new AccesoController(accesoService);

// Rutas
// registrar
router.post('/', accesoController.registrarAcceso);
//mostrar por id cuenta
router.get('/cuenta/:id', accesoController.mostrarPorIdCuenta);

export default router;