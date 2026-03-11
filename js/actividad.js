export class Actividad {
    constructor(id, titulo, fechaHora) {
        this.id = id
        this.titulo = titulo
        this.fechaHora = fechaHora // formato ISO: YYYY-MM-DDTHH:MM
        this.estado = "pendiente"
    }

    completar() {
        this.estado = "completada"
    }

    atrasar() {
        this.estado = "atrasada"
    }
}