import { Request, Response } from 'express';
import { ProveedorService } from '../service/ProveedorService';
import { Proveedor } from '../models/Proveedor';

export class ProveedorController {

    private proveedorService: ProveedorService;

    constructor(proveedorService: ProveedorService) {
        this.proveedorService = proveedorService;
    }

    // Registrar proveedor
    public registrarProveedor = async (req: Request,res: Response): Promise<void> => {

        try {

            const {
                nombre,
                apellido,
                celular,
                direccion
            } = req.body;

            // Validaciones
            if (!nombre?.trim()) {
                throw {
                    status: 400,
                    message: "El nombre es obligatorio"
                };
            }

            if (!apellido?.trim()) {
                throw {
                    status: 400,
                    message: "El apellido es obligatorio"
                };
            }

            if (!celular?.trim()) {
                throw {
                    status: 400,
                    message: "El celular es obligatorio"
                };
            }

            if (!direccion?.trim()) {
                throw {
                    status: 400,
                    message: "La direccion es obligatoria"
                };
            }

            const proveedor = new Proveedor(
                0,
                nombre,
                apellido,
                celular,
                direccion
            );

            await this.proveedorService.registrarProveedor(
                proveedor
            );

            res.status(201).json({
                mensaje: "Proveedor registrado con éxito"
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    // Actualizar proveedor
    public actualizarProveedor = async (req: Request,res: Response): Promise<void> => {

        try {

            const id = Number(req.params.id);

            const {
                nombre,
                apellido,
                celular,
                direccion
            } = req.body;

            if (!id) {
                throw {
                    status: 400,
                    message: "El ID es obligatorio"
                };
            }

            if (!nombre?.trim()) {
                throw {
                    status: 400,
                    message: "El nombre es obligatorio"
                };
            }

            if (!apellido?.trim()) {
                throw {
                    status: 400,
                    message: "El apellido es obligatorio"
                };
            }

            if (!celular?.trim()) {
                throw {
                    status: 400,
                    message: "El celular es obligatorio"
                };
            }

            if (!direccion?.trim()) {
                throw {
                    status: 400,
                    message: "La direccion es obligatoria"
                };
            }

            const proveedor = new Proveedor(
                id,
                nombre,
                apellido,
                celular,
                direccion
            );

            await this.proveedorService.actualizarProveedor(
                id,
                proveedor
            );

            res.json({
                mensaje: "Proveedor actualizado con éxito"
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    // Eliminar proveedor
    public eliminarProveedor = async (req: Request,res: Response): Promise<void> => {

        try {

            const id = Number(req.params.id);

            if (!id) {
                throw {
                    status: 400,
                    message: "El ID es obligatorio"
                };
            }

            await this.proveedorService.eliminarProveedor(id);

            res.json({
                mensaje: "Proveedor eliminado con éxito"
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    // Mostrar proveedores
    public mostrarProveedor = async (req: Request,res: Response): Promise<void> => {

        try {

            const proveedores = await this.proveedorService.mostrarProveedor();

            res.status(200).json(proveedores);

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }
}