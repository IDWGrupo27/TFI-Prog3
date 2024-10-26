import express from "express";
const oficinas = express.Router();

import AuthProfile from "../middleware/authProfile.js";
import OficinasController from "../controllers/oficinasController.js";
import ReclamosController from "../controllers/reclamosController.js";

const oficinasController = new OficinasController();
const reclamosController = new ReclamosController();
const auth = new AuthProfile();

oficinas.get("/:idOficina", auth.isEmpleadoOrAdministrador, oficinasController.getOficinaById);
oficinas.get("/:idOficina/reclamos", auth.isEmpleadoOrAdministrador, reclamosController.getReclamosByIdOficina);

export default oficinas;
