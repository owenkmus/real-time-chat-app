# Aplicación de Chat en Tiempo Real (Node.js + Angular)

Este es un proyecto full-stack que implementa una aplicación de chat en tiempo real, construida siguiendo las mejores prácticas de arquitectura de software, seguridad y escalabilidad.

## El stack tecnológico incluye:

- **Backend**: Node.js, Express, Socket.IO, Sequelize (ORM) y MySQL.
- **Frontend**: Angular, Angular Material y Socket.IO Client.
- **Seguridad**: Autenticación basada en JSON Web Tokens (JWT).

---

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado el siguiente software en tu sistema:

- Node.js (versión 16 o superior)
- Angular CLI  
  ```bash
  npm install -g @angular/cli
  ```
- Git
- Un servidor de MySQL (puedes usar MySQL Community Server, XAMPP, etc.)

---

## Instalación y Puesta en Marcha

Sigue estos pasos para clonar y ejecutar el proyecto en tu máquina local.

### 1. Clonar el Repositorio

Primero, clona el repositorio desde GitHub a tu computadora:

```bash
git clone https://github.com/tu-usuario/nombre-del-repositorio.git
cd nombre-del-repositorio
```

### 2. Configuración del Backend

La terminal debe estar ubicada en la carpeta **chat-app-backend**.

```bash
cd chat-app-backend
```

#### a. Instalar Dependencias

Ejecuta el siguiente comando para instalar todas las librerías necesarias para el servidor:

```bash
npm install
```

#### b. Configurar la Base de Datos

1. Abre tu cliente de MySQL (MySQL Workbench, phpMyAdmin, etc.) y crea una nueva base de datos (schema) con el nombre:

```sql
CREATE DATABASE chat_app_db;
```

2. En la raíz de la carpeta `chat-app-backend`, crea un archivo llamado `.env`.

3. Copia el contenido de `.env.example` o usa la siguiente plantilla y llénala con tus credenciales de MySQL:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=tu_contraseña_de_mysql
DB_NAME=chat_app_db
PORT=3000

JWT_ACCESS_SECRET=un-secreto-muy-seguro
JWT_REFRESH_SECRET=otro-secreto-diferente

FRONTEND_URL=http://localhost:4200
```

#### c. Iniciar el Servidor Backend

Ejecuta el siguiente comando para iniciar el servidor:

```bash
npm run dev
```

👉 Si todo está correcto, verás un mensaje en la consola indicando que el servidor está corriendo en el puerto **3000** y que la base de datos se ha conectado exitosamente.

---

### 3. Configuración del Frontend

Abre una nueva terminal y ubícate en la carpeta **chat-app-frontend**.

```bash
cd chat-app-frontend
```

#### a. Instalar Dependencias

Ejecuta el siguiente comando para instalar todas las librerías de Angular:

```bash
npm install
```

👉 Si es la primera vez, también instala Angular Material:

```bash
ng add @angular/material
```

#### b. Iniciar la Aplicación Frontend

Ejecuta el siguiente comando para compilar e iniciar la aplicación:

```bash
ng serve --open
```

👉 Tu navegador se abrirá automáticamente en [http://localhost:4200](http://localhost:4200), donde verás la página de inicio de sesión de la aplicación de chat.

---

## ✅ ¡Y eso es todo! 

Ya tienes el entorno completo funcionando 🚀
