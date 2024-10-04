import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import reclamos from "./routes/reclamosRoutes.js";
import usuarios from "./routes/usuariosRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/reclamos", reclamos);
app.use("/usuarios", usuarios);

app.listen(process.env.PUERTO, () => {
    console.log(
        `Servidor web corriendo en http://localhost:${process.env.PUERTO}`
    );
});
