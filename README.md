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
