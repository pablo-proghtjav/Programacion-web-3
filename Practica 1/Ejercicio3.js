function devolverParesImpares(numero) {
    let pares = [], impar = [];
    for (let i = 0; i < numero.length; i++) {
        if (numero[i] % 2 == 0) {
            pares.push(numero[i]);
        }else{
            impar.push(numero[i]);
        }
    }
    return {pares: pares, impares: impar}

}
let obj = devolverParesImpares([1,2,3,4,5]);
console.log(obj);