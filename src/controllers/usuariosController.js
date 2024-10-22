import UsuariosService from "../service/usuariosService.js";
import jwt from "jsonwebtoken";

const usuariosService = new UsuariosService();

export const getUsuario = async (req, res) => {
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

export const getAllUsuarios = async (req, res) => {
    const usuarios = await usuariosService.getAllUsuarios();
    res.send({
        status: "OK",
        usuarios,
    });
};

export const createUsuario = async (req, res) => {
    if (
        !req.body.nombre ||
        !req.body.apellido ||
        !req.body.correoElectronico ||
        !req.body.contrasenia
    ) {
        return res.status(400).send({
            status: "FAILED",
            message:
                "Se requiere 'nombre', 'apellido', 'correoElectronico' y 'contrasenia', ",
        });
    }

    const usuarioExistente = await usuariosService.getUsuarioByEmail(
        req.body.correoElectronico
    );

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

export const loginUsuario = async (req, res) => {
    if (!req.body.correoElectronico || !req.body.contrasenia) {
        return res.status(400).send({
            status: "FAILED",
            message: "Se requiere 'correoElectronico' y 'contrasenia', ",
        });
    }
    try {
        const usuario = usuariosService.loginUsuario({
            correoElectronico: req.body.correoElectronico,
            contrasenia: req.body.contrasenia,
        });
        if (usuario) {
            const token = jwt.sign(
                {
                    idUsuario: usuario.idUsuario,
                    correoElectronico: usuario.correoElectronico,
                    tipo: usuario.tipo,
                },
                process.env.TOKEN_SECRET,
                {
                    expiresIn: "2h",
                }
            );
            res.send({ status: "OK", usuario, token });
        } else {
            res.status(403).send({
                status: "FAILED",
                message: "Usuario o contraseña incorrectos",
            });
        }
    } catch (error) {
        console.error(err);
        res.status(500).send({
            status: "FAILED",
            message: "Error del servidor",
        });
    }
};
