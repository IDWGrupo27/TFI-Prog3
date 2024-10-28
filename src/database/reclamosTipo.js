import { connection } from "./connection.js";

export default class ReclamosTipoDatabase {
    getAllReclamosTipo = async () => {
        const sql = "SELECT * FROM reclamos_tipo";
        const [result] = await connection.query(sql);
        return result;
    };
}
