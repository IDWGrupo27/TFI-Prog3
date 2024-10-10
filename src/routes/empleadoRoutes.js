import express from "express";
import reclamos from "./reclamos/reclamosEmpleado.js";

const empleado = express.Router();

empleado.use("/reclamos", reclamos);

export default empleado;
