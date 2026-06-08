export class Cliente {
    public idCliente:  number;
    public nombre: string;
    public apellido: string;
    public celular: string;
    public direccion: string;

    constructor(
        idCliente: number,
        nombre: string, 
        apellido: string,
        celular: string,
        direccion: string,
    ){
        this.idCliente = idCliente;
        this.nombre = nombre;
        this.apellido = apellido;
        this.celular = celular;
        this.direccion = direccion;
    }
}