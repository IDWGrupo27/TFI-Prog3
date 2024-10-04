import { connection } from "./connection.js";

const userFindById = async (idUser) => {
    const sqlProfile = `SELECT idTipoUsuario FROM usuarios WHERE idUsuario = ?`;

    const [profile] = await connection.query(sqlProfile, [idUser]);

    return profile;
};

export { userFindById };
