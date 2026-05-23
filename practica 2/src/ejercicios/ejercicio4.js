const express = require('express')
const conexion = require('../conexion/conexion')

const router = express.Router();

router.patch('/categorias/:id', (req, res) => {

    const { id } = req.params;

    const { nombre, descripcion } = req.body;

    const sql = `
        UPDATE categorias
        SET nombre = ?, descripcion = ?
        WHERE id = ?
    `;

    conexion.query(
        sql,
        [nombre, descripcion, id],
        (error, resultado) => {

            if(error){
                console.log(error);

                return res.status(500).json({
                    mensaje: 'Error al actualizar categoría'
                });
            }

            // SI NO EXISTE
            if(resultado.affectedRows === 0){

                return res.status(404).json({
                    mensaje: 'Categoría no encontrada'
                });
            }

            res.status(200).json({
                mensaje: 'Categoría actualizada'
            });
        }
    );
});
module.exports = router;