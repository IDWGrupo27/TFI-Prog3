import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import reclamoRoutes from "./routes/reclamosRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use(reclamoRoutes);

app.listen(process.env.PUERTO, () => {
    console.log(
        `Servidor web corriendo en http://localhost:${process.env.PUERTO}`
    );
});
