 //Ejercicio 12
function primerMensaje(callback) {
    setTimeout(() => {
        callback("Hola 1");
    }, 2000);
}
function segundoMensaje(callback) {
    setTimeout(() => {
        callback("Hola 2");
    }, 2000);
}

primerMensaje(
    (m1) => {
        console.log(m1);
        segundoMensaje(
            (m2) => {
                console.log(m2);
            }
        );
    }
);

//Convertimos en promesas
function primero() {
    return new Promise(
        (resolve,reject) => {
            setTimeout(() => {
                resolve("Hola 1");
            }, 2000);
        }
    );
}
function segundo() {
    return new Promise(
        (resolve,reject) => {
            setTimeout(() => {
                resolve("Hola 2");
            }, 2000);
        }
    );
}
async function miFuncion() {
    let m1 = await primero();
    console.log(m1);
    let m2 = await segundo();
    console.log(m2);
}
miFuncion();