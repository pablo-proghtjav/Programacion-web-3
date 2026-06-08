import { ResultSetHeader } from 'mysql2';
import { pool } from '../../config/db';
import { VentaDao } from '../VentaDao';
import { Venta } from '../../models/Venta';

export class VentaDaoImpl implements VentaDao {
    async mostrarPorTienda(idTienda: number): Promise<Venta[]> {
        const query = `
        SELECT *
        FROM venta
        WHERE idTienda = ?
        `;

        try {

            const [rows]: any = await pool.query(query, [idTienda]);

            return rows as Venta[];

        } catch (error) {
            console.error("Error al mostrar ventas:", error);
            throw new Error("No se pudieron obtener las ventas");
        }
    }

 
    async buscarPorNombre(nombre: string): Promise<Venta | null> {


        const query = `
            SELECT v.*
            FROM venta v
            INNER JOIN cliente c ON v.idCliente = c.idCliente
            WHERE c.nombre = ?
        `;

        try {

            const [rows]: any = await pool.query(query, [nombre]);

            if (rows.length === 0) {
                return null;
            }

            return rows[0] as Venta;

        } catch (error) {
            console.error("Error al buscar venta:", error);
            throw new Error("No se pudo buscar la venta");
        }
    }

 
    async crear(item: Venta): Promise<Venta> {

        const query = `
            INSERT INTO venta(fechaV, total, idCliente, idTienda)
            VALUES (?, ?, ?, ?)
        `;

        try {

            const [result] = await pool.query<ResultSetHeader>(query, [
                item.fechaV,
                item.total,
                item.idCliente,
                item.idTienda
            ]);

            item.idVenta = result.insertId;

            return item;

        } catch (error) {
            console.error("Error al crear venta:", error);
            throw new Error("No se pudo registrar la venta");
        }
    }

 
    async actualizar(id: Number, item: Venta): Promise<boolean> {

        const query = `
            UPDATE venta
            SET fechaV = ?, total = ?, idCliente = ?, idTienda = ?
            WHERE idVenta = ?
        `;

        try {

            const [result] = await pool.query<ResultSetHeader>(query, [
                item.fechaV,
                item.total,
                item.idCliente,
                item.idTienda,
                id
            ]);

            return result.affectedRows > 0;

        } catch (error) {
            console.error("Error al actualizar venta:", error);
            throw new Error("No se pudo actualizar la venta");
        }
    }

 
    async eliminar(id: Number): Promise<boolean> {

        const query = "DELETE FROM venta WHERE idVenta = ?";

        try {

            const [result] = await pool.query<ResultSetHeader>(query, [id]);

            return result.affectedRows > 0;

        } catch (error) {
            console.error("Error al eliminar venta:", error);
            throw new Error("No se pudo eliminar la venta");
        }
    }

 
    async mostrar(): Promise<Venta[]> {

        const query = `
            SELECT 
                v.idVenta,
                v.fechaV,
                v.total,
                v.idCliente,
                v.idTienda,
                c.nombre AS nombreCliente,
                t.nombre AS nombreTienda
            FROM venta v
            INNER JOIN cliente c ON v.idCliente = c.idCliente
            INNER JOIN tienda t ON v.idTienda = t.idTienda
        `;

        try {

            const [rows]: any = await pool.query(query);

            return rows as Venta[];

        } catch (error) {
            console.error("Error al mostrar ventas:", error);
            throw new Error("No se pudieron obtener las ventas");
        }
    }
}