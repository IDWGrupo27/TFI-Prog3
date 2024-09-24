import { serviceCreate, serviceReclamoByIdCliente } from "../service/reclamoService.js";

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

export const reclamoIdCliente = async(req, res) => {

    const idCliente = req.params.idCliente;

    const datos = await serviceReclamoByIdCliente(idCliente)

    if (datos.length === 0) {
        return res.status(200).send({
            message: "No existen datos para e usuario ingresado"
        })
    }

    res.send({status: "OK", datos})
   
}
