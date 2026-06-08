import { Tienda } from "../../models/Tienda";
import { TiendaService } from "../TiendaService";
import { TiendaDao } from "../../dao/TiendaDao";

export class TiendaServiceImpl implements TiendaService{
    private tiendaDao: TiendaDao;
        
    constructor(tiendaDao: TiendaDao){
        this.tiendaDao = tiendaDao;
    }

    async registrarTienda(tienda: Tienda): Promise<Tienda> {
        //verificar si existe la tienda
        try {
            //creando la tienda
            const nuevaTienda = await this.tiendaDao.crear(tienda);
            return nuevaTienda;
        } catch (error) {
            console.error("Error en el servicio de tienda:", error);
            throw new Error("Error en el servicio de tienda");    
        }
    }
    async actualizarTienda(idTienda: number, tienda: Tienda): Promise<boolean> {
        //verificar si existe el id
        try {
            const actualizado = await this.tiendaDao.actualizar(idTienda,tienda);
            return actualizado;
        } catch (error) {
            console.error("Error en el servicio al actualizar tienda:", error);
            throw new Error("Error en el servicio al actualizar tienda");    
        }
    }
    async eliminarTienda(idTienda: number): Promise<boolean> {
        try {
        const eliminado = await this.tiendaDao.eliminar(idTienda);
        return eliminado;
    } catch (error) {
        console.error("Error en el servicio al eliminar tienda:", error);
        throw new Error("Error en el servicio al eliminar tienda");
    }
    }
    async mostrarTienda(): Promise<Tienda[]> {
        try {
            const tiendas = await this.tiendaDao.mostrar();
            return tiendas;
        } catch (error) {
            console.error("Error en el servicio al mostrar tiendas:", error);
            throw new Error("Error en el servicio al mostrar tiendas");
        }
    }
    
}