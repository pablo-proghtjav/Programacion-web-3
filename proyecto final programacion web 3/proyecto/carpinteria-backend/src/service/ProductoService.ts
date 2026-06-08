import { Producto } from "../models/Producto";
export interface ProductoService{
    registrarProducto(producto: Producto): Promise<Producto>;
    actualizarProducto(idProducto: number,producto: Producto): Promise<Producto | null>;
    eliminarProducto(idProducto: number): Promise<boolean>;
    mostrarProducto(): Promise<Producto[]>;

    //metodos especificos de service
    obtenerNumeroProducto(): Promise<number>;
    obtenerProductoPorTienda(idTienda:number):Promise<Producto[]>;
}