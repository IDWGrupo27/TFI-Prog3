import { connection } from "./connection.js";

export default class UsuariosDatabase {
    // Sentencias que se repiten en varias consultas
    sqlUsuarioColumns = "u.idUsuario, u.nombre, u.apellido, u.correoElectronico, u.activo, ut.descripcion AS tipo";
    sqlUsuarioJoinTipo = "INNER JOIN usuarios_tipo ut ON ut.idUsuarioTipo = u.idUsuarioTipo";
    sqlUsuarioJoinOficinas = "INNER JOIN usuarios_oficinas uo ON uo.idUsuario = u.idUsuario";

    getUsuarioById = async (idUsuario, inactivo = false) => {
        const sql = `SELECT ${this.sqlUsuarioColumns} FROM usuarios u ${this.sqlUsuarioJoinTipo} WHERE u.idUsuario = ?${
            inactivo ? "" : " AND u.activo = 1"
        }`;
        const [usuarios] = await connection.query(sql, [idUsuario]);
        if (!usuarios || usuarios.length === 0) {
            return null;
        }
        return usuarios[0];
    };

    getUsuarioByEmail = async (email) => {
        const sql = `SELECT ${this.sqlUsuarioColumns} FROM usuarios u ${this.sqlUsuarioJoinTipo} WHERE correoElectronico = ? AND u.activo = 1;`;
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

    getUsuariosByIdTipoEmpleado = async (idTipoEmpleado) => {
        const sql = `SELECT ${this.sqlUsuarioColumns} FROM usuarios u ${this.sqlUsuarioJoinTipo} WHERE idUsuarioTipo = ? AND u.activo = 1;`;
        const [usuarios] = await connection.query(sql, [idTipoEmpleado]);
        return usuarios;
    };

    getUsuariosByIdOficina = async (idOficina) => {
        const sql = `SELECT ${this.sqlUsuarioColumns} FROM usuarios u ${this.sqlUsuarioJoinTipo} ${this.sqlUsuarioJoinOficinas} WHERE uo.idOficina = ? AND uo.activo = 1;`;
        const [usuarios] = await connection.query(sql, [idOficina]);
        return usuarios;
    };

    createUsuario = async (usuarioData) => {
        const sqlNewUsuario = `INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo) 
                                VALUES (?, ?, ?, SHA2(?, 256), ?)`;
        const [result] = await connection.query(sqlNewUsuario, [
            usuarioData.nombre,
            usuarioData.apellido,
            usuarioData.correoElectronico,
            usuarioData.contrasenia,
            usuarioData.idUsuarioTipo,
        ]);
        return result;
    };

    updateUsuario = async (idUsuario, campos) => {
        let sqlUpdate = "UPDATE usuarios SET ";
        const updates = [];
        const values = [];
        for (const [key, value] of Object.entries(campos)) {
            updates.push(`${key} = ?`);
            values.push(value);
        }
        sqlUpdate += updates.join(", ");
        sqlUpdate += " WHERE idUsuario = ?";
        values.push(idUsuario);
        const [result] = await connection.query(sqlUpdate, values);
        return result;
    };

    constructor() {
        this.updateUsuario(14, { nombre: "pedro", apellido: "galati" });
    }

    updateUsuariosOficinasActivo = async (idUsuario, activo) => {
        const sqlDelete = "UPDATE usuarios_oficinas SET activo = ? WHERE idUsuario = ?";
        const [result] = await connection.query(sqlDelete, [activo, idUsuario]);
        return result;
    };

    loginUsuario = async (data) => {
        const sql = `SELECT ${this.sqlUsuarioColumns} 
                        FROM usuarios u ${this.sqlUsuarioJoinTipo} 
                        WHERE correoElectronico = ? AND contrasenia = SHA2(?, 256) AND u.activo = 1;`;
        const [[usuario]] = await connection.query(sql, [data.correoElectronico, data.contrasenia]);
        return usuario ? usuario : null;
    };

}
