import {Request, Response} from 'express';
import { TiendaService } from '../service/TiendaService';
import { Tienda } from '../models/Tienda';
export class TiendaController {

    private tiendaService: TiendaService;

    constructor(tiendaService: TiendaService){
        this.tiendaService = tiendaService;
    }

    public registrarTienda = async (req: Request,res: Response): Promise<void> =>{
        try {
            const {direccion,nombre} = req.body;
            // Validaciones como excepciones
            if (!direccion?.trim()) throw { status: 400, message: "La direccion es obligatorio" };
            if (!nombre?.trim()) throw { status: 400, message: "El nombre es obligatorio" };
            
            const tienda = new Tienda(0,direccion,nombre);
            await this.tiendaService.registrarTienda(tienda);
                    
            res.status(201).json({mensaje: "Tienda registrada con éxito"});        
            } catch (error: any) {
                res.status(error.status || 500).json({ error: error.message || "Error interno" });
            }
    }
    public actualizarTienda = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = Number(req.params.id);
            const { direccion, nombre } = req.body;

            if (!id) throw { status: 400, message: "El ID es obligatorio" };
            if (!direccion?.trim()) throw { status: 400, message: "La direccion es obligatoria" };
            if (!nombre?.trim()) throw { status: 400, message: "El nombre es obligatorio" };

            const tienda = new Tienda(id, direccion, nombre);

            //const actualizado = await this.tiendaService.actualizarTienda(id, tienda);
            await this.tiendaService.actualizarTienda(id, tienda);
/*
            if (!actualizado) {
                return res.status(404).json({ message: "Tienda no encontrada" });
            }
*/
            res.json({ mensaje: "Tienda actualizada con éxito" });

        } catch (error: any) {
            res.status(error.status || 500).json({ error: error.message || "Error interno" });
        }
    };

    public eliminarTienda = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = Number(req.params.id);
            if (!id) {
                throw { status: 400, message: "El ID es obligatorio" };
            }
            await this.tiendaService.eliminarTienda(id);
            res.json({ mensaje: "Tienda eliminada con éxito" });
        } catch (error: any) {
            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    public mostrarTienda = async (req: Request, res: Response): Promise<void> => {
        try {
            const tiendas = await this.tiendaService.mostrarTienda();
            res.status(200).json(tiendas);

        } catch (error: any) {
            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }
}