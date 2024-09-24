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

export {create};