import jwt from "jsonwebtoken";

const verifyToken = (token) => {
    var validated = false;
    var userData = null;
    jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
        if (err) {
            validated = false;
            return;
        }
        validated = true;
        userData = data;
    });
    return { validated, userData };
};

export const isCliente = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const validation = verifyToken(authHeader);

    console.log(validation);

    if (
        (validation.validated && validation.userData.tipo === "cliente") ||
        validation.userData.tipo === "empleado" ||
        validation.userData.tipo === "administrador"
    ) {
        next();
    } else {
        res.status(403).send({
            status: "FORBIDDEN",
            message: "Error al verificar autenticación",
        });
    }
};

export const isEmpleado = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const validation = verifyToken(authHeader);

    if (
        (validation.validated && validation.userData.tipo === "empleado") ||
        validation.userData.tipo === "administrador"
    ) {
        next();
    } else {
        res.status(403).send({
            status: "FORBIDDEN",
            message: "Error al verificar autenticación",
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
            message: "Error al verificar autenticación",
        });
    }
};
