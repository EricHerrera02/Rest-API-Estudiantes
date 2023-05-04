const { Router } = require('express');
const { estudiantes, nuevoEstudiante, editarEstudiante, eliminarEstudiante } = require('../controllers/estudiantesController');

const router = Router();

router.get('/', estudiantes);

router.post('/nuevoEstudiante', nuevoEstudiante);

router.put('/editarEstudiante/:id', editarEstudiante);

router.delete('/eliminarEstudiante/:id', eliminarEstudiante);

module.exports = router;
