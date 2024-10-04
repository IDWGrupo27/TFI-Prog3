import { userFindById } from "../controllers/userController.js";

export const isCliente = async (req, res, next) => {
    /*     const idUser = req.params.idCliente;

    const [profile] = await userFindById(idUser);

    console.log(profile);

    if (profile.idTipoUsuario === 1) {
        next();
        return;
    } */

    next();
    return;

    return res.status(403).send({
        message: "su perfil no corresponde a un cliente",
    });
};
