import { Producto } from "../../models/Producto";
import { ProductoService } from "../ProductoService";
import { ProductoDao } from "../../dao/ProductoDao";

export class ProductoServiceImpl implements ProductoService{
    private productoDao: ProductoDao;
        
    constructor(productoDao: ProductoDao){
        this.productoDao = productoDao;
    }

    async obtenerProductoPorTienda(idTienda: number): Promise<Producto[]> {
        try {
            const productos = await this.productoDao.obtenerProductoPorTienda(idTienda);

            return productos;

        } catch (error) {

            console.error(
                "Error en el servicio al obtener productos por tienda:",
                error
            );

            throw new Error(
                "Error en el servicio al obtener productos por tienda"
            );
        }
    }
    async obtenerNumeroProducto(): Promise<number> {
        try {

            const totalProductos =
                await this.productoDao.obtenerNumeroProducto();

            return totalProductos;

        } catch (error) {

            console.error(
                "Error en el servicio al obtener número de productos:",
                error
            );

            throw new Error(
                "Error en el servicio al obtener número de productos"
            );
        }
    }
    async registrarProducto(producto: Producto): Promise<Producto> {

        try {

            const nuevoProducto = await this.productoDao.crear(producto);

            return nuevoProducto;

        } catch (error) {
            console.error("Error en el servicio al registrar producto:", error);
            throw new Error("Error en el servicio al registrar producto");
        }
    }
    async actualizarProducto(idProducto: number, producto: Producto): Promise<Producto | null> {
        try {

            const actualizado = await this.productoDao.actualizar(idProducto, producto);

            if (!actualizado) {
                return null;
            }

            return producto;

        } catch (error) {
            console.error("Error en el servicio al actualizar producto:", error);
            throw new Error("Error en el servicio al actualizar producto");
        }
    }
    async eliminarProducto(idProducto: number): Promise<boolean> {

        try {

            const eliminado = await this.productoDao.eliminar(idProducto);

            return eliminado;

        } catch (error) {
            console.error("Error en el servicio al eliminar producto:", error);
            throw new Error("Error en el servicio al eliminar producto");
        }
    }
    async mostrarProducto(): Promise<Producto[]> {

        try {

            const productos = await this.productoDao.mostrar();

            return productos;

        } catch (error) {
            console.error("Error en el servicio al mostrar productos:", error);
            throw new Error("Error en el servicio al mostrar productos");
        }
    }
}