import express from "express";
const usuarios = express.Router();

import AuthProfile from "../middleware/authProfile.js";
import UsuariosController from "../controllers/usuariosController.js";
import ReclamosController from "../controllers/reclamosController.js";

const usuariosController = new UsuariosController();
const reclamosController = new ReclamosController();
const auth = new AuthProfile();

usuarios.get("/", auth.isAdministrador, usuariosController.getAllUsuarios);

usuarios.get("/mi-perfil", auth.isAuthenticated, usuariosController.getUsuarioByPerfil);
usuarios.patch("/mi-perfil", auth.isCliente, usuariosController.updateClientePerfil);

usuarios.get("/:idUsuario", auth.isAdministrador, usuariosController.getUsuario);
usuarios.patch("/:idUsuario", auth.isAdministrador, usuariosController.updateUsuario);

usuarios.get("/:idUsuario/reclamos", auth.isEmpleadoOrAdministrador, reclamosController.getReclamosByIdCliente);

usuarios.post("/register", auth.isAdministrador, usuariosController.createUsuario);

usuarios.post("/login", usuariosController.loginUsuario);

usuarios.get("/empleados", auth.isAdministrador, usuariosController.getAllEmpleados);

export default usuarios;
