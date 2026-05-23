const express = require('express')
const conexion = require('../conexion/conexion')

const router = express.Router();

router.post('/categorias',(req,res)=>{
    const {nombre,descripcion} = req.body;
    const sql = `INSERT INTO categorias(nombre, descripcion)VALUES (?, ?)`;
    conexion.query(
        sql,
        [nombre,descripcion],
        (error,resultado) => {
            if(error){
                console.log(error);
                return res.status(500).json({
                    mensaje: 'Error al insertar'
                });
            }
            res.status(201).json({
                mensaje: 'Categoria insertada',
                id: resultado.insertId
            });
        }
    );
});

module.exports = router;