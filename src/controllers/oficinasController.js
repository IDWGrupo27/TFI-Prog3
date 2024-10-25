import OficinasService from "../service/oficinasService.js";

const oficinasService = new OficinasService();

export default class OficinasController {
    getOficinaById = async (req, res) => {
        if (!req.params.idOficina) {
            return res.status(400).send({
                status: "FAILED",
                error: "El parámetro idOficina no puede ser vacío",
            });
        }

        const oficina = await oficinasService.getOficinaById(req.params.idOficina);
        if (oficina) {
            return res.send({
                status: "OK",
                oficina,
            });
        }

        res.status(404).send({
            status: "FAILED",
            error: `No se encontró la oficina con id ${req.params.idOficina}`,
        });
    };
}
