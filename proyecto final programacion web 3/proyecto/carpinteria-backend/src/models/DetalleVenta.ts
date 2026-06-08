export class DetalleVenta {
    public idDetalleV:  number;
    public cantidad: number;
    public precio: number;
    public subTotal: number;
    public idVenta: number;
    public idProducto: number;

    constructor(
        idDetalleV: number, 
        cantidad: number, 
        precio: number,
        subTotal: number,
        idVenta: number,
        idProducto: number,
    ){
        this.idDetalleV = idDetalleV;
        this.cantidad = cantidad;
        this.precio = precio;
        this.subTotal = subTotal;
        this.idVenta = idVenta;
        this.idProducto = idProducto;
    }
}