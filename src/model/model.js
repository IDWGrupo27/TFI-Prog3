export class Reclamo {
    /**
     * @param {{idReclamo: number, asunto: string, descripcion: string, fechaCreado: Date, fechaFinalizado: Date, fechaCancelado: Date, idUsuarioCreador: number, nombreUsuarioCreador: string, apellidoUsuarioCreador: string, correoUsuarioCreador: string, tipoReclamo: string, idOficina: number, estadoReclamo: string}}
     */
    constructor({
        idReclamo,
        asunto,
        descripcion,
        fechaCreado,
        fechaFinalizado,
        fechaCancelado,
        idUsuarioCreador,
        nombreUsuarioCreador,
        apellidoUsuarioCreador,
        correoUsuarioCreador,
        tipoReclamo,
        idOficina,
        estadoReclamo,
    }) {
        this.idReclamo = idReclamo;
        this.asunto = asunto;
        this.descripcion = descripcion;
        this.fechaCreado = fechaCreado;
        this.fechaFinalizado = fechaFinalizado;
        this.fechaCancelado = fechaCancelado;
        this.idUsuarioCreador = idUsuarioCreador;
        this.nombreUsuarioCreador = nombreUsuarioCreador;
        this.apellidoUsuarioCreador = apellidoUsuarioCreador;
        this.correoUsuarioCreador = correoUsuarioCreador;
        this.tipoReclamo = tipoReclamo;
        this.idOficina = idOficina;
        this.estadoReclamo = estadoReclamo;
    }
}

export class Usuario {
    /**
     * @param {{ idUsuario: number; nombre: string; apellido: string; correoElectronico: string; idOficina: number; activo: boolean; tipo: string;}}
     */
    constructor({ idUsuario, nombre, apellido, correoElectronico, idOficina, activo, tipo }) {
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correoElectronico = correoElectronico;
        this.idOficina = idOficina;
        this.activo = activo;
        this.tipo = tipo;
    }
}

export class Oficina {
    /**
     * @param {{ idOficina: number; nombre: string; activo: boolean; reclamoTipo: string, empleados: Usuario[];}}
     */
    constructor({ idOficina, nombre, activo, reclamoTipo, empleados }) {
        this.idOficina = idOficina;
        this.nombre = nombre;
        this.activo = activo;
        this.reclamoTipo = reclamoTipo;
        this.empleados = empleados;
    }
}

export class ReclamosTipo {
    /**
     * @param {{ idReclamosTipo: number; descripcion: string; activo: boolean;}}
     */
    constructor({ idReclamosTipo, descripcion, activo }) {
        this.idReclamosTipo = idReclamosTipo;
        this.descripcion = descripcion;
        this.activo = activo;
    }
}
