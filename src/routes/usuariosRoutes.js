import express from "express";
import AuthProfile from "../middleware/authProfile.js";
import UsuariosController from "../controllers/usuariosController.js";
import ReclamosController from "../controllers/reclamosController.js";
import multer from "multer";
import { storage } from "../config/multer.js";

const usuarios = express.Router();

const usuariosController = new UsuariosController();
const reclamosController = new ReclamosController();
const auth = new AuthProfile();

const upload = multer({storage});

usuarios.get("/", auth.isAdministrador, usuariosController.getAllUsuarios);

usuarios.get("/mi-perfil", usuariosController.getUsuarioByPerfil);
usuarios.patch("/mi-perfil", upload.single('imagen'), auth.isCliente, usuariosController.updateClientePerfil);

usuarios.get("/empleados", auth.isAdministrador, usuariosController.getAllEmpleados);

usuarios.get("/:idUsuario", auth.isAdministrador, usuariosController.getUsuario);
usuarios.patch("/:idUsuario", auth.isEmpleadoOrAdministrador, usuariosController.updateUsuario);

usuarios.get("/:idUsuario/reclamos", auth.isEmpleadoOrAdministrador, reclamosController.getReclamosByIdCliente);

usuarios.post("/register", auth.isAdministrador, usuariosController.createUsuario);

export default usuarios;
