import express from "express";
import {
    createReclamos,
    getReclamoById,
    actualizaReclamoCliente,
    getAllReclamos,
    getReclamosByClientId,
} from "../controllers/reclamosController.js";
import { isCliente } from "../middleware/authProfile.js";

const router = express.Router();

router.get("/reclamos", isCliente, getAllReclamos);
router.get("/reclamos/:idReclamo", isCliente, getReclamoById);
router.get("/reclamos/cliente/:idCliente", isCliente, getReclamosByClientId);

router.post("/reclamos/:idCliente", isCliente, createReclamos);

router.patch("/reclamos/:idCliente", isCliente, actualizaReclamoCliente);

export default router;
