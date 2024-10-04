import express from "express";
import {
    getReclamoById,
    getAllReclamos,
    getReclamosByClientId,
    createReclamo,
    deleteReclamoById,
    actualizaReclamoCliente,
} from "../controllers/reclamosController.js";
import { isCliente } from "../middleware/authProfile.js";

const router = express.Router();

router.get("/", isCliente, getAllReclamos);
router.get("/:idReclamo", isCliente, getReclamoById);
router.get("/cliente/:idCliente", isCliente, getReclamosByClientId);

router.post("/", isCliente, createReclamo);

router.delete("/:idReclamo", isCliente, deleteReclamoById);

router.patch("/:idCliente", isCliente, actualizaReclamoCliente);

export default router;
