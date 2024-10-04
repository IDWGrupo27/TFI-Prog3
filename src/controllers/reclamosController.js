import {
    serviceCreateReclamo,
    serviceGetReclamoById,
    serviceReclamoUpdate,
    serviceGetAllReclamos,
    serviceGetReclamosByClientId,
    serviceDeleteReclamoById,
} from "../service/reclamoService.js";

export const getAllReclamos = async (req, res) => {
    const data = await serviceGetAllReclamos();

    res.send({ status: "OK", data });
};

export const getReclamoById = async (req, res) => {
    const idReclamo = req.params.idReclamo;
    const data = await serviceGetReclamoById(idReclamo);

    if (data.length === 0) {
        return res.status(404).send({
            message: "No se encontró el reclamo",
        });
    }

    res.send({ status: "OK", data });
};

export const getReclamosByClientId = async (req, res) => {
    const idCliente = req.params.idCliente;
    const data = await serviceGetReclamosByClientId(idCliente);

    if (data.length === 0) {
        return res.status(200).send({
            status: "OK",
            data: [],
            message: "No hay reclamos de este cliente",
        });
    }

    res.send({ status: "OK", data });
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

    const query = await serviceDeleteReclamoById(idReclamo);

    if (query.affectedRows === 0) {
        return res.status(200).send({
            status: "FAILED",
            message: "El reclamo no existe",
        });
    }

    res.send({ status: "OK", message: "Se ha eliminado el reclamo" });
};

export const actualizaReclamoCliente = async (req, res) => {
    const idCliente = req.params.idCliente;
    const { body } = req;
    const fechaCancelado = new Date();
    const estado = 3;

    if (!body.idReclamo) {
        res.status(404).send({
            status: "Fallo",
            data: {
                error: "El parámetro idReclamo no puede ser vacío.",
            },
        });
    }

    if (!idCliente) {
        res.status(404).send({
            status: "Fallo",
            data: {
                error: "El parámetro idCliente no puede ser vacío.",
            },
        });
    }

    const reclamo = {
        idReclamo: body.idReclamo,
        fechaCancelado: fechaCancelado,
        estado: estado,
    };

    try {
        const reclamoActualizado = await serviceReclamoUpdate(
            idCliente,
            reclamo
        );

        console.log(reclamoActualizado);

        if (reclamoActualizado.affectedRows === 0) {
            return res.status(400).send({
                mensaje: "No se pudo modificar el reclamo",
            });
        }

        res.send({ status: "OK", data: reclamoActualizado });
    } catch (error) {
        res.status(error?.status || 500).send({
            status: "Fallo",
            data: { error: error?.message || error },
        });
    }
};
