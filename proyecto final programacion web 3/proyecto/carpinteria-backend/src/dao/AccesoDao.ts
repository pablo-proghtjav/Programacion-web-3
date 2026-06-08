import { CRUD } from "./CRUD";
import { Acceso } from "../models/Acceso";
export interface AccesoDao extends CRUD<Acceso>{
    //metodos especificos para acceso
    mostrarPorIdCuenta(idCuenta: number): Promise<Acceso[]>;
}