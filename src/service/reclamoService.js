import {
    createReclamo,
    getReclamoById,
    updateReclamo,
    getAllReclamos,
    getReclamosByClientId,
    deleteReclamoById,
} from "../database/reclamos.js";
import { Reclamo } from "../model/Reclamo.js";

export const serviceCreateReclamo = (reclamo) => {
    return createReclamo(reclamo);
};

export const serviceGetAllReclamos = async () => {
    /** @type {Reclamo[]} */
    var reclamos = [];
    var data = await getAllReclamos();
    data.forEach((rd) => {
        reclamos.push(new Reclamo(rd));
    });
    return reclamos;
};

export const serviceGetReclamosByClientId = async (idCliente) => {
    /** @type {Reclamo[]} */
    var reclamos = [];
    var data = await getReclamosByClientId(idCliente);
    data.forEach((rd) => {
        reclamos.push(new Reclamo(rd));
    });
    return reclamos;
};

export const serviceGetReclamoById = async (idReclamo) => {
    /** @type {Reclamo} */
    var data = await getReclamoById(idReclamo);
    if (data) {
        var reclamo = new Reclamo(data);
        return reclamo;
    } else {
        return null;
    }
};

export const serviceDeleteReclamoById = (idReclamo) => {
    return deleteReclamoById(idReclamo);
};

export const serviceReclamoUpdate = (idCliente, reclamo) => {
    return updateReclamo(idCliente, reclamo);
};
