import { userFindById } from "../database/usuarios.js"

const serviceFindById = (idUser) => {

    return userFindById(idUser)

}

export {serviceFindById}