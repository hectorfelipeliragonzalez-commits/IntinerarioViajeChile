export class GestorActividades {

    constructor() {

        this.actividades = []

    }

    agregarActividad(actividad) {

        this.actividades.push(actividad)
        this.guardar()

    }

    eliminarActividad(id) {

        this.actividades =
        this.actividades.filter(a => a.id !== id)

        this.guardar()

    }

    editarActividad(id, nuevoTitulo, nuevaHora) {

        const actividad =
        this.actividades.find(a => a.id === id)

        if (actividad) {

            actividad.titulo = nuevoTitulo
            actividad.fechaHora = nuevaHora

            this.guardar()

        }

    }

    completarActividad(id) {

        const actividad =
        this.actividades.find(a => a.id === id)

        if (actividad) {

            actividad.estado = "completada"
            this.guardar()

        }

    }

    guardar() {

        localStorage.setItem(
            "actividades",
            JSON.stringify(this.actividades)
        )

    }

    cargar() {

        const datos = localStorage.getItem("actividades")

        if (datos) {

            this.actividades = JSON.parse(datos)

        }

    }

}