import { Proveedor } from "../models/Proveedor";
export interface ProveedorService{
    registrarProveedor(proveedor: Proveedor): Promise<Proveedor>;
    actualizarProveedor(idProveedor: number,proveedor: Proveedor): Promise<Proveedor | null>;
    eliminarProveedor(idProveedor: number): Promise<boolean>;
    mostrarProveedor(): Promise<Proveedor[]>;

    //metodos especificos de service
}