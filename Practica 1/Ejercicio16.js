function obtenerMensaje() {
    return new Promise(
        (resolve,reject) => {
            setTimeout(() => {
                resolve("Hola");
            }, 2000);
        }
    );           
}
//Uso con promesas
obtenerMensaje().then(
    (m1) => {
        console.log(m1);
    }
);
//Migrando a async/await
async function miFuncion() {
    let m1 = await obtenerMensaje();
    console.log(m1);
}
miFuncion();