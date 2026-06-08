import { DetalleVenta } from "../models/DetalleVenta";
export interface DetalleVentaService{
    registrarDetalleVenta(detalleVenta: DetalleVenta): Promise<DetalleVenta>;
    actualizarDetalleVenta(idDetalleVenta: number,detalleVenta: DetalleVenta): Promise<DetalleVenta | null>;
    eliminarDetalleVenta(idDetalleVenta: number): Promise<boolean>;
    mostrarDetalleVenta(): Promise<DetalleVenta[]>;

    //metodos especificos de service
    buscarPorIdVenta(idVenta: number): Promise<DetalleVenta[]>;
}