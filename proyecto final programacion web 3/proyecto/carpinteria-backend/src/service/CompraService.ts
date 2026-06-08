import { Compra } from "../models/Compra";
export interface CompraService{
    registrarCompra(compra: Compra): Promise<Compra>;
    actualizarCompra(idCompra: number,compra: Compra): Promise<Compra | null>;
    eliminarCompra(idCompra: number): Promise<boolean>;
    mostrarCompra(): Promise<Compra[]>;

    //metodos especificos de service
    mostrarPorTienda(idTienda: number):Promise<Compra[]>;
}