import { CRUD } from "./CRUD";
import { Compra } from "../models/Compra";

export interface CompraDao extends CRUD<Compra>{
    //metodos especificos
    buscarPorNombre(nombre: string): Promise<Compra | null>;
    mostrarPorTienda(idTienda: number): Promise<Compra[]>;
}