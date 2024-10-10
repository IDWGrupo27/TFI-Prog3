import express from "express";
const reclamos = express.Router();
import {
    getAllReclamos,
    getReclamoById,
    getReclamosByClientId,
    deleteReclamoById,
} from "../../controllers/reclamosController.js";
import { isEmpleado } from "../../middleware/authProfile.js";

reclamos.get("/", isEmpleado, getAllReclamos);
reclamos.get("/cliente/:idCliente", isEmpleado, getReclamosByClientId);
reclamos.get("/:idReclamo", isEmpleado, getReclamoById);

reclamos.delete("/:idReclamo", isEmpleado, deleteReclamoById);

export default reclamos;
