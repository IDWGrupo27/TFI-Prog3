import { serviceCreate, serviceConsultaReclamoCliente, serviceReclamoUpdate } from "../service/reclamoService.js";

export const createReclamos = async(req, res) => {

    const { body } = req;
    let fecha = new Date();
    let estado = 1;

    if (!body.usuario) {
        return res.status(404).send({
            status: false,
            message: "Debe ingresar un 'usuario'" 
        })
    }

    if (!body.asunto || body.asunto === ""){
        return res.status(404).send({
            status: false,
            message: "El campo 'asunto' no se encuentra o esta vacio!" 
        })
    }

    if (!body.tipo) {
        return res.status(404).send({
            status: false,
            message: "El campo 'tipo' no se encuentra" 
        })
    }

    if (body.fecha) {
        fecha = body.fecha
    }

    const reclamo = {
        usuario: body.usuario,
        asunto: body.asunto,
        fecha: fecha, 
        estado: estado,
        tipo: body.tipo
    }

    try {
        const reclamoCreado = await serviceCreate(reclamo)
        res.status(201).send({
            estado: "OK",
            data: reclamoCreado
        })
    } catch(e) {
        console.log(e)
        res.status(500).send({
            status: "FAILED",
            data: e
        })
    }
        
}

export const consultaReclamoCliente = async(req, res) => {

    const idCliente = req.params.idCliente;

    const datos = await serviceConsultaReclamoCliente(idCliente)

    if (datos.length === 0) {
        return res.status(200).send({
            message: "No existen datos para e usuario ingresado"
        })
    }

    res.send({status: "OK", datos})
   
}

export const actualizaReclamoCliente = async(req, res) => {

    const idCliente = req.params.idCliente;
    const { body } = req;
    const fechaCancelado = new Date();
    const estado = 3;

    if (!body.idReclamo) {
        res
            .status(404)
            .send({
                status: "Fallo",
                data: {
                    error: "El parámetro idReclamo no puede ser vacío."
                }
            });
    }

    if (!idCliente) {
        res
            .status(404)
            .send({
                status: "Fallo",
                data: {
                    error: "El parámetro idCliente no puede ser vacío."
                }
            });
    }

    const reclamo = {
        idReclamo: body.idReclamo,
        fechaCancelado: fechaCancelado,
        estado: estado
    }

    try {
        
        const reclamoActualizado = await serviceReclamoUpdate(idCliente, reclamo);

        console.log(reclamoActualizado)

        if (reclamoActualizado.affectedRows === 0) {
            return res.status(400).send({
                mensaje: "No se pudo modificar el reclamo"
            })
        }

        res.send({ status: "OK", data: reclamoActualizado });

    } catch (error) {
        res.status(error?.status || 500).send({ status: "Fallo", data: { error: error?.message || error } });
    }

}