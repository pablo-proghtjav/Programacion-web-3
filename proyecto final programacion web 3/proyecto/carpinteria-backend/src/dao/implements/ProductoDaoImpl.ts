import { ResultSetHeader } from 'mysql2';
import { pool } from '../../config/db';
import { ProductoDao } from '../ProductoDao';
import { Producto } from '../../models/Producto';

export class ProductoDaoImpl implements ProductoDao{
    async buscarPorId(idProducto: number): Promise<Producto> {
        const query = `
            SELECT *
            FROM producto
            WHERE idProducto = ?
        `;
        try {

            const [rows]: any = await pool.query(query, [idProducto]);

            return rows[0];

        } catch (error) {

            console.error("Error al obtener productos por id producto:", error);

            throw new Error("No se pudieron obtener los productos por id producto");
        }
    }
    
    async obtenerProductoPorTienda(idTienda: number): Promise<Producto[]> {

        const query = `
            SELECT *
            FROM producto
            WHERE idTienda = ?
        `;

        try {

            const [rows]: any = await pool.query(query, [idTienda]);

            return rows as Producto[];

        } catch (error) {

            console.error("Error al obtener productos por tienda:", error);

            throw new Error("No se pudieron obtener los productos por tienda");
        }
    }

    async obtenerNumeroProducto(): Promise<number> {
        const query = `
            SELECT COUNT(*) AS total
            FROM producto
        `;
        try {

            const [rows]: any = await pool.query(query);

            return rows[0].total;

        } catch (error) {

            console.error("Error al obtener número de productos:", error);

            throw new Error("No se pudo obtener la cantidad de productos");
        }
    }
    //codigo sql
    buscarPorNombre(nombre: string): Promise<Producto | null> {
        throw new Error('Method not implemented.');
    }
    async crear(item: Producto): Promise<Producto> {
        const query = `
            INSERT INTO producto(nombre, descripcion, precio, stock, material, color, fechaInicio, idCategoria, idTienda)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        try {
            const [result] = await pool.query<ResultSetHeader>(query, [
                item.nombre,
                item.descripcion,
                item.precio,
                item.stock,
                item.material,
                item.color,
                item.fechaInicio,
                item.idCategoria,
                item.idTienda,
            ]);

            item.idProducto = result.insertId;

            return item;

        } catch (error) {
            console.error("Error al crear producto:", error);
            throw new Error("No se pudo registrar el producto");
        }
    }
    async actualizar(id: Number, item: Producto): Promise<boolean> {
        const query = `
            UPDATE producto
            SET nombre = ?, descripcion = ?, precio = ?, stock = ?, material = ?, color = ?, fechaInicio = ?, idCategoria = ?, idTienda = ?
            WHERE idProducto = ?
        `;

        try {

            const [result] = await pool.query<ResultSetHeader>(query, [
                item.nombre,
                item.descripcion,
                item.precio,
                item.stock,
                item.material,
                item.color,
                item.fechaInicio,
                item.idCategoria,
                item.idTienda,
                id
            ]);

            return result.affectedRows > 0;

        } catch (error) {
            console.error("Error al actualizar cuenta:", error);
            throw new Error("No se pudo actualizar la cuenta");
        }
    }
    async eliminar(id: Number): Promise<boolean> {
        const query = "DELETE FROM producto WHERE idProducto = ?";
        try {

            const [result] = await pool.query<ResultSetHeader>(query, [id]);

            return result.affectedRows > 0;

        } catch (error) {
            console.error("Error al eliminar producto:", error);
            throw new Error("No se pudo eliminar el prodcuto");
        }
    }
    async mostrar(): Promise<Producto[]> {
        const query = "SELECT * FROM producto";
        
        try {
        
            const [rows]: any = await pool.query(query);
        
            return rows as Producto[];
        
        } catch (error) {
            console.error("Error al mostrar productos:", error);
            throw new Error("No se pudieron obtener los productos");
        }
    }
}