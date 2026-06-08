import { Request, Response } from 'express';
import { EmpleadoService } from '../service/EmpleadoService';
import { Empleado } from '../models/Empleado';

export class EmpleadoController {

    private empleadoService: EmpleadoService;

    constructor(empleadoService: EmpleadoService) {
        this.empleadoService = empleadoService;
    }

    // Registrar empleado
    public registrarEmpleado = async (req: Request, res: Response): Promise<void> => {

        try {
            const { nombre, apellido, dni, idTienda } = req.body;

            // Validaciones
            if (!nombre?.trim()) {
                throw { status: 400, message: "El nombre es obligatorio" };
            }

            if (!apellido?.trim()) {
                throw { status: 400, message: "El apellido es obligatorio" };
            }

            if (!dni?.trim()) {
                throw { status: 400, message: "El dni es obligatorio" };
            }

            if (!idTienda) {
                throw { status: 400, message: "El idTienda es obligatorio" };
            }

            const empleado = new Empleado(
                0,
                nombre,
                apellido,
                dni,
                idTienda
            );

            await this.empleadoService.registrarEmpleado(empleado);

            res.status(201).json({
                mensaje: "Empleado registrado con éxito"
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    // Actualizar empleado
    public actualizarEmpleado = async (req: Request, res: Response): Promise<void> => {

        try {

            const id = Number(req.params.id);

            const { nombre, apellido, dni, idTienda } = req.body;

            if (!id) {
                throw { status: 400, message: "El ID es obligatorio" };
            }

            if (!nombre?.trim()) {
                throw { status: 400, message: "El nombre es obligatorio" };
            }

            if (!apellido?.trim()) {
                throw { status: 400, message: "El apellido es obligatorio" };
            }

            if (!dni?.trim()) {
                throw { status: 400, message: "El dni es obligatorio" };
            }

            if (!idTienda) {
                throw { status: 400, message: "El idTienda es obligatorio" };
            }

            const empleado = new Empleado(
                id,
                nombre,
                apellido,
                dni,
                idTienda
            );

            await this.empleadoService.actualizarEmpleado(id, empleado);

            res.json({
                mensaje: "Empleado actualizado con éxito"
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    // Eliminar empleado
    public eliminarEmpleado = async (req: Request, res: Response): Promise<void> => {

        try {

            const id = Number(req.params.id);

            if (!id) {
                throw { status: 400, message: "El ID es obligatorio" };
            }

            await this.empleadoService.eliminarEmpleado(id);

            res.json({
                mensaje: "Empleado eliminado con éxito"
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    // Mostrar empleados
    public mostrarEmpleado = async (req: Request, res: Response): Promise<void> => {

        try {

            const empleados = await this.empleadoService.mostrarEmpleado();

            res.status(200).json(empleados);

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }
}