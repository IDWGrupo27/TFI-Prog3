import { service } from "../service/reclamoService.js";

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
        console.log('controller');
        const reclamoCreado = await service(reclamo)
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

