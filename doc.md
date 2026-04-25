# Documentación Técnica - LogísticaApp

## Backend (Java/Spring Boot)

### Estructura de Paquetes

- `com.logistica.app.config`: Configuración de seguridad (Spring Security).
- `com.logistica.app.controller`: Endpoints REST que devuelven JSON.
- `com.logistica.app.model`: Clases Entidad que mapean las tablas de la DB.
- `com.logistica.app.repository`: Interfaces JPA para el acceso a datos.
- `com.logistica.app.service`: Lógica de negocio y procesamiento de datos.

### Inventario de Archivos - Backend

- **pom.xml**: Configuración de Maven y dependencias del proyecto (Spring Boot, JPA, Security, Postgres).
- **application.properties**: Parámetros de conexión a la DB y configuración de Hibernate.
- **LogisticaAppApplication.java**: Clase principal que arranca el servidor.
- **SecurityConfig.java**: Reglas de acceso, roles (admin/usuario) y configuración de contraseñas (Texto Plano para facilitar pruebas).
- **Entidades (Model)**: `Agencia.java`, `Camion.java`, `Producto.java`, `Porte.java`, `UsuarioWeb.java`. Mapeo objeto-relacional.
- **Repositorios**: `AgenciaRepository.java`, `CamionRepository.java`, `ProductoRepository.java`, `PorteRepository.java`, `UsuarioWebRepository.java`. Acceso a datos.
- **Servicios**:
  - `PorteService.java`: Gestión de portes y cálculo de estadísticas complejas.
  - `UsuarioWebService.java`: Registro y gestión de usuarios con seguridad.
  - `UserDetailsServiceImpl.java`: Adaptador para el login de Spring Security.
- **Controladores**:
  - `PorteController.java`: Endpoints para el CRUD y estadísticas de portes.
  - `UsuarioWebController.java`: API para administración de usuarios y perfil actual.
  - `AuxiliarController.java`: Endpoints para rellenar desplegables de formularios.

## Frontend (Vanilla JS)

### Tecnologías

- **Bootstrap 5**: Estructura, modales, tablas y responsividad.
- **Chart.js**: Visualización de datos logística mediante gráficos.
- **Fetch API**: Peticiones asíncronas al Backend.

### Inventario de Archivos - Frontend

- **index.html**: Página de entrada con el formulario de Login.
- **dashboard.html**: Panel de control principal (SPA) con el Dashboard y Estadísticas. Protegida por seguridad.
- **css/style.css**: Estilos personalizados para el tema oscuro, scrollbars y sidebar.
- **js/app.js**: Lógica completa del cliente: navegación, renderizado dinámico, filtros y gestión de eventos.

## Otros Archivos

- **plan_ejecucion.md**: Seguimiento de las fases de desarrollo.
- **Diseño_app.md**: Especificaciones originales del diseño y base de datos.
- **DETALLE DE EJECUCIÓN.md**: Requisitos funcionales detallados.

### Estructura de Carpetas (Tree)

```text
├───.vscode                 --> Configuración de Visual Studio Code
├───src                     --> Código fuente del proyecto
│   └───main
│       ├───java            --> Clases de Java (Backend)
│       │   └───com
│       │       └───logistica
│       │           └───app
│       │               ├───config      --> Configuración de seguridad y beans
│       │               ├───controller  --> Controladores de la API REST
│       │               ├───model       --> Entidades de base de datos (JPA)
│       │               ├───repository  --> Interfaces de acceso a datos
│       │               └───service     --> Lógica de negocio y estadísticas
│       └───resources
│           └───static      --> Archivos del Frontend
│               ├───css     --> Estilos CSS personalizados
│               └───js      --> Lógica JavaScript (Fetch, Chart.js)
└───target                  --> Archivos compilados y generados por Maven
```

## Estructura de Ficheros Detallada

```text
src/main/java/com/logistica/app/
├── LogisticaAppApplication.java    --> [Backend] Clase principal para arrancar Spring Boot
├── config/
│   └── SecurityConfig.java         --> [Backend] Configuración de seguridad, roles y login
├── controller/
│   ├── AuxiliarController.java     --> [Backend] API para datos de desplegables (combos)
│   ├── PorteController.java        --> [Backend] API para el CRUD y estadísticas de portes
│   └── UsuarioWebController.java   --> [Backend] API para gestión de usuarios
├── model/
│   ├── Agencia.java                --> [Backend] Entidad de Agencias de transporte
│   ├── Camion.java                 --> [Backend] Entidad de Camiones
│   ├── Porte.java                  --> [Backend] Entidad central de Portes/Servicios
│   ├── Producto.java               --> [Backend] Entidad de Catálogo de Productos
│   └── UsuarioWeb.java             --> [Backend] Entidad de Usuarios del sistema
├── repository/
│   ├── AgenciaRepository.java      --> [Backend] Acceso a datos de Agencias
│   ├── CamionRepository.java       --> [Backend] Acceso a datos de Camiones
│   ├── PorteRepository.java        --> [Backend] Acceso a datos de Portes
│   ├── ProductoRepository.java     --> [Backend] Acceso a datos de Productos
│   └── UsuarioWebRepository.java   --> [Backend] Acceso a datos de Usuarios
└── service/
    ├── AgenciaService.java         --> [Backend] Lógica de negocio para Agencias
    ├── CamionService.java          --> [Backend] Lógica de negocio para Camiones
    ├── PorteService.java           --> [Backend] Lógica principal: portes y estadísticas
    ├── ProductoService.java        --> [Backend] Lógica de negocio para Productos
    ├── UserDetailsServiceImpl.java --> [Backend] Servicio de autenticación de seguridad
    └── UsuarioWebService.java      --> [Backend] Lógica de gestión de usuarios

src/main/resources/
├── application.properties          --> [Backend] Configuración de DB y parámetros del server
└── static/
    ├── index.html                  --> [Frontend] Pantalla de Login (Inicio)
    ├── dashboard.html              --> [Frontend] Aplicación principal (Panel de Control)
    ├── css/
    │   └── style.css               --> [Frontend] Hoja de estilos (Tema Oscuro)
    └── js/
        └── app.js                  --> [Frontend] Lógica del cliente, Fetch y Gráficos
```
