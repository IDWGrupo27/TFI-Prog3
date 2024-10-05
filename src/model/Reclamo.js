export class Reclamo {
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
        this.estadoReclamo = estadoReclamo;
    }
}
