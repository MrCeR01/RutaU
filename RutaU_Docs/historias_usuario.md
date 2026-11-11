# 📋 Historias de Usuario y Criterios de Aceptación - RutaU

Mapeo de requerimientos con base en la documentación oficial de la I.U. Pascual Bravo:
*Archivo de referencia:* `RutaU_13_Historias_Epicas_Criterios (2).xlsx` y `Proyecto de Software - RutaU (1).docx`.

---

## 📌 Épica 1: Autenticación y Verificación Institucional

### 🔹 HU-01: Registro con Correo de Dominio Institucional
- **Rol:** Estudiante pasajero o conductor universitario.
- **Quiero:** Registrarme en la plataforma utilizando mi correo institucional `@pascualbravo.edu.co`.
- **Para:** Garantizar el acceso exclusivo de la comunidad universitaria y evitar usuarios externos sin validar.
- **Criterios de Aceptación:**
  - Solo se admiten correos con dominio `@pascualbravo.edu.co` o dominios universitarios oficiales (`.edu`, `.edu.co`).
  - Se rechazan correos comerciales (`gmail.com`, `hotmail.com`, `yahoo.es`).
- **Implementación Técnica:** Regex en frontend (`app.jsx` y `app.js`), restricciones CHECK en Supabase (`check_institutional_email`).

### 🔹 HU-02: Verificación de Identidad por Código
- **Épica:** `EP-01 Autenticación y Verificación Institucional`
- **Rol:** Estudiante pasajero o conductor universitario.
- **Quiero:** Ingresar un código de verificación enviado a mi correo institucional.
- **Para:** Activar mi cuenta y confirmar mi vinculación activa con la universidad.
- **Historia Completa:**
  > *"Como estudiante pasajero o conductor universitario, quiero ingresar un código de verificación enviado a mi correo institucional para activar mi cuenta y confirmar mi vinculación activa con la universidad."*
- **Criterios de Aceptación:**
  - Al completar el formulario de registro, el sistema genera un código de seguridad numérico de 6 dígitos enviado al correo institucional.
  - La interfaz presenta una pantalla dedicada de verificación con formato OTP (6 dígitos) y simulación visual de la bandeja institucional Pascual Bravo.
  - Si el código es correcto, la cuenta se marca como activa (`verified: true`), se firma un token criptográfico JWT (HS256 con validez de 8 horas) y se da acceso a la plataforma.
  - Si el código es erróneo, se muestra una alerta visual y se permite reenviar el código tras un temporizador de 30 segundos.
- **Implementación Técnica:** Paso `verify_code` en `AuthRegisterModal`, método `handleConfirmVerification`, validación cruzada con `generatedCode` y emisión JWT en `JWTService.sign()`.

### 🔹 HU-03: Configuración de Perfil Institucional
- **Épica:** `EP-01 Autenticación y Verificación Institucional`
- **Rol:** Estudiante pasajero o conductor universitario.
- **Quiero:** Completar mi perfil con nombre, facultad y zona residencial de destino.
- **Para:** Ser reconocido en la comunidad y recibir coincidencias de ruta pertinentes.
- **Historia Completa:**
  > *"Como estudiante pasajero o conductor universitario, quiero completar mi perfil con nombre, facultad y zona residencial de destino para ser reconocido en la comunidad y recibir coincidencias de ruta pertinentes."*
- **Criterios de Aceptación:**
  - El usuario puede configurar y editar en cualquier momento su nombre completo, facultad/programa académico, rol y zona residencial de destino habitual.
  - La zona residencial configurada se utiliza para calcular **coincidencias de ruta pertinentes**: las rutas de la cartelera cuyo destino o paradas intermedias coincidan con su sector muestran el badge destacado `🎯 Coincide con tu zona residencial`.
  - La cartelera incluye un filtro rápido en un clic `🎯 Mis Coincidencias ([Zona])` para ver instantáneamente los trayectos hacia su barrio.
  - Si es conductor, permite configurar los datos del vehículo (marca, modelo, placa y capacidad de cupos).
- **Implementación Técnica:** Componente `InstitutionalProfileModal`, acceso desde el avatar y botón `Mi Perfil` en `Navbar`, persistencia en `rutau_current_user` / `rutau_registered_users` y motor de coincidencia en `TripFeed` / `TripCard`.

---

## 📌 Épica 2: Publicación y Exploración de Trayectos Nocturnos

### 🔹 HU-04: Publicar Trayecto Colaborativo
- **Criterio de Aceptación:** El conductor elige sede de salida (**Campus Robledo** o **Sede C4TA San Javier**), destino por dirección o seleccionándolo directamente en el mapa Leaflet, horario nocturno, asientos disponibles y aporte de combustible.

### 🔹 HU-05: Cartelera Nocturna con Filtros y Mapa
- **Criterio de Aceptación:** Búsqueda por zona residencial, facultad, hora mínima y filtro por sede (`Campus Robledo` / `Sede C4TA San Javier`). Vista dividida en tarjetas y mapa satelital/urbano.

### 🔹 HU-06: Estimación Justa de Gasolina
- **Criterio de Aceptación:** Comparación automática frente a tarifas comerciales (Taxi/Uber) evidenciando ahorros del ~75%.

---

## 📌 Épica 3: Reservas y Paradas Intermedias (Regla 3 Paradas)

### 🔹 HU-07: Solicitud de Cupo con Parada Intermedia
- **Criterio de Aceptación:** Cada pasajero puede solicitar **1 parada intermedia** sobre el recorrido (máximo 3 paradas en total por trayecto).
- **Implementación:** `BookingModal` controla el contador de paradas `(X/3)`. Al llegar a 3, bloquea nuevas solicitudes y permite bajarse en destino final o paradas ya existentes.

### 🔹 HU-08: Visualización de Paradas en el Mapa
- **Criterio de Aceptación:** Las paradas intermedias solicitadas se marcan con pines ámbar numerados `[1]`, `[2]`, `[3]` sobre la línea de ruta en el mapa interactivo.

---

## 📌 Épica 4: Seguridad y Acompañamiento Campus

### 🔹 HU-09: Botón SOS de Emergencia
- **Criterio de Aceptación:** Cuenta regresiva de 5 segundos con cancelación para falsas alarmas, conectando con vigilancia institucional (01 8000 42 22 22).

### 🔹 HU-10: Compartir por WhatsApp
- **Criterio de Aceptación:** Envío instantáneo de los datos del viaje, vehículo, conductor y paradas acordadas a compañeros y familiares.
