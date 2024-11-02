import { connection } from "./connection.js";

export default class UsuariosDatabase {
    // Sentencias que se repiten en varias consultas
    sqlUsuarioColumns = "u.idUsuario, u.nombre, u.apellido, u.correoElectronico, u.activo, ut.descripcion AS tipo";
    sqlUsuarioJoinTipo = "INNER JOIN usuarios_tipo ut ON ut.idUsuarioTipo = u.idTipoUsuario";

    getUsuarioById = async (idUsuario) => {
        const sql = `SELECT ${this.sqlUsuarioColumns} FROM usuarios u ${this.sqlUsuarioJoinTipo} WHERE u.idUsuario = ? AND u.activo = 1;`;
        const [usuarios] = await connection.query(sql, [idUsuario]);
        if (!usuarios || usuarios.length === 0) {
            return null;
        }
        return usuarios[0];
    };

    getUsuarioByEmail = async (email) => {
        const sql = `SELECT ${this.sqlUsuarioColumns} FROM usuarios u ${this.sqlUsuarioJoinTipo} WHERE correoElectronico = ?;`;
        const [usuarios] = await connection.query(sql, [email]);
        if (!usuarios || usuarios.length === 0) {
            return null;
        }
        return usuarios[0];
    };

    getAllUsuarios = async (idUsuario) => {
        const sql = `SELECT ${this.sqlUsuarioColumns} FROM usuarios u ${this.sqlUsuarioJoinTipo};`;
        const [usuarios] = await connection.query(sql, [idUsuario]);
        return usuarios;
    };

    getUsuariosByIdOficina = async (idOficina) => {
        const sql = `SELECT ${this.sqlUsuarioColumns} FROM usuarios u ${this.sqlUsuarioJoinTipo} WHERE idOficina = ?;`;
        const [usuarios] = await connection.query(sql, [idOficina]);
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
            console.error(e);
            return null;
        }
    };

    loginUsuario = async (data) => {
        const sql = `SELECT ${this.sqlUsuarioColumns} FROM usuarios ${this.sqlUsuarioJoinTipo} WHERE correoElectronico = ? AND contrasenia = ?;`;
        const [[usuario]] = await connection.query(sql, [data.correoElectronico, data.contrasenia]);
        return usuario ? usuario : null;
    };
}
