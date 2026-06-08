import { ResultSetHeader } from 'mysql2';
import { pool } from '../../config/db';
import { DetalleVentaDao } from '../DetalleVentaDao';
import { DetalleVenta } from '../../models/DetalleVenta';

export class DetalleVentaDaoImpl implements DetalleVentaDao {
    // Buscar detalle venta por idVenta
    async buscarPorIdVenta(id: number): Promise<DetalleVenta[]> {

        const query = `
            SELECT *
            FROM detalleVenta
            WHERE idVenta = ?
        `;

        try {

            const [rows]: any =
                await pool.query(query, [id]);

            return rows as DetalleVenta[];

        } catch (error) {

            console.error(
                "Error al buscar detalle venta:",
                error
            );

            throw new Error(
                "No se pudo buscar el detalle venta"
            );
        }
    }

    // Buscar detalle venta
    async buscarPorNombre(nombre: string): Promise<DetalleVenta | null> {

        const query = "SELECT * FROM detalleventa WHERE idDetalleV = ?";

        try {

            const [rows]: any = await pool.query(query, [nombre]);

            if (rows.length === 0) {
                return null;
            }

            return rows[0] as DetalleVenta;

        } catch (error) {
            console.error("Error al buscar detalle venta:", error);
            throw new Error("No se pudo buscar el detalle venta");
        }
    }

    // Crear detalle venta
    async crear(item: DetalleVenta): Promise<DetalleVenta> {

        const query = `
            INSERT INTO detalleVenta(cantidad, precio, subTotal, idVenta, idProducto)
            VALUES (?, ?, ?, ?, ?)
        `;

        try {

            const [result] = await pool.query<ResultSetHeader>(query, [
                item.cantidad,
                item.precio,
                item.subTotal,
                item.idVenta,
                item.idProducto
            ]);

            item.idDetalleV = result.insertId;

            return item;

        } catch (error) {
            console.error("Error al crear detalle venta:", error);
            throw new Error("No se pudo registrar el detalle venta");
        }
    }

    // Actualizar detalle venta
    async actualizar(id: Number, item: DetalleVenta): Promise<boolean> {

        const query = `
            UPDATE detalleVenta
            SET cantidad = ?, precio = ?, subTotal = ?, idVenta = ?, idProducto = ?
            WHERE idDetalleV = ?
        `;

        try {

            const [result] = await pool.query<ResultSetHeader>(query, [
                item.cantidad,
                item.precio,
                item.subTotal,
                item.idVenta,
                item.idProducto,
                id
            ]);

            return result.affectedRows > 0;

        } catch (error) {
            console.error("Error al actualizar detalle venta:", error);
            throw new Error("No se pudo actualizar el detalle venta");
        }
    }

    // Eliminar detalle venta
    async eliminar(id: Number): Promise<boolean> {

        const query = "DELETE FROM detalleVenta WHERE idDetalleV = ?";

        try {

            const [result] = await pool.query<ResultSetHeader>(query, [id]);

            return result.affectedRows > 0;

        } catch (error) {
            console.error("Error al eliminar detalle venta:", error);
            throw new Error("No se pudo eliminar el detalle venta");
        }
    }

    // Mostrar detalle ventas
    async mostrar(): Promise<DetalleVenta[]> {

        const query = "SELECT * FROM detalleVenta";

        try {

            const [rows]: any = await pool.query(query);

            return rows as DetalleVenta[];

        } catch (error) {
            console.error("Error al mostrar detalle ventas:", error);
            throw new Error("No se pudieron obtener los detalle ventas");
        }
    }
}