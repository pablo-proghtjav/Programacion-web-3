import { Compra } from "../../models/Compra";
import { CompraService } from "../CompraService";
import { CompraDao } from "../../dao/CompraDao";

export class CompraServiceImpl implements CompraService {

    private compraDao: CompraDao;

    constructor(compraDao: CompraDao) {
        this.compraDao = compraDao;
    }
    
    async mostrarPorTienda(idTienda: number): Promise<Compra[]> {

        try {

            const compras = await this.compraDao.mostrarPorTienda(idTienda);

            return compras;

        } catch (error) {
            console.error("Error en el servicio al mostrar compras por tienda:", error);
            throw new Error("Error en el servicio al mostrar compras por tienda");
        }
    }

    // Registrar compra
    async registrarCompra(compra: Compra): Promise<Compra> {

        try {

            const nuevaCompra = await this.compraDao.crear(compra);

            return nuevaCompra;

        } catch (error) {
            console.error(
                "Error en el servicio al registrar compra:",
                error
            );

            throw new Error(
                "Error en el servicio al registrar compra"
            );
        }
    }

    // Actualizar compra
    async actualizarCompra(idCompra: number,compra: Compra): Promise<Compra | null> {

        try {

            const actualizado = await this.compraDao.actualizar(idCompra,compra);

            if (!actualizado) {
                return null;
            }

            return compra;

        } catch (error) {
            console.error(
                "Error en el servicio al actualizar compra:",
                error
            );

            throw new Error(
                "Error en el servicio al actualizar compra"
            );
        }
    }

    // Eliminar compra
    async eliminarCompra(idCompra: number): Promise<boolean> {

        try {

            const eliminado = await this.compraDao.eliminar(idCompra);

            return eliminado;

        } catch (error) {
            console.error(
                "Error en el servicio al eliminar compra:",
                error
            );

            throw new Error(
                "Error en el servicio al eliminar compra"
            );
        }
    }

    // Mostrar compras
    async mostrarCompra(): Promise<Compra[]> {

        try {

            const compras = await this.compraDao.mostrar();

            return compras;

        } catch (error) {
            console.error(
                "Error en el servicio al mostrar compras:",
                error
            );

            throw new Error(
                "Error en el servicio al mostrar compras"
            );
        }
    }
}