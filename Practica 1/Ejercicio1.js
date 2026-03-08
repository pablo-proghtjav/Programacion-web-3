function contar(texto) {
    let contA = 0, contE = 0,contI = 0, contO = 0, contU = 0;
    texto = texto.toLowerCase();
    console.log(texto);
    for (let i = 0; i < texto.length; i++) {
        let cad = texto[i];
        if(cad == "a") contA++;
        if(cad == "e") contE++;
        if(cad == "i") contI++;
        if(cad == "o") contO++;
        if(cad == "u") contU++;
    }
    return{
        a: contA,
        e: contE,
        i: contI,
        o: contO,
        u: contU
    }
}

let obj = contar("euforia");
console.log(obj);






















 
 