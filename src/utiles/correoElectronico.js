import UsuariosService from "../service/usuariosService.js";
import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const usuariosService = new UsuariosService();

//Por el momento solo envia correos con los reclamos nuevos creados

export const enviarCorreo = async (reclamo) => {
    const fileName = fileURLToPath(import.meta.url);
    const dirName = path.dirname(fileName);
    const plantilla = fs.readFileSync(
        path.join(dirName + "/handlebars/plantilla.hbs"),
        "utf-8"
    );

    let usuario = await usuariosService.getUsuarioById(
        reclamo.idUsuarioCreador
    );
    let conseguirCorreo = usuario.correoElectronico;

    const templete = handlebars.compile(plantilla);

    const datos = {
        nombre: usuario.nombre,
        estadoFinal: "creado",
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
};
