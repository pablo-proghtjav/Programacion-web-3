import { Cuenta } from "../../models/Cuenta";
import { CuentaService } from "../CuentaService";
import { CuentaDao } from "../../dao/CuentaDao";
import bcrypt from "bcrypt";

export class CuentaServiceImpl implements CuentaService{
    private cuentaDao: CuentaDao;
        
    constructor(cuentaDao: CuentaDao){
        this.cuentaDao = cuentaDao;
    }
    async devolverPorIdEmpleado(idEmpleado: number): Promise<Cuenta[]> {
        try {
            const cuenta = await this.cuentaDao.devolverPorIdEmpleado(idEmpleado);
            if(!cuenta){
                throw new Error("La cuenta no existe");
            }
            return cuenta;
        } catch (error: any) {
            console.error(error);
            throw new Error("Error al devolver la cuenta por id Empleado ");
        }
    }
    async login(usuario: string, password: string): Promise<any> {
        //verificar si la cuenta existe
        const cuenta = await this.cuentaDao.buscarPorUsuario(usuario);

        if(!cuenta){
            throw new Error("La cuenta no existe");
        }
        //buscar id de la tienda en donde trabaja
        const resultado = await this.cuentaDao.devolverIdTienda(usuario);
        //console.log("el id donde el empleado trabaja es ",resultado?.idTienda);
        /*
        const cuenta = await this.cuentaDao.login(usuario, password);
        if (!cuenta) {
            throw {
                status: 401,
                message: "Usuario o contraseña incorrectos"
            };
        }
        */

        //console.log("PASSWORD:", password);
        //console.log("HASH:", cuenta.contrasena);
        const coincide = await bcrypt.compare(password,cuenta.contrasena);
        if(!coincide){
            throw {
                status: 401,
                message: "Usuario o contraseña incorrectos"
            };
        }
          
        return {
            idTienda: resultado?.idTienda,
            ...cuenta
        };
    }
    
    async registrarCuenta(cuenta: Cuenta): Promise<Cuenta> {
        
        try {
            //encriptando contraseña
            const contraseñaNueva = await bcrypt.hash(cuenta.contrasena,10);
            cuenta.contrasena = contraseñaNueva;
            const nuevaCuenta = await this.cuentaDao.crear(cuenta);

            return nuevaCuenta;

        } catch (error) {
            console.error("Error en el servicio al registrar cuenta:", error);
            throw new Error("Error en el servicio al registrar cuenta");
        }
    }
    async actualizarCuenta(idCuenta: number, cuenta: Cuenta): Promise<Cuenta | null> {
        try {

            const actualizado = await this.cuentaDao.actualizar(idCuenta, cuenta);

            if (!actualizado) {
                return null;
            }

            return cuenta;

        } catch (error) {
            console.error("Error en el servicio al actualizar cuenta:", error);
            throw new Error("Error en el servicio al actualizar cuenta");
        }
    }
    async eliminarCuenta(idCuenta: number): Promise<boolean> {

        try {

            const eliminado = await this.cuentaDao.eliminar(idCuenta);

            return eliminado;

        } catch (error) {
            console.error("Error en el servicio al eliminar cuenta:", error);
            throw new Error("Error en el servicio al eliminar cuenta");
        }
    }
    async mostrarCuenta(): Promise<Cuenta[]> {

        try {

            const cuentas = await this.cuentaDao.mostrar();

            return cuentas;

        } catch (error) {
            console.error("Error en el servicio al mostrar cuentas:", error);
            throw new Error("Error en el servicio al mostrar cuentas");
        }
    }
    
}