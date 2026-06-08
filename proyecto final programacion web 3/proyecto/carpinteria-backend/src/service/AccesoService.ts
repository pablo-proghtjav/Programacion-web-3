import { Acceso } from "../models/Acceso";
export interface AccesoService{
    registrarAcceso(acceso: Acceso): Promise<Acceso>;
    //metodos especificos para acceso
    mostrarPorIdCuenta(idCuenta: number): Promise<Acceso[]>;
}