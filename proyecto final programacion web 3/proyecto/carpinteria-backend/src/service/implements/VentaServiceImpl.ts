import { Venta } from "../../models/Venta";
import { VentaService } from "../VentaService";
import { VentaDao } from "../../dao/VentaDao";

export class VentaServiceImpl implements VentaService {

    private ventaDao: VentaDao;

    constructor(ventaDao: VentaDao) {
        this.ventaDao = ventaDao;
    }

    async mostrarPorTienda(idTienda: number): Promise<Venta[]> {

        try {

            const ventas = await this.ventaDao.mostrarPorTienda(idTienda);

            return ventas;

        } catch (error) {
            console.error("Error en el servicio al mostrar ventas por tienda:", error);
            throw new Error("Error en el servicio al mostrar ventas por tienda");
        }
    }

    // Registrar venta
    async registrarVenta(venta: Venta): Promise<Venta> {

        try {

            const nuevaVenta = await this.ventaDao.crear(venta);

            return nuevaVenta;

        } catch (error) {
            console.error("Error en el servicio al registrar venta:", error);
            throw new Error("Error en el servicio al registrar venta");
        }
    }

    // Actualizar venta
    async actualizarVenta(idVenta: number,venta: Venta): Promise<Venta | null> {

        try {

            const actualizado = await this.ventaDao.actualizar(
                idVenta,
                venta
            );

            if (!actualizado) {
                return null;
            }

            return venta;

        } catch (error) {
            console.error("Error en el servicio al actualizar venta:", error);
            throw new Error("Error en el servicio al actualizar venta");
        }
    }

    // Eliminar venta
    async eliminarVenta(idVenta: number): Promise<boolean> {

        try {

            const eliminado = await this.ventaDao.eliminar(idVenta);

            return eliminado;

        } catch (error) {
            console.error("Error en el servicio al eliminar venta:", error);
            throw new Error("Error en el servicio al eliminar venta");
        }
    }

    // Mostrar ventas
    async mostrarVenta(): Promise<Venta[]> {

        try {

            const ventas = await this.ventaDao.mostrar();

            return ventas;

        } catch (error) {
            console.error("Error en el servicio al mostrar ventas:", error);
            throw new Error("Error en el servicio al mostrar ventas");
        }
    }
}