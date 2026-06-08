export class Producto {
    public idProducto:  number;
    public nombre: string;
    public descripcion: string;
    public precio: number;
    public stock: number;
    public material: string;
    public color: string;
    public fechaInicio: string;
    public idCategoria: number;
    public idTienda: number;
    constructor(
        idProducto: number, 
        nombre: string,
        descripcion: string,
        precio: number,
        stock: number,
        material: string,
        color: string,
        fechaInicio: string, 
        idCategoria: number,
        idTienda: number,
    ){
        this.idProducto = idProducto;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.material = material;
        this.color = color;
        this.fechaInicio = fechaInicio;
        this.idCategoria = idCategoria;
        this.idTienda = idTienda;
    }
}