import express from "express";
const usuarios = express.Router();

import {
    getUsuario,
    getAllUsuarios,
    createUsuario,
    loginUsuario,
} from "../controllers/usuariosController.js";
import { isAdministrador } from "../middleware/authProfile.js";

usuarios.get("/", isAdministrador, getAllUsuarios);
usuarios.get("/:idUsuario", isAdministrador, getUsuario);

usuarios.post("/register", isAdministrador, createUsuario);
usuarios.post("/login", loginUsuario);

export default usuarios;
