import express from "express";
import {
    createReclamo,
    getReclamoById,
    actualizaReclamoCliente,
    getAllReclamos,
    getReclamosByClientId,
    deleteReclamoById,
} from "../controllers/reclamosController.js";
import { isCliente } from "../middleware/authProfile.js";

const router = express.Router();

router.get("/reclamos", isCliente, getAllReclamos);
router.get("/reclamos/:idReclamo", isCliente, getReclamoById);
router.get("/reclamos/cliente/:idCliente", isCliente, getReclamosByClientId);

router.delete("/reclamos/:idReclamo", isCliente, deleteReclamoById);

router.post("/reclamos", isCliente, createReclamo);

router.patch("/reclamos/:idCliente", isCliente, actualizaReclamoCliente);

export default router;
