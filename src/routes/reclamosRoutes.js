import express from "express";
import {
    getReclamoById,
    getAllReclamos,
    getReclamosByClientId,
    createReclamo,
    deleteReclamoById,
    actualizaReclamoCliente,
} from "../controllers/reclamosController.js";
import { isCliente, isEmpleado } from "../middleware/authProfile.js";

const router = express.Router();

router.get("/", isEmpleado, getAllReclamos);
router.get("/:idReclamo", isEmpleado, getReclamoById);
router.get("/cliente/:idCliente", isCliente, getReclamosByClientId);

router.post("/", isCliente, createReclamo);

router.delete("/:idReclamo", isEmpleado, deleteReclamoById);

export default router;
