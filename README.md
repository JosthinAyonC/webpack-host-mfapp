# Base de Proyectos Micro Frontends

## Secciones
- [Descripción General](#descripción-general)
- [Submódulo Compartido: `sasf-commons`](#submódulo-compartido-sasf-commons)
- [Estructura General del Proyecto](#estructura-general-del-proyecto)
- [Get Started](#get-started)
- [Leamos sobre el submódulo](#leamos-sobre-el-submódulo)
- [Compartimiento de estados](#compartimiento-de-estados)

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
   cd host
   npm install
   ```

2. Clona el repositorio Remote Example para personalizarlo como nuevo micro frontend:
   ```bash
   git clone --recursive <<url>>
   cd remote-example
   npm install
   ```

*Nota:* Es importante utilizar `npm` para evitar manejar dependencias alteradas.

### Personalizar el Micro Frontend (En caso de nuevo micro-front)

#### 1. Cambiar el `ModuleFederationPlugin` en `webpack.config.js`
Modifica el nombre `microapp` por el nombre deseado del micro frontend:
```javascript
name: "nuevoMicroapp",
```

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

#### 4. Actualizar el `webpack.config.js` del remoto para el Routing
Modifica la sección `exposes` para reflejar el nuevo nombre del Routing micro front-end:
```javascript
exposes: {
    "./{NombreMicroFront}Routing": "./src/app/{NombreMicroFront}Routing",
},
```

#### 5. Ejecutar los proyectos
Sitúate en la raíz de cada proyecto y ejecuta el siguiente comando para correrlos:
```bash
npm start
```

*Nota importante:* Cada micro frontend es independiente y puede levantarse por separado. El Host no genera dependencia para sus hijos, por lo que puedes desarrollar cada proyecto de manera aislada. Sin embargo para corroborar cambios dentro de un micr-front, se recomienda levantar ambos proyectos (El proyecto host y el proyecto remoto donde se realizaron los cambios).

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

# Leamos sobre el submódulo
Para más información, consulta la documentación del submódulo:  
[https://github.com/JosthinAyonC/sasf-commons/blob/main/README.md](https://github.com/JosthinAyonC/sasf-commons/blob/main/README.md)
