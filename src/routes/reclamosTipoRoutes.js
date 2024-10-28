import express from "express";
const reclamosTipo = express.Router();

import AuthProfile from "../middleware/authProfile.js";
import ReclamosTipoController from "../controllers/reclamosTipoController.js";

const auth = new AuthProfile();
const reclamosTipoController = new ReclamosTipoController();

reclamosTipo.get("/:idReclamosTipo", auth.isAdministrador, reclamosTipoController.getReclamosTipoById);
reclamosTipo.patch("/:idReclamosTipo", auth.isAdministrador, reclamosTipoController.updateReclamosTipoById);
reclamosTipo.delete("/:idReclamosTipo", auth.isAdministrador, reclamosTipoController.deleteReclamosTipoById);

reclamosTipo.get("/", auth.isAdministrador, reclamosTipoController.getAllReclamosTipo);
reclamosTipo.post("/", auth.isAdministrador, reclamosTipoController.createReclamosTipo);

export default reclamosTipo;
