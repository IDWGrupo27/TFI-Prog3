import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from 'passport-local';
import UsuariosService from "../service/usuariosService.js";
import dotenv from 'dotenv';

dotenv.config();

const estrategia = new LocalStrategy(
    {
        usernameField: "correoElectronico",
        passwordField: "contrasenia"
    },
    // verify
    async(correoElectronico, contrasenia, done) => {
        try {
            const datosUsuario = {
                correoElectronico,
                contrasenia
            }
            const usuarioService = new UsuariosService();
            const usuario = await usuarioService.loginUsuario(datosUsuario);
            if(!usuario){
                return done(null, false, {mensaje: "Login incorrecto!"})
            }
            return done(null, usuario, {mensaje: "Login correcto!"})
        } catch (exc) {
            done(exc)
        }
    }
)

const validacion = new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.TOKEN_SECRET,   
        // ignoreExpiration: true //por defecto se evalúa el campo de expiración a menos que le diga que lo ignore
    },
    async (jwtPayload, done) => {
        const usuariosService = new UsuariosService();
        const usuario = await usuariosService.getUsuarioById(jwtPayload.idUsuario);
        if(!usuario){
            return done(null, false, { mensaje: 'Token incorrecto!'});
        }

        return done(null, usuario); //req.user 
    }    
)

export {estrategia, validacion};