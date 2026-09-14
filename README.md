# Administrador de Servicios - Backend

Proyecto de ejemplo: API REST para gestionar `services` y `bookings`.

Características principales:
- Express con ESM
- Persistencia con MongoDB via Mongoose (opcional, configurable vía `MONGO_URI`)
- Rutas organizadas en routers y controllers
- Validaciones con Joi
- Vistas server-side con Handlebars
- Comunicación en tiempo real con Socket.io

Instalación

```bash
npm install
cp .env.example .env
# editar .env y completar MONGO_URI si se desea usar MongoDB
```

Ejecución

```bash
npm run dev
# luego abrir http://localhost:3000/views/services
```

APIs
- `GET /api/services` — lista servicios (acepta filtros: `category`, `available`, `page`, `limit`, `sortBy`, `order`)
- `GET /api/services/:sid`
- `POST /api/services`
- `PUT /api/services/:sid`
- `DELETE /api/services/:sid`
- `POST /api/bookings`
- `GET /api/bookings/:bid`
- `POST /api/bookings/:bid/services/:sid`

Vistas
- `GET /views/services` — lista de servicios (se actualiza vía Socket.io)
- `GET /views/availability` — lista de reservas

Git: sugerencia de commits y push

Nota: no puedo empujar (`git push`) desde aquí. Ejecuta los siguientes comandos localmente en tu máquina:

Inicializar y push inicial

```bash
# si aún no hay repo
git init
git branch -M main
# añade el remoto (reemplaza URL)
git remote add origin git@github.com:TU_USUARIO/TU_REPO.git
```

Commits sugeridos (ejecuta uno a la vez en este orden)

1) Scaffold y config básica
```bash
git add package.json src/app.js src/server.js src/config/env.config.js .env.example .gitignore
git commit -m "chore: scaffold express app, server and env config"
```

2) Services router + ServiceManager (inicial)
```bash
git add src/routes/services.router.js src/managers/ServiceManager.js src/data/services.json
git commit -m "feat(services): add services router and ServiceManager (FS)"
```

3) Controllers y bookings (managers, routers, controllers)
```bash
git add src/controllers src/managers/BookingManager.js src/routes/bookings.router.js src/data/bookings.json
git commit -m "feat(bookings): add BookingManager, bookings router and controllers"
```

4) Migración a MongoDB (models + managers adaptados)
```bash
git add src/models src/managers src/controllers/services.controller.js src/controllers/bookings.controller.js
git commit -m "feat(db): migrate persistence to MongoDB with Mongoose models and update managers"
```

5) Vistas, Socket.io y validaciones
```bash
git add src/views src/public src/routes/views.router.js src/controllers/views.controller.js src/middlewares/validate.js
git commit -m "feat(ui): add Handlebars views, Socket.io client and server + validation middleware"
```

6) Final touch / README
```bash
git add README.md
git commit -m "chore(docs): add README"
```

Push final

```bash
git push -u origin main
```

Si prefieres, puedo preparar un script `git-commands.sh` con estos pasos listos para ejecutar — dime si lo quieres.
# Administrador de Servicios

Aplicación de ejemplo para gestionar servicios con persistencia en un archivo JSON. Este proyecto ofrece un gestor centralizado para crear, listar, consultar, actualizar y eliminar servicios de forma segura y escalable.

## Descripción del proyecto

El sistema permite administrar una colección de servicios con la siguiente estructura:

```js
{
  id: 1,
  name: 'Desarrollo de sitio web',
  description: 'Diseño y desarrollo de una landing page profesional.',
  duration: 120,
  price: 2500,
  category: 'Web',
  available: true
}
```

### Estructura del objeto Service

- `id`: número único que identifica el servicio.
- `name`: nombre del servicio, obligatorio y no vacío.
- `description`: descripción formal del servicio, obligatoria y no vacía.
- `duration`: duración estimada en minutos, obligatoria y numérica.
- `price`: valor del servicio, obligatorio y numérico.
- `category`: categoría a la que pertenece el servicio, obligatoria y no vacía.
- `available`: indica si el servicio está disponible para contratación.

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

1. Clona o descarga el proyecto.
2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` basado en `.env.example`.

```bash
copy .env.example .env
```

4. Completa las variables de entorno:

```env
PORT=8080
NODE_ENV=development
```

## Variables de entorno

El proyecto carga las variables definidas en `.env` con `dotenv` y valida que existan antes de iniciar la aplicación.

### Archivo `.env.example`

```env
PORT=
NODE_ENV=
```

Si alguna de estas variables falta, la ejecución se interrumpe con un error descriptivo.

## Ejecución

### Producción

```bash
npm start
```

### Desarrollo

```bash
npm run dev
```

## Configuración de GitHub y repositorio

Este proyecto debe quedar asociado a la cuenta de GitHub `cardillofranco96` y no a otra cuenta. El remoto correcto es:

```bash
git@github.com:cardillofranco96/administrador-servicios-backend.git
```

Si tu entorno no tiene SSH configurado, puedes usar HTTPS en lugar de SSH:

```bash
https://github.com/cardillofranco96/administrador-servicios-backend.git
```

## Uso del gestor `ServiceManager`

### Importación

```js
import { ServiceManager } from './src/managers/ServiceManager.js';

const serviceManager = new ServiceManager();
```

### 1. Obtener todos los servicios

```js
const services = await serviceManager.getServices();
console.log(services);
```

### 2. Obtener servicio por ID

```js
const service = await serviceManager.getServiceById(1);
console.log(service);
```

### 3. Crear un servicio

```js
const newService = await serviceManager.addService({
  name: 'Diseño UX/UI',
  description: 'Diseño de interfaces orientadas a conversión.',
  duration: 90,
  price: 1800,
  category: 'Diseño',
  available: true
});

console.log(newService);
```

### 4. Actualizar un servicio

```js
const updatedService = await serviceManager.updateService(1, {
  name: 'Diseño UX/UI Premium',
  description: 'Diseño de interfaces con estrategia de conversión.',
  duration: 120,
  price: 2200,
  category: 'Diseño',
  available: false
});

console.log(updatedService);
```

> El campo `id` no puede modificarse mediante `updateService`.

### 5. Eliminar un servicio

```js
const deletedService = await serviceManager.deleteService(1);
console.log(deletedService);
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
    ├── data/
    │   └── services.json
    └── managers/
        └── ServiceManager.js
```

## Consideraciones

- La persistencia se realiza con `fs/promises` y un archivo JSON local.
- Los servicios se almacenan en `src/data/services.json`.
- El ID de cada servicio se genera de forma autoincremental.
- La validación de entorno se realiza al iniciar la aplicación.
