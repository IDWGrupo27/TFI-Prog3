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

export const isCliente = async (req, res, next) => {
    const validation = verifyToken(req.headers["authorization"]);
    if (validation.validated) {
        validation.perfil.tipo = validation.perfil.tipo.toUpperCase();
        const tipo = validation.perfil.tipo;
        if (
            tipo === "CLIENTE" ||
            tipo === "EMPLEADO" ||
            tipo === "ADMINISTRADOR"
        ) {
            req.perfil = validation.perfil;
            return next();
        }
    }

    res.status(403).send({
        status: "FORBIDDEN",
        message: "Usuario no autorizado",
    });
};

export const isEmpleado = async (req, res, next) => {
    const validation = verifyToken(req.headers["authorization"]);
    if (validation.validated) {
        validation.perfil.tipo = validation.perfil.tipo.toUpperCase();
        const tipo = validation.perfil.tipo;
        if (tipo === "EMPLEADO" || tipo === "ADMINISTRADOR") {
            req.perfil = validation.perfil;
            return next();
        }

        res.status(403).send({
            status: "FORBIDDEN",
            message: "Usuario no autorizado",
        });
    }
};

export const isAdministrador = async (req, res, next) => {
    const validation = verifyToken(req.headers["authorization"]);
    if (validation.validated) {
        validation.perfil.tipo = validation.perfil.tipo.toUpperCase();
        const tipo = validation.perfil.tipo;
        if (tipo === "ADMINISTRADOR") {
            req.perfil = validation.perfil;
            return next();
        }
    }

    res.status(403).send({
        status: "FORBIDDEN",
        message: "Usuario no autorizado",
    });
};
