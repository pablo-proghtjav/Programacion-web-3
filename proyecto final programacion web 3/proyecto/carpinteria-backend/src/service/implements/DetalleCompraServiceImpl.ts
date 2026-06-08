import { DetalleCompra } from "../../models/DetalleCompra";
import { DetalleCompraService } from "../DetalleCompraService";
import { DetalleCompraDao } from "../../dao/DetalleCompraDao";

export class DetalleCompraServiceImpl implements DetalleCompraService {

    private detalleCompraDao: DetalleCompraDao;

    constructor(detalleCompraDao: DetalleCompraDao) {
        this.detalleCompraDao = detalleCompraDao;
    }

    async buscarPorIdCompra(idCompra: number): Promise<DetalleCompra[]> {
        try {
            const detalleCompras = await this.detalleCompraDao.buscarPorIdCompra(idCompra);
            return detalleCompras;
        } catch (error) {
            console.error("Error en el servicio al buscar detalle compras:",error);
            throw new Error("Error en el servicio al buscar detalle compras");
        }
    }

    async registrarDetalleCompra(detalleCompra: DetalleCompra): Promise<DetalleCompra> {

        try {

            const nuevoDetalleCompra = await this.detalleCompraDao.crear(detalleCompra);

            return nuevoDetalleCompra;

        } catch (error) {
            console.error("Error en el servicio al registrar detalle compra:", error);
            throw new Error("Error en el servicio al registrar detalle compra");
        }
    }

    async actualizarDetalleCompra(idDetalleC: number,detalleCompra: DetalleCompra): Promise<DetalleCompra | null> {

        try {

            const actualizado = await this.detalleCompraDao.actualizar(
                idDetalleC,
                detalleCompra
            );

            if (!actualizado) {
                return null;
            }

            return detalleCompra;

        } catch (error) {
            console.error("Error en el servicio al actualizar detalle compra:", error);
            throw new Error("Error en el servicio al actualizar detalle compra");
        }
    }

    async eliminarDetalleCompra(idDetalleC: number): Promise<boolean> {

        try {

            const eliminado = await this.detalleCompraDao.eliminar(idDetalleC);

            return eliminado;

        } catch (error) {
            console.error("Error en el servicio al eliminar detalle compra:", error);
            throw new Error("Error en el servicio al eliminar detalle compra");
        }
    }

    async mostrarDetalleCompra(): Promise<DetalleCompra[]> {

        try {

            const detalleCompras = await this.detalleCompraDao.mostrar();

            return detalleCompras;

        } catch (error) {
            console.error("Error en el servicio al mostrar detalle compras:", error);
            throw new Error("Error en el servicio al mostrar detalle compras");
        }
    }
}