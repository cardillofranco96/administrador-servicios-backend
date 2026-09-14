# Sistema Backend de Turnos y Reservas

Este proyecto es una API backend completa para gestionar servicios y reservas, con persistencia en MongoDB Atlas, validaciones de entrada, relaciones entre entidades, vistas con Handlebars y actualizaciones en tiempo real con Socket.io.

## Funcionalidades principales

- CRUD completo de servicios
- CRUD completo de reservas
- asociación de reservas a servicios mediante ObjectId
- consultas con filtros, paginación y ordenamiento
- uso de `populate` para traer datos completos de servicios asociadas a reservas
- validación de entrada con Zod
- vistas simples con Handlebars
- actualizaciones en tiempo real con Socket.io

## Tecnologías

- Node.js
- Express
- MongoDB + Mongoose
- Handlebars
- Socket.io
- Zod
- Dotenv
- ESM (ES Modules)

## Requisitos

- Node.js 18 o superior
- MongoDB Atlas o una instancia MongoDB accesible
- npm

## Instalación

1. Clona el repositorio.
2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` a partir de `.env.example`:

```bash
copy .env.example .env
```

4. Completa las variables de entorno:

```env
PORT=8080
NODE_ENV=development
MONGODB_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/turnos-reservas
```

## Ejecutar la aplicación

### Producción

```bash
npm start
```

### Desarrollo

```bash
npm run dev
```

## Estructura del proyecto

```text
.
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── src/
    ├── app.js
    ├── config/
    │   └── env.config.js
    ├── controllers/
    │   ├── service.controller.js
    │   └── reservation.controller.js
    ├── dao/
    │   ├── service.dao.js
    │   └── reservation.dao.js
    ├── models/
    │   ├── Service.js
    │   └── Reservation.js
    ├── repositories/
    │   ├── service.repository.js
    │   └── reservation.repository.js
    ├── routes/
    │   ├── api.routes.js
    │   └── views.routes.js
    ├── services/
    │   ├── service.service.js
    │   └── reservation.service.js
    ├── views/
    │   ├── layouts/
    │   │   └── main.handlebars
    │   ├── home.handlebars
    │   └── services.handlebars
    └── socket/
        └── socket.js
```

## Endpoints principales

### Servicios

- `GET /api/services`
- `GET /api/services/:id`
- `POST /api/services`
- `PUT /api/services/:id`
- `DELETE /api/services/:id`

### Reservas

- `GET /api/reservations`
- `GET /api/reservations/:id`
- `POST /api/reservations`
- `PUT /api/reservations/:id`
- `DELETE /api/reservations/:id`

## Datos principales

### Servicio

```js
{
  name: 'Consulta médica',
  description: 'Atención médica general.',
  duration: 45,
  price: 1500,
  category: 'Salud',
  available: true
}
```

### Reserva

```js
{
  service: 'ObjectId del servicio',
  quantity: 2,
  customerName: 'Juan Pérez',
  date: '2026-09-15T10:00:00.000Z',
  status: 'pending'
}
```

## Ejemplo de uso

### Crear servicio

```bash
curl -X POST http://localhost:8080/api/services \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Corte de pelo",
    "description": "Servicio premium de corte y peinado.",
    "duration": 60,
    "price": 2000,
    "category": "Belleza",
    "available": true
  }'
```

### Crear reserva

```bash
curl -X POST http://localhost:8080/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "service": "64e1f58c92e9ae0d7f1c2ef1",
    "quantity": 2,
    "customerName": "Ana López",
    "date": "2026-09-15T10:00:00.000Z",
    "status": "pending"
  }'
```

## Notas

- No se sube el archivo `.env` ni `node_modules` al repositorio.
- Las credenciales de MongoDB deben mantenerse en variables de entorno.
- La app usa `populate` para consultar los servicios asociados a cada reserva.
- Socket.io permite actualizar disponibilidad y cambios en tiempo real.
