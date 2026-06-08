import { Router } from "express";
import { TiendaController } from "../controller/TiendaController";
import { TiendaService } from "../service/TiendaService";
import { TiendaServiceImpl } from "../service/implements/TiendaServiceImpl";
import { TiendaDaoImpl } from "../dao/implements/TiendaDaoImpl";

const router = Router();

//instanciar el DAO
const tiendaDao = new TiendaDaoImpl();

//Instancia del service
const tiendaService: TiendaService = new TiendaServiceImpl(tiendaDao);

//Instancia del Controller
const tiendaController = new TiendaController(tiendaService);

//Rutas

//registrar
router.post('/',tiendaController.registrarTienda);
//actualizar
router.put('/:id',tiendaController.actualizarTienda);
//Rutas

//registrar
router.post('/',tiendaController.registrarTienda);
//actualizar
router.put('/:id',tiendaController.actualizarTienda);
// eliminar
router.delete('/:id', tiendaController.eliminarTienda);
// mostrar
router.get('/', tiendaController.mostrarTienda);
export default router;