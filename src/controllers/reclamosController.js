import ReclamosService from "../service/reclamosService.js";
import { enviarCorreo } from "../utiles/correoElectronico.js";

const reclamosService = new ReclamosService();

export default class ReclamosController {
    getAllReclamos = async (req, res) => {
        const reclamos = await reclamosService.getAllReclamos();
        res.send({ status: "OK", reclamos });
    };

    /** Devuelve los reclamos del cliente logueado */
    getReclamosByPerfil = async (req, res) => {
        const reclamos = await reclamosService.getReclamosByClientId(req.perfil?.idUsuario);
        console.log(reclamos);
        res.send({ status: "OK", reclamos });
    };

    getReclamosByClientId = async (req, res) => {
        const idCliente = req.params?.idCliente;

        if (!idCliente) {
            res.status(400).send({ message: "Debe ingresar un 'idCliente'" });
        }

        const reclamos = await reclamosService.getReclamosByClientId(idCliente);

        const resObj = {
            status: "OK",
            reclamos,
        };
        if (reclamos.length === 0) resObj.message = "No hay reclamos";

        res.send(resObj);
    };

    getReclamoById = async (req, res) => {
        const idReclamo = req.params?.idReclamo;

        if (!idReclamo) {
            return res.status(400).send({ message: "Debe ingresar un 'idReclamo'" });
        }

        const reclamo = await reclamosService.getReclamoById(idReclamo);

        if (!reclamo) {
            return res.status(404).send({
                message: "No se encontró el reclamo",
            });
        }

        if (req.perfil?.tipo === "CLIENTE" && reclamo.idUsuarioCreador !== req.perfil?.idCliente) {
            return res.status(403).send({
                status: "FAILED",
                message: "No tenés permiso para ver el reclamo",
            });
        }

        return res.send({ status: "OK", reclamo });
    };

    createReclamo = async (req, res) => {
        const { body } = req;
        let fecha = new Date();

        const idUsuarioCreador = req.perfil?.idUsuario;

        if (!body.idReclamoTipo || !body.asunto || !body.descripcion) {
            return res.status(400).send({
                status: "FAILED",
                message: "Debe ingresar un 'idUsuarioCreador', 'idReclamoTipo', 'asunto' y 'descripcion'",
            });
        }
        if (body.fecha) {
            fecha = body.fecha;
        }

        const reclamo = {
            idUsuarioCreador,
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

    deleteReclamoById = async (req, res) => {
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

    cancelarReclamo = async (req, res) => {
        const idReclamo = req.params?.idReclamo;

        if (idReclamo) {
            const reclamo = await reclamosService.getReclamoById(idReclamo);
            if (reclamo?.idUsuarioCreador !== req.perfil?.idUsuario) {
                return res.status(403).send({
                    status: "FAILED",
                    mensaje: "No tiene permisos para actualizar este reclamo",
                });
            }

            const fecha = new Date().toISOString().slice(0, 19).replace("T", " ");
            try {
                const reclamoActualizado = await reclamosService.updateReclamo(idReclamo, {
                    fechaCancelado: fecha,
                    idReclamoEstado: 3,
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
}
