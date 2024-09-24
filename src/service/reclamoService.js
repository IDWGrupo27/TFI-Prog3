import { create } from "../database/reclamos.js";

const service = (reclamo) => {

    return create(reclamo);
    
}

export {service};