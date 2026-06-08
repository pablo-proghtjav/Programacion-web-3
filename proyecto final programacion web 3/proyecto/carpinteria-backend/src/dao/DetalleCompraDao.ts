import { CRUD } from "./CRUD";
import { DetalleCompra } from "../models/DetalleCompra";

export interface DetalleCompraDao extends CRUD<DetalleCompra>{
    //metodos especificos
    buscarPorNombre(nombre: string): Promise<DetalleCompra | null>;
    buscarPorIdCompra(id: number): Promise<DetalleCompra[]>;
}