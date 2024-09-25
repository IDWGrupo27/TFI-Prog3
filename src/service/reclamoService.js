import { create, consultaReclamoCliente, updateReclamo } from "../database/reclamos.js";

const serviceCreate = (reclamo) => {

    return create(reclamo);

}

const serviceConsultaReclamoCliente = (idCliente) => {

    return consultaReclamoCliente(idCliente)

}

const serviceReclamoUpdate = (idCliente, reclamo) => {

    return  updateReclamo(idCliente, reclamo)
} 

export {serviceCreate, serviceConsultaReclamoCliente, serviceReclamoUpdate};