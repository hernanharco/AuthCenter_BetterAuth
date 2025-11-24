# 🛠️ 1. Preparación del Proyecto

## A. Instalación de Dependencias
Necesitas el paquete principal de BetterAuth, los adaptadores para Next.js y React, y las herramientas de base de datos (usaremos Prisma como ejemplo).
```
pnpm install better-auth better-auth/next-js better-auth/react
pnpm install @prisma/client prisma
pnpm install -D typescript @types/node ts-node # Si no los tienes ya
```

## B. Configuración de Prisma y la Base de Datos
### 1. Inicializa Prisma:

```pnpm dlx prisma init```
Para tener encuenta dlx es lo mismo que npx pero en el econosistema de pnpm

Esto creará la carpeta prisma con el archivo schema.prisma.

### 2. Define el Esquema: Debes agregar los modelos de datos que BetterAuth necesita: User y Session.

- Aviso: BetterAuth tiene un paquete de ayuda (better-auth/schema-prisma) que te da estos modelos, lo que simplifica mucho este paso.


# En tu archivo schema.prisma

```
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"  
}
        

// =================================================================
// MODELOS DE BETTERAUTH (Conjunto de Campos Estándar)
// =================================================================

model User {
  id                    String    @id @default(cuid())
  email                 String?   @unique
  emailVerified         DateTime?
  name                  String?
  image                 String?
  password              String?   // Campo hash de la contraseña

  // Relaciones
  sessions              Session[]
  accounts              Account[]
}

model Account {
  id                    String    @id @default(cuid())
  userId                String
  type                  String
  provider              String
  providerAccountId     String
  refresh_token         String?
  access_token          String?
  expires_at            Int?
  token_type            String?
  scope                 String?
  id_token              String?
  session_state         String?

  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id                    String    @id @default(cuid())
  sessionToken          String    @unique
  userId                String
  expires               DateTime
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt // 💡 Campo importante para la actividad

  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}

// Este es el modelo para tokens de un solo uso (verification, reset, magic links)
model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

```

### 3. Ejecuta las Migraciones (Si usas una base de datos relacional como PostgreSQL):

```pnpm dlx prisma migrate dev --name init_betterauth```

# 1️⃣ Crear proyecto en Supabase

Ve a https://app.supabase.com
 y crea una cuenta si no la tienes.

Haz clic en “New project”.

Llena los datos:

Project name: studioautcenter

Database password: elige una segura

Region: la más cercana a ti

Espera a que se cree el proyecto (puede tardar 1–2 minutos).

## 2️⃣ Obtener la DATABASE_URL

Le presionamos donde dice Connect en la parte central de la pantalla.

1- Debemos de acomodar los datos para que IPv4 se compatible en mi caso fue:
Method: Transaction pooler

Copia la URL de conexión “Connection string (PostgreSQL URL)”, se verá así:

### Connect to Supabase via connection pooling
DATABASE_URL="postgresql://postgres.zjsngxswdwwszrcvtngy:[YOUR-PASSWORD]@aws-1-eu-north-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

### Direct connection to the database. Used for migrations
DIRECT_URL="postgresql://postgres.zjsngxswdwwszrcvtngy:[YOUR-PASSWORD]@aws-1-eu-north-1.pooler.supabase.com:5432/postgres"


Ese es el valor que usaremos en .env.

## 3️⃣ Configurar tu proyecto

En tu proyecto de Next.js, abre el archivo .env y reemplaza o agrega:

DATABASE_URL="postgresql://postgres.zjsngxswdwwszrcvtngy:[YOUR-PASSWORD]@aws-1-eu-north-1.pooler.supabase.com:6543/postgres"

Reemplaza TU_PASSWORD por la que elegiste al crear el proyecto.

## 4️⃣ Ajustar prisma.config.ts

Tu archivo ya es compatible con Supabase, solo asegúrate de que esté así:

```
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {    
    url: env("DATABASE_URL"),
  },
});
```


## 5️⃣ Ejecutar la migración

Ahora sí, corre:
```
pnpm dlx prisma migrate dev --name init_betterauth
```

Prisma conectará con tu Supabase.

Creará las tablas según los modelos en schema.prisma.

La base de datos será persistente, no temporal como antes.

## 6️⃣ Confirmar que funciona

En Supabase, ve a Database → Tables

Deberías ver tus tablas User, Session, etc., según los modelos que copiaste.

comprobar la conexion
```
pnpm dlx prisma db pull
```

## 📝 El Estándar de la Industria

Por esta razón, la práctica estándar en el desarrollo moderno, especialmente con Supabase y Vercel/Next.js, es usar dos URL de conexión distintas:
| Variable       | Propósito                                      | Puerto | Usado Por                     |
|----------------|-----------------------------------------------|--------|-------------------------------|
| DIRECT_URL     | Operaciones CLI (Migraciones, Seeds)          | 5432   | Prisma CLI                    |
| DATABASE_URL   | Código de Aplicación (Consultas de la App)    | 6543   | Next.js/Aplicación            |


# Se presento un error de Conexion y para esto se instala
🔹 Opciones para probar la conexión a Supabase
# 1️⃣ Usar un cliente gráfico (recomendado)

pgAdmin: https://www.pgadmin.org/

DBeaver (gratuito y multiplataforma): https://dbeaver.io/

Pasos:

Instala pgAdmin o DBeaver.

Crea una nueva conexión PostgreSQL.

Rellena los datos de tu .env:

![alt text](image.png)

presiontamos probar conexion

Si funciona aquí, Prisma también debería conectarse.
______________