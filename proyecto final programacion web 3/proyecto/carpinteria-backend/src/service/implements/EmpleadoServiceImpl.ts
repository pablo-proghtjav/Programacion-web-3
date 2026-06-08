import { Empleado } from "../../models/Empleado";
import { EmpleadoService } from "../EmpleadoService";
import { EmpleadoDao } from "../../dao/EmpleadoDao";

export class EmpleadoServiceImpl implements EmpleadoService{
    private empleadoDao: EmpleadoDao;
        
    constructor(empleadoDao: EmpleadoDao){
        this.empleadoDao = empleadoDao;
    }
    
    async registrarEmpleado(empleado: Empleado): Promise<Empleado> {
        try {

            const nuevoEmpleado = await this.empleadoDao.crear(empleado);

            return nuevoEmpleado;

        } catch (error) {
            console.error("Error en el servicio al registrar empleado:", error);
            throw new Error("Error en el servicio al registrar empleado");
        }
    }
    async actualizarEmpleado(idEmpleado: number, empleado: Empleado): Promise<Empleado | null> {
        try {

            const actualizado = await this.empleadoDao.actualizar(idEmpleado, empleado);

            if (!actualizado) {
                return null;
            }

            return empleado;

        } catch (error) {
            console.error("Error en el servicio al actualizar empleado:", error);
            throw new Error("Error en el servicio al actualizar empleado");
        }
    }
    async eliminarEmpleado(idEmpleado: number): Promise<boolean> {
        try {

            const eliminado = await this.empleadoDao.eliminar(idEmpleado);

            return eliminado;

        } catch (error) {
            console.error("Error en el servicio al eliminar empleado:", error);
            throw new Error("Error en el servicio al eliminar empleado");
        }
    }
    async mostrarEmpleado(): Promise<Empleado[]> {
        try {

            const empleados = await this.empleadoDao.mostrar();

            return empleados;

        } catch (error) {
            console.error("Error en el servicio al mostrar empleados:", error);
            throw new Error("Error en el servicio al mostrar empleados");
        }
    }
}