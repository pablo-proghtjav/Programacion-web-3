import { CRUD } from "./CRUD";
import { Tienda } from "../models/Tienda";

export interface TiendaDao extends CRUD<Tienda>{
    //metodos especificos para tienda
    buscarPorNombre(nombre: string): Promise<Tienda | null>;
}
