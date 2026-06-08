export interface CRUD<T>{
    crear(item: T): Promise<T>;
    actualizar(id: Number,item: T): Promise<boolean>;
    eliminar(id: Number): Promise<boolean>;
    mostrar(): Promise<T[]>;
}