import {
    createReclamo,
    getReclamoById,
    updateReclamo,
    getAllReclamos,
    getReclamosByClientId,
    deleteReclamoById,
} from "../database/reclamos.js";

export const serviceCreateReclamo = (reclamo) => {
    return createReclamo(reclamo);
};

export const serviceGetAllReclamos = () => {
    return getAllReclamos();
};

export const serviceGetReclamoById = (idReclamo) => {
    return getReclamoById(idReclamo);
};

export const serviceGetReclamosByClientId = (idCliente) => {
    return getReclamosByClientId(idCliente);
};

export const serviceDeleteReclamoById = (idReclamo) => {
    return deleteReclamoById(idReclamo);
};

export const serviceReclamoUpdate = (idCliente, reclamo) => {
    return updateReclamo(idCliente, reclamo);
};
