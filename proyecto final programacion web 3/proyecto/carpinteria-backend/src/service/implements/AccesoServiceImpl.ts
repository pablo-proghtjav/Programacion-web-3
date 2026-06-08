import { Acceso } from "../../models/Acceso";
import { AccesoService } from "../AccesoService";
import { AccesoDao } from "../../dao/AccesoDao";

export class AccesoServiceImpl implements AccesoService{
    private accesoDao: AccesoDao;

    constructor(accesoDao: AccesoDao){
        this.accesoDao = accesoDao;
    }

    async registrarAcceso(acceso: Acceso): Promise<Acceso> {
        try {
            const nuevoAcceso = await this.accesoDao.crear(acceso);
            return nuevoAcceso;
        } catch (error) {
            console.error("Error en el servicio al registrar el acceso:", error);
            throw new Error("Error en el servicio al registrar acceso");
        }        
    }
    async mostrarPorIdCuenta(idCuenta: number): Promise<Acceso[]> {
        try {
            const acceso = await this.accesoDao.mostrarPorIdCuenta(idCuenta);
            if(!acceso){
                throw new Error("No existe el acceso");
            }
            return acceso;
        } catch (error) {
            console.error(error);
            throw new Error("Error al devolver el acceso");
        }
    }
}
