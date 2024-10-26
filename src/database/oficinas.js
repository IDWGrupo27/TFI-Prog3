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
