import express from "express";
import {
    getUsuario,
    getAllUsuarios,
    createUsuario,
    loginUsuario,
} from "../controllers/usuariosController.js";
import { isEmpleado } from "../middleware/authProfile.js";

const usuarios = express.Router();

usuarios.get("/", isEmpleado, getAllUsuarios);
usuarios.get("/:idUsuario", isEmpleado, getUsuario);

usuarios.post("/register", createUsuario);
usuarios.post("/login", loginUsuario);

export default usuarios;
