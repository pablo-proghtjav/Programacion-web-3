//Ejercicio 14
 function obtenerDatos() {
    return new Promise(
        (resolve,reject) =>{
            resolve("Hola");
        }
    );
 }
 //Convirtiendo la promesa en callback
 function obtenerDatosCallback(funcion) {
    obtenerDatos().then(
        (m1) =>{
            funcion(m1);
        }
    );
 }

 obtenerDatosCallback(
    (m1) => {
        console.log(m1);
    }
 );