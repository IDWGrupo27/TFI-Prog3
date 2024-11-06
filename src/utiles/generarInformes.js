import { createObjectCsvWriter } from "csv-writer";
import fs from "fs";
import handlebars from "handlebars";
import path, { format } from "path";
import puppeteer from "puppeteer";
import { fileURLToPath } from "url";

export const generarPdf = async (datos) => {
    try {
        const fileName = fileURLToPath(import.meta.url);
        const dirName = path.dirname(fileName);
        const plantilla = fs.readFileSync(
            path.join(dirName + "/handlebars/informe.html"),
            "utf-8"
        );

        const template = handlebars.compile(plantilla);

        const contenidoHtml = template(datos);

        const browser = await puppeteer.launch();
        const page = await browser.newPage()
        await page.setContent(contenidoHtml, { waitUntil: 'load' });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
        });

        await browser.close();

        return pdfBuffer

    } catch (error) {
        console.log(error)
        throw error;
    }

}


export const generarCsv = async (datos) => {
    try {
        const fileName = fileURLToPath(import.meta.url);
        const dirName = path.dirname(fileName);

        let archivo = path.join(dirName + "/informe.csv");

        const csv = createObjectCsvWriter({
            path: archivo,
            header: [
                { id: 'reclamo', title: 'Reclamo' },
                { id: 'asunto', title: 'Asunto' },
                { id: 'fechaCreado', title: 'Fecha creacion' },
                { id: 'nombreUsuario', title: 'Usuario creador' },
                { id: 'apellidoUsuario', title: 'Apellido usuario creador' },
                { id: 'estado', title: 'Estado del reclamo' }
            ],
            encoding: "utf-8"
        });

        await csv.writeRecords(datos);

        return archivo

    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const generarEstadistica = async (datos) => {
    try {
        const fileName = fileURLToPath(import.meta.url);
        const dirName = path.dirname(fileName);

        let archivo = path.join(dirName + "/estadistica.csv");


        const { reclamosNoFinalizados, tablaEstadistica } = datos;


        const datosFinales = tablaEstadistica.map(e => {
            const obj = { ...e, reclamosNoFinalizados };
            return obj
        });


        const csv = createObjectCsvWriter({
            path: archivo,
            header: [
                { id: 'reclamosNoFinalizados', title: 'Reclamos no finalizados' },
                { id: 'descripcion', title: 'Descripcion del reclamo tipo' },
                { id: 'idReclamosTipo', title: 'ID tipos de reclamos' },
                { id: 'cantidadCadaReclamo', title: 'Cantidad de cada tipo de reclamo' },
                { id: 'porcentajeCadaReclamo', title: 'Porcentaje de cada tipo de reclamo' }
            ],
            encoding: "utf-8"
        });

        await csv.writeRecords(datosFinales);

        return archivo


    } catch (error) {
        console.log(error)
        throw error;
    }

}