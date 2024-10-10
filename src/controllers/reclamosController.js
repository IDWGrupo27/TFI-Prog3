import { Reclamo } from "../model/Reclamo.js";
import {
    serviceCreateReclamo,
    serviceGetReclamoById,
    serviceUpdateReclamo,
    serviceGetAllReclamos,
    serviceGetReclamosByClientId,
    serviceDeleteReclamoById,
} from "../service/reclamoService.js";

export const getAllReclamos = async (req, res) => {
    const reclamos = await serviceGetAllReclamos();
    res.send({ status: "OK", reclamos });
};

export const getRequesterReclamos = async (req, res) => {
    if (req.perfil) {
        const reclamos = await serviceGetReclamosByClientId(
            parseInt(req.perfil.idUsuario)
        );

        if (reclamos.length === 0) {
            return res.status(200).send({
                status: "OK",
                reclamos: [],
                message: "No hay reclamos de este cliente",
            });
        }

        res.send({ status: "OK", reclamos });
    } else {
        res.status(403).send({
            status: "FORBIDDEN",
            message: "Usuario sin perfil",
        });
    }
};

export const getReclamosByClientId = async (req, res) => {
    const idCliente = req.params.idCliente;
    if (req.isCliente && parseInt(req.idUsuario) !== parseInt(idCliente)) {
        return res.status(403).send({
            status: "FAILED",
            message: "No tenés permiso para ver los reclamos de este cliente",
        });
    }

    const reclamos = await serviceGetReclamosByClientId(idCliente);

    if (reclamos.length === 0) {
        return res.status(200).send({
            status: "OK",
            reclamos: [],
            message: "No hay reclamos de este cliente",
        });
    }

    res.send({ status: "OK", reclamos });
};

export const getReclamoById = async (req, res) => {
    const idReclamo = req.params.idReclamo;

    if (idReclamo) {
        const reclamo = await serviceGetReclamoById(idReclamo);
        if (!reclamo) {
            return res.status(404).send({
                message: "No se encontró el reclamo",
            });
        }
        return res.send({ status: "OK", reclamo });
    } else {
        return res.status(400).send({
            message: "Debe ingresar un 'idReclamo'",
        });
    }
};

export const createReclamo = async (req, res) => {
    const { body } = req;
    let fecha = new Date();

    if (
        !body.idUsuarioCreador ||
        !body.idReclamoTipo ||
        !body.asunto ||
        !body.descripcion
    ) {
        return res.status(400).send({
            status: "FAILED",
            message:
                "Debe ingresar un 'idUsuarioCreador', 'idReclamoTipo', 'asunto' y 'descripcion'",
        });
    }
    if (body.fecha) {
        fecha = body.fecha;
    }

    const reclamo = {
        idUsuarioCreador: body.idUsuarioCreador,
        idReclamoTipo: body.idReclamoTipo,
        asunto: body.asunto,
        descripcion: body.descripcion,
        fecha: fecha,
    };

    try {
        const reclamoCreado = await serviceCreateReclamo(reclamo);
        res.status(201).send({
            status: "OK",
            data: reclamoCreado,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            status: "FAILED",
            message: "Error al crear el reclamo",
        });
    }
};

export const deleteReclamoById = async (req, res) => {
    const idReclamo = req.params.idReclamo;

    console.log(req.params);

    if (idReclamo && !isNaN(idReclamo)) {
        const query = await serviceDeleteReclamoById(idReclamo);

        if (query.affectedRows === 0) {
            return res.status(200).send({
                status: "FAILED",
                message: "El reclamo no existe",
            });
        }

        return res.send({
            status: "OK",
            message: "Se ha eliminado el reclamo",
        });
    }

    res.status(400).send({
        status: "FAILED",
        message: "No se ha ingresado un 'idReclamo' válido",
    });
};

export const clienteUpdateReclamo = async (req, res) => {
    const { body } = req;
    const idReclamo = body ? parseInt(body.idReclamo) : null;
    const idCliente = parseInt(req.params.idCliente);

    if (idReclamo && idCliente) {
        // a terminar
        const reclamo = new Reclamo(body);
    } else {
        res.status(404).send({
            status: "FAILED",
            data: {
                error: "El parámetro idCliente es inválido.",
            },
        });
    }
};
