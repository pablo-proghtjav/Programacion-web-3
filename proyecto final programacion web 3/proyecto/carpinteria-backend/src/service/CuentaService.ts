import { Cuenta } from "../models/Cuenta";
export interface CuentaService{
    registrarCuenta(cuenta: Cuenta): Promise<Cuenta>;
    actualizarCuenta(idCuenta: number,cuenta: Cuenta): Promise<Cuenta | null>;
    eliminarCuenta(idCuenta: number): Promise<boolean>;
    mostrarCuenta(): Promise<Cuenta[]>;

    //metodos especificos de service
    login(usuario: string, password: string): Promise<any>;
    devolverPorIdEmpleado(idEmpleado: number): Promise<Cuenta[]>;
}