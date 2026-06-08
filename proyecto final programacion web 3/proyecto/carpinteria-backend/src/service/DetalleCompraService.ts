import { DetalleCompra } from "../models/DetalleCompra";
export interface DetalleCompraService{
    registrarDetalleCompra(detalleCompra: DetalleCompra): Promise<DetalleCompra>;
    actualizarDetalleCompra(idDetalleCompra: number,detalleCompra: DetalleCompra): Promise<DetalleCompra | null>;
    eliminarDetalleCompra(idDetalleCompra: number): Promise<boolean>;
    mostrarDetalleCompra(): Promise<DetalleCompra[]>;
    //metodos especificos de service
    buscarPorIdCompra(idCompra: number): Promise<DetalleCompra[]>;
}