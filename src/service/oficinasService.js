import { Oficina } from "../model/model.js";
import OficinasDatabase from "../database/oficinas.js";
import UsuariosService from "./usuariosService.js";
import ReclamosTipoService from "./reclamosTipoService.js";
import UsuariosDatabase from "../database/usuarios.js";

const oficinasDatabase = new OficinasDatabase();
const usuariosDatabase = new UsuariosDatabase();
const usuariosService = new UsuariosService();
const tipoReclamo = new ReclamosTipoService();


export default class OficinasService {

    getOficinaById = async (idOficina) => {
        try {
            const oficinaData = await oficinasDatabase.getOficinaById(idOficina);
            if (oficinaData) {
                oficinaData.empleados = await usuariosService.getUsuariosByIdOficina(idOficina);
                return new Oficina(oficinaData);
            } else return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    getAllOficina = async () => {
        const oficinaData = await oficinasDatabase.getAllOficina();
        return oficinaData;
    };

    createOficina = async ({ nombre, idTipoReclamo }) => {
        const existeIdTipoReclamo = await tipoReclamo.getReclamosTipoById(idTipoReclamo)
        if(existeIdTipoReclamo === null){
            return {
                estado: false,
                mensaje: "El idTipoReclamo no existe"
            }
        }

        const nuevaOficina = await oficinasDatabase.createOficina(nombre, idTipoReclamo)
        if(nuevaOficina.affectedRows === 1){
            return {
                estado: true,
                mensaje: "Oficina creada!",
                datos: await oficinasDatabase.getOficinaById(nuevaOficina.insertId)
            }
        } else {
            return {
                estado: false,
                mensaje: "No se pudo crear la oficina",
            }
        }
    };

    updateOficina = async(idOficina, datos) => {
        if(datos.idTipoReclamo){
            const existeIdTipoReclamo = await tipoReclamo.getReclamosTipoById(datos.idTipoReclamo)
            if(existeIdTipoReclamo === null){
                return {
                    estado: false,
                    mensaje: "El idTipoReclamo no existe"
                }
            }
        }
        
        const oficinaModificada = await oficinasDatabase.updateOficina(idOficina, datos);
        if(oficinaModificada.affectedRows === 1){
            return {
                estado: true,
                mensaje: "Oficina modificada!"
            }
        } else {
            return {
                estado: false,
                mensaje: "No se pudo modificar la oficina"
            }
        };
        
    };

    deleteOficina = async(idOficina) => {
        const oficinaExiste = await oficinasDatabase.getOficinaById(idOficina)
        if(!oficinaExiste){
            return {
                estado: false,
                mensaje: "La oficina no exsiste!"
            }
        }

        const oficinaEliminada = await oficinasDatabase.deleteOficina(idOficina)
        if(oficinaEliminada.affectedRows === 1){
            return {
                estado: true,
                mensaje: "Oficina eliminada con exito"
            }
        } else {
            return {
                estado: false,
                mensaje: "No se pudo eliminar la oficina"
            }
        };
    };

    getOficinaByIdUsuario = async (idUsuario) => {
        const oficinaData = await oficinasDatabase.getOficinaByIdUsuario(idUsuario);
        if (oficinaData) {
            return new Oficina(oficinaData);
        }
        return null;
    };

    getOficinaByIdReclamo = async (idReclamo) => {
        const oficinaData = await oficinasDatabase.getOficinaByIdReclamo(idReclamo);
        if (oficinaData) {
            return new Oficina(oficinaData);
        }
        return null;
    };

    agregarEmpleados = async({ idOficina, empleados }) => {
        for(const empleado of empleados){
            const existeEmpleado = await usuariosDatabase.getUsuarioById(empleado.idUsuario);
            // control empleado activo
            if(existeEmpleado === null){
                return {
                    estado: false,
                    mensaje: `El usuario con id ${empleado.id} no existe`
                }
            }
            // control tipo empleado
            if(existeEmpleado.tipo != "Empleado"){
                return {
                    estado: false,
                    mensaje: `El usuario con id ${empleado.idUsuario} no es un empleado`
                }
            }
            // empleado ya existe en oficina
            const existeEmpleadoOficina = await oficinasDatabase.getOficinaByIdUsuario(empleado.idUsuario);
            if(existeEmpleadoOficina === idOficina){
                return {
                    estado: false,
                    mensaje: `El usuario con id ${empleado.idUsuario} ya existe en la oficina`
                }
            }
        }

        const existeOficina = await oficinasDatabase.getOficinaById(idOficina);
        // control oficina existe
        if(existeOficina === null){
            return {
                estado: false,
                mensaje: `La oficina no existe`
            }
        }

        return await oficinasDatabase.agregarEmpleados(idOficina, empleados); 
    }; 

    quitarEmpleados = async({ idOficina, empleados }) => {
        const idUsuarioOficina = []

        const existeOficina = await oficinasDatabase.getOficinaById(idOficina);
        // control oficina existe
        if(existeOficina === null){
            return {
                estado: false,
                mensaje: `La oficina no existe`
            }
        }

        for(const empleado of empleados){
            const existeEmpleado = await usuariosDatabase.getUsuarioById(empleado.idUsuario);
            // control empleado activo
            if(existeEmpleado === null){
                return {
                    estado: false,
                    mensaje: `El usuario con id ${empleado.idUsuario} no existe`
                }
            }
            // control tipo empleado
            if(existeEmpleado.tipo != "Empleado"){
                return {
                    estado: false,
                    mensaje: `El usuario con id ${empleado.idUsuario} no es un empleado`
                }
            }

            const existeIdUsuarioOficina = await oficinasDatabase.getIdUsuarioOficina(idOficina, empleado.idUsuario);
            if(existeIdUsuarioOficina){
                idUsuarioOficina.push(existeIdUsuarioOficina);
            }else{
                return {
                    estado: false,
                    mensaje: `El empleado id ${empleado.idUsuario} no pertenece al la oficina`
                }
            }
        }

        return await oficinasDatabase.quitarEmpleados(idUsuarioOficina);

    };
}
