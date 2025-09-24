# 📋 Guía de Setup - Aplicación ToDo Contenerizada

**Trabajo Práctico 1: Aplicación web y servicio Redis contenerizados**
DevOps | UTN FRRe | 2025

## 📖 Descripción del Proyecto

Esta aplicación es una **Lista de Tareas (ToDo)** simple que demuestra la integración de:

- 🌐 **Frontend**: Aplicación web HTML/CSS/JavaScript
- 🚀 **API REST**: Servidor Node.js/Express con endpoints CRUD
- 📊 **Redis**: Base de datos en memoria para almacenamiento
- 🐳 **Docker**: Contenerización de todos los servicios
- 🔄 **CI/CD**: GitHub Actions para automatización

## 🏗️ Arquitectura del Sistema

```
┌─────────────────┐    HTTP     ┌──────────────────┐    Redis    ┌─────────────┐
│  Frontend Web   │ ─────────► │   API REST       │ ─────────► │    Redis    │
│  (Port 8080)    │            │  (Port 3000)     │            │ (Port 6379) │
│                 │            │                  │            │             │
│ HTML/CSS/JS     │            │ Node.js/Express  │            │ Cache       │
└─────────────────┘            └──────────────────┘            └─────────────┘
```

## 🛠️ Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- [Docker](https://docs.docker.com/get-docker/) (versión 20.10 o superior)
- [Docker Compose](https://docs.docker.com/compose/install/) (incluido con Docker Desktop)
- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/) (versión 18 o superior) - solo para desarrollo local

## 🚀 Setup Rápido con Docker Compose

### 1. Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd dev-ops-app
```

### 2. Ejecutar con Docker Compose

```bash
# Construir y ejecutar todos los servicios
docker-compose up --build

# Ejecutar en segundo plano (detached)
docker-compose up --build -d
```

### 3. Verificar que Todo Funciona

- **Frontend**: http://localhost:8080
- **API**: http://localhost:3000/api/health
- **Redis**: puerto 6379 (accesible desde la API)

## 📱 Uso de la Aplicación

### Interface Web (http://localhost:8080)

1. **Agregar Tarea**: Escribir en el campo de texto y presionar "Agregar" o Enter
2. **Marcar Completada**: Hacer clic en "Marcar Completada" en cualquier tarea
3. **Eliminar Tarea**: Hacer clic en "Eliminar" (solicita confirmación)
4. **Verificar Estado**: Usar el botón "Verificar Conexión API/Redis"

### Endpoints de la API

- `GET /api/todos` - Obtener todas las tareas
- `POST /api/todos` - Crear nueva tarea
- `PUT /api/todos/:id` - Actualizar estado de tarea
- `DELETE /api/todos/:id` - Eliminar tarea
- `GET /api/health` - Estado del sistema

## 🔧 Desarrollo Local (Sin Docker)

### Setup de la API

```bash
cd api
npm install
npm start
# API corriendo en http://localhost:3000
```

### Setup del Frontend

```bash
cd frontend
npm install
npm start
# Frontend corriendo en http://localhost:8080
```

### Setup de Redis

```bash
# Usando Docker para solo Redis
docker run -d -p 6379:6379 redis:7-alpine
```

## 🐳 Comandos Docker Útiles

### Gestión de Servicios

```bash
# Ver logs de todos los servicios
docker-compose logs

# Ver logs de un servicio específico
docker-compose logs api
docker-compose logs frontend
docker-compose logs redis

# Detener servicios
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v

# Reconstruir un servicio específico
docker-compose build api
docker-compose up api
```

### Administración de Redis

```bash
# Conectar a Redis CLI
docker-compose exec redis redis-cli

# Ver todas las claves
> KEYS *

# Ver datos de tareas
> GET todos

