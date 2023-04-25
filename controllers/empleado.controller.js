import { Op, where } from "sequelize";
import { Empleado } from "../models/empleado.model.js";

//Lista todos los empleados ordenados
export const listarEmpleados = async (req, res) => {
    try {
        const empleados = await Empleado.findAll({
            order: [['id_empleado', 'ASC']]
        });
        res.json(empleados);
    } catch (error) {
        res.status(500).json({ message: "Error al listar empleados" });
    }

};


//Lista los empleados que cumplen con un campo en especifico
export const buscarEmpleados = async (req, res) => {
    const { campo, valor } = req.params;

    let atributo;
    console.log(campo);
    switch (campo) {
        case 'id_empleado':
            atributo = "id_empleado"
            break;
        case 'nombre':
            atributo = 'nombre';
            break;
        case 'apellido_materno':
            atributo = 'apellido_materno';
            break;
        case 'apellido_paterno':
            atributo = 'apellido_paterno';
            break;
        case 'telefono':
            atributo = 'telefono';
            break;
        default:
            return res.status(400).json({ message: 'Campo no Válido' });

    }
    const empleados = await Empleado.findAll({
        where: {
            [atributo]: {
                [Op.like]: `%${valor}%`
            }
        }
    }
    );
    if (empleados.length <= 0) {
        return res.status(404).json({ message: "Empleado no encontrado" });
    }
    res.json({ empleados });
}

//Crea un nuevo empleado
export const crearEmpleado = async (req, res) => {
    const { nombre, apellido_paterno, apellido_materno, telefono, salario_hora, salario_hora_extra } = req.body;

    try {

        const nuevoEmpleado = await Empleado.create({
            nombre,
            apellido_paterno,
            apellido_materno,
            telefono,
            salario_hora,
            salario_hora_extra
        });

        res.status(201).json({ message: "Empleado creado", empleado: nuevoEmpleado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el empleado" });
    }
};

//Elimina un empleado por su id
export const eliminarEmpleado = async (req, res) => {
    const { id_empleado } = req.params;

    try {
        const empleado = await Empleado.findOne({ where: { id_empleado } });

        if (!empleado) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        await empleado.destroy();

        res.json({ message: "Empleado eliminado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el empleado" });
    }
};

//Actualiza un empleado por su id
export const actualizarEmpleado = async (req, res) => {
    const { id_empleado } = req.params;
    const { nombre, apellido_paterno, apellido_materno, telefono, salario_hora, salario_hora_extra } = req.body;
  
    try {
      const empleado = await Empleado.findOne({ where: { id_empleado } });
  
      if (!empleado) {
        return res.status(404).json({ message: "Empleado no encontrado" });
      }
  
      empleado.nombre = nombre;
      empleado.apellido_paterno = apellido_paterno;
      empleado.apellido_materno = apellido_materno;
      empleado.telefono = telefono;
      empleado.salario_hora = salario_hora;
      empleado.salario_hora_extra = salario_hora_extra;
  
      await empleado.save();
  
      res.json({ message: "Empleado actualizado", empleado });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar el empleado" });
    }
  };
  

