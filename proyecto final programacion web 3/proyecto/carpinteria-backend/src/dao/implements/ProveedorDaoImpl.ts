import { ResultSetHeader } from 'mysql2';
import { pool } from '../../config/db';
import { ProveedorDao } from '../ProveedorDao';
import { Proveedor } from '../../models/Proveedor';

export class ProveedorDaoImpl implements ProveedorDao {

    // Buscar proveedor
    async buscarPorNombre(nombre: string): Promise<Proveedor | null> {

        const query = "SELECT * FROM proveedor WHERE nombre = ?";

        try {

            const [rows]: any = await pool.query(query, [nombre]);

            if (rows.length === 0) {
                return null;
            }

            return rows[0] as Proveedor;

        } catch (error) {
            console.error("Error al buscar proveedor:", error);
            throw new Error("No se pudo buscar el proveedor");
        }
    }

    // Crear proveedor
    async crear(item: Proveedor): Promise<Proveedor> {

        const query = `
            INSERT INTO proveedor(nombre, apellido, celular, direccion)
            VALUES (?, ?, ?, ?)
        `;

        try {

            const [result] = await pool.query<ResultSetHeader>(query, [
                item.nombre,
                item.apellido,
                item.celular,
                item.direccion
            ]);

            item.idProveedor = result.insertId;

            return item;

        } catch (error) {
            console.error("Error al crear proveedor:", error);
            throw new Error("No se pudo registrar el proveedor");
        }
    }

    // Actualizar proveedor
    async actualizar(id: Number, item: Proveedor): Promise<boolean> {

        const query = `
            UPDATE proveedor
            SET nombre = ?, apellido = ?, celular = ?, direccion = ?
            WHERE idProveedor = ?
        `;

        try {

            const [result] = await pool.query<ResultSetHeader>(query, [
                item.nombre,
                item.apellido,
                item.celular,
                item.direccion,
                id
            ]);

            return result.affectedRows > 0;

        } catch (error) {
            console.error("Error al actualizar proveedor:", error);
            throw new Error("No se pudo actualizar el proveedor");
        }
    }

    // Eliminar proveedor
    async eliminar(id: Number): Promise<boolean> {

        const query = "DELETE FROM proveedor WHERE idProveedor = ?";

        try {

            const [result] = await pool.query<ResultSetHeader>(query, [id]);

            return result.affectedRows > 0;

        } catch (error) {
            console.error("Error al eliminar proveedor:", error);
            throw new Error("No se pudo eliminar el proveedor");
        }
    }

    // Mostrar proveedores
    async mostrar(): Promise<Proveedor[]> {

        const query = "SELECT * FROM proveedor";

        try {

            const [rows]: any = await pool.query(query);

            return rows as Proveedor[];

        } catch (error) {
            console.error("Error al mostrar proveedores:", error);
            throw new Error("No se pudieron obtener los proveedores");
        }
    }
}