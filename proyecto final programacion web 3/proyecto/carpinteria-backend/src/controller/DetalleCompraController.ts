import { Request, Response } from 'express';
import { DetalleCompraService } from '../service/DetalleCompraService';
import { DetalleCompra } from '../models/DetalleCompra';

export class DetalleCompraController {

    private detalleCompraService: DetalleCompraService;

    constructor(detalleCompraService: DetalleCompraService) {
        this.detalleCompraService = detalleCompraService;
    }
    // Buscar detalles por idCompra
    public buscarPorIdCompra = async (req: Request,res: Response): Promise<void> => {
        try {
            const idCompra = Number(req.params.idCompra);
            // VALIDAR
            if (!idCompra) {
                throw {
                    status: 400,
                    message: "El idCompra es obligatorio en detalle compra"
                };
            }
            // BUSCAR
            const detalleCompras = await this.detalleCompraService.buscarPorIdCompra(idCompra);
            // RESPUESTA
            res.status(200).json(detalleCompras);
        } catch (error: any) {
            res.status(
                error.status || 500
            ).json({
                error:
                    error.message ||
                    "Error interno"
            });
        }
    }
    // Registrar detalle compra
    public registrarDetalleCompra = async (req: Request,res: Response): Promise<void> => {

        try {

            const {
                cantidad,
                precio,
                subTotal,
                idCompra,
                idProducto
            } = req.body;

            // Validaciones
            if (!cantidad) {
                throw { status: 400, message: "La cantidad es obligatoria" };
            }

            if (!precio) {
                throw { status: 400, message: "El precio es obligatorio" };
            }

            if (!subTotal) {
                throw { status: 400, message: "El subtotal es obligatorio" };
            }

            if (!idCompra) {
                throw { status: 400, message: "El idCompra es obligatorio" };
            }

            if (!idProducto) {
                throw { status: 400, message: "El idProducto es obligatorio" };
            }

            const detalleCompra = new DetalleCompra(
                0,
                cantidad,
                precio,
                subTotal,
                idCompra,
                idProducto
            );

            await this.detalleCompraService.registrarDetalleCompra(detalleCompra);

            res.status(201).json({
                mensaje: "Detalle compra registrado con éxito"
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    // Actualizar detalle compra
    public actualizarDetalleCompra = async (req: Request,res: Response): Promise<void> => {

        try {

            const id = Number(req.params.id);

            const {
                cantidad,
                precio,
                subTotal,
                idCompra,
                idProducto
            } = req.body;

            if (!id) {
                throw { status: 400, message: "El ID es obligatorio" };
            }

            if (!cantidad) {
                throw { status: 400, message: "La cantidad es obligatoria" };
            }

            if (!precio) {
                throw { status: 400, message: "El precio es obligatorio" };
            }

            if (!subTotal) {
                throw { status: 400, message: "El subtotal es obligatorio" };
            }

            if (!idCompra) {
                throw { status: 400, message: "El idCompra es obligatorio" };
            }

            if (!idProducto) {
                throw { status: 400, message: "El idProducto es obligatorio" };
            }

            const detalleCompra = new DetalleCompra(
                id,
                cantidad,
                precio,
                subTotal,
                idCompra,
                idProducto
            );

            await this.detalleCompraService.actualizarDetalleCompra(id,detalleCompra);

            res.json({
                mensaje: "Detalle compra actualizado con éxito"
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    // Eliminar detalle compra
    public eliminarDetalleCompra = async (req: Request,res: Response): Promise<void> => {

        try {

            const id = Number(req.params.id);

            if (!id) {
                throw { status: 400, message: "El ID es obligatorio" };
            }

            await this.detalleCompraService.eliminarDetalleCompra(id);

            res.json({
                mensaje: "Detalle compra eliminado con éxito"
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    // Mostrar detalle compras
    public mostrarDetalleCompra = async (req: Request,res: Response): Promise<void> => {

        try {

            const detalleCompras = await this.detalleCompraService.mostrarDetalleCompra();

            res.status(200).json(detalleCompras);

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }
}