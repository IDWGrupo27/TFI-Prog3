import { connection } from "./connection.js";

export default class OficinasDatabase {
    // Sentencias que se repiten en varias consultas
    sqlOficinasColumns = "o.idOficina, o.nombre, o.activo, rt.descripcion AS reclamoTipo";
    sqlOficinaJoinTipo = "INNER JOIN reclamos_tipo rt ON o.idReclamoTipo = rt.idReclamosTipo";

    getOficinaById = async (idOficina) => {
        const sql = `SELECT ${this.sqlOficinasColumns} FROM oficinas o ${this.sqlOficinaJoinTipo} WHERE idOficina = ?;`;
        const [oficinas] = await connection.query(sql, [idOficina]);
        if (!oficinas || oficinas.length === 0) {
            return null;
        }
        return oficinas[0];
    };

    getAllOficina = async() => {
        const sql = `SELECT ${this.sqlOficinasColumns} FROM oficinas WHERE activo = 1;`;
        const [oficinas] = await connection.query(sql);
        return oficinas
    };

    createOficina = async(nombre, idTipoReclamo) => {
        const sql = `INSERT INTO oficinas (nombre, idReclamoTipo, activo) VALUES (?, ?, ?)`;
        const [oficinaNueva] = await connection.query(sql, [nombre, idTipoReclamo, 1]);
        return oficinaNueva; 
    };

    updateOficina = async(idOficina, datos) => {
        const sql = `UPDATE oficinas SET ? WHERE idOficina = ?`;
        const [oficinaModificada] = await connection.query(sql, [datos, idOficina]);
        return oficinaModificada
    }

    getOficinaByIdUsuario = async (idUsuario) => {
        const sql = `SELECT idOficina FROM usuarios_oficinas WHERE idUsuario = ?;`;
        const [data] = await connection.query(sql, [idUsuario]);
        if (!data || data.length === 0) {
            return null;
        }
        const oficinaData = await this.getOficinaById(data[0].idOficina);
        return oficinaData;
    };

    getOficinaByIdReclamo = async (idReclamo) => {
        const sql = `SELECT o.idOficina FROM oficinas o INNER JOIN reclamos r ON o.idReclamoTipo = r.idReclamoTipo WHERE r.idReclamo = ?;`;
        const [data] = await connection.query(sql, [idReclamo]);
        if (!data || data.length === 0) {
            return null;
        }
        const oficinaData = await this.getOficinaById(data[0].idOficina);
        return oficinaData;
    };
}
