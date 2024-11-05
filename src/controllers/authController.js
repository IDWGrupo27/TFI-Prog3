import jwt from 'jsonwebtoken';
import passport from 'passport';
import dotenv from 'dotenv';
dotenv.config();


export default class AuthController {
    loginUsuario = async(req, res) =>{
        passport.authenticate(
            'local',
            {session: false},
            // funcion callback resultado de la estrategia  
            (err, usuario, info) => {

                if (err || !usuario) {
                    return res.status(400).json({
                        estado:"Falla",
                        mensaje: "Solicitud incorrecta." 
                    })
                }
                // armo el token y envio como respuesta al cliente
                req.login(
                    usuario, 
                    { session: false }, 
                    (err) => {
                        if(err){
                            res.send(err);
                        }
                        // token expira en 1 hora
                        const token = jwt.sign({
                            idUsuario: usuario.idUsuario,
                            correoElectronico: usuario.correoElectronico,
                            tipo: usuario.tipo,
                        }, process.env.TOKEN_SECRET, { expiresIn: '1h'});
                        return res.status(200).send(
                            {
                                estado: 'OK' , 
                                token: token
                            }
                        );
                    }
                );
            }
        )(req, res);
    }
}