import {
    serviceGetUsuarioById,
    serviceGetAllUsuarios,
    serviceCreateUsuario,
    serviceLoginUsuario,
} from "../service/usuariosService.js";
import jwt from "jsonwebtoken";

export const getUsuario = async (req, res) => {
    if (!req.params.idUsuario) {
        return res.status(400).send({
            status: "FAILED",
            error: "El parámetro idUsuario no puede ser vacío",
        });
    }

    const usuario = await serviceGetUsuarioById(req.params.idUsuario);

    if (!usuario || usuario.length === 0) {
        return res.status(404).send({
            status: "FAILED",
            error: `No se encontró el usuario con id ${req.params.idUsuario}`,
        });
    }

    res.send({
        status: "OK",
        usuario,
    });
};

export const getAllUsuarios = async (req, res) => {
    const usuarios = await serviceGetAllUsuarios(req.params.idUsuario);

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
    const msgNuevoUsuario = await serviceCreateUsuario({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correoElectronico: req.body.correoElectronico,
        contrasenia: req.body.contrasenia,
    });

    res.send(msgNuevoUsuario);
};

export const loginUsuario = async (req, res) => {
    if (!req.body.correoElectronico || !req.body.contrasenia) {
        return res.status(400).send({
            status: "FAILED",
            message: "Se requiere 'correoElectronico' y 'contrasenia', ",
        });
    }

    serviceLoginUsuario({
        correoElectronico: req.body.correoElectronico,
        contrasenia: req.body.contrasenia,
    })
        .then((usuario) => {
            if (usuario) {
                const token = jwt.sign(
                    {
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
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                status: "FAILED",
                message: "Error del servidor",
            });
        });
};
