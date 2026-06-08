import { ResultSetHeader } from 'mysql2';
import { pool } from '../../config/db';
import { CompraDao } from '../CompraDao';
import { Compra } from '../../models/Compra';

export class CompraDaoImpl implements CompraDao {

    async mostrarPorTienda(idTienda: number): Promise<Compra[]> {
        const query = `
            SELECT *
            FROM compra
            WHERE idTienda = ?
        `;

        try {

            const [rows]: any = await pool.query(query, [idTienda]);

            return rows as Compra[];

        } catch (error) {
            console.error("Error al mostrar compras por tienda:", error);
            throw new Error("No se pudieron obtener las compras");
        }
    }

    // Buscar compra (no implementado aún)
    async buscarPorNombre(nombre: string): Promise<Compra | null> {
        throw new Error('Method not implemented.');
    }

    async crear(item: Compra): Promise<Compra> {

        const query = `
            INSERT INTO compra(fechaC, total, idProveedor, idTienda)
            VALUES (?, ?, ?, ?)
        `;

        try {

            const [result] = await pool.query<ResultSetHeader>(
                query,
                [
                    item.fechaC,
                    item.total,
                    item.idProveedor,
                    item.idTienda
                ]
            );

            item.idCompra = result.insertId;

            return item;

        } catch (error) {
            console.error("Error al crear compra:", error);
            throw new Error("No se pudo registrar la compra");
        }
    }


    async actualizar(id: Number, item: Compra): Promise<boolean> {

        const query = `
            UPDATE compra
            SET fechaC = ?, total = ?, idProveedor = ?, idTienda = ?
            WHERE idCompra = ?
        `;

        try {

            const [result] = await pool.query<ResultSetHeader>(
                query,
                [
                    item.fechaC,
                    item.total,
                    item.idProveedor,
                    item.idTienda,
                    id
                ]
            );

            return result.affectedRows > 0;

        } catch (error) {
            console.error("Error al actualizar compra:", error);
            throw new Error("No se pudo actualizar la compra");
        }
    }


    async eliminar(id: Number): Promise<boolean> {

        const query = `
            DELETE FROM compra 
            WHERE idCompra = ?
        `;

        try {

            const [result] = await pool.query<ResultSetHeader>(
                query,
                [id]
            );

            return result.affectedRows > 0;

        } catch (error) {
            console.error("Error al eliminar compra:", error);
            throw new Error("No se pudo eliminar la compra");
        }
    }


    async mostrar(): Promise<Compra[]> {

        const query = `
            SELECT 
                c.idCompra,
                c.fechaC,
                c.total,
                c.idProveedor,
                c.idTienda,
                t.nombre AS nombreTienda
            FROM compra c
            INNER JOIN tienda t ON c.idTienda = t.idTienda
        `;

        try {

            const [rows]: any = await pool.query(query);

            return rows as Compra[];

        } catch (error) {
            console.error("Error al mostrar compras:", error);
            throw new Error("No se pudieron obtener las compras");
        }
    }
}