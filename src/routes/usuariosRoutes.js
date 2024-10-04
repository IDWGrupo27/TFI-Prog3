import express from "express";
import {
    getUsuario,
    getAllUsuarios,
    createUsuario,
    loginUsuario,
} from "../controllers/usuariosController.js";
import { isCliente } from "../middleware/authProfile.js";

const router = express.Router();

router.get("/", isCliente, getAllUsuarios);
router.get("/:idUsuario", isCliente, getUsuario);

router.post("/register", createUsuario);
router.post("/login", loginUsuario);

export default router;
