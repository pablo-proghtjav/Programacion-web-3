import { ResultSetHeader } from 'mysql2';
import { pool } from '../../config/db';
import { CuentaDao } from '../CuentaDao';
import { Cuenta } from '../../models/Cuenta';

export class CuentaDaoImpl implements CuentaDao{
    async devolverPorIdEmpleado(idEmpleado: number): Promise<Cuenta[]> {
        const sql = `
            SELECT *
            FROM cuenta
            where idEmpleado = ?
        `;
        const [rows]: any = await pool.query(sql, [idEmpleado]);
        return rows;
    }
    async devolverIdTienda(usuario: string): Promise<any> {
        const sql = `
            SELECT E.idTienda 
            FROM empleado as E, cuenta as C
            where E.idEmpleado=C.idEmpleado
            and C.usuario = ?
        `;
        const [rows]: any = await pool.query(sql, [usuario]);
        return rows[0];
    }
    //codigo sql
    
    async buscarPorUsuario(usuario: string): Promise<Cuenta> {
        const sql = `
            SELECT * 
            FROM cuenta
            WHERE usuario = ?
        `;
        const [rows]: any = await pool.query(sql, [usuario]);
        return rows[0];
    }
    
    async login(usuario: string, password: string): Promise<any> {

        const sql = `
            SELECT * 
            FROM cuenta
            WHERE usuario = ?
            AND contraseña = ?
        `;

        const [rows]: any = await pool.query(sql, [usuario, password]);

        return rows[0];
    }
    async crear(item: Cuenta): Promise<Cuenta> {

        const query = `
            INSERT INTO cuenta(usuario, contrasena, rol, idEmpleado)
            VALUES (?, ?, ?, ?)
        `;

        try {

            const [result] = await pool.query<ResultSetHeader>(query, [
                item.usuario,
                item.contrasena,
                item.rol,
                item.idEmpleado
            ]);

            item.idCuenta = result.insertId;

            return item;

        } catch (error) {
            console.error("Error al crear cuenta:", error);
            throw new Error("No se pudo registrar la cuenta");
        }
    }
    async actualizar(id: Number, item: Cuenta): Promise<boolean> {
        const query = `
            UPDATE cuenta
            SET usuario = ?, contrasena = ?, rol = ?, idEmpleado = ?
            WHERE idCuenta = ?
        `;

        try {

            const [result] = await pool.query<ResultSetHeader>(query, [
                item.usuario,
                item.contrasena,
                item.rol,
                item.idEmpleado,
                id
            ]);

            return result.affectedRows > 0;

        } catch (error) {
            console.error("Error al actualizar cuenta:", error);
            throw new Error("No se pudo actualizar la cuenta");
        }
    }
    async eliminar(id: Number): Promise<boolean> {

        const query = "DELETE FROM cuenta WHERE idCuenta = ?";

        try {

            const [result] = await pool.query<ResultSetHeader>(query, [id]);

            return result.affectedRows > 0;

        } catch (error) {
            console.error("Error al eliminar cuenta:", error);
            throw new Error("No se pudo eliminar la cuenta");
        }
    }
    async mostrar(): Promise<Cuenta[]> {

        const query = "SELECT * FROM cuenta";

        try {

            const [rows]: any = await pool.query(query);

            return rows as Cuenta[];

        } catch (error) {
            console.error("Error al mostrar cuentas:", error);
            throw new Error("No se pudieron obtener las cuentas");
        }
    }

}