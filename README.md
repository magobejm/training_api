# Training API

API REST para gestión de entrenamiento personal construida con NestJS + Prisma + PostgreSQL.

## Requisitos

- Node.js 20+
- PostgreSQL en ejecución
- npm (o pnpm)

## Arranque del proyecto

1. Instalar dependencias:

```bash
npm install
```

2. Configurar variables de entorno:

```bash
cp .env.example .env
```

Variables mínimas en `.env`:

```env
PORT=3000
DATABASE_URL="postgresql://user:password@localhost:5432/training_db?schema=public"
JWT_SECRET="cambia-este-valor-en-produccion"
```

3. Aplicar migraciones de base de datos:

```bash
npx prisma migrate deploy
```

Para entorno local de desarrollo también puedes usar:

```bash
npx prisma migrate dev
```

4. (Opcional) Cargar datos iniciales:

```bash
npm run seed:all
```

5. Arrancar la API:

```bash
npm run start:dev
```

La API queda disponible en `http://localhost:3000`.

## Funcionalidades actuales publicadas

### Salud

- `GET /health`: estado del servicio.

### Autenticacion y cuenta

- `POST /auth/register`: registro de usuario.
- `POST /auth/login`: login y obtencion de JWT.
- `POST /auth/change-password`: cambio de password (requiere JWT).
- `POST /auth/forgot-password`: inicio de recuperacion de password.
- `POST /auth/reset-password`: reset de password por token.
- `GET /auth/profile`: perfil del usuario autenticado.

### Usuarios

- `GET /users`: listado de usuarios activos.
- `GET /users/:id`: detalle de usuario.
- `DELETE /users/:id`: borrado logico de usuario.

### Administracion (solo rol ADMIN)

- `POST /admin/trainers`: alta de trainer.
- `GET /admin/trainers`: listado de trainers.
- `DELETE /admin/trainers/:id`: baja logica de trainer.
- `POST /admin/trainers/:id/reset-password`: reseteo de password de trainer.

### Ejercicios

- `POST /exercises`: crear ejercicio.
- `GET /exercises`: listar ejercicios.
- `GET /exercises/:id`: obtener ejercicio.
- `PATCH /exercises/:id`: actualizar ejercicio.
- `DELETE /exercises/:id`: eliminar ejercicio.

### Planes de entrenamiento

- `POST /training-plans`: crear plan.
- `GET /training-plans`: listar planes del usuario.
- `GET /training-plans/:id`: detalle de plan.
- `POST /training-plans/:id/days`: agregar dia al plan.
- `POST /training-plans/:planId/days/:dayId/exercises`: agregar ejercicio al dia.

### Sesiones de entrenamiento

- `POST /sessions/start`: iniciar sesion.
- `POST /sessions/:sessionId/sets`: registrar serie.
- `PATCH /sessions/:sessionId/complete`: completar sesion.
- `GET /sessions/:sessionId`: detalle de sesion.
- `GET /sessions`: historial de sesiones (con filtros).

### Metricas corporales y fotos de progreso

- `POST /body-metrics`: registrar metrica corporal.
- `GET /body-metrics`: historial de metricas.
- `POST /body-metrics/photos`: registrar foto de progreso.
- `GET /body-metrics/photos`: listar fotos de progreso.
- `DELETE /body-metrics/photos/:photoId`: eliminar foto.

### Consultas cliente-trainer

- `POST /consultations`: crear consulta.
- `GET /consultations`: listar consultas.
- `GET /consultations/:consultationId`: detalle de consulta.
- `POST /consultations/:consultationId/messages`: enviar mensaje.
- `PATCH /consultations/:consultationId/resolve`: marcar como resuelta.

### Agenda de entrenamientos

- `POST /scheduled-workouts`: programar entrenamiento.
- `GET /scheduled-workouts`: ver agenda futura.
- `PATCH /scheduled-workouts/:workoutId`: reprogramar entrenamiento.
- `DELETE /scheduled-workouts/:workoutId`: cancelar entrenamiento.

## Scripts utiles

```bash
npm run start:dev
npm run build
npm run start:prod
npm run test
npm run test:e2e
npm run test:cov
npm run seed:all
```

## Licencia

Este proyecto se distribuye bajo **Apache License 2.0**.

Apache 2.0 permite usar, copiar, modificar y distribuir el software (incluido uso comercial), siempre que se conserve el aviso de copyright y la licencia, y se indiquen cambios relevantes.
