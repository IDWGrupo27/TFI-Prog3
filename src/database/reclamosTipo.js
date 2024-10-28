import { connection } from "./connection.js";

export default class ReclamosTipoDatabase {
    getAllReclamosTipo = async () => {
        const sql = "SELECT * FROM reclamos_tipo";
        const [result] = await connection.query(sql);
        return result;
    };

    getReclamosTipoById = async (idReclamosTipo) => {
        const sql = "SELECT * FROM reclamos_tipo WHERE idReclamosTipo = ?";
        const [result] = await connection.query(sql, [idReclamosTipo]);
        return result;
    };

    createReclamosTipo = async ({ descripcion }) => {
        const sql = "INSERT INTO reclamos_tipo (descripcion, activo) VALUES (?, 1)";
        const [result] = await connection.query(sql, [descripcion]);
        return result;
    };

    deleteReclamosTipoById = async (idReclamosTipo) => {
        const sql = "DELETE FROM reclamos_tipo WHERE idReclamosTipo = ?";
        const [result] = await connection.query(sql, [idReclamosTipo]);
        return result;
    };

    updateReclamosTipoById = async (idReclamosTipo, { descripcion, activo }) => {
        const sql = "UPDATE reclamos_tipo SET descripcion = ?, activo = ? WHERE idReclamosTipo = ?";
        const [result] = await connection.query(sql, [descripcion, activo, idReclamosTipo]);
        return result;
    };
}
