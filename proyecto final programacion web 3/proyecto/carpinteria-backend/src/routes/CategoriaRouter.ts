import { Router } from "express";
import { CategoriaController } from "../controller/CategoriaController";
import { CategoriaService } from "../service/CategoriaService";
import { CategoriaServiceImpl } from "../service/implements/CategoriaServiceImpl";
import { CategoriaDaoImpl } from "../dao/implements/CategoriaDaoImpl";

const router = Router();

// Instanciar el DAO
const categoriaDao = new CategoriaDaoImpl();

// Instancia del service
const categoriaService: CategoriaService = new CategoriaServiceImpl(categoriaDao);

// Instancia del controller
const categoriaController = new CategoriaController(categoriaService);

// Rutas

// registrar
router.post('/', categoriaController.registrarCategoria);

// actualizar
router.put('/:id', categoriaController.actualizarCategoria);

// eliminar
router.delete('/:id', categoriaController.eliminarCategoria);

// mostrar
router.get('/', categoriaController.mostrarCategoria);

export default router;