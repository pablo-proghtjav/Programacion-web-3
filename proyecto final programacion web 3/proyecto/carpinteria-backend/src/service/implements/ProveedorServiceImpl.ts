import { Proveedor } from "../../models/Proveedor";
import { ProveedorService } from "../ProveedorService";
import { ProveedorDao } from "../../dao/ProveedorDao";

export class ProveedorServiceImpl implements ProveedorService {

    private proveedorDao: ProveedorDao;

    constructor(proveedorDao: ProveedorDao) {
        this.proveedorDao = proveedorDao;
    }

    // Registrar proveedor
    async registrarProveedor(proveedor: Proveedor): Promise<Proveedor> {

        try {

            const nuevoProveedor = await this.proveedorDao.crear(
                proveedor
            );

            return nuevoProveedor;

        } catch (error) {
            console.error(
                "Error en el servicio al registrar proveedor:",
                error
            );

            throw new Error(
                "Error en el servicio al registrar proveedor"
            );
        }
    }

    // Actualizar proveedor
    async actualizarProveedor(idProveedor: number,proveedor: Proveedor): Promise<Proveedor | null> {

        try {

            const actualizado = await this.proveedorDao.actualizar(
                idProveedor,
                proveedor
            );

            if (!actualizado) {
                return null;
            }

            return proveedor;

        } catch (error) {
            console.error(
                "Error en el servicio al actualizar proveedor:",
                error
            );

            throw new Error(
                "Error en el servicio al actualizar proveedor"
            );
        }
    }

    // Eliminar proveedor
    async eliminarProveedor(idProveedor: number): Promise<boolean> {

        try {

            const eliminado = await this.proveedorDao.eliminar(
                idProveedor
            );

            return eliminado;

        } catch (error) {
            console.error(
                "Error en el servicio al eliminar proveedor:",
                error
            );

            throw new Error(
                "Error en el servicio al eliminar proveedor"
            );
        }
    }

    // Mostrar proveedores
    async mostrarProveedor(): Promise<Proveedor[]> {

        try {

            const proveedores = await this.proveedorDao.mostrar();

            return proveedores;

        } catch (error) {
            console.error(
                "Error en el servicio al mostrar proveedores:",
                error
            );

            throw new Error(
                "Error en el servicio al mostrar proveedores"
            );
        }
    }
}