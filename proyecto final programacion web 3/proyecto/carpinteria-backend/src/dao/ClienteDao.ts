import { CRUD } from "./CRUD";
import { Cliente } from "../models/Cliente";

export interface ClienteDao extends CRUD<Cliente>{
    //metodos especificos
    buscarPorNombre(nombre: string): Promise<Cliente | null>;
}