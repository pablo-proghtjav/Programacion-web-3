import { Request, Response } from 'express';
import { AccesoService } from '../service/AccesoService';
import { Acceso } from '../models/Acceso';
export class AccesoController {
    private accesoService: AccesoService;
    
    constructor(accesoService: AccesoService) {
        this.accesoService = accesoService;
    }

    public registrarAcceso = async(req: Request, res: Response): Promise<void> => {
        try {
            const {ip,evento,navegador,idCuenta} = req.body;
            //validaciones
            if(!ip?.trim()){
                throw { status: 400, message: "El ip es obligatorio" };
            }
            if(!evento?.trim()){
                throw { status: 400, message: "El evento es obligatorio" };
            }
            if(!navegador?.trim()){
                throw { status: 400, message: "El navegador es obligatorio" };
            }
            if(!idCuenta){
                throw { status: 400, message: "El idCuenta es obligatorio" };
            }

            const acceso = new Acceso(0,ip,evento,navegador,new Date,idCuenta);
            await this.accesoService.registrarAcceso(acceso);
            res.status(201).json({
                mensaje: "Acceso registrada con éxito"
            });
        } catch (error: any) {
            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    public mostrarPorIdCuenta = async(req: Request, res: Response): Promise<void> => {
        try {
            const idCuenta = Number(req.params.id);
            const respuesta = await this.accesoService.mostrarPorIdCuenta(idCuenta);
            res.json({
                ok: true,
                data: respuesta
            });
        } catch (error:any) {
            res.status(error.status || 500).json({
                ok: false,
                message: error.message
            });
        }
    }
}