export class Usuario {
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
