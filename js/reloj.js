export async function obtenerHoraChile() {

    const respuesta = await fetch(
        "https://timeapi.bio/timeapi/time",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                region: "America/Santiago"
            })
        }
    )

    const datos = await respuesta.json()

    return new Date(datos.datetime)

}

export async function mostrarHora(relojElemento) {

    try {

        const horaChile = await obtenerHoraChile()

        const horaFormateada =
        horaChile.toLocaleString("es-CL", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })

        relojElemento.textContent =
        "Hora actual en Chile: " + horaFormateada

    } catch {

        relojElemento.textContent =
        "No se pudo obtener la hora"

    }

}