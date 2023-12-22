import express from 'express';
import {
    createEmpleado,
    deleteEmpleado,
    getEmpleados,
    searchEmpleados,
    updateEmpleado
} from '../controllers/empleado.controller.js';

//define el roouter para los endpoints de empleado
const router = express.Router();

//Obtiene todos los empleados
router.get('/', getEmpleados);

//obtiene empleados en base a campos de campo y valor
router.get('/:campo/:valor', searchEmpleados);

//Crea un nuevo empleado
router.post('/', createEmpleado);

//Elimina un empleado por su id
router.delete('/:id_empleado', deleteEmpleado);

//Actualiza un empleado dado su id
router.put('/:id_empleado', updateEmpleado);

export default  router;