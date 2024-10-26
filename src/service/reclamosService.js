import { Reclamo } from "../model/model.js";
import ReclamosDatabase from "../database/reclamos.js";
import OficinasService from "./oficinasService.js";

const database = new ReclamosDatabase();

const oficinasService = new OficinasService();

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
    getReclamosByIdCliente = async (idCliente) => {
        try {
            const data = await database.getReclamosByIdCliente(idCliente);
            return data.map((rd) => new Reclamo(rd));
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    /**
     * @returns {Promise<Reclamo[]>}
     */
    getReclamosByIdOficina = async (idOficina) => {
        try {
            const data = await database.getReclamosByIdOficina(idOficina);
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

    updateReclamo = async (idReclamo, dataReclamo) => {
        try {
            const data = await database.updateReclamo(idReclamo, dataReclamo);
            if (data?.affectedRows === 0) {
                return null;
            }
            const reclamo = await this.getReclamoById(idReclamo);
            console.log(idReclamo);

            return reclamo;
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
