import { Categoria } from "../../models/Categoria";
import { CategoriaService } from "../CategoriaService";
import { CategoriaDao } from "../../dao/CategoriaDao";

export class CategoriaServiceImpl implements CategoriaService {

    private categoriaDao: CategoriaDao;

    constructor(categoriaDao: CategoriaDao) {
        this.categoriaDao = categoriaDao;
    }

    // Registrar categoría
    async registrarCategoria(categoria: Categoria): Promise<Categoria> {

        try {

            const nuevaCategoria = await this.categoriaDao.crear(categoria);

            return nuevaCategoria;

        } catch (error) {
            console.error("Error en el servicio al registrar categoría:", error);
            throw new Error("Error en el servicio al registrar categoría");
        }
    }

    // Actualizar categoría
    async actualizarCategoria(idCategoria: number,categoria: Categoria): Promise<Categoria | null> {

        try {

            const actualizado = await this.categoriaDao.actualizar(
                idCategoria,
                categoria
            );

            if (!actualizado) {
                return null;
            }

            return categoria;

        } catch (error) {
            console.error("Error en el servicio al actualizar categoría:", error);
            throw new Error("Error en el servicio al actualizar categoría");
        }
    }

    // Eliminar categoría
    async eliminarCategoria(idCategoria: number): Promise<boolean> {

        try {

            const eliminado = await this.categoriaDao.eliminar(idCategoria);

            return eliminado;

        } catch (error) {
            console.error("Error en el servicio al eliminar categoría:", error);
            throw new Error("Error en el servicio al eliminar categoría");
        }
    }

    // Mostrar categorías
    async mostrarCategoria(): Promise<Categoria[]> {

        try {

            const categorias = await this.categoriaDao.mostrar();

            return categorias;

        } catch (error) {
            console.error("Error en el servicio al mostrar categorías:", error);
            throw new Error("Error en el servicio al mostrar categorías");
        }
    }
}