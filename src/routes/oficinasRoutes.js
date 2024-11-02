import express from "express";
const oficinas = express.Router();

import AuthProfile from "../middleware/authProfile.js";
import OficinasController from "../controllers/oficinasController.js";
import ReclamosController from "../controllers/reclamosController.js";

const oficinasController = new OficinasController();
const reclamosController = new ReclamosController();
const auth = new AuthProfile();

// deberia ser Administrador
oficinas.get("/", auth.isAdministrador, oficinasController.getAllOficinas);
oficinas.get("/:idOficina", auth.isAdministrador, oficinasController.getOficinaById);
oficinas.post("/", auth.isAdministrador, oficinasController.createOficina);
oficinas.patch("/:idOficina", auth.isAdministrador, oficinasController.updateOficina);
oficinas.patch("/eliminar/:idOficina", auth.isAdministrador, oficinasController.deleteOficina);

oficinas.post("/agregar-empleados", auth.isAdministrador, oficinasController.agregarEmpleados);
oficinas.post("/quitar-empleados", auth.isAdministrador, oficinasController.quitarEmpleados);

oficinas.get("/:idOficina/reclamos", auth.isEmpleadoOrAdministrador, reclamosController.getReclamosByIdOficina);

export default oficinas;
