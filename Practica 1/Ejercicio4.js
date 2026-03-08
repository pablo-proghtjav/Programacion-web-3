function mayorMenor(numero) {
    let mayor = numero[0],menor = numero[0];
    for (let i = 1; i < numero.length; i++) {
        if (numero[i] >= mayor) {
            mayor = numero[i];
        }
        if (numero[i] <= menor) {
            menor = numero[i];
        }
        
    }
    return {mayor: mayor,menor: menor}
}
let obj = mayorMenor([3,1,5,4,2]);
console.log(obj);