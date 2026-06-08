export class Categoria {
    public idCategoria:  number;
    public nombre: string;
    public tipo: string;

    constructor(idCategoria: number, nombre: string, tipo: string){
        this.idCategoria = idCategoria;
        this.nombre = nombre;
        this.tipo = tipo;
    }
}
