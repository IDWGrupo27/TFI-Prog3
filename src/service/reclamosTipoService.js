import { ReclamoTipo } from "../model/model.js";
import ReclamosTipoDatabase from "../database/reclamosTipo.js";

const database = new ReclamosTipoDatabase();

/** @returns {Promise<ReclamoTipo[]>}  */
export default class ReclamosTipoService {
    getAllReclamosTipo = async () => {
        try {
            const reclamosData = await database.getAllReclamosTipo();
            return reclamosData.map((dataReclamo) => new ReclamoTipo(dataReclamo));
        } catch (error) {
            console.error(error);
            return [];
        }
    };
}
