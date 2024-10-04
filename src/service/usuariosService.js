import {
    getUsuarioById,
    getAllUsuarios,
    createUsuario,
    loginUsuario,
} from "../database/usuarios.js";

export const serviceGetUsuarioById = (idUsuario) => {
    return getUsuarioById(idUsuario);
};

export const serviceGetAllUsuarios = () => {
    return getAllUsuarios();
};

export const serviceCreateUsuario = (usuario) => {
    return createUsuario(usuario);
};

export const serviceLoginUsuario = (data) => {
    return loginUsuario(data);
};
