import express from "express";
const usuarios = express.Router();

import AuthProfile from "../middleware/authProfile.js";
import UsuariosController from "../controllers/usuariosController.js";

const controller = new UsuariosController();
const auth = new AuthProfile();

usuarios.get("/mi-perfil", auth.isAuthenticated, controller.getUsuarioByPerfil);

usuarios.get("/", auth.isAdministrador, controller.getAllUsuarios);
usuarios.get("/:idUsuario", auth.isAdministrador, controller.getUsuario);

usuarios.post("/register", auth.isAdministrador, controller.createUsuario);
usuarios.post("/login", controller.loginUsuario);

export default usuarios;
