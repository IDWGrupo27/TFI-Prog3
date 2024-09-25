import { conexion } from "./connection.js";

const userFindById = async(idUser) => {

    const sqlProfile = `SELECT idTipoUsuario FROM usuarios WHERE idUsuario = ?`;
    
    const [profile] = await conexion.query(sqlProfile, [idUser])

    return profile
}

export {userFindById}