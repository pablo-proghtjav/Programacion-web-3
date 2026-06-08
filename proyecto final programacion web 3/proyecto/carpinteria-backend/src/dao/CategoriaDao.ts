import { CRUD } from "./CRUD";
import { Categoria } from "../models/Categoria";

export interface CategoriaDao extends CRUD<Categoria>{
    //metodos especificos para categoria
    buscarPorNombre(nombre: string): Promise<Categoria | null>;
}
