import express from "express";
const reclamosTipo = express.Router();

import AuthProfile from "../middleware/authProfile.js";
import ReclamosTipoController from "../controllers/reclamosTipoController.js";

const auth = new AuthProfile();
const reclamosTipoController = new ReclamosTipoController();

reclamosTipo.get("/", auth.isEmpleadoOrAdministrador, reclamosTipoController.getAllReclamosTipo);

export default reclamosTipo;
