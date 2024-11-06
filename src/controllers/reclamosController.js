import OficinasService from "../service/oficinasService.js";
import ReclamosService from "../service/reclamosService.js";

const reclamosService = new ReclamosService();
const oficinasService = new OficinasService();

const formatos = ["pdf", "csv"];

export default class ReclamosController {
    
    getAllReclamos = async (req, res) => {
        const reclamos = await reclamosService.getAllReclamos();
        res.send({ status: "OK", reclamos });
    };

    /** Devuelve los reclamos del cliente logueado */
    getReclamosByPerfil = async (req, res) => {
        //const reclamos = await reclamosService.getReclamosByIdCliente(req.perfil?.idUsuario);
        const reclamos = await reclamosService.getReclamosByIdCliente(req.user?.idUsuario);
        console.log(reclamos)
        res.send({ status: "OK", reclamos });
    };

    getReclamosByIdCliente = async (req, res) => {
        const idUsuario = req.params?.idUsuario;

        if (!idUsuario) {
            res.status(400).send({ message: "Debe ingresar un 'idUsuario'" });
        }

        const reclamos = await reclamosService.getReclamosByIdCliente(idUsuario);

        const resObj = {
            status: "OK",
            reclamos,
        };
        if (reclamos.length === 0) resObj.message = "No hay reclamos";

        res.send(resObj);
    };

    getReclamosByIdOficina = async (req, res) => {
        const idOficina = req.params?.idOficina;

        if (!idOficina) {
            res.status(400).send({ message: "Debe ingresar un 'idUsuario'" });
        }

        const reclamos = await reclamosService.getReclamosByIdOficina(idOficina);

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
    
        //if (req.perfil?.tipo === "CLIENTE" && reclamo.idUsuarioCreador !== req.perfil?.idCliente) {
        if (req.user?.tipo.toUpperCase() === "CLIENTE" && reclamo.idUsuarioCreador !== req.user?.idUsuario) {
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

        //const idUsuarioCreador = req.perfil?.idUsuario;
        const idUsuarioCreador = req.user?.idUsuario;

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

    /** Si es cliente solo lo va a cancelar. Si es empleado puede cambiar a otros estados de reclamos de su oficina */
    updateReclamo = async (req, res) => {
        const fecha = new Date().toISOString().slice(0, 19).replace("T", " ");
        const idReclamo = req.params?.idReclamo;
        const idReclamoEstado = req.body.idReclamoEstado;

        var updateData = null;

        if (idReclamo && idReclamoEstado) {
            if (req.user?.tipo.toUpperCase() === "CLIENTE") {
                const reclamo = await reclamosService.getReclamoById(idReclamo);
                if (reclamo?.idUsuarioCreador === req.user?.idUsuario && idReclamoEstado === 3) {
                    updateData = {
                        fechaCancelado: fecha,
                        idReclamoEstado,
                    };
                }
            } else if (req.user?.tipo.toUpperCase() === "EMPLEADO") {
                const oficinaEmpleado = await oficinasService.getOficinaByIdUsuario(req.user?.idUsuario);
                const oficinaReclamo = await oficinasService.getOficinaByIdReclamo(idReclamo);
                if (oficinaEmpleado?.idOficina === oficinaReclamo?.idOficina) {
                    updateData = {
                        fechaFinalizado: idReclamoEstado === 4 ? fecha : null,
                        idReclamoEstado,
                    };
                } else {
                    return res.status(403).send({ message: "El reclamo no pertenece a su oficina" });
                }
            }

            if (updateData) {
                try {
                    const reclamoActualizado = await reclamosService.updateReclamo(idReclamo, updateData);
                    if (!reclamoActualizado) {
                        return res.status(400).send({
                            status: "FAILED",
                            mensaje: "No se pudo actualizar el reclamo",
                        });
                    } else {
                        return res.status(201).send({
                            status: "OK",
                            data: await reclamosService.getReclamoById(idReclamo),
                        });
                    }
                } catch (e) {
                    console.log(e);
                    return res.status(500).send({
                        status: "FAILED",
                        message: "Error al actualizar el reclamo",
                    });
                }
            }

            return res.status(403).send({
                status: "FAILED",
                mensaje: "No tiene permisos para actualizar este reclamo",
            });
        } else {
            res.status(400).send({
                status: "FAILED",
                data: {
                    error: "Se requiere idReclamo y { idReclamoEstado }.",
                },
            });
        }
    };

    getInforme = async (req, res) => {
        try {
            const formato = req.query.formato;

            if (!formato || !formatos.includes(formato)) {
                return res.status(400).send({
                    mensaje: "El formato es incorrecto",
                });
            }

            const { buffer, path, headers } = await reclamosService.getInforme(formato);


            res.set(headers)

            if (formato === 'pdf') {
                res.status(200).end(buffer);
            } else if (formato === 'csv') {
                res.status(200).download(path, (err) => {
                    if (err) {
                        return res.status(500).send({
                            mensaje: "No se pudo generar el csv",
                        });
                    }
                    return
                });
            }

        } catch (error) {
            console.log(error);
            res.status(500).send({
                mensaje: "Error de servidor"
            })
        }


    }

    getEstadistica = async (req, res) => {
        try {
            const { buffer, path, headers } = await reclamosService.getEstadistica();

            if (!path || path === null) {
                return res.status(400).send({
                    mensaje: "No se obtuvo el archivo"
                });
            }

            res.set(headers);

            res.status(200).download(path, (err) => {
                if (err) {
                    res.status(500).send({
                        mensaje: "Error del servidor"
                    })
                }
                return
            });

        } catch (error) {
            console.log(error);
            res.status(500).send({
                mensaje: "Error de servidor"
            });
        }


    }

}
