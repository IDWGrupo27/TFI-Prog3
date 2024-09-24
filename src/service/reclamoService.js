import { create, reclamoIdCliente } from "../database/reclamos.js";

const serviceCreate = (reclamo) => {

    return create(reclamo);

}

const serviceReclamoByIdCliente = (idCliente) => {

    return reclamoIdCliente(idCliente)

}

export {serviceCreate, serviceReclamoByIdCliente};