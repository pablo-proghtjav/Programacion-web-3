import { Cliente } from "../models/Cliente";
export interface ClienteService{
    registrarCliente(cliente: Cliente): Promise<Cliente>;
    actualizarCliente(idCliente: number,cliente: Cliente): Promise<Cliente | null>;
    eliminarCliente(idCliente: number): Promise<boolean>;
    mostrarCliente(): Promise<Cliente[]>;

    //metodos especificos de service
}