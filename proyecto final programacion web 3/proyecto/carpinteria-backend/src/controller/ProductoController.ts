import { Request, Response } from 'express';
import { ProductoService } from '../service/ProductoService';
import { Producto } from '../models/Producto';

export class ProductoController {

    private productoService: ProductoService;

    constructor(productoService: ProductoService) {
        this.productoService = productoService;
    }

    public obtenerProductoPorTienda = async (req: Request, res: Response): Promise<void> => {
        try {

            const idTienda = Number(req.params.idTienda);

            if (!idTienda) {
                throw {
                    status: 400,
                    message: "El idTienda es obligatorio"
                };
            }

            const productos = await this.productoService.obtenerProductoPorTienda(idTienda);

            res.status(200).json(productos);

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }
    //obtener numero de productos
    public obtenerNumeroProductos = async (req: Request,res: Response): Promise<void> => {
        try {

            const totalProductos =
                await this.productoService.obtenerNumeroProducto();

            res.status(200).json({
                total: totalProductos
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }
    // Registrar producto
    public registrarProducto = async (req: Request, res: Response): Promise<void> => {

        try {

            const {
                nombre,
                descripcion,
                precio,
                stock,
                material,
                color,
                fechaInicio,
                idCategoria,
                idTienda
            } = req.body;

            // Validaciones
            if (!nombre?.trim()) {
                throw { status: 400, message: "El nombre es obligatorio" };
            }

            if (!descripcion?.trim()) {
                throw { status: 400, message: "La descripcion es obligatoria" };
            }

            if (!precio) {
                throw { status: 400, message: "El precio es obligatorio" };
            }

            if (!stock) {
                throw { status: 400, message: "El stock es obligatorio" };
            }

            if (!material?.trim()) {
                throw { status: 400, message: "El material es obligatorio" };
            }

            if (!color?.trim()) {
                throw { status: 400, message: "El color es obligatorio" };
            }

            if (!fechaInicio) {
                throw { status: 400, message: "La fechaIngreso es obligatoria" };
            }

            if (!idCategoria) {
                throw { status: 400, message: "El idCategoria es obligatorio" };
            }

            if (!idTienda) {
                throw { status: 400, message: "El idTienda es obligatorio" };
            }

            const producto = new Producto(
                0,
                nombre,
                descripcion,
                precio,
                stock,
                material,
                color,
                fechaInicio,
                idCategoria,
                idTienda
            );
            
            await this.productoService.registrarProducto(producto);

            res.status(201).json({
                mensaje: "Producto registrado con éxito"
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    // Actualizar producto
    public actualizarProducto = async (req: Request, res: Response): Promise<void> => {

        try {

            const id = Number(req.params.id);

            const {
                nombre,
                descripcion,
                precio,
                stock,
                material,
                color,
                fechaInicio,
                idCategoria,
                idTienda
            } = req.body;

            if (!id) {
                throw { status: 400, message: "El ID es obligatorio" };
            }

            if (!nombre?.trim()) {
                throw { status: 400, message: "El nombre es obligatorio" };
            }

            if (!descripcion?.trim()) {
                throw { status: 400, message: "La descripcion es obligatoria" };
            }

            if (!precio) {
                throw { status: 400, message: "El precio es obligatorio" };
            }

            if (!stock) {
                throw { status: 400, message: "El stock es obligatorio" };
            }

            if (!material?.trim()) {
                throw { status: 400, message: "El material es obligatorio" };
            }

            if (!color?.trim()) {
                throw { status: 400, message: "El color es obligatorio" };
            }

            if (!fechaInicio) {
                throw { status: 400, message: "La fechaIngreso es obligatoria" };
            }

            if (!idCategoria) {
                throw { status: 400, message: "El idCategoria es obligatorio" };
            }

            if (!idTienda) {
                throw { status: 400, message: "El idTienda es obligatorio" };
            }

            const producto = new Producto(
                id,
                nombre,
                descripcion,
                precio,
                stock,
                material,
                color,
                fechaInicio,
                idCategoria,
                idTienda
            );

            await this.productoService.actualizarProducto(id, producto);

            res.json({
                mensaje: "Producto actualizado con éxito"
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    // Eliminar producto
    public eliminarProducto = async (req: Request, res: Response): Promise<void> => {

        try {

            const id = Number(req.params.id);

            if (!id) {
                throw { status: 400, message: "El ID es obligatorio" };
            }

            await this.productoService.eliminarProducto(id);

            res.json({
                mensaje: "Producto eliminado con éxito"
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    // Mostrar productos
    public mostrarProducto = async (req: Request, res: Response): Promise<void> => {

        try {

            const productos = await this.productoService.mostrarProducto();

            res.status(200).json(productos);

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }
}