import { connection } from "./connection.js";

export default class OficinasDatabase {
    // Sentencias que se repiten en varias consultas
    sqlOficinasColumns = "o.idOficina, o.nombre, o.activo, rt.descripcion AS reclamoTipo";
    sqlOficinaJoinTipo = "INNER JOIN reclamos_tipo rt ON o.idReclamoTipo = rt.idReclamosTipo";

    getOficinaById = async (idOficina) => {
        const sql = `SELECT ${this.sqlOficinasColumns} FROM oficinas o ${this.sqlOficinaJoinTipo} WHERE idOficina = ?;`;
        const [oficinas] = await connection.query(sql, [idOficina]);
        if (!oficinas || oficinas.length === 0) {
            return null;
        }
        return oficinas[0];
    };

    getAllOficinas = async () => {
        const sql = `SELECT ${this.sqlOficinasColumns} FROM oficinas o ${this.sqlOficinaJoinTipo} WHERE o.activo = 1;`;
        const [oficinas] = await connection.query(sql);
        return oficinas;
    };

    createOficina = async (nombre, idTipoReclamo) => {
        const sql = `INSERT INTO oficinas (nombre, idReclamoTipo, activo) VALUES (?, ?, ?)`;
        const [oficinaNueva] = await connection.query(sql, [nombre, idTipoReclamo, 1]);
        return oficinaNueva;
    };

    updateOficina = async (idOficina, datos) => {
        const sql = `UPDATE oficinas SET ? WHERE idOficina = ?`;
        const [oficinaModificada] = await connection.query(sql, [datos, idOficina]);
        return oficinaModificada;
    };

    deleteOficina = async (idOficina) => {
        const sql = `UPDATE oficinas SET activo = 0 WHERE idOficina = ?`;
        const [oficinaEliminada] = await connection.query(sql, [idOficina]);
        return oficinaEliminada;
    };

    getOficinaByIdUsuario = async (idUsuario) => {
        const sql = `SELECT idOficina FROM usuarios_oficinas WHERE idUsuario = ? AND activo = 1;`;
        const [data] = await connection.query(sql, [idUsuario]);
        if (!data || data.length === 0) {
            return null;
        }
        const oficinaData = await this.getOficinaById(data[0].idOficina);
        return oficinaData;
    };

    getIdUsuarioOficina = async (idOficina, idUsuario) => {
        const sql = `SELECT idUsuarioOficina FROM usuarios_oficinas WHERE idUsuario = ? AND idOficina = ? AND activo = 1;`;
        const [data] = await connection.query(sql, [idUsuario, idOficina]);
        return data[0];
    };

    getOficinaUsuario = async (idOficina) => {
        const sql = `SELECT idUsuario FROM usuarios_oficinas WHERE idOficina = ? AND activo = 1;`;
        const [result] = await connection.query(sql, [idOficina]);
        return result;
    };

    getOficinaByIdReclamo = async (idReclamo) => {
        const sql = `SELECT o.idOficina FROM oficinas o INNER JOIN reclamos r ON o.idReclamoTipo = r.idReclamoTipo WHERE r.idReclamo = ?;`;
        const [data] = await connection.query(sql, [idReclamo]);
        if (!data || data.length === 0) {
            return null;
        }
        const oficinaData = await this.getOficinaById(data[0].idOficina);
        return oficinaData;
    };

    agregarEmpleados = async (idOficina, empleados) => {
        let agregados = 0;
        try {
            await connection.beginTransaction();
            for (const empleado of empleados) {
                const sql = `INSERT INTO usuarios_oficinas (idUsuario, idOficina, activo) VALUES (?, ?, 1);`;
                const result = connection.query(sql, [empleado.idUsuario, idOficina]);
                agregados += 1;
            }
            await connection.commit();
            return {
                estado: true,
                mensaje: `Se agergaron ${agregados} empleados `,
            };
        } catch (error) {
            await connection.rollback();
            console.log(error);
            return {
                estado: false,
                mensaje: "Error al agergar empleados a la oficina.",
            };
        }
    };

    quitarEmpleados = async (idOficinaUsuario) => {
        let quitados = 0;
        try {
            await connection.beginTransaction();
            for (const id of idOficinaUsuario) {
                const sql = `UPDATE usuarios_oficinas SET activo = 0 WHERE idUsuarioOficina = ? `;
                const result = connection.query(sql, [id.idUsuarioOficina]);
                quitados += 1;
            }
            await connection.commit();
            return {
                estado: true,
                mensaje: `Se quitaron ${quitados} empleados en la oficina`,
            };
        } catch (error) {
            await connection.rollback();
            console.log(error);
            return {
                estado: false,
                mensaje: "Error al quitar empleados en la oficina.",
            };
        }
    };
}
