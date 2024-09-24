import { conexion } from "./connection.js";

const create = async({usuario, asunto, fecha, estado, tipo}) => {
    
    const sqlUsuario = 'SELECT idUsuario FROM usuarios WHERE correoElectronico = ?;'
    const [idUsuario] = await conexion.query(sqlUsuario, [usuario])
    const idUsuarioCreador = idUsuario[0].idUsuario
    
    const sqlReclamo = `INSERT INTO reclamos (asunto, fechaCreado, idReclamoEstado, 
                        idReclamoTipo, idUsuarioCreador) VALUES (?, ?, ?, ?, ?)`
    const [reclamoCreado] = await conexion.query(sqlReclamo, 
        [asunto, fecha, estado, tipo, idUsuarioCreador]
    )
    
    return reclamoCreado
}

const reclamoIdCliente = async(idCliente) => {
    const sqlReclamo = `SELECT r.idReclamo AS nro_reclamo, r.asunto AS asunto_reclamo, r.descripcion, r.fechaCreado, 
                        r.fechaFinalizado, r.fechaCancelado, re.descripcion AS estado_reclamo, rt.descripcion AS tipo_reclamo 
                        FROM reclamos AS r INNER JOIN reclamos_estado AS re ON idReclamosEstado = r.idReclamoEstado
                        INNER JOIN reclamos_tipo AS rt ON idReclamosTipo = r.idReclamoTipo
                        WHERE r.idUsuarioCreador = ?`

    const [reclamoCliente] = await conexion.query(sqlReclamo, [idCliente])
    
    return reclamoCliente
}

export {create, reclamoIdCliente};