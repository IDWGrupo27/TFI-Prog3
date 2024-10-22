import { connection } from "./connection.js";

export default class UsuariosDatabase {
    // Sentencias que se repiten en varias consultas
    sqlUsuarioColumns =
        "usuarios.idUsuario, usuarios.nombre, usuarios.apellido, usuarios.correoElectronico, usuarios.activo, usuarios_tipo.descripcion AS tipo";
    sqlUsuarioJoinTipo =
        "INNER JOIN usuarios_tipo ON usuarios_tipo.idUsuarioTipo = usuarios.idTipoUsuario";

    getUsuarioById = async (idUsuario) => {
        const sql = `SELECT ${this.sqlUsuarioColumns} FROM usuarios ${this.sqlUsuarioJoinTipo} WHERE idUsuario = ?;`;
        const [usuarios] = await connection.query(sql, [idUsuario]);
        if (!usuarios || usuarios.length === 0) {
            return null;
        }
        return usuarios[0];
    };

    getUsuarioByEmail = async (email) => {
        const sql = `SELECT ${this.sqlUsuarioColumns} FROM usuarios ${this.sqlUsuarioJoinTipo} WHERE correoElectronico = ?;`;
        const [usuarios] = await connection.query(sql, [email]);
        if (!usuarios || usuarios.length === 0) {
            return null;
        }
        return usuarios[0];
    };

    getAllUsuarios = async (idUsuario) => {
        const sql = `SELECT ${this.sqlUsuarioColumns} FROM usuarios ${this.sqlUsuarioJoinTipo};`;
        const [usuarios] = await connection.query(sql, [idUsuario]);
        return usuarios;
    };

    createUsuario = async (usuario) => {
        try {
            const sqlNewUsuario = `INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idTipoUsuario) VALUES (?, ?, ?, ?, ?)`;
            const [result] = await connection.query(sqlNewUsuario, [
                usuario.nombre,
                usuario.apellido,
                usuario.correoElectronico,
                usuario.contrasenia,
                1,
            ]);
            return result;
        } catch (e) {
            console.log(e);
            return null;
        }
    };

    loginUsuario = async (data) => {
        const sql = `SELECT ${this.sqlUsuarioColumns} FROM usuarios ${this.sqlUsuarioJoinTipo} WHERE correoElectronico = ? AND contrasenia = ?;`;
        const [[usuario]] = await connection.query(sql, [
            data.correoElectronico,
            data.contrasenia,
        ]);
        return usuario ? usuario : null;
    };
}
