import jwt from "jsonwebtoken";

/*const verifyToken = (authHeader) => {
    var validated = false;
    var perfil = null;

    if (authHeader && authHeader.startsWith("Bearer")) {
        jwt.verify(authHeader.split(" ")[1], process.env.TOKEN_SECRET, (err, data) => {
            if (err) {
                validated = false;
                return;
            }
            validated = true;
            perfil = data;
        });
    }
    return { validated, perfil };
};*/

/*const isLoginValidated = () => {
    //const validation = verifyToken(req.headers["authorization"]);
    if (validation.validated) {
        req.perfil = validation.perfil;
        req.perfil.tipo = validation.perfil.tipo.toUpperCase();
        return true;
    }
    return false;

    req.perfil = req.user;
    req.perfil.tipo = req.user.tipo.toUpperCase();
    return true;
};*/

export default class AuthProfile {

    /*isAuthenticated = async (req, res, next) => {
        if (isLoginValidated(req)) return next();
        return res.status(401).send({
            status: "FAILED",
            message: "No se ha autenticado el usuario",
        });
    };*/

    isCliente = async (req, res, next) => {
        /*if (isLoginValidated(req)) {
            if (req.perfil.tipo === "CLIENTE") {
                return next();
            }
        }*/
        if (req.user.tipo.toUpperCase() === "CLIENTE") {
            return next();
        }

        res.status(403).send({
            status: "FORBIDDEN",
            message: "Usuario no autorizado",
        });
    };

    isEmpleado = async (req, res, next) => {
        /*if (isLoginValidated(req)) {
            if (req.perfil.tipo === "EMPLEADO") {
                return next();
            }
        }*/
        if (req.user.tipo.toUpperCase() === "EMPLEADO") {
            return next();
        }

        res.status(403).send({
            status: "FORBIDDEN",
            message: "Usuario no autorizado",
        });
    };

    isAdministrador = async (req, res, next) => {
        /*if (isLoginValidated(req)) {
            if (req.perfil.tipo === "ADMINISTRADOR") {
                return next();
            }
        }*/
        if (req.user.tipo.toUpperCase() === "ADMINISTRADOR") {
            return next();
        }

        res.status(403).send({
            status: "FORBIDDEN",
            message: "Usuario no autorizado",
        });
    };

    isEmpleadoOrAdministrador = async (req, res, next) => {
        /*if (isLoginValidated(req)) {
            const tipo = req.perfil.tipo.toUpperCase();
            if (tipo === "ADMINISTRADOR" || tipo === "EMPLEADO") {
                return next();
            }
        }*/
        const tipo = req.user.tipo.toUpperCase();
        if (tipo === "ADMINISTRADOR" || tipo === "EMPLEADO") {
            return next();
        }

        res.status(403).send({
            status: "FORBIDDEN",
            message: "Usuario no autorizado",
        });
    };
}
