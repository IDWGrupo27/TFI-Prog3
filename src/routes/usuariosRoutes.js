import express from "express";
const usuarios = express.Router();

import {
    getUsuario,
    getAllUsuarios,
    createUsuario,
    loginUsuario,
} from "../controllers/usuariosController.js";
import AuthProfile from "../middleware/authProfile.js";

const auth = new AuthProfile();

usuarios.get("/", auth.isAdministrador, getAllUsuarios);
usuarios.get("/:idUsuario", auth.isAdministrador, getUsuario);

usuarios.post("/register", auth.isAdministrador, createUsuario);
usuarios.post("/login", loginUsuario);

export default usuarios;
