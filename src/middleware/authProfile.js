import jwt from "jsonwebtoken";

const verifyToken = (authHeader) => {
    var validated = false;
    var userData = null;

    if (!typeof authHeader === "string" || !authHeader.startsWith("Bearer"))
        return;

    jwt.verify(
        authHeader.split(" ")[1],
        process.env.TOKEN_SECRET,
        (err, data) => {
            if (err) {
                validated = false;
                return;
            }
            validated = true;
            userData = data;
        }
    );

    return { validated, userData };
};

export const isCliente = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const validation = verifyToken(authHeader);

    if (
        validation.validated &&
        (validation.userData.tipo === "cliente" ||
            validation.userData.tipo === "empleado" ||
            validation.userData.tipo === "administrador")
    ) {
        if (validation.userData.tipo === "cliente") {
            // si es cliente, se lo etiqueta como tal en la req para que el controller lo pueda identificar
            req.isCliente = true;
            req.idUsuario = validation.userData.idUsuario;
        }
        next();
    } else {
        res.status(403).send({
            status: "FORBIDDEN",
            message: "Usuario no autorizado",
        });
    }
};

export const isEmpleado = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const validation = verifyToken(authHeader);

    if (
        validation.validated &&
        (validation.userData.tipo === "empleado" ||
            validation.userData.tipo === "administrador")
    ) {
        next();
    } else {
        res.status(403).send({
            status: "FORBIDDEN",
            message: "Usuario no autorizado",
        });
    }
};

export const isAdministrador = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const validation = verifyToken(authHeader);

    if (validation.validated && validation.userData.tipo === "administrador") {
        next();
    } else {
        res.status(403).send({
            status: "FORBIDDEN",
            message: "Usuario no autorizado",
        });
    }
};
