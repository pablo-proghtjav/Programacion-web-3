import { Empleado } from "../models/Empleado";
export interface EmpleadoService{
    registrarEmpleado(empleado: Empleado): Promise<Empleado>;
    actualizarEmpleado(idEmpleado: number,empleado: Empleado): Promise<Empleado | null>;
    eliminarEmpleado(idEmpleado: number): Promise<boolean>;
    mostrarEmpleado(): Promise<Empleado[]>;

    //metodos especificos de service
    
}