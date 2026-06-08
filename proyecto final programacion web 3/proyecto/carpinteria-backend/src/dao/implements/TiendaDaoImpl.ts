import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../../config/db';
import { TiendaDao } from '../TiendaDao';
import { Tienda } from '../../models/Tienda';

export class TiendaDaoImpl implements TiendaDao{
    //codigo sql
    buscarPorNombre(nombre: string): Promise<Tienda | null> {
        throw new Error('Method not implemented.');
    }

    async crear(item: Tienda): Promise<Tienda> {

        const query = "INSERT INTO tienda (direccion, nombre) VALUES (?, ?)";
        const values = [item.direccion, item.nombre];
        try {
            const [result] = await pool.query<ResultSetHeader>(query, values);
                
            return new Tienda(result.insertId, item.direccion, item.nombre);
        } catch (error) {
            console.error("Error al crear tienda:", error);
            throw new Error("No se pudo insertar la tienda en la base de datos");
        }       
    }
    async actualizar(id: Number,item: Tienda): Promise<boolean> {
        const query = "UPDATE tienda SET direccion = ?, nombre = ? WHERE idTienda = ?";
        const values = [item.direccion, item.nombre, item.idTienda];

        try {
            const [result] = await pool.query<ResultSetHeader>(query, values);
        
            return result.affectedRows > 0; // true si se actualizó
        } catch (error) {
            console.error("Error al actualizar tienda:", error);
            throw new Error("No se pudo actualizar la tienda");
        }
    }
    async eliminar(id: Number): Promise<boolean> {
        const query = "DELETE FROM tienda WHERE idTienda = ?";
        
        try {
            const [result] = await pool.query<ResultSetHeader>(query, [id]);

            return result.affectedRows > 0; // true si eliminó algo
        } catch (error) {
            console.error("Error al eliminar tienda:", error);
            throw new Error("No se pudo eliminar la tienda");
        }
    }
    async mostrar(): Promise<Tienda[]> {
        const query = "SELECT * FROM tienda";

        try {
            const [rows] = await pool.query<RowDataPacket[]>(query);
            return rows as Tienda[];
        } catch (error) {
            console.error("Error al mostrar tiendas:", error);
            throw new Error("No se pudieron obtener las tiendas");
        }
    }

}