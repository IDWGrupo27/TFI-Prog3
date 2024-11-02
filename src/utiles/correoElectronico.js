import UsuariosService from "../service/usuariosService.js";
import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import ReclamosService from "../service/reclamosService.js";

//Envia el correo si el estado del reclamo es distinto al que se encuentra en la BBDD

export const enviarCorreo = async (idReclamo, reclamoEstadoPrevio) => {
    const reclamosService = new ReclamosService();

    const fileName = fileURLToPath(import.meta.url);
    const dirName = path.dirname(fileName);
    const plantilla = fs.readFileSync(path.join(dirName + "/handlebars/plantilla.hbs"), "utf-8");

    const reclamo = await reclamosService.getReclamoById(idReclamo);

    if (reclamoEstadoPrevio.estadoReclamo === reclamo.estadoReclamo) {
        return;
    } else {
        let conseguirCorreo = reclamo.correoUsuarioCreador;

        const templete = handlebars.compile(plantilla);

        const datos = {
            nombre: reclamo.nombreUsuarioCreador,
            estadoInicial: reclamoEstadoPrevio.estadoReclamo,
            estadoFinal: reclamo.estadoReclamo,
        };

        const correo = templete(datos);

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_NM,
                pass: process.env.PASSWORD_NM,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_NM,
            to: conseguirCorreo,
            subject: "NOTIFICACION DE RECLAMO",
            html: correo,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email: ", error);
            } else {
                console.log("Email sent: ", info.response);
            }
        });
    }
};
