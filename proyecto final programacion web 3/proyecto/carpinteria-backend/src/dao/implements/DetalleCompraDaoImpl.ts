import { ResultSetHeader } from 'mysql2';
import { pool } from '../../config/db';
import { DetalleCompraDao } from '../DetalleCompraDao';
import { DetalleCompra } from '../../models/DetalleCompra';

export class DetalleCompraDaoImpl implements DetalleCompraDao {
    async buscarPorIdCompra(id: number): Promise<DetalleCompra[]> {
        const query = `
            SELECT *
            FROM detalleCompra
            WHERE idCompra = ?
        `;
        try {
            const [rows]: any = await pool.query(query, [id]);
            return rows as DetalleCompra[];
        } catch (error) {
            console.error("Error al buscar detalle compra:",error);
            throw new Error("No se pudo buscar el detalle compra");
        }
    }

    // codigo sql
    buscarPorNombre(nombre: string): Promise<DetalleCompra | null> {
        throw new Error('Method not implemented.');
    }

    async crear(item: DetalleCompra): Promise<DetalleCompra> {

        const query = `
            INSERT INTO detalleCompra(cantidad, precio, subTotal, idCompra, idProducto)
            VALUES (?, ?, ?, ?, ?)
        `;

        try {

            const [result] = await pool.query<ResultSetHeader>(query, [
                item.cantidad,
                item.precio,
                item.subTotal,
                item.idCompra,
                item.idProducto
            ]);

            item.idDetalleC = result.insertId;

            return item;

        } catch (error) {
            console.error("Error al crear detalle compra:", error);
            throw new Error("No se pudo registrar el detalle compra");
        }
    }

    async actualizar(id: Number, item: DetalleCompra): Promise<boolean> {

        const query = `
            UPDATE detalleCompra
            SET cantidad = ?, precio = ?, subTotal = ?, idCompra = ?, idProducto = ?
            WHERE idDetalleC = ?
        `;

        try {

            const [result] = await pool.query<ResultSetHeader>(query, [
                item.cantidad,
                item.precio,
                item.subTotal,
                item.idCompra,
                item.idProducto,
                id
            ]);

            return result.affectedRows > 0;

        } catch (error) {
            console.error("Error al actualizar detalle compra:", error);
            throw new Error("No se pudo actualizar el detalle compra");
        }
    }

    async eliminar(id: Number): Promise<boolean> {

        const query = "DELETE FROM detalleCompra WHERE idDetalleC = ?";

        try {

            const [result] = await pool.query<ResultSetHeader>(query, [id]);

            return result.affectedRows > 0;

        } catch (error) {
            console.error("Error al eliminar detalle compra:", error);
            throw new Error("No se pudo eliminar el detalle compra");
        }
    }

    async mostrar(): Promise<DetalleCompra[]> {

        const query = "SELECT * FROM detalleCompra";

        try {

            const [rows]: any = await pool.query(query);

            return rows as DetalleCompra[];

        } catch (error) {
            console.error("Error al mostrar detalle compras:", error);
            throw new Error("No se pudieron obtener los detalle compras");
        }
    }
}