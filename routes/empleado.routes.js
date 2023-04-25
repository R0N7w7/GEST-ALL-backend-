import express from 'express';
import {
    actualizarEmpleado,
    buscarEmpleados,
    crearEmpleado,
    eliminarEmpleado,
    listarEmpleados
} from '../controllers/empleado.controller.js';

//define el roouter para los endpoints de empleado
const router = express.Router();

//Obtiene todos los empleados
router.get('/', listarEmpleados);

//obtiene empleados en base a campos de campo y valor
router.get('/:campo/:valor', buscarEmpleados);

//Crea un nuevo empleado
router.post('/', crearEmpleado);

//Elimina un empleado por su id
router.delete('/:id_empleado', eliminarEmpleado);

//Actualiza un empleado dado su id
router.put('/:id_empleado', actualizarEmpleado);

export default  router;