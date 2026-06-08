export class Cuenta {
    public idCuenta:  number;
    public usuario: string;
    public contrasena: string;
    public rol: string;
    public idEmpleado: number;
    constructor(
        idCuenta: number, 
        usuario: string, 
        contrasena: string,
        rol: string,
        idEmpleado: number,
    ){
        this.idCuenta = idCuenta;
        this.usuario = usuario;
        this.contrasena = contrasena;
        this.rol = rol;
        this.idEmpleado = idEmpleado;
    }
}
