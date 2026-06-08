import { Request, Response } from 'express';
import { CategoriaService } from '../service/CategoriaService';
import { Categoria } from '../models/Categoria';

export class CategoriaController {

    private categoriaService: CategoriaService;

    constructor(categoriaService: CategoriaService) {
        this.categoriaService = categoriaService;
    }

    // Registrar categoría
    public registrarCategoria = async (req: Request, res: Response): Promise<void> => {

        try {

            const { nombre, tipo } = req.body;

            // Validaciones
            if (!nombre?.trim()) {
                throw { status: 400, message: "El nombre es obligatorio" };
            }

            if (!tipo?.trim()) {
                throw { status: 400, message: "El tipo es obligatorio" };
            }

            const categoria = new Categoria(
                0,
                nombre,
                tipo
            );

            await this.categoriaService.registrarCategoria(categoria);

            res.status(201).json({
                mensaje: "Categoría registrada con éxito"
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    // Actualizar categoría
    public actualizarCategoria = async (req: Request, res: Response): Promise<void> => {

        try {

            const id = Number(req.params.id);

            const { nombre, tipo } = req.body;

            if (!id) {
                throw { status: 400, message: "El ID es obligatorio" };
            }

            if (!nombre?.trim()) {
                throw { status: 400, message: "El nombre es obligatorio" };
            }

            if (!tipo?.trim()) {
                throw { status: 400, message: "El tipo es obligatorio" };
            }

            const categoria = new Categoria(
                id,
                nombre,
                tipo
            );

            await this.categoriaService.actualizarCategoria(id, categoria);

            res.json({
                mensaje: "Categoría actualizada con éxito"
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    // Eliminar categoría
    public eliminarCategoria = async (req: Request, res: Response): Promise<void> => {

        try {

            const id = Number(req.params.id);

            if (!id) {
                throw { status: 400, message: "El ID es obligatorio" };
            }

            await this.categoriaService.eliminarCategoria(id);

            res.json({
                mensaje: "Categoría eliminada con éxito"
            });

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }

    // Mostrar categorías
    public mostrarCategoria = async (req: Request, res: Response): Promise<void> => {

        try {

            const categorias = await this.categoriaService.mostrarCategoria();

            res.status(200).json(categorias);

        } catch (error: any) {

            res.status(error.status || 500).json({
                error: error.message || "Error interno"
            });
        }
    }
}