import { CRUD } from "./CRUD";
import { Cuenta } from "../models/Cuenta";

export interface CuentaDao extends CRUD<Cuenta>{
    //metodos especificos para cuenta
    buscarPorUsuario(usuario: string): Promise<Cuenta>;
    login(usuario: string,password:string): Promise<any>;
    devolverIdTienda(usuario: string): Promise<any>;
    devolverPorIdEmpleado(idEmpleado: number): Promise<Cuenta[]>;
}