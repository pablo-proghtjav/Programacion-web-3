export class Venta {
    public idVenta:  number;
    public fechaV: string;
    public total: number;
    public idCliente: number;
    public idTienda: number;
    constructor(
        idVenta: number, 
        fechaV: string, 
        total: number,
        idCliente: number,
        idTienda: number,
    ){
        this.idVenta = idVenta;
        this.fechaV = fechaV;
        this.total = total;
        this.idCliente = idCliente;
        this.idTienda = idTienda;
    }
}