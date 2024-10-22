import express from "express";
import reclamosCliente from "./reclamos/reclamosCliente.js";

const cliente = express.Router();

cliente.use("/reclamos", reclamosCliente);

export default cliente;
