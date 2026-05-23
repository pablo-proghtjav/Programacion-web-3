const express = require('express')
const conexion = require('../conexion/conexion')

const router = express.Router();

router.get('/categorias',(req,res)=>{

    const sql = `SELECT * FROM categorias`;

    conexion.query(
        sql,
        (error,resultado) => {

            if(error){
                console.log(error);

                return res.status(500).json({
                    mensaje: 'Error al obtener categorias'
                });
            }

            res.status(200).json(resultado);
        }
    );
});

module.exports = router;