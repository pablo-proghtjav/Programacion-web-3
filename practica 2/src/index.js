const express = require("express");

const app = express();

app.use(express.json());

// IMPORTAR EJERCICIOS
const ejercicio1 = require("./ejercicios/ejercicio1");
const ejercicio2 = require("./ejercicios/ejercicio2");
const ejercicio3 = require("./ejercicios/ejercicio3");
const ejercicio4 = require("./ejercicios/ejercicio4");
const ejercicio5 = require("./ejercicios/ejercicio5");
// USAR EJERCICIOS
app.use(ejercicio1);
app.use(ejercicio2);
app.use(ejercicio3);
app.use(ejercicio4);
app.use(ejercicio5);

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});