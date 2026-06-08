export class Proveedor {
    public idProveedor:  number;
    public nombre: string;
    public apellido: string;
    public celular: string;
    public direccion: string;

    constructor(
        idProveedor: number, 
        nombre: string, 
        apellido: string,
        celular: string,
        direccion: string,
    ){
        this.idProveedor = idProveedor;
        this.nombre = nombre;
        this.apellido = apellido;
        this.celular = celular;
        this.direccion = direccion;
    }
}