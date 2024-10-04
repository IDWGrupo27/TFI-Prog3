import { connection } from "./connection.js";

// Columnas que se repiten en varias consultas
const sqlReclamoColumns =
    "reclamos.idReclamo, reclamos.asunto, reclamos.descripcion, reclamos.fechaCreado, reclamos.fechaFinalizado, reclamos.fechaCancelado, reclamos.idUsuarioCreador, usuarios.nombre AS nombreUsuarioCreador, usuarios.Apellido AS apellidoUsuarioCreador, usuarios.correoElectronico AS correoUsuarioCreador, reclamostipo.descripcion AS tipoReclamo";

export const create = async ({ usuario, asunto, fecha, estado, tipo }) => {
    const sqlUsuario =
        "SELECT idUsuario FROM usuarios WHERE correoElectronico = ?;";
    const [idUsuario] = await connection.query(sqlUsuario, [usuario]);
    const idUsuarioCreador = idUsuario[0].idUsuario;

    const sqlReclamo = `INSERT INTO reclamos (asunto, fechaCreado, idReclamoEstado, 
                        idReclamoTipo, idUsuarioCreador) VALUES (?, ?, ?, ?, ?)`;
    const [reclamoCreado] = await connection.query(sqlReclamo, [
        asunto,
        fecha,
        estado,
        tipo,
        idUsuarioCreador,
    ]);

    return reclamoCreado;
};

export const getAllReclamos = async () => {
    const sqlAllReclamos = `SELECT ${sqlReclamoColumns} FROM reclamos INNER JOIN usuarios ON reclamos.idUsuarioCreador = usuarios.idUsuario INNER JOIN reclamostipo ON reclamos.idReclamoTipo = reclamostipo.idReclamoTipo;`;
    const [reclamos] = await connection.query(sqlAllReclamos);
    return reclamos;
};

export const getReclamosByClientId = async (idCliente) => {
    const sqlReclamos = `SELECT ${sqlReclamoColumns} FROM reclamos INNER JOIN usuarios ON reclamos.idUsuarioCreador = ? INNER JOIN reclamostipo ON reclamos.idReclamoTipo = reclamostipo.idReclamoTipo;`;
    const [reclamoCliente] = await connection.query(sqlReclamos, [idCliente]);
    return reclamoCliente;
};

export const getReclamoById = async (idReclamo) => {
    const sqlReclamo = `SELECT ${sqlReclamoColumns} FROM reclamos INNER JOIN usuarios ON reclamos.idUsuarioCreador = usuarios.idUsuario INNER JOIN reclamostipo ON reclamos.idReclamoTipo = reclamostipo.idReclamoTipo WHERE reclamos.idReclamo = ?;`;
    const [reclamo] = await connection.query(sqlReclamo, [idReclamo]);
    return reclamo;
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
