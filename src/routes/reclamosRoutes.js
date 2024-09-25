import express from 'express';
import { createReclamos, consultaReclamoCliente, actualizaReclamoCliente } from '../controllers/reclamosController.js';
import { isCliente } from '../middleware/authProfile.js'

const router = express.Router();

router.post('/reclamos/:idCliente', isCliente, createReclamos);

router.get('/reclamos/:idCliente', isCliente, consultaReclamoCliente)

router.patch('/reclamos/:idCliente', isCliente, actualizaReclamoCliente)

export default router
