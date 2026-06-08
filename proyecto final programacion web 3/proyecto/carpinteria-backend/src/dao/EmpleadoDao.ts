import { CRUD } from "./CRUD";
import { Empleado } from "../models/Empleado";

export interface EmpleadoDao extends CRUD<Empleado>{
    //metodos especificos para tienda
    buscarPorId(idEmpleado: number): Promise<Empleado>;
}