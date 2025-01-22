# Base de Proyectos Micro Frontends

## Secciones
- [Descripción General](#descripción-general)
- [Submódulo Compartido: `sasf-commons`](#submódulo-compartido-sasf-commons)
- [Estructura General del Proyecto](#estructura-general-del-proyecto)
- [Get Started](#get-started)
- [Compartimiento de estados](#compartimiento-de-estados)
- [Styling](#styling)
- [Entornos de trabajao](#entornos-de-trabajo)
- [Leamos sobre el submódulo](#leamos-sobre-el-submódulo)
- [Estado de la aplicación](#estado-de-la-aplicación)

## Descripción General

Este repositorio entrega dos proyectos principales:

### **1. Host**
El proyecto Host actúa como la base principal y el router de la aplicación. Dentro del Host encontrarás:

- **Componentes principales** para el layout y el routing principal de la aplicación.
- Lógica de autenticación (Auth).
- **Dashboard principal**, que sirve como el punto de entrada para los usuarios.
- **Redirección a los routers de cada micro frontend**: Cada vez que se agregue un nuevo micro frontend, deberá configurarse aquí.

#### **Comando para clonar el proyecto Host:**
```bash
git clone --recursive <<url>>
```

---

### **2. Remote Example**
El Remote Example es un ejemplo de un micro frontend que se conecta al Host. Este proyecto contiene:

- Un sistema de routing específico para el micro frontend.
- Un componente exportado que será utilizado por el Host.

#### **Comando para clonar el proyecto Remote Example:**
```bash
git clone --recursive <<url>>
```

---

### **Submódulo Compartido: `sasf-commons`**
Ambos proyectos comparten un submódulo de Git llamado `sasf-commons`, que está ubicado en la carpeta `src/`.

Este submódulo incluye:

- **Componentes React compartidos**, que son esenciales para los distintos micro frontends.
- Utilidades y hooks comunes que facilitan el desarrollo de funcionalidades consistentes entre los proyectos.

Para más detalles sobre `sasf-commons`, consulta la documentación en:
[<<url>>/blob/main/README.md](<<url>>/blob/main/README.md)

---

## Estructura General del Proyecto
La estructura básica del proyecto es la siguiente:

```plaintext
.
├── host/                   # Proyecto principal Host
│   ├── src/                # Código fuente del Host
│   │   ├── layout/         # Componentes principales del layout
│   │   ├── pages/          # Páginas específicas del Host
│   │   ├── AppRouting.tsx  # Configuración de rutas del Host
│   │   └── sasf-commons/   # Submódulo compartido
│   └── webpack.config.js   # Configuración de Webpack
│
├── remote-example/         # Ejemplo de micro frontend
│   ├── src/                # Código fuente del Remote Example
│   │   ├── components/     # Componentes propios del Remote
│   │   ├── pages/          # Páginas específicas del Remote
│   │   ├── AppRouting.tsx  # Configuración de rutas del Remote
│   │   └── sasf-commons/   # Submódulo compartido
│   └── webpack.config.js   # Configuración de Webpack
│
└── sasf-commons/           # Submódulo compartido
    ├── hooks/              # Hooks reutilizables
    ├── utils/              # Utilidades comunes
    ├── components/         # Componentes React compartidos
    ├── otros componentes...
    └── README.md           # Documentación del submódulo
```
---

# Get Started

### Clonar los Repositorios
1. Clona el repositorio principal Host:
   ```bash
   git clone --recursive <<url>>
   cd <<nombre carpeta clonada>>
   npm install
   ```

2. Clona el repositorio Remote Example para personalizarlo como nuevo micro frontend:
   ```bash
   git clone --recursive <<url>>
   cd <<nombre carpeta clonada>>
   npm install
   ```

*Nota:* Es importante utilizar `npm` para evitar manejar dependencias alteradas.

### Personalizar el Micro Frontend (En caso de nuevo micro-front)
**Antes de empezar:** en esta sección se refiere a *nombre* pero su término adecuado es scope, hace referencia a un identificador único para cada micro front end que conforma la apliación.
## *En el proyecto remoto:*
#### 1. Cambiar la variable de entorno `APP_NAME_SCOPE` tanto para `.env` y `.env.local`.
Modifica el nombre `microapp` por el nombre deseado del micro frontend:
```bash
APP_NAME_SCOPE=nuevomicroapp
# Adicional modificar el puerto de tu aplicación (Asegúrate de que sea un puerto no ocupado antes por otro micro front end)
APP_PORT=<<tu-puerto>>
```
*Nota:* Es importante que esté en minusculas, este es el scope que se le agregara en el micro front, podríamos definirlo como identificador único.

#### 2. Actualizar el `package.json`
Cambia el nombre del paquete:
```json
"name": "nuevoMicroapp",
```

#### 3. Renombrar el Routing Exportado
Cambia `RemoteRouting` por `{NombreMicroFront}Routing.tsx` y asegúrate de exportarlo por defecto:
```javascript
export default {NombreMicroFront}Routing;
```
*Nota importante:* Debe estar exportado por defecto para que webpack pueda reconocer el functional componet exportado.

#### 4. Actualizar el `webpack.config.js` para el Routing
Modifica la sección `exposes` para reflejar el nuevo nombre del Routing micro front-end:
```javascript
exposes: {
  "./{NombreMicroFront}Routing": "./src/app/{NombreMicroFront}Routing",
},
```

## *En el proyecto host:*

#### 5. Dentro del archivo `AppRouting.tsx` importar el nuevo componente como una nueva ruta

Usaremos el componente `LoadRemote` para cargar el nuevo micro frontend, asignándole una ruta predeterminada, por ejemplo `/nuevomicro/*`. Cada vez que accedan a esta ruta, redirigirá al routing del nuevo micro frontend remoto.

- En el prop `scope`, debemos asignar exactamente el mismo identificador que configuramos en la variable de entorno `APP_NAME_SCOPE` del micro frontend remoto.
- En el prop `remoteUrl`, debemos especificar la URL donde se encuentra activo el nuevo micro frontend, seguido del path de `remoteEntry.js`.
- Finalmente, en el prop `module`, debemos referenciar el archivo expuesto en el archivo `webpack.config.js` del remoto.

Ejemplo de implementación:

```tsx
<Route
  path="/nuevomicro/*"
  element={
    <LoadRemote
      scope="microapp"
      remoteUrl={`${process.env.MF_NUEVAAPP_URL}/remoteEntry.js`}
      module="./RemoteRouting"
    />
  }
/>
```
#### 6. Ejecutar los proyectos
Sitúate en la raíz de cada proyecto y ejecuta el siguiente comando para correrlos:
```bash
npm start
```

*Nota importante:* Cada micro frontend es independiente y puede levantarse por separado. El Host no genera dependencia para sus hijos, por lo que puedes desarrollar cada proyecto de manera aislada. Sin embargo, para corroborar cambios dentro de un micro frontend, se recomienda levantar ambos proyectos (el proyecto Host y el proyecto remoto donde se realizaron los cambios).

---

# Compartimiento de estados

El **store** se decidió dejar en el módulo compartido `sasf-commons` y trabajamos con **Redux**. Esto permite compartir el estado global entre los distintos micro frontends.

### Ejemplo de Selector
Para acceder a un estado global:
```typescript
import { useSelector } from 'react-redux';
import { RootState } from '~/store';

const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
```

### Ejemplo de Dispatch
Para modificar el estado global:
```typescript
import { useDispatch } from 'react-redux';
import { login } from '~/store/authSlice';

const dispatch = useDispatch();
dispatch(login({
  isAuthenticated: true,
  token: 'token-example',
  username: 'username-example',
  roles: ['ADMIN'],
}));
```

---

# Styling

La aplicación utiliza un enfoque modular para los estilos, basado en variables de entorno y configuraciones globales. El archivo de configuración de estilos se encuentra en el submódulo `sasf-commons`, en la ruta `/config/tailwind.theme.js`.

### Variables de Entorno
Estas son las principales variables utilizadas para manejar estilos en modo claro y oscuro:
```css
:root {
  --primary: theme('colors.primary.light');
  --secondary: theme('colors.secondary.light');
  --font: theme('colors.font.light');
  --hover: theme('colors.hover.light');
  --bg: theme('colors.background.light');
  --error: theme('colors.error.light');
  --warning: theme('colors.warning.light');
  --success: theme('colors.success.light');
  --info: theme('colors.info.light');
  --focus: theme('colors.focus.light');
  --highlight: theme('colors.highlight.light');
  --placeholder: theme('colors.placeholder.light');
  --border: theme('colors.border.light');
}

.dark {
  --primary: theme('colors.primary.dark');
  --secondary: theme('colors.secondary.dark');
  --font: theme('colors.font.dark');
  --hover: theme('colors.hover.dark');
  --bg: theme('colors.background.dark');
  --error: theme('colors.error.dark');
  --warning: theme('colors.warning.dark');
  --success: theme('colors.success.dark');
  --info: theme('colors.info.dark');
  --focus: theme('colors.focus.dark');
  --highlight: theme('colors.highlight.dark');
  --placeholder: theme('colors.placeholder.dark');
  --border: theme('colors.border.dark');
}
```

### Ejemplos de Uso
Para aplicar estilos, utiliza las variables personalizadas:
```html
<div class="text-[var(--font)] bg-[var(--bg)] border-[var(--border)]">
  Contenido estilizado dinámicamente
</div>
```

Otros ejemplos comunes:
```html
<button class="bg-[var(--primary)] text-[var(--font)] hover:bg-[var(--hover)] focus:ring-[var(--focus)]">
  Botón estilizado
</button>

<input class="border-[var(--border)] placeholder:text-[var(--placeholder)] focus:border-[var(--focus)]" />
```

---

# Entornos de trabajo
Tanto como para el proyecto host como para el proyecto remoto, se usan dos entornos, desarrollo y producción.
* **Desarrollo:** Debemos asegurarnos de guardar las variables en el archivo `.env.local`.
* **Producción:** Debemos asegurarnos de guardar las variables en el archivo `.env`.

---

# Leamos sobre el submódulo
Para más información, consulta la documentación del submódulo:  
[https://github.com/JosthinAyonC/sasf-commons/blob/main/README.md](https://github.com/JosthinAyonC/sasf-commons/blob/main/README.md)


---
# Estado de la aplicación
Para el estado de la aplicación nos manejamos con slices personalizados.

Los slices personalizados deben ser gestionados exclusivamente dentro de los micro frontends que los requieran. Esto se debe a que los estados pueden variar entre diferentes aplicaciones, y cada micro frontend tiene necesidades específicas en cuanto a la estructura y manejo de su estado global.

## **¿Por qué no en `sasf-commons`?**

El submódulo sasf-commons es una librería compartida entre múltiples proyectos, y su propósito principal es proporcionar componentes, hooks y utilidades comunes. Personalizar esta librería con estados específicos de una aplicación podría causar conflictos y falta de modularidad, ya que:
1. Independencia de micro frontends: Cada micro frontend puede tener estados únicos que no se aplican a otros.
2. Evolución del estado: Los requisitos de estado pueden cambiar entre aplicaciones, y centralizarlos en sasf-commons limitaría la capacidad de escalabilidad.
3. Separación de responsabilidades: sasf-commons no debe ser responsable de la lógica específica de los micro frontends.

## Implementación

Los slices personalizados deben ser creados en el directorio `src/state/slices/` dentro de cada micro frontend correspondiente a la aplicación o en cada micro front end que sea necesario. Por ejemplo, si necesitas manejar información específica del usuario en una aplicación, el slice debe estar definido como:
```javascript
import userSlice from './slices/userDataSlice';

const microappslices = {
    // Aquí se van a ir agregando los slices personalizados de la aplicación.
    user: userSlice,
};

export default microappslices;
```
A medida que más slices sean necesarios, estos se agregarán en este archivo para mantener un manejo claro y modular del estado.

## Ejemplo práctico:
Se implementa un estado de aplicación que nos ayude con la información de licenciatario dentro de la aplicación **CGLASS.** Se procede a implementar un slice que se llame `licenciatarioSlice` y servirá solamente para la aplicación CGLASS, esto no afectará el comportamiendo de la libreria que se encontrará implementada en otros proyectos, por ejemplo **SASF TARIFARIO** porque ahi no es necesario hacerlo.