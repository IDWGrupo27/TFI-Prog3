import express from "express";
const reclamos = express.Router();
/*import {
    getAllReclamos,
    getReclamoById,
    getReclamosByClientId,
    deleteReclamoById,
} from "../../controllers/reclamosController.js";*/
import ReclamosController from "../../controllers/reclamosController.js";
import { isEmpleado } from "../../middleware/authProfile.js";

const reclamosController = new ReclamosController();

reclamos.get("/", isEmpleado, reclamosController.getAllReclamos);

reclamos.get("/cliente/:idCliente", isEmpleado, reclamosController.getReclamosByClientId);
reclamos.get("/:idReclamo", isEmpleado, reclamosController.getReclamoById);

reclamos.delete("/:idReclamo", isEmpleado, reclamosController.deleteReclamoById);

export default reclamos;
