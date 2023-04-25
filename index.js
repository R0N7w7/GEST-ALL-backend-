import express from "express";
import DB from "./config/db.js";
import EmpleadoRouter from "./routes/empleado.routes.js";
import AsistenciaRouter from "./routes/asistencia.routes.js";
import NominaRouter from "./routes/nomina.routes.js";

import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.set('etag', false); // desactivar la generación automática de ETag
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store'); // establecer la cabecera Cache-Control a no-store
  next();
});

//conectar a la BD
try {
    await DB.authenticate();
    console.log("BD Funcionando");
} catch (error) {
    console.log("Error al conectar a la BD: " + error);
}

//Definir Puerto
const port = process.env.PORT || 4000;

//Enciende el servidor
app.listen(port,() => {
    console.log(`Servidor corriendo en el puerto: ${port}`);
});

//rutas del empleado
app.use('/API/empleado', EmpleadoRouter);

//rutas de asistencias
app.use('/API/asistencia', AsistenciaRouter);

//ruas de nominas
app.use('/API/nomina', NominaRouter);