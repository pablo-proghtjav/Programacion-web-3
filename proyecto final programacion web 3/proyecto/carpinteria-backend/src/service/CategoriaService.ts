import { Categoria } from "../models/Categoria"
export interface CategoriaService{
    registrarCategoria(categoria: Categoria): Promise<Categoria>;
    actualizarCategoria(idCategoria: number,categoria: Categoria): Promise<Categoria | null>;
    eliminarCategoria(idCategoria: number): Promise<boolean>;
    mostrarCategoria(): Promise<Categoria[]>;

    //metodos especificos de service
}