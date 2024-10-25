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
}
