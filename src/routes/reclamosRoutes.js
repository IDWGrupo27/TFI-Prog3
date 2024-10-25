import express from "express";
const reclamos = express.Router();

import {
    createReclamo,
    clienteUpdateReclamo,
    getAllReclamos,
    getReclamosByClientId,
    getReclamoById,
    deleteReclamoById,
} from "../controllers/reclamosController.js";
import AuthProfile from "../middleware/authProfile.js";

const auth = new AuthProfile();

reclamos.get("/", auth.isEmpleadoOrAdministrador, getAllReclamos);

reclamos.get("/cliente/:idCliente", auth.isEmpleado, getReclamosByClientId);

reclamos.post("/", auth.isCliente, createReclamo);
reclamos.get("/:idReclamo", auth.isCliente, getReclamoById);
reclamos.patch("/:idReclamo", auth.isCliente, clienteUpdateReclamo);
reclamos.delete("/:idReclamo", auth.isEmpleado, deleteReclamoById);

export default reclamos;
