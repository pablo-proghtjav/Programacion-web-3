import { Request, Response } from 'express';
import { VentaService } from '../service/VentaService';
import { Venta } from '../models/Venta';

export class VentaController {

    private ventaService: VentaService;

    constructor(ventaService: VentaService) {
        this.ventaService = ventaService;
    }

    public registrarVenta = async (req: Request, res: Response): Promise<void> => {

        try {
            const {
                fechaV,
                total,
                idCliente,
                idTienda
            } = req.body;

            if (!fechaV) {
                throw { status: 400, message: "La fechaVenta es obligatoria" };
            }

            if (!total) {
                throw { status: 400, message: "El total es obligatorio" };
            }

            if (!idCliente) {
                throw { status: 400, message: "El idCliente es obligatorio" };
            }

            if (!idTienda) {
                throw { status: 400, message: "El idTienda es obligatorio" };
            }

            const venta = new Venta(
                0,
                fechaV,
                total,
                idCliente,
                idTienda
            );

            const ventaGuardada = await this.ventaService.registrarVenta(venta);

            res.status(201).json({
                mensaje: "Venta registrada con éxito",
                venta: ventaGuardada
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    public actualizarVenta = async (req: Request, res: Response): Promise<void> => {

        try {

            const id = Number(req.params.id);

            const {
                fechaV,
                total,
                idCliente,
                idTienda
            } = req.body;

            if (!id) {
                throw { status: 400, message: "El ID es obligatorio" };
            }

            if (!fechaV) {
                throw { status: 400, message: "La fechaVenta es obligatoria" };
            }

            if (!total) {
                throw { status: 400, message: "El total es obligatorio" };
            }

            if (!idCliente) {
                throw { status: 400, message: "El idCliente es obligatorio" };
            }

            if (!idTienda) {
                throw { status: 400, message: "El idTienda es obligatorio" };
            }

            const venta = new Venta(
                id,
                fechaV,
                total,
                idCliente,
                idTienda
            );

            await this.ventaService.actualizarVenta(id, venta);

            res.json({
                mensaje: "Venta actualizada con éxito"
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    public eliminarVenta = async (req: Request, res: Response): Promise<void> => {

        try {

            const id = Number(req.params.id);

            if (!id) {
                throw { status: 400, message: "El ID es obligatorio" };
            }

            await this.ventaService.eliminarVenta(id);

            res.json({
                mensaje: "Venta eliminada con éxito"
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    public mostrarVenta = async (req: Request, res: Response): Promise<void> => {

        try {

            const ventas = await this.ventaService.mostrarVenta();

            res.status(200).json(ventas);

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    public mostrarVentaPorTienda = async (req: Request, res: Response): Promise<void> => {

        try {

            const idTienda = Number(req.params.idTienda);

            if (!idTienda) {
                throw { status: 400, message: "El idTienda es obligatorio" };
            }

            const ventas = await this.ventaService.mostrarPorTienda(idTienda);

            res.status(200).json(ventas);

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }
}