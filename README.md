# Itinerario de Viaje

Aplicación web desarrollada con Javascript que permite crear y gestionar actividades dentro de un itinerario de viaje.

El usuario puede agregar, editar, completar o eliminar actividades, además de visualizar si una actividad está atrasada según la fecha y hora actual.

## Funcionalidades principales

* Crear nuevas actividades con **nombre, fecha y hora**
* Editar actividades existentes
* Marcar actividades como **completadas**
* Eliminar actividades
* Detectar automáticamente **actividades atrasadas**
* Persistencia de datos mediante **LocalStorage**
* Visualización del **reloj actual de Chile**
* Animaciones **fade-in / fade-out** en el formulario
* Interfaz con **Bootstrap**

## Estados de las actividades

Cada actividad puede encontrarse en uno de los siguientes estados:

* **Pendiente** → Actividad programada para el futuro
* **Atrasada** → La fecha de la actividad ya pasó y no fue completada
* **Completada** → Actividad finalizada por el usuario

Las actividades completadas aparecen **tachadas y al final de la lista**.

## Tecnologías utilizadas

* HTML5
* CSS3
* JavaScript (ES Modules)
* Bootstrap
* LocalStorage

## Estructura del proyecto

```
itinerario-viaje
│
├── index.html
├── css
│   └── estilos.css
└── js
    ├── app.js
    ├── actividad.js
    ├── gestor.js
    └── reloj.js
```

### Descripción de los módulos

**app.js**
Controla la interfaz, el renderizado de actividades y los eventos del usuario.

**actividad.js**
Define la clase `Actividad` que representa cada actividad del itinerario.

**gestor.js**
Administra el listado de actividades, incluyendo agregar, editar, eliminar y guardar en LocalStorage.

**reloj.js**
Muestra la hora actual de Chile y permite actualizarla automáticamente.

## Posibles mejoras futuras
* Integrar APIs de horas de mas paises
* Ordenar actividades por proximidad de fecha
* Contador de actividades pendientes
* Notificaciones para actividades próximas
* Versión responsive mejorada
* Integración con base de datos

## Autor

Hector Lira
