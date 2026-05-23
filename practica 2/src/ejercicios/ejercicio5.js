const express = require('express')
const conexion = require('../conexion/conexion')

const router = express.Router();

router.delete('/categorias/:id', (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM categorias
        WHERE id = ?
    `;

    conexion.query(
        sql,
        [id],
        (error, resultado) => {

            if(error){
                console.log(error);

                return res.status(500).json({
                    mensaje: 'Error al eliminar categoría'
                });
            }

            // SI NO EXISTE
            if(resultado.affectedRows === 0){

                return res.status(404).json({
                    mensaje: 'Categoría no encontrada'
                });
            }

            res.status(200).json({
                mensaje: 'Categoría eliminada'
            });
        }
    );
});

module.exports = router;