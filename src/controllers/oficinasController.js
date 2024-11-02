import OficinasService from "../service/oficinasService.js";
import ReclamosTipoService from "../service/reclamosTipoService.js";

const oficinasService = new OficinasService();
//const reclamoTipoService = new ReclamosTipoService();

export default class OficinasController {

    getOficinaById = async (req, res) => {
        if (!req.params.idOficina) {
            return res.status(400).send({
                status: "FAILED",
                error: "El parámetro idOficina no puede ser vacío",
            });
        }

        const oficina = await oficinasService.getOficinaById(req.params.idOficina);
        
        if (oficina) {
            return res.send({
                status: "OK",
                oficina,
            });
        }

        res.status(404).send({
            status: "FAILED",
            error: `No se encontró la oficina con id ${req.params.idOficina}`,
        });
    };

    getAllOficina = async (req, res) => {
        const oficina = await oficinasService.getAllOficina();
        if (!oficina) {
            res.status(404).send({
                status: "FAILED",
                error: `No se encontraron oficinas activas`,
            });
        }

        return res.send({
            status: "OK",
            oficina,
        });
    };

    createOficina = async(req, res) => {

        const datos = req.body;
        if (Object.keys(datos).length === 0) {
            return res.status(400).send({
                status: "FAILED",
                error: "No existen datos para crear la oficina",
            });
        }

        try{
            const crearOficina = await oficinasService.createOficina(datos);
            if(crearOficina.estado){
                res.status(201).send({
                    estado: "OK",
                    mensaje: crearOficina.mensaje,
                    data: crearOficina.datos    
                })
                return;
            }else{
                res.status(400).send({
                    status: "FAILED",
                    mensaje: crearOficina.mensaje,
                });
            }
        }catch(e){
            res.status(500).send({
                estado: "Falla",
                mensaje: "Error interno servidor"
            })
        }
    };

    updateOficina = async(req, res) => {
        
        const idOficina = req.params.idOficina;
        if(idOficina === undefined){
            return res.status(400).send({
                status: "FAILED",
                error: "El parámetro idOficina no puede ser vacío",
            });
        }

        const datos = req.body;
        if(Object.keys(datos).length === 0){
            return res.status(400).send({
                status: "FAILED",
                error: "No se enviaron datos para ser modificados",
            });
        }

        try{
            const oficinaModificada = await oficinasService.updateOficina(idOficina, datos)
            if(oficinaModificada.estado){
                res.status(200).send({
                    estado: "OK",
                    mensaje: oficinaModificada.mensaje
                })
            }else{
                res.status(404).send({
                    estado: "FAILED",
                    mensaje: oficinaModificada.mensaje
                })
            }
        } catch(e) {
            res.status(500).send({
                estado: "Falla",
                mensaje: "Error interno servidor"
            })
        }
        
    };

    deleteOficina = async(req, res) => {
        const idOficina = req.params.idOficina;
        if(idOficina === undefined){
            return res.status(400).send({
                status: "FAILED",
                error: "El parámetro idOficina no puede ser vacío",
            });
        }

        try {
            const eliminarOficina = await oficinasService.deleteOficina(idOficina)
            if(eliminarOficina.estado){
                res.status(200).send({
                    estado: "OK",
                    mensaje: eliminarOficina.mensaje
                })
            }else{
                res.status(404).send({
                    estado: "FAILED",
                    mensaje: eliminarOficina.mensaje
                })
            }
        } catch (error) {
            res.status(500).send({
                estado: "Falla",
                mensaje: "Error interno servidor"
            })
        }
    };
    
    agregarEmpleados = async(req, res) => {
        const { idOficina, empleados} = req.body;
        if(!idOficina){
            return res.status(400).send({
                estado: "FAILED",
                mensaje: "El valor de idOficina no puede ser vacio"
            })
        }

        if(empleados.length === 0){
            return res.status(400).send({
                estado: "FAILED",
                mensaje: "No se cargaron empleados para agregar"
            })
        }

        try {
            const empleadosOficina = {
                idOficina,
                empleados
            }
            const agregaEmpleadosOficina = await oficinasService.agregarEmpleados(empleadosOficina);
            if (agregaEmpleadosOficina.estado){
                res.status(200).send({
                    estado:"OK", 
                    mensaje: agregaEmpleadosOficina.mensaje
                });
            }else{
                res.status(404).send({
                    estado:"FAILED", 
                    mensaje: agregaEmpleadosOficina.mensaje
                });
            } 
        } catch (error) {
            console.log(error);
            res.status(500).send({
                estado:"FAILED", mensaje: "Error interno en servidor."
            });
        }
    };

    quitarEmpleados = async(req, res) => {
        const { idOficina, empleados} = req.body;
        if(!idOficina){
            return res.status(400).send({
                estado: "FAILED",
                mensaje: "El valor de idOficina no puede ser vacio"
            })
        }

        if(empleados.length === 0){
            return res.status(400).send({
                estado: "FAILED",
                mensaje: "No se cargaron empleados para quitar"
            })
        }

        try {
            const empleadosOficina = {
                idOficina,
                empleados
            }
            const quitarEmpleadosOficina = await oficinasService.quitarEmpleados(empleadosOficina);
            if (quitarEmpleadosOficina.estado){
                res.status(200).send({
                    estado:"OK", 
                    mensaje: quitarEmpleadosOficina.mensaje
                });
            }else{
                res.status(404).send({
                    estado:"FAILED", 
                    mensaje: quitarEmpleadosOficina.mensaje
                });
            } 
        } catch (error) {
            console.log(error);
            res.status(500).send({
                estado:"FAILED", mensaje: "Error interno en servidor."
            });
        }
    }
}
