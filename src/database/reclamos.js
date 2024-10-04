import { connection } from "./connection.js";

// Sentencias que se repiten en varias consultas
const sqlReclamoColumns =
    "reclamos.idReclamo, reclamos.asunto, reclamos.descripcion, reclamos.fechaCreado, reclamos.fechaFinalizado, reclamos.fechaCancelado, reclamos.idUsuarioCreador, usuarios.nombre AS nombreUsuarioCreador, usuarios.Apellido AS apellidoUsuarioCreador, usuarios.correoElectronico AS correoUsuarioCreador, reclamostipo.descripcion AS tipoReclamo, reclamosestado.descripcion AS estadoReclamo";
const sqlReclamoJoinTipo =
    "INNER JOIN reclamostipo ON reclamos.idReclamoTipo = reclamostipo.idReclamoTipo";
const sqlReclamoJoinEstado =
    "INNER JOIN reclamosestado ON reclamos.idReclamoEstado = reclamosestado.idReclamoEstado";
const sqlReclamoJoinUsuarios =
    "INNER JOIN usuarios ON reclamos.idUsuarioCreador = usuarios.idUsuario";

export const getAllReclamos = async () => {
    const sql = `SELECT ${sqlReclamoColumns} FROM reclamos ${sqlReclamoJoinTipo} ${sqlReclamoJoinEstado} ${sqlReclamoJoinUsuarios};`;
    const [reclamos] = await connection.query(sql);
    return reclamos;
};

export const getReclamosByClientId = async (idCliente) => {
    const sql = `SELECT ${sqlReclamoColumns} FROM reclamos ${sqlReclamoJoinTipo} ${sqlReclamoJoinEstado} INNER JOIN usuarios ON reclamos.idUsuarioCreador = ?`;
    const [reclamoCliente] = await connection.query(sql, [idCliente]);
    return reclamoCliente;
};

export const getReclamoById = async (idReclamo) => {
    const sql = `SELECT ${sqlReclamoColumns} FROM reclamos ${sqlReclamoJoinTipo} ${sqlReclamoJoinEstado} ${sqlReclamoJoinUsuarios} WHERE reclamos.idReclamo = ?;`;
    const [reclamo] = await connection.query(sql, [idReclamo]);
    return reclamo;
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
    const [reclamoCreado] = await connection.query(sqlReclamo, [
        asunto,
        descripcion,
        fecha,
        1,
        idReclamoTipo,
        idUsuarioCreador,
    ]);

    return reclamoCreado;
};

export const deleteReclamoById = async (idReclamo) => {
    const sql = `DELETE FROM reclamos WHERE idReclamo = ?;`;
    const [data] = await connection.query(sql, [idReclamo]);
    return data;
};

export const updateReclamo = async (
    idCliente,
    { idReclamo, fechaCancelado, estado }
) => {
    const sqlActualizar = `UPDATE reclamos 
                            SET fechaCancelado = ?, idReclamoEstado = ? 
                            WHERE idReclamo = ? 
                            AND idUsuarioCreador = ?
                            AND idReclamoEstado = 1`;

    const [actualizado] = await connection.query(sqlActualizar, [
        fechaCancelado,
        estado,
        idReclamo,
        idCliente,
    ]);

    return actualizado;
};
