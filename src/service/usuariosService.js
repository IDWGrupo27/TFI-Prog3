import { Usuario } from "../model/model.js";
import UsuariosDatabase from "../database/usuarios.js";

const usuariosDatabase = new UsuariosDatabase();

export default class UsuariosService {
    getUsuarioById = async (idUsuario) => {
        try {
            const data = await usuariosDatabase.getUsuarioById(idUsuario);
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
            console.log(error);
            return null;
        }
    };

    /**
     * @param {{ correoElectronico: string; contrasenia: string;}} dataLogin
     */
    loginUsuario = async (dataLogin) => {
        try {
            const dataUsuario = await usuariosDatabase.loginUsuario(dataLogin);
            if (dataUsuario) return new Usuario(dataUsuario);
            else return null;
        } catch (error) {
            throw new Error(error);
        }
    };
}
