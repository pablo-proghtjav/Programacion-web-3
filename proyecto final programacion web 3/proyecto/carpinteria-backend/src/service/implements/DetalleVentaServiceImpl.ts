import { DetalleVenta } from "../../models/DetalleVenta";
import { DetalleVentaService } from "../DetalleVentaService";
import { DetalleVentaDao } from "../../dao/DetalleVentaDao";

export class DetalleVentaServiceImpl implements DetalleVentaService {

    private detalleVentaDao: DetalleVentaDao;

    constructor(detalleVentaDao: DetalleVentaDao) {
        this.detalleVentaDao = detalleVentaDao;
    }

    async buscarPorIdVenta(idVenta: number): Promise<DetalleVenta[]> {
        try {

            const detalleVentas = await this.detalleVentaDao.buscarPorIdVenta(idVenta);

            return detalleVentas;

        } catch (error) {

            console.error(
                "Error en el servicio al buscar detalle ventas:",
                error
            );

            throw new Error(
                "Error en el servicio al buscar detalle ventas"
            );
        }
    }
    
    

    // Registrar detalle venta
    async registrarDetalleVenta(detalleVenta: DetalleVenta): Promise<DetalleVenta> {

        try {

            const nuevoDetalleVenta = await this.detalleVentaDao.crear(
                detalleVenta
            );

            return nuevoDetalleVenta;

        } catch (error) {
            console.error(
                "Error en el servicio al registrar detalle venta:",
                error
            );

            throw new Error(
                "Error en el servicio al registrar detalle venta"
            );
        }
    }

    // Actualizar detalle venta
    async actualizarDetalleVenta(idDetalleV: number,detalleVenta: DetalleVenta): Promise<DetalleVenta | null> {

        try {

            const actualizado = await this.detalleVentaDao.actualizar(
                idDetalleV,
                detalleVenta
            );

            if (!actualizado) {
                return null;
            }

            return detalleVenta;

        } catch (error) {
            console.error(
                "Error en el servicio al actualizar detalle venta:",
                error
            );

            throw new Error(
                "Error en el servicio al actualizar detalle venta"
            );
        }
    }

    // Eliminar detalle venta
    async eliminarDetalleVenta(idDetalleV: number): Promise<boolean> {

        try {

            const eliminado = await this.detalleVentaDao.eliminar(idDetalleV);

            return eliminado;

        } catch (error) {
            console.error(
                "Error en el servicio al eliminar detalle venta:",
                error
            );

            throw new Error(
                "Error en el servicio al eliminar detalle venta"
            );
        }
    }

    // Mostrar detalle ventas
    async mostrarDetalleVenta(): Promise<DetalleVenta[]> {

        try {

            const detalleVentas = await this.detalleVentaDao.mostrar();

            return detalleVentas;

        } catch (error) {
            console.error(
                "Error en el servicio al mostrar detalle ventas:",
                error
            );

            throw new Error(
                "Error en el servicio al mostrar detalle ventas"
            );
        }
    }
}