import express from "express";
const reclamos = express.Router();

import AuthProfile from "../middleware/authProfile.js";
import ReclamosController from "../controllers/reclamosController.js";

const auth = new AuthProfile();
const controller = new ReclamosController();

reclamos.get("/", auth.isEmpleadoOrAdministrador, controller.getAllReclamos);
reclamos.get("/cliente/:idCliente", auth.isEmpleadoOrAdministrador, controller.getReclamosByClientId);
reclamos.get("/mis-reclamos", auth.isCliente, controller.getReclamosByPerfil);

reclamos.post("/", auth.isCliente, controller.createReclamo);
reclamos.get("/:idReclamo", auth.isCliente, controller.getReclamoById);
reclamos.patch("/cancelar/:idReclamo", auth.isCliente, controller.cancelarReclamo);
reclamos.delete("/:idReclamo", auth.isEmpleadoOrAdministrador, controller.deleteReclamoById);

export default reclamos;
