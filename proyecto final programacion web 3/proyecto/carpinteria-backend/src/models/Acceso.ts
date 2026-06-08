export class Acceso {
    public idAcceso:  number;
    public ip: string;
    public evento: string;
    public navegador: string;
    public fechahora: Date;
    public idCuenta: number
    constructor(
        idAcceso: number,
        ip: string,
        evento: string,
        navegador: string,
        fechahora: Date,
        idCuenta: number,
    ){
        this.idAcceso = idAcceso;
        this.ip = ip;
        this.evento = evento;
        this.navegador = navegador;
        this.fechahora = fechahora;
        this.idCuenta = idCuenta;
    }
}
