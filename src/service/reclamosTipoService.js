import { ReclamosTipo } from "../model/model.js";
import ReclamosTipoDatabase from "../database/reclamosTipo.js";

const database = new ReclamosTipoDatabase();

export default class ReclamosTipoService {
    /** @returns {Promise<ReclamosTipo[]>}  */
    getAllReclamosTipo = async () => {
        try {
            const data = await database.getAllReclamosTipo();
            return data.map((dataReclamo) => new ReclamosTipo(dataReclamo));
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    getReclamosTipoById = async (idReclamosTipo) => {
        try {
            const result = await database.getReclamosTipoById(idReclamosTipo);
            if (!result[0]) return null;
            return new ReclamosTipo(result[0]);
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    createReclamosTipo = async (reclamosTipoData) => {
        try {
            const result = await database.createReclamosTipo(reclamosTipoData);
            if (result.affectedRows === 0) return null;
            return new ReclamosTipo(await this.getReclamosTipoById(result.insertId));
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    deleteReclamosTipoById = async (idReclamosTipo) => {
        try {
            const result = await database.deleteReclamosTipoById(idReclamosTipo);
            return result.affectedRows > 0 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    updateReclamosTipoById = async (idReclamosTipo, data) => {
        try {
            const result = await database.updateReclamosTipoById(idReclamosTipo, data);
            if (result.affectedRows === 0) return null;
            return await this.getReclamosTipoById(idReclamosTipo);
        } catch (error) {
            console.log(error);
            return null;
        }
    };
}
