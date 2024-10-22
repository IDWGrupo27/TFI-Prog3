import {
    createReclamo,
    getReclamoById,
    updateReclamo,
    getAllReclamos,
    getReclamosByClientId,
    deleteReclamoById,
} from "../database/reclamos.js";
import { Reclamo } from "../model/Reclamo.js";

export default class ReclamosService {
    getReclamoById = async (idReclamo) => {
        try {
            const data = await getReclamoById(idReclamo);
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
            const data = await getAllReclamos();
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
            const data = await getReclamosByClientId(idCliente);
            return data.map((rd) => new Reclamo(rd));
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    createReclamo = async (dataReclamo) => {
        try {
            const data = await createReclamo(dataReclamo);
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    updateReclamo = async (dataReclamo) => {
        try {
            const data = await updateReclamo(idCliente, dataReclamo);
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    deleteReclamoById = async (idReclamo) => {
        try {
            const data = await deleteReclamoById(idReclamo);
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };
}
