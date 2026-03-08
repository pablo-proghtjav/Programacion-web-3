function invertir(texto) {
    texto = texto.toLowerCase();
    let nuevaCadena = "";
    for (let i = texto.length - 1; i >= 0 ; i--) {
        let cad = texto[i];
        nuevaCadena = nuevaCadena + cad;
    }
    return nuevaCadena;
}
let cad = invertir("HoLa CoMO");
console.log(cad);