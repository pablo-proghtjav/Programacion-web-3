import { Tienda } from "../models/Tienda";
export interface TiendaService{
    registrarTienda(tienda: Tienda): Promise<Tienda>;
    actualizarTienda(idTienda: number,tienda: Tienda): Promise<boolean>;
    eliminarTienda(idTienda: number): Promise<boolean>;
    mostrarTienda(): Promise<Tienda[]>;

    //metodos especificos de service
}