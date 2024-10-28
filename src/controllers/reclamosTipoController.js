import ReclamosTipoService from "../service/reclamosTipoService.js";

const reclamosTipoService = new ReclamosTipoService();

export default class ReclamosTipoController {
    getAllReclamosTipo = async (req, res) => {
        const reclamosTipo = await reclamosTipoService.getAllReclamosTipo();
        reclamosTipo;
    };
}
