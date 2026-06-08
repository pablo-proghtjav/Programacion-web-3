import { CRUD } from "./CRUD";
import { Venta } from "../models/Venta";

export interface VentaDao extends CRUD<Venta>{
    //metodos especificos
    buscarPorNombre(nombre: string): Promise<Venta | null>;
    mostrarPorTienda(idTienda: number): Promise<Venta[]>;
}