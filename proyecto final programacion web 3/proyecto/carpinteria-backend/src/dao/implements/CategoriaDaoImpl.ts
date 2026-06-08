import { ResultSetHeader } from 'mysql2';
import { pool } from '../../config/db';
import { CategoriaDao } from "../CategoriaDao";
import { Categoria } from "../../models/Categoria";

export class CategoriaDaoImpl implements CategoriaDao {

    // Buscar por nombre
    async buscarPorNombre(nombre: string): Promise<Categoria | null> {

        const query = "SELECT * FROM categoria WHERE nombre = ?";

        try {

            const [rows]: any = await pool.query(query, [nombre]);

            if (rows.length === 0) {
                return null;
            }

            return rows[0] as Categoria;

        } catch (error) {
            console.error("Error al buscar categoría:", error);
            throw new Error("No se pudo buscar la categoría");
        }
    }

    // Crear categoría
    async crear(item: Categoria): Promise<Categoria> {

        const query = "INSERT INTO categoria (nombre, tipo) VALUES (?, ?)";

        const values = [item.nombre, item.tipo];

        try {

            const [result] = await pool.query<ResultSetHeader>(query, values);

            return new Categoria(
                result.insertId,
                item.nombre,
                item.tipo
            );

        } catch (error) {
            console.error("Error al crear categoría:", error);
            throw new Error("No se pudo insertar la categoría en la base de datos");
        }
    }

    // Actualizar categoría
    async actualizar(id: Number, item: Categoria): Promise<boolean> {

        const query = `
            UPDATE categoria
            SET nombre = ?, tipo = ?
            WHERE idCategoria = ?
        `;

        try {

            const [result] = await pool.query<ResultSetHeader>(query, [
                item.nombre,
                item.tipo,
                id
            ]);

            return result.affectedRows > 0;

        } catch (error) {
            console.error("Error al actualizar categoría:", error);
            throw new Error("No se pudo actualizar la categoría");
        }
    }

    // Eliminar categoría
    async eliminar(id: Number): Promise<boolean> {

        const query = "DELETE FROM categoria WHERE idCategoria = ?";

        try {

            const [result] = await pool.query<ResultSetHeader>(query, [id]);

            return result.affectedRows > 0;

        } catch (error) {
            console.error("Error al eliminar categoría:", error);
            throw new Error("No se pudo eliminar la categoría");
        }
    }

    // Mostrar categorías
    async mostrar(): Promise<Categoria[]> {

        const query = "SELECT * FROM categoria";

        try {

            const [rows]: any = await pool.query(query);

            return rows as Categoria[];

        } catch (error) {
            console.error("Error al mostrar categorías:", error);
            throw new Error("No se pudieron obtener las categorías");
        }
    }
}