export class Compra {
    public idCompra:  number;
    public fechaC: string;
    public total: number;
    public idProveedor: number;
    public idTienda: number;
    constructor(
        idCompra: number, 
        fechaC: string, 
        total: number,
        idProveedor: number,
        idTienda: number,
    ){
        this.idCompra = idCompra;
        this.fechaC = fechaC;
        this.total = total;
        this.idProveedor = idProveedor;
        this.idTienda = idTienda;
    }
}
