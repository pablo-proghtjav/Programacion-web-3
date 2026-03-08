//Ejercicio 11
function primerMensaje() {
    return new Promise(
        (resolve,reject) => {
            setTimeout(() => {
                resolve("hola ");
            }, 2000);
        }
    );
}

function segundoMensaje() {
    return new Promise(
        (resolve, reject) => {
            setTimeout(() => {
                resolve("como ");
            }, 2000);
        }
    );
}
 function tercerMensaje() {
    return new Promise(
        (resolve,reject) => {
            setTimeout(() => {
                resolve("estas");
            }, 2000);
        }
    );
 }

 primerMensaje().then(
    (mensaje) => {
        console.log(mensaje);
        return segundoMensaje();
    }
 ).then(
    (mensaje) => {
        console.log(mensaje);
        return tercerMensaje();
    }
 ).then(
    (mensaje) => {
        console.log(mensaje);
    }
 );
