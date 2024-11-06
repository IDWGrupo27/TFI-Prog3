import UsuariosService from "../service/usuariosService.js";
import jwt from "jsonwebtoken";
import passport from 'passport';
import dotenv from 'dotenv';

dotenv.config();

const usuariosService = new UsuariosService();

export default class UsuariosController {
    
    getUsuario = async (req, res) => {
        console.log("getUsuarios()")
        if (!req.params.idUsuario) {
            return res.status(400).send({
                status: "FAILED",
                error: "El parámetro idUsuario no puede ser vacío",
            });
        }

        const usuario = await usuariosService.getUsuarioById(req.params.idUsuario);
        if (usuario) {
            return res.send({
                status: "OK",
                usuario,
            });
        }

        res.status(404).send({
            status: "FAILED",
            error: `No se encontró el usuario con id ${req.params.idUsuario}`,
        });
    };

    getUsuarioByPerfil = async (req, res) => {
        const usuario = await usuariosService.getUsuarioById(req.user?.idUsuario);
        if (usuario) {
            return res.send({
                status: "OK",
                usuario,
            });
        }
    };

    getAllUsuarios = async (req, res) => {
        const usuarios = await usuariosService.getAllUsuarios();
        res.send({
            status: "OK",
            usuarios,
        });
    };

    getAllEmpleados = async (req, res) => {
        console.log("getAllEmpleados()")
        const usuarios = await usuariosService.getUsuariosByIdTipoEmpleado(2);
        res.send({
            status: "OK",
            usuarios,
        });
    };

    createUsuario = async (req, res) => {
        if (
            !req.body.nombre ||
            !req.body.apellido ||
            !req.body.correoElectronico ||
            !req.body.contrasenia ||
            !req.body.idTipoUsuario
        ) {
            return res.status(400).send({
                status: "FAILED",
                message: "Se requiere 'nombre', 'apellido', 'correoElectronico', 'contrasenia' y 'idTipoUsuario', ",
            });
        }

        const usuarioExistente = await usuariosService.getUsuarioByEmail(req.body.correoElectronico);

        if (usuarioExistente) {
            return res.status(400).send({
                status: "FAILED",
                message: "El correo ya está registrado",
            });
        } else {
            const usuario = await usuariosService.createUsuario({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                correoElectronico: req.body.correoElectronico,
                contrasenia: req.body.contrasenia,
                idTipoUsuario: req.body.idTipoUsuario,
            });

            if (usuario) {
                return res.send({
                    status: "OK",
                    usuario,
                });
            }

            return res.status(500).send({
                status: "FAILED",
                message: "Error al crear el usuario",
            });
        }
    };

    deleteUsuario = async (req, res) => {
        if (!req.params.idUsuario) {
            return res.status(400).send({ message: "Se requiere 'idUsuario'" });
        }
        const deleted = await usuariosService.deleteUsuario(req.params.idUsuario);
        if (deleted) {
            res.send({ status: "OK", deleted });
        } else {
            res.status(400).send({ status: "FAILED", message: "Error al eliminar el empleado" });
        }
    };

    updateUsuario = async (req, res) => {
        const updateObj = {};
        const camposPermitidos = ["nombre", "apellido", "correoElectronico", "activo", "idUsuarioTipo"];
        camposPermitidos.forEach((key) => {
            if (req.body[key] !== undefined && req.body[key] !== null) {
                updateObj[key] = req.body[key];
            }
        });
        if (!req.params.idUsuario || !Object.keys(updateObj).length) {
            return res.status(400).send({
                message:
                    "Se requiere 'idUsuario' y los campos opcionales a cambiar: {nombre, apellido, correoElectronico, activo, idUsuarioTipo}",
            });
        }

        const updatedUsuario = await usuariosService.updateUsuario(req.params.idUsuario, updateObj);

        if (updatedUsuario) {
            if (updatedUsuario.tipo.toUpperCase() === "EMPLEADO") {
                await usuariosService.updateUsuariosOficinasActivo(updatedUsuario.idUsuario, 0);
            }
            return res.send({ status: "OK", usuario: updatedUsuario });
        }

        res.status(400).send({ status: "FAILED", message: "Error al actualizar el usuario" });
    };

    updateClientePerfil = async (req, res) => {
        try{
            const idUsuario = req.user.idUsuario;

            if(idUsuario === undefined ){
                return res.status(400).send({
                    estado:"Falla",
                    mensaje: "Faltan datos obligatorios."    
                })
            }

            const imagen  = req.file ? req.file.filename : null;            
            const datos = { ...req.body, imagen}; 

            if (Object.keys(datos).length === 0) {
                return res.status(400).send({
                    estado:"Falla",
                    mensaje: "No se enviaron datos para ser modificados."    
                });
            }

            const usuarioModificado = await usuariosService.updatePerfilUsuario(idUsuario, datos);
            
            if (usuarioModificado.estado){
                res.status(200).send({estado:"OK", mensaje: usuarioModificado.mensaje});
            }else{
                res.status(404).send({estado:"Falla", mensaje: usuarioModificado.mensaje});
            }

        }catch (error){
            console.log(error)
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        }
    }

}
