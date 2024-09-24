import express from 'express';
import { createReclamos } from '../controllers/reclamosController.js';

const router = express.Router();

router.post('/reclamos', createReclamos);

router.get('/reclamos/:idCliente')

router.put('/reclamos/:idCliente')

export default router
