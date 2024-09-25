import { serviceFindById } from '../service/userService.js';

export const userFindById = async(idUser) => {

    if (!idUser) {
        res.status(404).send({ status: "Fallo", data: { error: "El parámetro idUser no puede ser vacío." } })
    }

    const data = await serviceFindById(idUser);


    return data;
}

   
