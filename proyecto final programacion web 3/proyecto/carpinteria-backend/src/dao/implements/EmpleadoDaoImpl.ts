import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../../config/db';
import { EmpleadoDao } from '../EmpleadoDao';
import { Empleado } from '../../models/Empleado';

export class EmpleadoDaoImpl implements EmpleadoDao{
    //codigo sql
    async buscarPorId(idEmpleado: number): Promise<Empleado> {
        const query = `
        select *
        from
        empleado where idEmpleado = ?
        `;
        try {
            const [rows]: any = await pool.query(query, [idEmpleado]);
            return rows[0] as Empleado;

        } catch (error) {
            console.error("Error al mostrar empleado por id:", error);
            throw new Error("No se pudo obtener al empleado por id");
        }
    }
    async crear(item: Empleado): Promise<Empleado> {
        const query = `
        INSERT INTO empleado(nombre, apellido, dni, idTienda)
        VALUES (?, ?, ?, ?)
        `;

        try {
            const [result] = await pool.query<ResultSetHeader>(query, [
                item.nombre,
                item.apellido,
                item.dni,
                item.idTienda
            ]);
            item.idEmpleado = result.insertId;
            return item;

        } catch (error) {
            console.error("Error al crear empleado:", error);
            throw new Error("No se pudo registrar el empleado");
        }
    }
    async actualizar(id: Number, item: Empleado): Promise<boolean> {
        const query = `
            UPDATE empleado
            SET nombre = ?, apellido = ?, dni = ?, idTienda = ?
            WHERE idEmpleado = ?
        `;
        try {
            const [result] = await pool.query<ResultSetHeader>(query, [
                item.nombre,
                item.apellido,
                item.dni,
                item.idTienda,
                id
            ]);

            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error al actualizar empleado:", error);
            throw new Error("No se pudo actualizar el empleado");
        }
    }
    async eliminar(id: Number): Promise<boolean> {
        const query = "DELETE FROM empleado WHERE idEmpleado = ?";

        try {
            const [result] = await pool.query<ResultSetHeader>(query, [id]);
            return result.affectedRows > 0;

        } catch (error) {
            console.error("Error al eliminar empleado:", error);
            throw new Error("No se pudo eliminar el empleado");
        }
    }
    async mostrar(): Promise<Empleado[]> {

        const query = "SELECT * FROM empleado";

        try {
            const [rows] = await pool.query<RowDataPacket[]>(query);
            return rows as Empleado[];

        } catch (error) {
            console.error("Error al mostrar empleados:", error);
            throw new Error("No se pudieron obtener los empleados");
        }
    }

}