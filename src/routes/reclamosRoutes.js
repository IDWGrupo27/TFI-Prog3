import express from 'express';
import { createReclamos, reclamoIdCliente } from '../controllers/reclamosController.js';

const router = express.Router();

router.post('/reclamos', createReclamos);

router.get('/reclamos/:idCliente', reclamoIdCliente)

router.put('/reclamos/:idCliente')

export default router
