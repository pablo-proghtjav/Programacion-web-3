import { Cliente } from "../../models/Cliente";
import { ClienteService } from "../ClienteService";
import { ClienteDao } from "../../dao/ClienteDao";

export class ClienteServiceImpl implements ClienteService {

    private clienteDao: ClienteDao;

    constructor(clienteDao: ClienteDao) {
        this.clienteDao = clienteDao;
    }

    // Registrar cliente
    async registrarCliente(cliente: Cliente): Promise<Cliente> {

        try {

            const nuevoCliente = await this.clienteDao.crear(cliente);

            return nuevoCliente;

        } catch (error) {
            console.error("Error en el servicio al registrar cliente:", error);
            throw new Error("Error en el servicio al registrar cliente");
        }
    }

    // Actualizar cliente
    async actualizarCliente(idCliente: number,cliente: Cliente): Promise<Cliente | null> {

        try {

            const actualizado = await this.clienteDao.actualizar(
                idCliente,
                cliente
            );

            if (!actualizado) {
                return null;
            }

            return cliente;

        } catch (error) {
            console.error("Error en el servicio al actualizar cliente:", error);
            throw new Error("Error en el servicio al actualizar cliente");
        }
    }

    // Eliminar cliente
    async eliminarCliente(idCliente: number): Promise<boolean> {

        try {

            const eliminado = await this.clienteDao.eliminar(idCliente);

            return eliminado;

        } catch (error) {
            console.error("Error en el servicio al eliminar cliente:", error);
            throw new Error("Error en el servicio al eliminar cliente");
        }
    }

    // Mostrar clientes
    async mostrarCliente(): Promise<Cliente[]> {

        try {

            const clientes = await this.clienteDao.mostrar();

            return clientes;

        } catch (error) {
            console.error("Error en el servicio al mostrar clientes:", error);
            throw new Error("Error en el servicio al mostrar clientes");
        }
    }
}