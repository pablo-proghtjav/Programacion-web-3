import { CRUD } from "./CRUD";
import { DetalleVenta } from "../models/DetalleVenta";

export interface DetalleVentaDao extends CRUD<DetalleVenta>{
    //metodos especificos
    buscarPorNombre(nombre: string): Promise<DetalleVenta | null>;
    buscarPorIdVenta(id: number): Promise<DetalleVenta[]>;
}