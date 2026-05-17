<h1 align="center">EasySpa</h1>

<p align="center">
Plataforma web de reservas para spas
</p>

<p align="center">

<img src="https://img.shields.io/badge/React-Frontend-blue">
<img src="https://img.shields.io/badge/Laravel-Backend-red">
<img src="https://img.shields.io/badge/MySQL-Database-orange">
<img src="https://img.shields.io/badge/TypeScript-Language-blue">
<img src="https://img.shields.io/badge/API-GoogleCalendar-green">

</p>

---

# 📚 Índice

- [📖 Descripción del proyecto](#-descripción-del-proyecto)
- [✨ Funcionalidades principales](#-funcionalidades-principales)
- [🛠 Tecnologías utilizadas](#-tecnologías-utilizadas)
- [⚙ Características técnicas implementadas](#-características-técnicas-implementadas)
- [🔗 Integración con APIs externas](#-integración-con-apis-externas)
- [📁 Estructura del proyecto](#-estructura-del-proyecto)
- [🚀 Instalación del proyecto](#-instalación-del-proyecto)
- [🔐 Roles del sistema](#-roles-del-sistema)
- [🌟 Funcionalidades destacadas](#-funcionalidades-destacadas)
- [📸 Capturas](#-capturas)
- [🔮 Mejoras futuras](#-mejoras-futuras)
- [👨‍💻 Autor](#-autor)

---

# 📖 Descripción del proyecto

EasySpa es una aplicación web desarrollada como Trabajo de Fin de Grado (TFG) orientada a la gestión y reserva de servicios de spa.

La plataforma permite a los clientes realizar reservas online de forma sencilla, mientras que las empresas pueden administrar empleados, servicios, horarios y reservas desde un panel de gestión.

El proyecto está desarrollado utilizando una arquitectura frontend + backend desacoplada.

---

# ✨ Funcionalidades principales

## 👤 Clientes

- Registro e inicio de sesión
- Visualización de spas disponibles
- Reserva de servicios
- Gestión de perfil
- Historial de reservas
- Recepción de emails automáticos
- Descarga de PDF de confirmación

---

## 🏢 Empresas / Webmasters

- Gestión de empleados
- Gestión de categorías
- Gestión de servicios
- Gestión de horarios
- Gestión de reservas
- Calendario visual
- Activación/desactivación de registros
- Panel administrativo protegido

---

# 🛠 Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| React | Frontend |
| TypeScript | Desarrollo frontend |
| Vite | Entorno de desarrollo y build tool |
| Laravel | Backend |
| MySQL | Base de datos |
| Sanctum | Autenticación |
| Axios | Peticiones HTTP |
| Bootstrap | Estilos |
| DomPDF | Generación de PDFs |
| Google Calendar API | Integración externa |

---

# ⚙ Características técnicas implementadas

- Arquitectura SPA desacoplada
- API REST
- Autenticación mediante tokens
- Autorización por roles
- Validación frontend y backend
- Relaciones entre modelos
- Uso de Eager Loading
- CRUDs completos
- Envío de emails
- Generación de PDFs
- Persistencia con localStorage
- Paginación
- Calendario de reservas
- Integración con APIs externas

---

# 🔗 Integración con APIs externas

## 📅 Google Calendar API

La aplicación integra la API de Google Calendar para sincronizar automáticamente las reservas realizadas por los clientes.

Gracias a esta integración:

- Las reservas pueden añadirse automáticamente al calendario
- Los usuarios reciben invitaciones de calendario
- Mejora la organización y gestión de citas
- Facilita la planificación de servicios y horarios

---

# 📁 Estructura del proyecto

```bash
easy_spa/
│
├── app/
├── bootstrap/
├── config/
├── database/
├── public/
├── resources/
│   ├── js/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── router/
│   │   ├── services/
│   │   ├── types/
│   │   └── app.tsx
│   │
│   ├── css/
│   └── views/
│
├── routes/
├── storage/
├── tests/
├── vite.config.js
└── ...
```

La aplicación utiliza una arquitectura integrada con Laravel + React + Vite, donde el backend y frontend conviven dentro del mismo proyecto.

Laravel gestiona la API REST, autenticación y lógica del servidor, mientras que React se encuentra dentro de `resources/js` y se encarga de toda la interfaz de usuario mediante una SPA (Single Page Application).

---

# 🚀 Instalación del proyecto

## 1️⃣ Clonar repositorio

```bash
git clone https://github.com/usuario/easyspa.git
```

---

## 2️⃣ Configuración del backend


### Instalar dependencias

```bash
composer install
```

### Configurar entorno

```bash
cp .env.example .env
```

### Generar clave

```bash
php artisan key:generate
```

### Ejecutar migraciones

```bash
php artisan migrate
```

### Iniciar servidor Laravel

```bash
php artisan serve
```

---

## 3️⃣ Configuración del frontend

### Instalar dependencias

```bash
npm install
```

### Ejecutar frontend

```bash
npm run dev
```

---

# 🔐 Roles del sistema

## 👤 Cliente

Puede realizar reservas de cualquier spa y gestionar su perfil.

---


## 🏢 Admin

Puede administrar su spa desde el panel de gestión.

---
## 🏢 Webmaster

Puede administrar completamente todos los spas desde el panel de gestión.

---

# 🌟 Funcionalidades destacadas

## 📅 Sistema de reservas

Los clientes pueden reservar servicios seleccionando:

- Spa
- Servicio
- Empleado que realizará el servicio
- Fecha y hora

---

## 🗓 Calendario de reservas

Los administradores disponen de un calendario visual para controlar las reservas del spa.

---

## 📧 Sistema de emails

El sistema envía automáticamente emails de confirmación tras realizar una reserva.

Además, el email incluye un botón interactivo que permite al usuario añadir automáticamente la reserva a Google Calendar mediante la integración con la Google Calendar API.

Gracias a esta funcionalidad:

- El usuario puede guardar la cita en su calendario personal
- Se mejora la organización y seguimiento de reservas
- Se facilita la gestión de horarios y recordatorios
- Se ofrece una experiencia más cómoda y profesional

---

## 📄 Generación de PDFs

Cada reserva genera un PDF descargable con los detalles de la cita.

---
## 🔔 Sistema de recordatorios

La aplicación envía automáticamente recordatorios por email un día antes de la reserva programada.

Esta funcionalidad se implementa mediante tareas programadas en Laravel, permitiendo:

- Reducir ausencias y olvidos
- Mejorar la organización de los clientes
- Facilitar la gestión de citas
- Automatizar la comunicación con los usuarios

---

# 🔮 Mejoras futuras

- Sistema de pagos online
- Valoraciones y reseñas
- Chat de soporte en tiempo real
- Multiidioma y soporte internacional

---

# 👨‍💻 Autor

Desarrollado por Islena Polo Franco 
Trabajo de Fin de Grado – Desarrollo de Aplicaciones Web

---

<p align="center">
TFG DAW 2026 · EasySpa
</p>
