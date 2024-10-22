import { Reclamo } from "../model/Reclamo.js";
import ReclamosDatabase from "../database/reclamos.js";

const database = new ReclamosDatabase();

export default class ReclamosService {
    getReclamoById = async (idReclamo) => {
        try {
            const data = await database.getReclamoById(idReclamo);
            if (data) {
                const reclamo = new Reclamo(data);
                return reclamo;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error al obtener el reclamo", error);
            return null;
        }
    };

    /**
     * @returns {Promise<Reclamo[]>}
     */
    getAllReclamos = async () => {
        try {
            const data = await database.getAllReclamos();
            return data.map((rd) => new Reclamo(rd));
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    /**
     * @returns {Promise<Reclamo[]>}
     */
    getReclamosByClientId = async (idCliente) => {
        try {
            const data = await database.getReclamosByClientId(idCliente);
            return data.map((rd) => new Reclamo(rd));
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    createReclamo = async (dataReclamo) => {
        try {
            const data = await database.createReclamo(dataReclamo);
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    updateReclamo = async (dataReclamo) => {
        try {
            const data = await database.updateReclamo(idCliente, dataReclamo);
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    deleteReclamoById = async (idReclamo) => {
        try {
            const data = await database.deleteReclamoById(idReclamo);
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };
}
