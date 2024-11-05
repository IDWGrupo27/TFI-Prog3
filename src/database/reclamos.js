import { connection } from "./connection.js";

export default class ReclamosDatabase {
    sqlReclamoColumns = `r.idReclamo, 
    r.asunto, 
    r.descripcion, 
    r.fechaCreado, 
    r.fechaFinalizado, 
    r.fechaCancelado, 
    r.idUsuarioCreador, 
    u.nombre AS nombreUsuarioCreador, 
    u.Apellido AS apellidoUsuarioCreador, 
    u.correoElectronico AS correoUsuarioCreador, 
    rt.descripcion AS tipoReclamo,
    re.descripcion AS estadoReclamo`;
    sqlReclamoJoinUsuarios = "INNER JOIN usuarios u ON r.idUsuarioCreador = u.idUsuario";
    sqlReclamoJoinEstado = "INNER JOIN reclamos_estado re ON r.idReclamoEstado = re.idReclamoEstado";
    sqlReclamoJoinTipo = "INNER JOIN reclamos_tipo rt ON r.idReclamoTipo = rt.idReclamosTipo";

    getAllReclamos = async () => {
        const sql = `SELECT ${this.sqlReclamoColumns} FROM reclamos r ${this.sqlReclamoJoinUsuarios} ${this.sqlReclamoJoinEstado} ${this.sqlReclamoJoinTipo};`;
        const [reclamos] = await connection.query(sql);
        return reclamos;
    };

    getReclamosByIdCliente = async (idCliente) => {
        console.log(idCliente)
        const sql = `SELECT ${this.sqlReclamoColumns} 
                        FROM reclamos r ${this.sqlReclamoJoinUsuarios} ${this.sqlReclamoJoinTipo} ${this.sqlReclamoJoinEstado} 
                        WHERE u.idUsuario = ?`;
        const [reclamosCliente] = await connection.query(sql, [idCliente]);
        return reclamosCliente;
    };

    getReclamosByIdOficina = async (idOficina) => {
        const sqlReclamoTipoData = `SELECT idReclamoTipo FROM oficinas o WHERE o.idOficina = ? AND o.activo = 1`;
        const [idReclamoTipoData] = await connection.query(sqlReclamoTipoData, [idOficina]);
        if (!idReclamoTipoData[0]) return [];
        const { idReclamoTipo } = idReclamoTipoData[0];

        const sqlReclamosOficina = `SELECT ${this.sqlReclamoColumns} FROM reclamos r ${this.sqlReclamoJoinUsuarios} ${this.sqlReclamoJoinTipo} ${this.sqlReclamoJoinEstado} WHERE r.idReclamoTipo = ?`;
        const [reclamosOficina] = await connection.query(sqlReclamosOficina, [idReclamoTipo]);
        return reclamosOficina;
    };

    getReclamoById = async (idReclamo) => {
        const sql = `SELECT ${this.sqlReclamoColumns} FROM reclamos r ${this.sqlReclamoJoinUsuarios} ${this.sqlReclamoJoinEstado} ${this.sqlReclamoJoinTipo} WHERE r.idReclamo = ?;`;
        const [reclamos] = await connection.query(sql, [idReclamo]);
        return reclamos[0] ? reclamos[0] : null;
    };

    createReclamo = async ({ idUsuarioCreador, idReclamoTipo, asunto, descripcion, fecha }) => {
        const sqlReclamo = `INSERT INTO reclamos (asunto, descripcion, fechaCreado, idReclamoEstado, 
                            idReclamoTipo, idUsuarioCreador) VALUES (?, ?, ?, ?, ?, ?)`;
        const [result] = await connection.query(sqlReclamo, [
            asunto,
            descripcion,
            fecha,
            1,
            idReclamoTipo,
            idUsuarioCreador,
        ]);

        return result;
    };

    deleteReclamoById = async (idReclamo) => {
        const sql = `DELETE FROM reclamos WHERE idReclamo = ?;`;
        const [data] = await connection.query(sql, [idReclamo]);
        return data;
    };

    updateReclamo = async (idReclamo, { fechaFinalizado = null, fechaCancelado = null, idReclamoEstado }) => {
        const sqlFechaFinalizado = fechaFinalizado
            ? `fechaFinalizado = "${fechaFinalizado}",`
            : `fechaFinalizado = ${null},`;
        const sqlFechaCancelado = fechaCancelado
            ? `fechaCancelado = "${fechaCancelado}",`
            : `fechaCancelado = ${null},`;
        const sqlActualizar = `UPDATE reclamos SET ${sqlFechaFinalizado} ${sqlFechaCancelado} idReclamoEstado = ${idReclamoEstado} WHERE idReclamo = ${idReclamo}`;

        const [result] = await connection.query(sqlActualizar);
        return result;
    };
}
