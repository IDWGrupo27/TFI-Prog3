import express from "express";
const usuarios = express.Router();

import AuthProfile from "../middleware/authProfile.js";
import UsuariosController from "../controllers/usuariosController.js";
import ReclamosController from "../controllers/reclamosController.js";

const usuariosController = new UsuariosController();
const reclamosController = new ReclamosController();
const auth = new AuthProfile();

usuarios.get("/mi-perfil", auth.isAuthenticated, usuariosController.getUsuarioByPerfil);

usuarios.get("/", auth.isAdministrador, usuariosController.getAllUsuarios);

usuarios.get("/:idUsuario", auth.isAdministrador, usuariosController.getUsuario);

usuarios.get("/:idUsuario/reclamos", auth.isEmpleadoOrAdministrador, reclamosController.getReclamosByIdCliente);

usuarios.post("/register", auth.isAdministrador, usuariosController.createUsuario);

usuarios.post("/login", usuariosController.loginUsuario);

export default usuarios;
