import { Request, Response } from 'express';
import { CuentaService } from '../service/CuentaService';
import { Cuenta } from '../models/Cuenta';
import { AccesoService } from '../service/AccesoService';
import { Acceso } from '../models/Acceso';

export class CuentaController {

    private cuentaService: CuentaService;
    private accesoService: AccesoService;
    constructor(cuentaService: CuentaService, accesoService: AccesoService) {
        this.cuentaService = cuentaService;
        this.accesoService = accesoService;
    }
    public devolverPorIdEmpleado = async (req: Request, res: Response) => {
        try {
            //console.log("el ide de empleado es ",req.params.id);
            const idEmpleado = Number(req.params.id);
            const respuesta = await this.cuentaService.devolverPorIdEmpleado(idEmpleado);
            res.json({
                ok: true,
                data: respuesta
            });
        } catch (error: any) {
            res.status(error.status || 500).json({
                ok: false,
                message: error.message
            });
        }
    }
    public login = async (req: Request, res: Response) => {
        try {
            const { usuario, password } = req.body;

            const respuesta = await this.cuentaService.login(usuario, password);
            //console.log("la id cuenta es ",respuesta.idCuenta);
            const acceso = new Acceso(0,req.ip || "","INGRESO",req.headers["user-agent"]as string,new Date,respuesta.idCuenta);
            //console.log("registrado");
            await this.accesoService.registrarAcceso(acceso);
            //console.log(respuesta);
            res.json({
                ok: true,
                data: respuesta
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                ok: false,
                message: error.message
            });

        }
    }
    // Registrar cuenta
    public registrarCuenta = async (req: Request, res: Response): Promise<void> => {

        try {

            const { usuario, contrasena, rol, idEmpleado } = req.body;

            // Validaciones
            if (!usuario?.trim()) {
                throw { status: 400, message: "El usuario es obligatorio" };
            }

            if (!contrasena?.trim()) {
                throw { status: 400, message: "La contraseña es obligatoria" };
            }

            if (!rol?.trim()) {
                throw { status: 400, message: "El rol es obligatorio" };
            }

            if (!idEmpleado) {
                throw { status: 400, message: "El idEmpleado es obligatorio" };
            }

            const cuenta = new Cuenta(
                0,
                usuario,
                contrasena,
                rol,
                idEmpleado
            );

            await this.cuentaService.registrarCuenta(cuenta);

            res.status(201).json({
                mensaje: "Cuenta registrada con éxito"
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    // Actualizar cuenta
    public actualizarCuenta = async (req: Request, res: Response): Promise<void> => {

        try {

            const id = Number(req.params.id);

            const { usuario, contrasena, rol, idEmpleado } = req.body;

            if (!id) {
                throw { status: 400, message: "El ID es obligatorio" };
            }

            if (!usuario?.trim()) {
                throw { status: 400, message: "El usuario es obligatorio" };
            }

            if (!contrasena?.trim()) {
                throw { status: 400, message: "La contraseña es obligatoria" };
            }

            if (!rol?.trim()) {
                throw { status: 400, message: "El rol es obligatorio" };
            }

            if (!idEmpleado) {
                throw { status: 400, message: "El idEmpleado es obligatorio" };
            }

            const cuenta = new Cuenta(
                id,
                usuario,
                contrasena,
                rol,
                idEmpleado
            );

            await this.cuentaService.actualizarCuenta(id, cuenta);

            res.json({
                mensaje: "Cuenta actualizada con éxito"
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    // Eliminar cuenta
    public eliminarCuenta = async (req: Request, res: Response): Promise<void> => {

        try {

            const id = Number(req.params.id);

            if (!id) {
                throw { status: 400, message: "El ID es obligatorio" };
            }

            await this.cuentaService.eliminarCuenta(id);

            res.json({
                mensaje: "Cuenta eliminada con éxito"
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    // Mostrar cuentas
    public mostrarCuenta = async (req: Request, res: Response): Promise<void> => {

        try {

            const cuentas = await this.cuentaService.mostrarCuenta();

            res.status(200).json(cuentas);

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }
}