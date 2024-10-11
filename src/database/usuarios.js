import { connection } from "./connection.js";

// Sentencias que se repiten en varias consultas
const sqlUsuarioColumns =
    "usuarios.idUsuario, usuarios.nombre, usuarios.apellido, usuarios.correoElectronico, usuarios.activo, usuarios_tipo.descripcion AS tipo";
const sqlUsuarioJoinTipo =
    "INNER JOIN usuarios_tipo ON usuarios_tipo.idUsuarioTipo = usuarios.idUsuarioTipo";

export const getUsuarioById = async (idUsuario) => {
    const sql = `SELECT ${sqlUsuarioColumns} FROM usuarios ${sqlUsuarioJoinTipo} WHERE idUsuario = ?;`;
    const [usuarios] = await connection.query(sql, [idUsuario]);
    if (!usuarios || usuarios.length === 0) {
        return null;
    }
    return usuarios[0];
};

export const getAllUsuarios = async (idUsuario) => {
    const sql = `SELECT ${sqlUsuarioColumns} FROM usuarios ${sqlUsuarioJoinTipo};`;
    const [usuarios] = await connection.query(sql, [idUsuario]);
    return usuarios;
};

export const createUsuario = async (usuario) => {
    const sqlCheckUsuario = `SELECT idUsuario FROM usuarios WHERE correoElectronico = ?;`;
    const [usuarios] = await connection.query(sqlCheckUsuario, [
        usuario.correoElectronico,
    ]);

    if (usuarios[0]) {
        return {
            status: "EMAIL",
            message: "El correo electrónico ya está registrado",
        };
    }

    try {
        const sqlNewUsuario = `INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idTipoUsuario) VALUES (?, ?, ?, ?, ?)`;
        const [newUsuario] = await connection.query(sqlNewUsuario, [
            usuario.nombre,
            usuario.apellido,
            usuario.correoElectronico,
            usuario.contrasenia,
            1,
        ]);
        return {
            status: "OK",
            message: "Se registró al usuario",
            idNuevoUsuario: newUsuario.insertId,
        };
    } catch (e) {
        console.log(e);
        return {
            status: "FAILED",
            message: "Error en el servidor al crear el nuevo usuario",
        };
    }
};

export const loginUsuario = async (data) => {
    const sql = `SELECT ${sqlUsuarioColumns} FROM usuarios ${sqlUsuarioJoinTipo} WHERE correoElectronico = ? AND contrasenia = ?;`;
    const [[usuario]] = await connection.query(sql, [
        data.correoElectronico,
        data.contrasenia,
    ]);

    return usuario ? usuario : null;
};
