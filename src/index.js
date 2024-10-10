import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cliente from "./routes/clienteRoutes.js";
import empleado from "./routes/empleadoRoutes.js";
import usuarios from "./routes/usuariosRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/cliente", cliente);
app.use("/api/empleado", empleado);
app.use("/api/usuarios", usuarios);

app.listen(process.env.PUERTO, () => {
    console.log(
        `Servidor web corriendo en http://localhost:${process.env.PUERTO}`
    );
});
