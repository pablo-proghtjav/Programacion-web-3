//Ejercicio 9

function mensajeExito() {
    return new Promise(
        (resolve,reject) => {
            setTimeout(
                () => {
                    resolve("hola");
                }, 3000
            );
        }
    );
}
 mensajeExito().then(resultado => {
    console.log(resultado);
 }).catch(error => {
    console.log(error);
 });

 //Mensaje de promesa con async/await
 function mensajeExito() {
    return new Promise(
        (resolve,reject) => {
            setTimeout(
                () => {
                    resolve("hola");
                }, 3000
            );
        }
    );
}

async function miFuncion() {
    try {
        let aux = await mensajeExito();
        console.log(aux);
    } catch (error) {
        console.log(error);
    }
}
miFuncion();