import { Request, Response } from 'express';
import { DetalleVentaService } from '../service/DetalleVentaService';
import { DetalleVenta } from '../models/DetalleVenta';

export class DetalleVentaController {

    private detalleVentaService: DetalleVentaService;

    constructor(detalleVentaService: DetalleVentaService) {
        this.detalleVentaService = detalleVentaService;
    }

    // Buscar detalles por idVenta
    public buscarPorIdVenta = async (req: Request,res: Response): Promise<void> => {

        try {

            const idVenta =
                Number(req.params.idVenta);

            // VALIDAR
            if (!idVenta) {
                throw {
                    status: 400,
                    message:
                        "El idVenta es obligatorio en detalle venta"
                };
            }

            // BUSCAR
            const detalleVentas = await this.detalleVentaService.buscarPorIdVenta(idVenta);

            // RESPUESTA
            res.status(200).json(
                detalleVentas
            );

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
    // Registrar detalle venta
    public registrarDetalleVenta = async (req: Request,res: Response): Promise<void> => {

        try {

            const {
                cantidad,
                precio,
                subTotal,
                idVenta,
                idProducto
            } = req.body;

            // Validaciones
            if (!cantidad) {
                throw {
                    status: 400,
                    message: "La cantidad es obligatoria"
                };
            }

            if (!precio) {
                throw {
                    status: 400,
                    message: "El precio es obligatorio"
                };
            }

            if (!subTotal) {
                throw {
                    status: 400,
                    message: "El subTotal es obligatorio"
                };
            }

            if (!idVenta) {
                throw {
                    status: 400,
                    message: "El idVenta es obligatorio"
                };
            }

            if (!idProducto) {
                throw {
                    status: 400,
                    message: "El idProducto es obligatorio"
                };
            }

            const detalleVenta = new DetalleVenta(
                0,
                cantidad,
                precio,
                subTotal,
                idVenta,
                idProducto
            );

            await this.detalleVentaService.registrarDetalleVenta(
                detalleVenta
            );

            res.status(201).json({
                mensaje: "Detalle venta registrado con éxito"
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    // Actualizar detalle venta
    public actualizarDetalleVenta = async (req: Request,res: Response): Promise<void> => {

        try {

            const id = Number(req.params.id);

            const {
                cantidad,
                precio,
                subTotal,
                idVenta,
                idProducto
            } = req.body;

            if (!id) {
                throw {
                    status: 400,
                    message: "El ID es obligatorio"
                };
            }

            if (!cantidad) {
                throw {
                    status: 400,
                    message: "La cantidad es obligatoria"
                };
            }

            if (!precio) {
                throw {
                    status: 400,
                    message: "El precio es obligatorio"
                };
            }

            if (!subTotal) {
                throw {
                    status: 400,
                    message: "El subTotal es obligatorio"
                };
            }

            if (!idVenta) {
                throw {
                    status: 400,
                    message: "El idVenta es obligatorio"
                };
            }

            if (!idProducto) {
                throw {
                    status: 400,
                    message: "El idProducto es obligatorio"
                };
            }

            const detalleVenta = new DetalleVenta(
                id,
                cantidad,
                precio,
                subTotal,
                idVenta,
                idProducto
            );

            await this.detalleVentaService.actualizarDetalleVenta(
                id,
                detalleVenta
            );

            res.json({
                mensaje: "Detalle venta actualizado con éxito"
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    // Eliminar detalle venta
    public eliminarDetalleVenta = async (req: Request,res: Response): Promise<void> => {

        try {

            const id = Number(req.params.id);

            if (!id) {
                throw {
                    status: 400,
                    message: "El ID es obligatorio"
                };
            }

            await this.detalleVentaService.eliminarDetalleVenta(id);

            res.json({
                mensaje: "Detalle venta eliminado con éxito"
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    // Mostrar detalle ventas
    public mostrarDetalleVenta = async (req: Request,res: Response): Promise<void> => {

        try {

            const detalleVentas =
                await this.detalleVentaService.mostrarDetalleVenta();

            res.status(200).json(detalleVentas);

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }
}