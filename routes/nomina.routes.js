import Express from "express";
import {
    createNomina,
    deleteNomina,
    getNominaById,
    getNominas,
    getNominasRange,
    updateNomina,
    getDistinctDateRanges,
    getNominasByEmpleadoId,
    deleteNominasByDateRange
} from "../controllers/nomina.controller.js";

const router = Express.Router();

//ruta para crear una nueva nomina basado en el id del empleado
router.post('/', createNomina);

//trae todas las nominas
router.get('/', getNominas);

//Obtiene las nominas por ID del empleado
router.get('/empleado/:id_empleado', getNominasByEmpleadoId);

//trae todas las nominas de un rango de fechas
router.get('/fecha/:fecha_inicio/:fecha_fin', getNominasRange);

//ruta para obtener los rangos de fecha distintos
router.get('/distinct-date-ranges', getDistinctDateRanges);

//tare una nomina por id
router.get('/:id_nomina', getNominaById)

//Elimina una nomina por id
router.delete('/:id_nomina', deleteNomina);

//Elimina las nominas que coinciden con un rango de fecha
router.delete('/:fecha_inicio/:fecha_fin', deleteNominasByDateRange)

//actualiza una nomina por id
router.put('/:id_nomina', updateNomina);

export default router;