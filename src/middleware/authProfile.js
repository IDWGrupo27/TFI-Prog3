import {userFindById}  from "../controllers/userController.js"

export const isCliente = async(req, res, next) => {

    const idUser = req.params.idCliente
    
    const [ profile ] = await userFindById(idUser)

    if (profile.idTipoUsuario === 3) {
        next();
        return;
    }

    return res.status(403).send({
        message: "su perfil no corresponde a un cliente"
    })

}