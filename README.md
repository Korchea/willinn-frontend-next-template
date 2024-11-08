# Prueba Tecnica Willinn Frontend Next.js React Typescript

Este proyecto es una aplicación de gestión de usuarios creada con **Next.js**, **React**, y **TypeScript**. La aplicación permite iniciar sesión y acceder a un panel de administración donde se pueden agregar, editar, buscar y eliminar usuarios de forma interactiva y rápida. La aplicación también está diseñada para integrarse con un backend que proporciona una API REST para la autenticación y el manejo de usuarios.

## Tecnologías utilizadas

- **Next.js**: Framework de React para la creación de aplicaciones web optimizadas, con soporte para generación de contenido en tiempo real y navegación rápida.
- **React**: Biblioteca de JavaScript para construir interfaces de usuario interactivas.
- **TypeScript**: Superset de JavaScript que permite añadir tipos estáticos, facilitando el mantenimiento y escalabilidad del código.
- **Tailwind CSS**: Framework de CSS para un diseño rápido y eficiente de componentes estilizados.
- **REST API**: La aplicación se conecta a un backend mediante API REST para gestionar datos de usuarios y autenticación.
- **Docker** (Opcional): La configuración de Docker permite ejecutar tanto el frontend como el backend en contenedores.

## Características principales

1. **Inicio de Sesión**: La página de inicio redirige automáticamente al usuario al formulario de inicio de sesión.
2. **Dashboard**: Accesible solo tras iniciar sesión correctamente.
   - **Lista de Usuarios**: Visualización de todos los usuarios en formato de lista con opciones para editar y eliminar.
   - **Búsqueda de Usuarios**: Filtra usuarios por ID y muestra resultados específicos en la lista.
   - **Agregar Usuario**: Formulario para crear nuevos usuarios, incluyendo campos como nombre, apellido, email, y una opción para activar/desactivar la cuenta.
   - **Editar Usuario**: Funcionalidad para modificar los atributos de un usuario existente.
3. **Actualización Dinámica**: Tras crear, editar o eliminar un usuario, la lista se actualiza automáticamente sin necesidad de recargar la página.
4. **Mensajes de Error y Validación**: Muestra errores personalizados en caso de credenciales incorrectas o problemas de conexión.

## Configuración del Proyecto

### Pre-requisitos

- **Node.js** (Versión recomendada: 18.x o superior)
- **NPM** o **Yarn** para gestionar dependencias
- **Backend API** en .NET Core con endpoints para autenticación y CRUD de usuarios (puede usarse con Docker para facilitar la configuración).

### Instalación

1. Clona el repositorio en tu máquina local:
   ```bash
   git clone https://github.com/Korchea/willinn-frontend-next-template.git
   ```

2. Navega a la carpeta del proyecto:
   ```bash
   cd willinn-frontend-next-template
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

### Configuración de API Backend

Para conectar la aplicación frontend con el backend yo utilice `https://github.com/Korchea/Willinn-backend-api-template` ejecutandolo en local:

1. Asegúrate de que tu backend esté en ejecución y accesible en la URL `https://localhost:44369/api/Users`.
2. La aplicación hará solicitudes de autenticación y manejo de usuarios a esta URL.

### Ejecutar la Aplicación en Desarrollo

Para iniciar la aplicación en modo de desarrollo:

```bash
npm run dev
```

Esto ejecutará la aplicación en `http://localhost:3000` de forma predeterminada. Puedes acceder a ella desde tu navegador.

### Ejecución en Producción

Para preparar la aplicación para producción:

```bash
npm run build
```

Luego puedes iniciar el servidor de producción:

```bash
npm start
```

Si deseas usar Docker puedes utilizar en el root del repo el comando:

```bash
docker-compose up --build
```

## Estructura de Carpetas

```plaintext
├── public                 # Archivos públicos como imágenes y fuentes
│   └── WillinnLogo.svg    # Logo de la aplicación
├── src/app
│       ├── login          # Página de inicio de sesión
│       ├── dashboard      # Página del dashboard con funcionalidades CRUD
│       └── page.tsx       # Página inicial con redirección al login
├── .dockerignore
├── .gitignore
├── next.config.js         # Configuración de Next.js
├── package.json           # Dependencias y scripts
├── tsconfig.json          # Configuración de TypeScript
└── tailwind.config.ts     # Configuración de Tailwind CSS
```

## API REST

La aplicación interactúa con una API REST que permite:

- **POST /api/Users/login**: Iniciar sesión.
- **POST /api/Users**: Crear un nuevo usuario.
- **GET /api/Users/{id}**: Obtener la información de un usuario por ID.
- **PUT /api/Users/{id}**: Editar la información de un usuario.
- **DELETE /api/Users/{id}**: Eliminar un usuario.

## Autor

- Template: Rodrigo Mato - [GitHub](https://github.com/RodrigoMato00)
- App: Guillermo Vega - [GitHub](https://github.com/Korchea)