import express from "express";
const usuarios = express.Router();
  
import { isAdministrador } from "../middleware/authProfile.js";
import  UsuariosController from "../controllers/usuariosController.js";

const usuariosController = new UsuariosController()

usuarios.get("/", isAdministrador, usuariosController.getAllUsuarios);
usuarios.get("/:idUsuario", isAdministrador, usuariosController.getUsuario);

usuarios.post("/register", isAdministrador, usuariosController.createUsuario);
usuarios.post("/login", usuariosController.loginUsuario);

export default usuarios;
