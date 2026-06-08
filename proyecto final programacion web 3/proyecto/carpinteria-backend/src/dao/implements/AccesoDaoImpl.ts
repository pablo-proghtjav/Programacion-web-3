import { ResultSetHeader } from 'mysql2';
import { pool } from '../../config/db';
import { AccesoDao } from '../AccesoDao';
import { Acceso } from '../../models/Acceso';

export class AccesoDaoImpl implements AccesoDao{

    async mostrarPorIdCuenta(idCuenta: number): Promise<Acceso[]> {
        const sql = `
            SELECT *
            FROM acceso
            where idCuenta = ?
            `;
        try {
            const [rows]: any = await pool.query(sql, [idCuenta]);
            return rows;
        } catch (error) {
            console.error("Error al mostrar el acceso:", error);
            throw new Error("No se pudo mostrar el acceso");
        }
    }
    async crear(item: Acceso): Promise<Acceso> {
        const query = `
            INSERT INTO acceso(ip,evento,navegador,fechahora,idCuenta)
            VALUES (?, ?, ?, ?, ?)
        `;
        try {
            const [result] = await pool.query<ResultSetHeader>(query, [
                item.ip,
                item.evento,
                item.navegador,
                item.fechahora,
                item.idCuenta
            ]);

            item.idAcceso = result.insertId;
            return item;

        } catch (error) {
            console.error("Error al crear el acceso:", error);
            throw new Error("No se pudo registrar el acceso");
        }
    }
    actualizar(id: Number, item: Acceso): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    eliminar(id: Number): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    mostrar(): Promise<Acceso[]> {
        throw new Error('Method not implemented.');
    }

}