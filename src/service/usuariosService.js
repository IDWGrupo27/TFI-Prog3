import {
    getUsuarioById,
    getAllUsuarios,
    createUsuario,
    loginUsuario,
} from "../database/usuarios.js";
import { Usuario } from "../model/Usuario.js";

export const serviceGetUsuarioById = async (idUsuario) => {
    var data = await getUsuarioById(idUsuario);
    if (!data) return null;
    var usuario = new Usuario(data);
    return usuario;
};

export const serviceGetAllUsuarios = async () => {
    /** @type {Usuario[]} */
    var usuarios = [];
    var data = await getAllUsuarios();
    data.forEach((u) => {
        usuarios.push(new Usuario(u));
    });
    return usuarios;
};

export const serviceCreateUsuario = (usuario) => {
    return createUsuario(usuario);
};

export const serviceLoginUsuario = (data) => {
    return loginUsuario(data);
};
