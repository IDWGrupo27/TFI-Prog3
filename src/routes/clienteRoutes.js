import express from "express";
import reclamos from "./reclamos/reclamosCliente.js";

const cliente = express.Router();

cliente.use("/reclamos", reclamos);

export default cliente;
