function miFuncion(callback) {
    setTimeout(() => {
        callback("Hola");
    }, 2000);
}
function obtenerPromesa() {
    return new Promise(
        (resolve,reject) =>{
            miFuncion(
                (m1) => {
                    console.log(m1);
                }
            );
        }
    );
}

obtenerPromesa().then(
    (m1) => {
        console.log(m1);
    }
);