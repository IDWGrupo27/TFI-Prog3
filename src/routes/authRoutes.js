import express from 'express';
import {check} from 'express-validator';
import { validarCampos } from '../../src/middleware/validarCampos.js';
import AuthController from '../controllers/authController.js';
//import UsuariosController from '../controllers/usuariosController.js';

const router = express.Router();
const authController = new AuthController();

router.post('/login', 
    [
        check('correoElectronico', 'El correo electrónico es requerido!').not().isEmpty(),
        check('correoElectronico', 'Revisar el formato del correo electrónico!').isEmail(),
        check('contrasenia', 'La contrasenia es requerida!').not().isEmpty(),
        validarCampos
    ], 
    authController.loginUsuario
);

export default router;