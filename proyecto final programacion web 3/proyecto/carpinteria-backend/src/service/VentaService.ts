import { Venta } from "../models/Venta";
export interface VentaService{
    registrarVenta(venta: Venta): Promise<Venta>;
    actualizarVenta(idVenta: number,venta: Venta): Promise<Venta | null>;
    eliminarVenta(idVenta: number): Promise<boolean>;
    mostrarVenta(): Promise<Venta[]>;

    //metodos especificos de service
    mostrarPorTienda(idTienda: number):Promise<Venta[]>;
}