import { Reclamo } from "../model/model.js";
import ReclamosDatabase from "../database/reclamos.js";
import { enviarCorreo } from "../utiles/correoElectronico.js";
import { generarPdf, generarCsv, generarEstadistica } from "../utiles/generarInformes.js";

const database = new ReclamosDatabase();

export default class ReclamosService {
    getReclamoById = async (idReclamo) => {
        try {
            const data = await database.getReclamoById(idReclamo);
            if (data) {
                const reclamo = new Reclamo(data);
                return reclamo;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error al obtener el reclamo", error);
            return null;
        }
    };

    /**
     * @returns {Promise<Reclamo[]>}
     */
    getAllReclamos = async () => {
        try {
            const data = await database.getAllReclamos();
            return data.map((rd) => new Reclamo(rd));
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    /**
     * @returns {Promise<Reclamo[]>}
     */
    getReclamosByIdCliente = async (idCliente) => {
        try {
            const data = await database.getReclamosByIdCliente(idCliente);
            return data.map((rd) => new Reclamo(rd));
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    /**
     * @returns {Promise<Reclamo[]>}
     */
    getReclamosByIdOficina = async (idOficina) => {
        try {
            const data = await database.getReclamosByIdOficina(idOficina);
            return data.map((rd) => new Reclamo(rd));
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    createReclamo = async (dataReclamo) => {
        try {
            const data = await database.createReclamo(dataReclamo);
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    updateReclamo = async (idReclamo, dataReclamo) => {
        const reclamoEstadoPrevio = await this.getReclamoById(idReclamo);

        try {
            const data = await database.updateReclamo(idReclamo, dataReclamo);
            if (data?.affectedRows === 0) {
                return null;
            }

            const reclamo = await this.getReclamoById(idReclamo);
            enviarCorreo(idReclamo, reclamoEstadoPrevio);

            return reclamo;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    deleteReclamoById = async (idReclamo) => {
        try {
            const data = await database.deleteReclamoById(idReclamo);
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    getInforme = async (form) => {
        try {
            if (form === "pdf") {
                const datos = await database.getDatosPdf();

                if (!datos || datos.length === 0) {
                    return { mensaje: "No se encontraron datos" };
                }

                const pdf = await generarPdf(datos);

                return {
                    buffer: pdf,
                    headers: {
                        "Content-Type": "application/pdf",
                        "Content-Disposition": 'inline; filename="reclamos.pdf"',
                    },
                };
            } else if (form === "csv") {
                const datos = await database.getDatosCsv();

                if (!datos || datos.length === 0) {
                    return { mensaje: "No se encontraron datos" };
                }

                const csv = await generarCsv(datos);

                return {
                    path: csv,
                    headers: {
                        "Content-Type": "text/csv",
                        "Content-Disposition": 'attachment; filename="informe.csv"',
                    },
                };
            }
        } catch (error) {
            console.log(error);
        }
    };

    getEstadistica = async () => {
        try {
            const datos = await database.getEstadistica();

            if (!datos || datos.length === 0) {
                return { mensaje: "No se encontraron datos" };
            }

            const estadistica = await generarEstadistica(datos);

            if (!estadistica) {
                return null;
            }

            return {
                path: estadistica,
                headers: {
                    "Content-Type": "text/csv",
                    "Content-Disposition": 'attachment; filename="estadistica.csv"',
                },
            };
        } catch (error) {
            console.log(error);
        }
    };
}
