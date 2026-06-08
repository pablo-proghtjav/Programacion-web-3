export class Tienda {
    public idTienda:  number;
    public direccion: string;
    public nombre: string;
    constructor(
        idTienda: number, 
        direccion: string, 
        nombre: string,
    ){
        this.idTienda = idTienda;
        this.direccion = direccion;
        this.nombre = nombre;
    }
}
