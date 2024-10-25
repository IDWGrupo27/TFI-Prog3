import express from "express";
const oficinas = express.Router();

import AuthProfile from "../middleware/authProfile.js";
import OficinasController from "../controllers/oficinasController.js";

const controller = new OficinasController();
const auth = new AuthProfile();

oficinas.get("/:idOficina", auth.isAdministrador, controller.getOficinaById);

export default oficinas;
