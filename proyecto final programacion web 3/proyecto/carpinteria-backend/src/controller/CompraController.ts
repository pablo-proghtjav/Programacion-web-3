import { Request, Response } from 'express';
import { CompraService } from '../service/CompraService';
import { Compra } from '../models/Compra';

export class CompraController {

    private compraService: CompraService;

    constructor(compraService: CompraService) {
        this.compraService = compraService;
    }

    public registrarCompra = async (req: Request, res: Response): Promise<void> => {

        try {

            const {
                fechaC,
                total,
                idProveedor,
                idTienda
            } = req.body;

            if (!fechaC) {
                throw { status: 400, message: "La fecha es obligatoria" };
            }

            if (!total) {
                throw { status: 400, message: "El total es obligatorio" };
            }

            if (!idProveedor) {
                throw { status: 400, message: "El idProveedor es obligatorio" };
            }

            if (!idTienda) {
                throw { status: 400, message: "El idTienda es obligatorio" };
            }

            const compra = new Compra(
                0,
                fechaC,
                total,
                idProveedor,
                idTienda
            );

            const compraGuardada = await this.compraService.registrarCompra(compra);

            res.status(201).json({
                mensaje: "Compra registrada con éxito",
                compra: compraGuardada
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    public actualizarCompra = async (req: Request, res: Response): Promise<void> => {

        try {

            const id = Number(req.params.id);

            const {
                fechaC,
                total,
                idProveedor,
                idTienda
            } = req.body;

            if (!id) {
                throw { status: 400, message: "El ID es obligatorio" };
            }

            if (!fechaC) {
                throw { status: 400, message: "La fecha es obligatoria" };
            }

            if (!total) {
                throw { status: 400, message: "El total es obligatorio" };
            }

            if (!idProveedor) {
                throw { status: 400, message: "El idProveedor es obligatorio" };
            }

            if (!idTienda) {
                throw { status: 400, message: "El idTienda es obligatorio" };
            }

            const compra = new Compra(
                id,
                fechaC,
                total,
                idProveedor,
                idTienda
            );

            await this.compraService.actualizarCompra(id, compra);

            res.json({
                mensaje: "Compra actualizada con éxito"
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    public eliminarCompra = async (req: Request, res: Response): Promise<void> => {

        try {

            const id = Number(req.params.id);

            if (!id) {
                throw { status: 400, message: "El ID es obligatorio" };
            }

            await this.compraService.eliminarCompra(id);

            res.json({
                mensaje: "Compra eliminada con éxito"
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    public mostrarCompra = async (req: Request, res: Response): Promise<void> => {

        try {

            const compras = await this.compraService.mostrarCompra();

            res.status(200).json(compras);

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    public mostrarCompraPorTienda = async (req: Request, res: Response): Promise<void> => {

        try {

            const idTienda = Number(req.params.idTienda);

            if (!idTienda) {
                throw { status: 400, message: "El idTienda es obligatorio" };
            }

            const compras = await this.compraService.mostrarPorTienda(idTienda);

            res.status(200).json(compras);

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }
}