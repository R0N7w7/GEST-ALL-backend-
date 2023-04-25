import Express from "express";
import {createNomina, deleteNomina, getNominaById, getNominas, getNominasRange, updateNomina } from "../controllers/nomina.controller.js";

const router = Express.Router();

//ruta para crear una nueva nomina basado en el id del empleado
router.post('/:id_empleado', createNomina);

//trae todas las nominas de un rango de fechas
router.get('/:fecha_inicio/:fecha_fin', getNominasRange);

//trae todas las nominas
router.get('/', getNominas);

//tare una nomina por id
router.get('/:id_nomina', getNominaById)

//Elimina una nomina por id
router.delete('/:id_nomina', deleteNomina);

//actualiza una nomina por id
router.put('/:id_nomina', updateNomina);

export default router;