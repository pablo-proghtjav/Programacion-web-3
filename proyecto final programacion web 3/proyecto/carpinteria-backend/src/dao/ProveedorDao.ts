import { CRUD } from "./CRUD";
import { Proveedor } from "../models/Proveedor";

export interface ProveedorDao extends CRUD<Proveedor>{
    //metodos especificos
    buscarPorNombre(nombre: string): Promise<Proveedor | null>;
}