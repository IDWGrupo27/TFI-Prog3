import { Usuario } from "../model/model.js";
import UsuariosDatabase from "../database/usuarios.js";

const usuariosDatabase = new UsuariosDatabase();

export default class UsuariosService {
    
    getUsuarioById = async (idUsuario, inactivo = false) => {
        try {
            const data = await usuariosDatabase.getUsuarioById(idUsuario, inactivo);
            if (data) return new Usuario(data);
            else return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    getUsuarioByEmail = async (email) => {
        try {
            const data = await usuariosDatabase.getUsuarioByEmail(email);
            if (data) return new Usuario(data);
            else return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    /**
     * @returns {Promise<Usuario[]>}
     */
    getAllUsuarios = async () => {
        try {
            const data = await usuariosDatabase.getAllUsuarios();
            console.log(data)
            return data.map((u) => new Usuario(u));
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    /**
     * @returns {Promise<Usuario[]>}
     */
    getUsuariosByIdTipoEmpleado = async (id) => {
        try {
            const data = await usuariosDatabase.getUsuariosByIdTipoEmpleado(id);
            return data.map((u) => new Usuario(u));
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    /**
     * @returns {Promise<Usuario[]>}
     */
    getUsuariosByIdOficina = async (idOficina) => {
        try {
            const data = await usuariosDatabase.getUsuariosByIdOficina(idOficina);
            return data.map((u) => new Usuario(u));
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    /**
     * @param {{ nombre: string; apellido: string; correoElectronico: string; contrasenia: string; idTipoUsuario: number}} dataUsuario
     */
    createUsuario = async (dataUsuario) => {
        try {
            const result = await usuariosDatabase.createUsuario(dataUsuario);
            if (result.affectedRows === 1) {
                const usuario = await this.getUsuarioById(result.insertId);
                return usuario;
            }
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    updatePerfilUsuario = async (idUsuario, datos) => {

        const existe = await usuariosDatabase.getUsuarioById(idUsuario);
        if (existe === null) {
            return {estado: false, mensaje: 'idUsuario no existe'};
        }    

        const mod = await usuariosDatabase.updatePerfilUsuario(idUsuario, datos);
        if (mod){
            return {estado: true, mensaje: 'Usuario modificado'};
        }else{
            return {estado: false, mensaje: 'Usuario no modificado'};
        }
    }

    updateUsuario = async (idUsuario, fields) => {
        try {
            const result = await usuariosDatabase.updateUsuario(idUsuario, fields);
            if (result.affectedRows === 1) {
                return await this.getUsuarioById(idUsuario, true);
            }
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    };
   

    updateUsuariosOficinasActivo = async (idUsuario, activo) => {
        try {
            const result = await usuariosDatabase.updateUsuariosOficinasActivo(idUsuario, activo);
            if (result.affectedRows === 1) return true;
            return false;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    /**
     * @param {{ correoElectronico: string; contrasenia: string;}} dataLogin
     */
    loginUsuario = async (dataLogin) => {
        //console.log(dataLogin)
        try {
            const dataUsuario = await usuariosDatabase.loginUsuario(dataLogin);
            //console.log(dataUsuario)
            if (dataUsuario) return new Usuario(dataUsuario);
            else return null;
        } catch (error) {
            throw new Error(error);
        }
    };

    findUsuario = async(correoElectronico, contrasenia) => {
        return usuariosDatabase.findUsuario(correoElectronico, contrasenia);
    }
}
