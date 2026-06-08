export class Empleado {
    public idEmpleado:  number;
    public nombre: string;
    public apellido: string;
    public dni: string;
    public idTienda: number;
    constructor(
        idEmpleado: number, 
        nombre: string, 
        apellido: string,
        dni: string,
        idTienda: number,
    ){
        this.idEmpleado = idEmpleado;
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.idTienda = idTienda;
    }
}
