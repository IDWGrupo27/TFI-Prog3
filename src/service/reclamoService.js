import {
    create,
    getReclamoById,
    updateReclamo,
    getAllReclamos,
    getReclamosByClientId,
} from "../database/reclamos.js";

export const serviceCreate = (reclamo) => {
    return create(reclamo);
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

export const serviceReclamoUpdate = (idCliente, reclamo) => {
    return updateReclamo(idCliente, reclamo);
};
