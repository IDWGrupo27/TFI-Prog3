import { Oficina } from "../model/model.js";
import OficinasDatabase from "../database/oficinas.js";
import UsuariosService from "./usuariosService.js";
import ReclamosTipoService from "./reclamosTipoService.js";

const oficinasDatabase = new OficinasDatabase();
const usuariosService = new UsuariosService();
const tipoReclamo = new ReclamosTipoService()

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
    }

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
        
    }

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
}
