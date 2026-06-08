import { CRUD } from "./CRUD";
import { Producto } from "../models/Producto";

export interface ProductoDao extends CRUD<Producto>{
    //metodos especificos para tienda
    buscarPorNombre(nombre: string): Promise<Producto | null>;
    obtenerNumeroProducto(): Promise<number>;
    obtenerProductoPorTienda(idTienda:number):Promise<Producto[]>;
    buscarPorId(idProducto: number):Promise<Producto>;
}