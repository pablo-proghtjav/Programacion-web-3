const express = require('express')
const conexion = require('../conexion/conexion')

const router = express.Router();

router.get('/categorias/:id', (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT * FROM categorias
        WHERE id = ?
    `;

    conexion.query(
        sql,
        [id],
        (error, resultado) => {

            if(error){
                console.log(error);

                return res.status(500).json({
                    mensaje: 'Error al obtener categoría'
                });
            }

            // SI NO EXISTE
            if(resultado.length === 0){
                return res.status(404).json({
                    mensaje: 'Categoría no encontrada'
                });
            }

            // DEVOLVER CATEGORIA
            res.status(200).json(resultado[0]);
        }
    );
});

module.exports = router;