function palindromo(texto) {
    let cadena = "";
    for (let i = texto.length - 1; i >= 0; i--) {
        cadena = cadena + texto[i];
    }
    return cadena == texto;
}
let band = palindromo("hola");
console.log(band);