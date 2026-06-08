import { Request, Response } from 'express';
import { ClienteService } from '../service/ClienteService';
import { Cliente } from '../models/Cliente';

export class ClienteController {

    private clienteService: ClienteService;

    constructor(clienteService: ClienteService) {
        this.clienteService = clienteService;
    }

    // Registrar cliente
    public registrarCliente = async (req: Request, res: Response): Promise<void> => {

        try {

            const {
                nombre,
                apellido,
                celular,
                direccion
            } = req.body;

            // Validaciones
            if (!nombre?.trim()) {
                throw { status: 400, message: "El nombre es obligatorio" };
            }

            if (!apellido?.trim()) {
                throw { status: 400, message: "El apellido es obligatorio" };
            }

            if (!celular?.trim()) {
                throw { status: 400, message: "El celular es obligatorio" };
            }

            if (!direccion?.trim()) {
                throw { status: 400, message: "La direccion es obligatoria" };
            }

            const cliente = new Cliente(
                0,
                nombre,
                apellido,
                celular,
                direccion
            );

            await this.clienteService.registrarCliente(cliente);

            res.status(201).json({
                mensaje: "Cliente registrado con éxito"
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    // Actualizar cliente
    public actualizarCliente = async (req: Request, res: Response): Promise<void> => {

        try {

            const id = Number(req.params.id);

            const {
                nombre,
                apellido,
                celular,
                direccion
            } = req.body;

            if (!id) {
                throw { status: 400, message: "El ID es obligatorio" };
            }

            if (!nombre?.trim()) {
                throw { status: 400, message: "El nombre es obligatorio" };
            }

            if (!apellido?.trim()) {
                throw { status: 400, message: "El apellido es obligatorio" };
            }

            if (!celular?.trim()) {
                throw { status: 400, message: "El celular es obligatorio" };
            }

            if (!direccion?.trim()) {
                throw { status: 400, message: "La direccion es obligatoria" };
            }

            const cliente = new Cliente(
                id,
                nombre,
                apellido,
                celular,
                direccion
            );

            await this.clienteService.actualizarCliente(id, cliente);

            res.json({
                mensaje: "Cliente actualizado con éxito"
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    // Eliminar cliente
    public eliminarCliente = async (req: Request, res: Response): Promise<void> => {

        try {

            const id = Number(req.params.id);

            if (!id) {
                throw { status: 400, message: "El ID es obligatorio" };
            }

            await this.clienteService.eliminarCliente(id);

            res.json({
                mensaje: "Cliente eliminado con éxito"
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    // Mostrar clientes
    public mostrarCliente = async (req: Request, res: Response): Promise<void> => {

        try {

            const clientes = await this.clienteService.mostrarCliente();

            res.status(200).json(clientes);

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }
}