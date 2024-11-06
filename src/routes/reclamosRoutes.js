import express from "express";
const reclamos = express.Router();

import AuthProfile from "../middleware/authProfile.js";
import ReclamosController from "../controllers/reclamosController.js";

const auth = new AuthProfile();
const reclamosController = new ReclamosController();

reclamos.get("/informes", auth.isAdministrador, reclamosController.getInforme);
reclamos.get("/estadistica", auth.isAdministrador, reclamosController.getEstadistica);

reclamos.get("/", auth.isEmpleadoOrAdministrador, reclamosController.getAllReclamos);
reclamos.post("/", auth.isCliente, reclamosController.createReclamo);

reclamos.get("/mis-reclamos", auth.isCliente, reclamosController.getReclamosByPerfil);

reclamos.get("/:idReclamo", reclamosController.getReclamoById);
reclamos.patch("/:idReclamo", reclamosController.updateReclamo);

export default reclamos;
