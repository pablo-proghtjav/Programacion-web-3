export class DetalleCompra {
    public idDetalleC:  number;
    public cantidad: number;
    public precio: number;
    public subTotal: number;
    public idCompra: number;
    public idProducto: number;

    constructor(
        idDetalleC: number, 
        cantidad: number,
        precio: number,
        subTotal: number,
        idCompra : number,
        idProducto: number,
    ){
        this.idDetalleC = idDetalleC;
        this.cantidad = cantidad;
        this.precio = precio;
        this.subTotal = subTotal;
        this.idCompra = idCompra;
        this.idProducto = idProducto;
    }
}