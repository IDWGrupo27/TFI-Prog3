import ReclamosTipoService from "../service/reclamosTipoService.js";

const reclamosTipoService = new ReclamosTipoService();

export default class ReclamosTipoController {
    getAllReclamosTipo = async (req, res) => {
        const reclamosTipo = await reclamosTipoService.getAllReclamosTipo();
        res.send({ status: "OK", reclamosTipo });
    };

    getReclamosTipoById = async (req, res) => {
        const id = req.params?.idReclamosTipo;
        if (!id) {
            return res.status(400).send({ message: "Debe ingresar un 'idReclamoTipo'" });
        }
        const reclamosTipo = await reclamosTipoService.getReclamosTipoById(id);
        if (!reclamosTipo) {
            return res.status(404).send({ status: "FAILED", message: "No se encontró el reclamosTipo" });
        }
        res.send({ status: "OK", reclamosTipo });
    };

    createReclamosTipo = async (req, res) => {
        if (req.body.descripcion) {
            const reclamosTipo = await reclamosTipoService.createReclamosTipo({
                descripcion: req.body.descripcion,
            });
            if (!reclamosTipo) {
                return res.status(400).send({ status: "FAILED", message: "No se pudo crear el reclamosTipo" });
            }
            return res.send({ status: "OK", reclamosTipo });
        }
        res.status(400).send({ message: "Debe ingresar 'descripcion'" });
    };

    deleteReclamosTipoById = async (req, res) => {
        const id = req.params?.idReclamosTipo;
        if (!id) {
            return res.status(400).send({ message: "Debe ingresar un 'idReclamoTipo'" });
        }
        const existingReclamosTipo = await reclamosTipoService.getReclamosTipoById(id);
        if (!existingReclamosTipo) {
            return res.status(404).send({ status: "FAILED", message: "No se encontró el reclamosTipo" });
        }
        const deleted = await reclamosTipoService.deleteReclamosTipoById(id);
        if (!deleted) {
            return res.status(400).send({ status: "FAILED", message: "No se pudo eliminar el reclamosTipo" });
        }
        res.send({ status: "OK", deleted });
    };

    updateReclamosTipoById = async (req, res) => {
        const id = req.params?.idReclamosTipo;
        const descripcion = req.body?.descripcion;
        const activo = req.body?.activo;
        if (!id || !descripcion || typeof activo === "undefined") {
            return res.status(400).send({ message: "Debe ingresar un 'idReclamoTipo', y { 'descripcion', 'activo' }" });
        }
        const existingReclamosTipo = await reclamosTipoService.getReclamosTipoById(id);
        if (!existingReclamosTipo) {
            return res.status(404).send({ status: "FAILED", message: "No se encontró el reclamosTipo" });
        }

        const updated = await reclamosTipoService.updateReclamosTipoById(id, { descripcion, activo });
        if (!updated) {
            return res.status(400).send({ status: "FAILED", message: "No se pudo actualizar el reclamosTipo" });
        }

        res.send({ status: "OK", reclamosTipo: updated });
    };
}
