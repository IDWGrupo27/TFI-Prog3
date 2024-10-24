import express from "express";
const reclamos = express.Router();

import ReclamosController from "../../controllers/reclamosController.js";
import { isCliente } from "../../middleware/authProfile.js";

const reclamosController = new ReclamosController()

reclamos.get("/", isCliente, reclamosController.getRequesterReclamos);
reclamos.post("/", isCliente, reclamosController.createReclamo);
reclamos.patch("/:idReclamo", isCliente, reclamosController.clienteUpdateReclamo);

export default reclamos;
