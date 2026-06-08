import { ResultSetHeader } from 'mysql2';
import { pool } from '../../config/db';
import { ClienteDao } from '../ClienteDao';
import { Cliente } from '../../models/Cliente';

export class ClienteDaoImpl implements ClienteDao {

    // Buscar por nombre
    async buscarPorNombre(nombre: string): Promise<Cliente | null> {

        const query = "SELECT * FROM cliente WHERE nombre = ?";

        try {

            const [rows]: any = await pool.query(query, [nombre]);

            if (rows.length === 0) {
                return null;
            }

            return rows[0] as Cliente;

        } catch (error) {
            console.error("Error al buscar cliente:", error);
            throw new Error("No se pudo buscar el cliente");
        }
    }

    // Crear cliente
    async crear(item: Cliente): Promise<Cliente> {

        const query = `
            INSERT INTO cliente(nombre, apellido, celular, direccion)
            VALUES (?, ?, ?, ?)
        `;

        try {

            const [result] = await pool.query<ResultSetHeader>(query, [
                item.nombre,
                item.apellido,
                item.celular,
                item.direccion
            ]);

            item.idCliente = result.insertId;

            return item;

        } catch (error) {
            console.error("Error al crear cliente:", error);
            throw new Error("No se pudo registrar el cliente");
        }
    }

    // Actualizar cliente
    async actualizar(id: Number, item: Cliente): Promise<boolean> {

        const query = `
            UPDATE cliente
            SET nombre = ?, apellido = ?, celular = ?, direccion = ?
            WHERE idCliente = ?
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
            console.error("Error al actualizar cliente:", error);
            throw new Error("No se pudo actualizar el cliente");
        }
    }

    // Eliminar cliente
    async eliminar(id: Number): Promise<boolean> {

        const query = "DELETE FROM cliente WHERE idCliente = ?";

        try {

            const [result] = await pool.query<ResultSetHeader>(query, [id]);

            return result.affectedRows > 0;

        } catch (error) {
            console.error("Error al eliminar cliente:", error);
            throw new Error("No se pudo eliminar el cliente");
        }
    }

    // Mostrar clientes
    async mostrar(): Promise<Cliente[]> {

        const query = "SELECT * FROM cliente";

        try {

            const [rows]: any = await pool.query(query);

            return rows as Cliente[];

        } catch (error) {
            console.error("Error al mostrar clientes:", error);
            throw new Error("No se pudieron obtener los clientes");
        }
    }
}