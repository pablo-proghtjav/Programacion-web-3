 //Ejercicio 13
 function primero() {
    return new Promise(
        (resolve,reject) =>{
            setTimeout(() => {
                resolve("Hola 1");
            }, 2000);
        }
    );
 }
 function segundo() {
    return new Promise(
        (resolve,reject) =>{
            setTimeout(() => {
                resolve("Hola 2");
            }, 2000);
        }
    );
 }
 //Anidamiento de promesas
 primero().then(
    (m1) => {
        console.log(m1);
        segundo().then(
            (m2) => {
                console.log(m2);
            }
        );
    }
 );
 //Utilizando asyn/await
 async function miFuncion2() {
    let m1 = await primerMensaje();
    console.log(m1);
    let m2 = await segundoMensaje();
    console.log(m2);
 }