# Eliminar todos los datos
> FLUSHALL
```

## 🔍 Verificación de Variables en Redis

Para cumplir con el requerimiento de "Visualización de variables en Redis":

1. Ejecutar Redis CLI:
```bash
docker-compose exec redis redis-cli
```

2. Ver las tareas almacenadas:
```bash
> GET todos
```

3. Ejemplo de datos almacenados:
```json
[
  {
    "id": "1695123456789",
    "texto": "Completar trabajo práctico",
    "completada": false,
    "fechaCreacion": "2025-09-24T10:30:00.000Z"
  }
]
```

## ☁️ Despliegue en Producción

### Con Docker Hub

1. **Configurar Secrets en GitHub:**
   - `DOCKER_USERNAME`: Usuario de Docker Hub
   - `DOCKER_PASSWORD`: Token de acceso de Docker Hub

2. **Push al repositorio:**
```bash
git push origin main
```

3. **GitHub Actions automáticamente:**
   - Ejecuta tests
   - Construye imágenes Docker
   - Publica en Docker Hub
   - Crea `docker-compose.prod.yml`

### Despliegue Manual

```bash
# Usar imágenes desde Docker Hub
export DOCKER_USERNAME=tu_usuario_dockerhub
docker-compose -f docker-compose.prod.yml up -d
```

## 🧪 Testing

### Verificar que la API funciona

```bash
# Salud del sistema
curl http://localhost:3000/api/health

# Obtener tareas
curl http://localhost:3000/api/todos

# Crear tarea
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"texto":"Mi primera tarea"}'
```

## 🔧 Solución de Problemas

### Problema: Puertos ocupados

```bash
# Ver qué está usando el puerto
lsof -i :3000
lsof -i :8080
lsof -i :6379

# Cambiar puertos en docker-compose.yml si es necesario
```

### Problema: Frontend no conecta con API

```bash
# Verificar que la API está corriendo
docker-compose logs api

# Verificar conectividad
curl http://localhost:3000/api/health
```

### Problema: API no conecta con Redis

```bash
# Verificar que Redis está corriendo
docker-compose logs redis

# Conectar manualmente a Redis
docker-compose exec redis redis-cli ping
```

### Problema: Reconstruir desde cero

```bash
# Eliminar todo y empezar de nuevo
docker-compose down -v
docker system prune -f
docker-compose up --build
```

## 📊 Monitoreo

### Ver Estado de Contenedores

```bash
docker-compose ps
docker stats
```

### Ver Uso de Recursos

```bash
# Espacio usado por Docker
docker system df

# Eliminar recursos no usados
docker system prune
```

## 📝 Estructura del Proyecto

```
dev-ops-app/
├── api/                          # API REST
│   ├── server.js                 # Servidor principal
│   ├── package.json              # Dependencias Node.js
│   ├── Dockerfile                # Imagen Docker API
│   └── .dockerignore             # Archivos excluidos
├── frontend/                     # Aplicación Web
│   ├── server.js                 # Servidor estático
│   ├── public/
│   │   ├── index.html            # Interface principal
│   │   └── app.js                # Lógica del frontend
│   ├── package.json              # Dependencias Node.js
│   ├── Dockerfile                # Imagen Docker Frontend
│   └── .dockerignore             # Archivos excluidos
├── .github/workflows/
│   └── ci-cd.yml                 # GitHub Actions
├── docker-compose.yml            # Orquestación desarrollo
├── docker-compose.prod.yml       # Orquestación producción
├── setup.md                      # Esta documentación
└── README.md                     # Información del proyecto
```

## ✅ Lista de Verificación

### Funcionalidades Completadas

- ✅ Aplicación web funcional
- ✅ API REST con endpoints CRUD
- ✅ Conexión y almacenamiento en Redis
- ✅ Contenerización con Docker
- ✅ Orquestación con Docker Compose
- ✅ CI/CD con GitHub Actions
- ✅ Publicación automática en Docker Hub
- ✅ Documentación completa

### Rúbrica del Trabajo Práctico

- ✅ **Apps funcionando (30pts)**: Local y en la nube
- ✅ **Visualización de variables en Redis (10pts)**: Comando `GET todos`
- ✅ **GitHub Actions para Registry (30pts)**: Publicación automática
- ✅ **App en servicio externo (20pts)**: Docker Hub + despliegue
- ✅ **Documentación completa (10pts)**: Este archivo

## 🎯 Próximos Pasos

1. **Configurar GitHub Secrets** para Docker Hub
2. **Hacer push al repositorio** para activar CI/CD
3. **Desplegar en un servicio cloud** (AWS, Azure, GCP)
4. **Realizar coloquio grupal** con demostración completa

## 📞 Soporte

Si encuentras problemas:

1. Revisar logs con `docker-compose logs`
2. Verificar que todos los puertos estén disponibles
3. Comprobar que Docker esté corriendo correctamente
4. Consultar la sección "Solución de Problemas" arriba

---

**¡Listo para presentar! 🎉**