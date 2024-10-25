import { Oficina } from "../model/model.js";
import OficinasDatabase from "../database/oficinas.js";
import UsuariosService from "./usuariosService.js";

const oficinasDatabase = new OficinasDatabase();
const usuariosService = new UsuariosService();

export default class OficinasService {
    getOficinaById = async (idOficina) => {
        try {
            const oficinaData = await oficinasDatabase.getOficinaById(idOficina);
            oficinaData.empleados = await usuariosService.getUsuariosByIdOficina(idOficina);
            if (oficinaData) return new Oficina(oficinaData);
            else return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    };
}
