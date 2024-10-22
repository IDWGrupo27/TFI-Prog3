import ReclamosService from "../service/reclamosService.js";
import { enviarCorreo } from "../utiles/correoElectronico.js";

const reclamosService = new ReclamosService();

export const getAllReclamos = async (req, res) => {
    const reclamos = await reclamosService.getAllReclamos();
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
        const resultData = await reclamosService.createReclamo(reclamo);
        if (resultData?.affectedRows === 1) {
            res.status(201).send({
                status: "OK",
                data: await reclamosService.getReclamoById(resultData.insertId),
            });
            enviarCorreo(reclamo);
            return;
        } else {
            return res.status(400).send({
                status: "FAILED",
                message: "No se pudo crear el reclamo",
            });
        }
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
    if (idReclamo && !isNaN(idReclamo)) {
        const query = await reclamosService.deleteReclamoById(idReclamo);

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
    const idReclamo = req.params.idReclamo;
    const idCliente = parseInt(req.perfil.idUsuario);

    if (idReclamo) {
        const fecha = new Date();
        try {
            const reclamoActualizado = await reclamosService.updateReclamo({
                idReclamo,
                idCliente,
                idReclamoEstado: 3,
                fecha,
            });

            if (reclamoActualizado?.affectedRows === 0) {
                return res.status(400).send({
                    status: "FAILED",
                    mensaje: "No se pudo actualizar el estado del reclamo!",
                });
            }

            res.status(201).send({
                status: "OK",
                data: await reclamosService.getReclamoById(idReclamo),
            });
        } catch (e) {
            console.log(e);
            res.status(500).send({
                status: "FAILED",
                message: "Error al actualizar el reclamo",
            });
        }
    } else {
        res.status(404).send({
            status: "FAILED",
            data: {
                error: "El parámetro idReclamo es inválido.",
            },
        });
    }
};
