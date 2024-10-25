import jwt from "jsonwebtoken";

const verifyToken = (authHeader) => {
    var validated = false;
    var perfil = null;

    if (authHeader && authHeader.startsWith("Bearer")) {
        jwt.verify(
            authHeader.split(" ")[1],
            process.env.TOKEN_SECRET,
            (err, data) => {
                if (err) {
                    validated = false;
                    return;
                }
                validated = true;
                perfil = data;
            }
        );
    }
    return { validated, perfil };
};

export default class AuthProfile {
    isLoginValidated = (req) => {
        const validation = verifyToken(req.headers["authorization"]);
        if (validation.validated) {
            req.perfil = validation.perfil;
            req.perfil.tipo = validation.perfil.tipo.toUpperCase();
            return true;
        }
        return false;
    };

    isCliente = async (req, res, next) => {
        if (this.isLoginValidated(req)) {
            const tipo = req.perfil.tipo.toUpperCase();
            if (tipo === "CLIENTE") {
                return next();
            }
        }

        res.status(403).send({
            status: "FORBIDDEN",
            message: "Usuario no autorizado",
        });
    };

    isEmpleado = async (req, res, next) => {
        if (this.isLoginValidated(req)) {
            const tipo = req.perfil.tipo.toUpperCase();
            if (tipo === "EMPLEADO") {
                return next();
            }
        }

        res.status(403).send({
            status: "FORBIDDEN",
            message: "Usuario no autorizado",
        });
    };

    isAdministrador = async (req, res, next) => {
        if (this.isLoginValidated(req)) {
            const tipo = req.perfil.tipo.toUpperCase();
            if (tipo === "ADMINISTRADOR") {
                return next();
            }
        }

        res.status(403).send({
            status: "FORBIDDEN",
            message: "Usuario no autorizado",
        });
    };

    isEmpleadoOrAdministrador = async (req, res, next) => {
        if (this.isLoginValidated(req)) {
            const tipo = req.perfil.tipo.toUpperCase();
            if (tipo === "ADMINISTRADOR" || tipo === "EMPLEADO") {
                return next();
            }
        }

        res.status(403).send({
            status: "FORBIDDEN",
            message: "Usuario no autorizado",
        });
    };
}
