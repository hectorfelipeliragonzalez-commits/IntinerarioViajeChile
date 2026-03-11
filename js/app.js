import { Actividad } from "./actividad.js"
import { GestorActividades } from "./gestor.js"   // ✅ IMPORTAR EL GESTOR
import {obtenerHoraChile} from "./reloj.js"
import { mostrarHora } from "./reloj.js"

const gestor = new GestorActividades()
const listaActividades = document.querySelector("#listaActividades")
const reloj = document.querySelector("#reloj")
const btnFormulario = document.querySelector("#btnMostrarFormulario")
const contenedorFormulario = document.querySelector("#contenedorFormulario")

gestor.cargar()

renderizar()

// ========================
// Generador de ID
// ========================

function generarId() {

    return Date.now()

}

// ========================
// Mostrar formulario
// ========================
function mostrarFormulario(actividad = null) {

    if (document.querySelector("#formActividad")) return

    btnFormulario.style.display = "none"

    const form = document.createElement("form")

    form.id = "formActividad"

    const titulo = actividad ? actividad.titulo : ""
    const fecha = actividad ? actividad.fechaHora.split("T")[0] : ""
    const hora = actividad ? actividad.fechaHora.split("T")[1] : ""

    form.innerHTML = `

        <div class="card mt-3 shadow-sm">

            <div class="card-body">

                <h5 class="card-title text-center mb-3">
                ${actividad ? "Editar actividad" : "Nueva actividad"}
                </h5>

                <div class="mb-3">

                    <label class="form-label">Nombre de la actividad</label>

                    <input 
                    type="text"
                    id="titulo"
                    class="form-control"
                    value="${titulo}"
                    placeholder="Ej: Subir al cerro San Cristóbal"
                    required>

                </div>

                <div class="row">

                    <div class="col-md-6 mb-3">

                        <label class="form-label">Fecha</label>

                        <input 
                        type="date"
                        id="fecha"
                        class="form-control"
                        value="${fecha}"
                        required>

                    </div>

                    <div class="col-md-6 mb-3">

                        <label class="form-label">Hora</label>

                        <input 
                        type="time"
                        id="hora"
                        class="form-control"
                        value="${hora}"
                        required>

                    </div>

                </div>

                <div class="d-flex justify-content-center gap-2">

                    <button type="submit" class="btn btn-primary">
                    ${actividad ? "Guardar cambios" : "Agregar actividad"}
                    </button>

                    <button type="button" id="cancelarForm" class="btn btn-outline-secondary">
                    Cancelar
                    </button>

                </div>

            </div>

        </div>

    `

    contenedorFormulario.appendChild(form)

    form.addEventListener("submit", e => {

        e.preventDefault()

        const titulo = form.querySelector("#titulo").value
        const fecha = form.querySelector("#fecha").value
        const hora = form.querySelector("#hora").value

        const fechaHora = `${fecha}T${hora}`

        if (actividad) {

            gestor.editarActividad(actividad.id, titulo, fechaHora)

        } else {

            const nuevaActividad = new Actividad(generarId(), titulo, fechaHora)

            gestor.agregarActividad(nuevaActividad)

        }

        btnFormulario.style.display = "block"

        form.remove()

        renderizar()

    })

    form.addEventListener("click", e => {

        if (e.target.id === "cancelarForm") {

            btnFormulario.style.display = "block"

            form.remove()

        }

    })
}

btnFormulario.addEventListener("click", () => {

    if (document.querySelector("#formActividad")) return

    mostrarFormulario()

})

// ========================
// Renderizar lista
// ========================

function renderizar() {

    listaActividades.innerHTML = ""

    const actividadesOrdenadas = [...gestor.actividades].sort((a,b) => {

        if (a.estado === "completada" && b.estado !== "completada") return 1
        if (a.estado !== "completada" && b.estado === "completada") return -1
        return 0

    })

    actividadesOrdenadas.forEach(act => {

    const li = document.createElement("li")

    // convertir el valor guardado a fecha
    const fecha = new Date(act.fechaHora)
    const ahora = new Date()

    if (act.estado !== "completada" && fecha < ahora) {
    act.estado = "atrasada"
    }

    const dia = String(fecha.getDate()).padStart(2,"0")
    const mes = String(fecha.getMonth()+1).padStart(2,"0")
    const año = fecha.getFullYear()

    const hora = String(fecha.getHours()).padStart(2,"0")
    const minutos = String(fecha.getMinutes()).padStart(2,"0")

    const fechaFormateada = `${dia}-${mes}-${año} ${hora}:${minutos}`

    li.innerHTML = `

        <strong>${act.titulo}</strong>

        <p>Fecha: ${fechaFormateada}</p>

        <p>Estado: ${act.estado}</p>

        <button data-id="${act.id}" class="btnCompletar btn btn-success">
        Completar
        </button>

        <button data-id="${act.id}" class="btnEditar btn btn-primary">
        Editar
        </button>

        <button data-id="${act.id}" class="btnEliminar btn btn-danger">
        Eliminar
        </button>

    `
    if (act.estado === "completada") {

        li.style.textDecoration = "line-through"
        li.style.opacity = "0.6"

        const btnCompletar = li.querySelector(".btnCompletar")
        const btnEditar = li.querySelector(".btnEditar")

        if (btnCompletar) btnCompletar.style.display = "none"
        if (btnEditar) btnEditar.style.display = "none"

    }

    if (act.estado === "atrasada") {
        li.classList.add("atrasada")
    }   

    // Eventos de botones de cada actividad
    li.querySelector(".btnCompletar")?.addEventListener("click", () => {
        gestor.completarActividad(act.id)
        renderizar()
    })

    li.querySelector(".btnEliminar")?.addEventListener("click", () => {
        gestor.eliminarActividad(act.id)
        renderizar()
    })

    li.querySelector(".btnEditar")?.addEventListener("click", () => {

        mostrarFormulario(act)

    })

    listaActividades.appendChild(li)
    })
}


// Mostrar la hora al iniciar
mostrarHora(reloj)

// actualizar cada 30 segundos
setInterval(() => {

    mostrarHora(reloj)

    renderizar()

}, 15000)

// ========================
// Eventos de botones
// ========================


listaActividades.addEventListener("click", e => {

    const id = Number(e.target.dataset.id)

    if (e.target.classList.contains("btnCompletar")) {

        gestor.completarActividad(id)

        renderizar()

    }

})