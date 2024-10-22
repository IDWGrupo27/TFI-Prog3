export class Usuario {
    /**
     * @param {{ idUsuario: number; nombre: string; apellido: string; correoElectronico: string; activo: boolean; tipo: string;}} param0
     */
    constructor({
        idUsuario,
        nombre,
        apellido,
        correoElectronico,
        activo,
        tipo,
    }) {
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correoElectronico = correoElectronico;
        this.activo = activo;
        this.tipo = tipo;
    }
}
