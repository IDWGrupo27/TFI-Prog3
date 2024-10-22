import { connection } from "./connection.js";

// Sentencias que se repiten en varias consultas
const sqlReclamoColumns = `r.idReclamo, 
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

const sqlReclamoJoinUsuarios =
    "INNER JOIN usuarios u ON r.idUsuarioCreador = u.idUsuario";
const sqlReclamoJoinTipo =
    "INNER JOIN reclamos_tipo rt ON r.idReclamoTipo = rt.idReclamosTipo";
const sqlReclamoJoinEstado =
    "INNER JOIN reclamos_estado re ON r.idReclamoEstado = re.idReclamosEstado";

export const getAllReclamos = async () => {
    const sql = `SELECT ${sqlReclamoColumns} FROM reclamos r ${sqlReclamoJoinUsuarios} ${sqlReclamoJoinEstado} ${sqlReclamoJoinTipo};`;
    const [reclamos] = await connection.query(sql);
    return reclamos;
};

export const getReclamosByClientId = async (idCliente) => {
    const sql = `SELECT ${sqlReclamoColumns} FROM reclamos r INNER JOIN usuarios u ON r.idUsuarioCreador = u.idUsuario ${sqlReclamoJoinTipo} ${sqlReclamoJoinEstado} WHERE u.idUsuario = ?`;
    const [reclamosCliente] = await connection.query(sql, [idCliente]);
    return reclamosCliente;
};

export const getReclamoById = async (idReclamo) => {
    const sql = `SELECT ${sqlReclamoColumns} FROM reclamos r ${sqlReclamoJoinUsuarios} ${sqlReclamoJoinEstado} ${sqlReclamoJoinTipo} WHERE r.idReclamo = ?;`;
    const [reclamos] = await connection.query(sql, [idReclamo]);
    return reclamos[0] ? reclamos[0] : null;
};

export const createReclamo = async ({
    idUsuarioCreador,
    idReclamoTipo,
    asunto,
    descripcion,
    fecha,
}) => {
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

export const deleteReclamoById = async (idReclamo) => {
    const sql = `DELETE FROM reclamos WHERE idReclamo = ?;`;
    const [data] = await connection.query(sql, [idReclamo]);
    return data;
};

export const updateReclamo = async ({
    idReclamo,
    idCliente,
    fechaCancelado,
    idReclamoEstado,
}) => {
    const sqlActualizar = `UPDATE reclamos 
                            SET fechaCancelado = ?, idReclamoEstado = ? 
                            WHERE idReclamo = ? 
                            AND idUsuarioCreador = ?
                            AND idReclamoEstado = 1`;

    const [result] = await connection.query(sqlActualizar, [
        fechaCancelado,
        idReclamoEstado,
        idReclamo,
        idCliente,
    ]);
    return result;
};
