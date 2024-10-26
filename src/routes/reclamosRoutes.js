import express from "express";
const reclamos = express.Router();

import AuthProfile from "../middleware/authProfile.js";
import ReclamosController from "../controllers/reclamosController.js";

const auth = new AuthProfile();
const reclamosController = new ReclamosController();

reclamos.get("/", auth.isEmpleadoOrAdministrador, reclamosController.getAllReclamos);
reclamos.post("/", auth.isCliente, reclamosController.createReclamo);

reclamos.get("/mis-reclamos", auth.isCliente, reclamosController.getReclamosByPerfil);

reclamos.get("/:idReclamo", auth.isAuthenticated, reclamosController.getReclamoById);
reclamos.patch("/:idReclamo", auth.isAuthenticated, reclamosController.updateReclamo);
reclamos.delete("/:idReclamo", auth.isAdministrador, reclamosController.deleteReclamoById);

export default reclamos;
