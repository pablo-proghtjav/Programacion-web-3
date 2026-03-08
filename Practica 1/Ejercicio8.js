//Ejercicio 8
function saludar() {
    console.log("hola");
}
function ejecutar(funcion) {
    setTimeout(() => {
        funcion();
    }, 2000);
}
ejecutar(saludar);