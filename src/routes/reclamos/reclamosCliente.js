import express from "express";
const reclamos = express.Router();

import {
    getRequesterReclamos,
    createReclamo,
    clienteUpdateReclamo,
} from "../../controllers/reclamosController.js";
import { isCliente } from "../../middleware/authProfile.js";

reclamos.get("/", isCliente, getRequesterReclamos);
reclamos.post("/", isCliente, createReclamo);
reclamos.patch("/:idReclamo", isCliente, clienteUpdateReclamo);

export default reclamos;
