# 📋 Historias de Usuario y Criterios de Aceptación - RutaU

Mapeo de requerimientos con base en la documentación oficial de la I.U. Pascual Bravo:
*Archivo de referencia:* `RutaU_13_Historias_Epicas_Criterios (2).xlsx` y `Proyecto de Software - RutaU (1).docx`.

---

## 📌 Épica 1: Autenticación y Verificación Institucional (EP-01)

### 🔹 HU-01: Registro con Correo de Dominio Institucional
- **Rol:** Estudiante pasajero o conductor universitario.
- **Quiero:** Registrarme en la plataforma utilizando mi correo institucional `@pascualbravo.edu.co`.
- **Para:** Garantizar el acceso exclusivo de la comunidad universitaria y evitar usuarios externos sin validar.
- **Criterios de Aceptación:**
  - Solo se admiten correos con dominio institucional `@pascualbravo.edu.co` o dominios universitarios oficiales (`.edu`, `.edu.co`).
  - Se rechazan correos comerciales (`gmail.com`, `hotmail.com`, `yahoo.es`).
- **Implementación Técnica:** Regex en frontend (`app.jsx` y `app.js`), restricciones CHECK en Supabase (`check_institutional_email`).

### 🔹 HU-02: Verificación de Identidad por Código (OTP)
- **Rol:** Estudiante pasajero o conductor universitario.
- **Quiero:** Ingresar un código de verificación enviado a mi correo institucional.
- **Para:** Activar mi cuenta y confirmar mi vinculación activa con la universidad.
- **Criterios de Aceptación:**
  - Al registrarse, el sistema genera un código OTP numérico de 6 dígitos con simulación visual de la bandeja institucional.
  - La cuenta se activa con credencial criptográfica JWT (HS256 con 8 horas de vigencia).
  - Incluye temporizador de 30 segundos para reenvío de código y alertas de código erróneo.
- **Implementación Técnica:** Paso `verify_code` en `AuthRegisterModal`, método `handleConfirmVerification` y firma con `JWTService.sign()`.

### 🔹 HU-03: Configuración de Perfil Institucional y Coincidencia de Rutas
- **Rol:** Estudiante pasajero o conductor universitario.
- **Quiero:** Completar mi perfil con nombre, facultad y zona residencial de destino habitual.
- **Para:** Ser reconocido en la comunidad y recibir coincidencias de ruta pertinentes.
- **Criterios de Aceptación:**
  - Configuración y edición de nombre completo, facultad/programa, rol (conductor/pasajero), zona residencial de destino y datos vehiculares.
  - Motor de coincidencia de rutas pertinentes: resalta con badge `🎯 Coincide con tu zona residencial` y habilita el filtro de 1 clic `🎯 Mis Coincidencias`.
- **Implementación Técnica:** Componente `InstitutionalProfileModal`, sincronización en estado local/Supabase y motor reactivo en `TripFeed` y `TripCard`.

---

## 📌 Épica 2: Publicación y Exploración de Trayectos Nocturnos (EP-02)

### 🔹 HU-04: Publicar Trayecto Colaborativo desde Campus
- **Rol:** Conductor universitario verificado.
- **Quiero:** Publicar una ruta nocturna seleccionando la sede de salida (**Campus Robledo** o **Sede C4TA San Javier**).
- **Para:** Compartir los cupos de mi vehículo con compañeros que se dirijan a mi misma zona residencial.
- **Criterios de Aceptación:**
  - Selector dual de destino: por dirección escrita o haciendo clic directamente sobre el mapa interactivo de Medellín.
  - Registro de hora de salida nocturna (desde las 21:00 hrs), cupos disponibles y detalles del vehículo.

### 🔹 HU-05: Cartelera Nocturna y Visualización Cartográfica
- **Rol:** Pasajero universitario.
- **Quiero:** Consultar las rutas salientes en una vista dividida con mapa interactivo de alta resolución.
- **Para:** Elegir el trayecto más conveniente y seguro para retornar a mi hogar.
- **Criterios de Aceptación:**
  - Visualización sincronizada en tiempo real de tarjetas de viaje y mapa interactivo Leaflet.
  - Alternador de capas cartográficas: mapa vial detallado (`Esri Streets`) y fotografía satelital de alta resolución (`Esri World Imagery`).

### 🔹 HU-06: Filtros de Búsqueda y Destinos Frecuentes
- **Rol:** Pasajero o conductor universitario.
- **Quiero:** Filtrar rutas por zona de residencia, facultad, hora de salida y sede de partida.
- **Para:** Encontrar de manera ágil los viajes pertinentes con botones de acceso rápido para sectores principales (Bello, Robledo, Laureles, Envigado, Sabaneta, San Javier, Centro).

---

## 📌 Épica 3: Reservas, Paradas Intermedias y Combustible (EP-03)

### 🔹 HU-07: Solicitud de Cupo y Parada Intermedia (Regla de Máximo 3 Paradas)
- **Rol:** Estudiante pasajero.
- **Quiero:** Solicitar un cupo en un trayecto y definir hasta 1 parada intermedia sobre la ruta.
- **Para:** Desembarcar en un punto seguro más cercano a mi lugar de residencia.
- **Criterios de Aceptación:**
  - Cada pasajero puede solicitar como máximo **1 parada intermedia**.
  - El sistema impone un límite estricto de **máximo 3 paradas acordadas por viaje**, garantizando eficiencia y puntualidad en el retorno nocturno.
  - Al completarse las 3 paradas, los siguientes pasajeros solo pueden elegir el destino final o descender en una de las paradas ya establecidas.

### 🔹 HU-08: Estimación Justa y Reparto Solidario de Combustible
- **Rol:** Conductor y pasajero universitario.
- **Quiero:** Conocer el aporte sugerido de combustible por cupo según kilometraje y consumo promedio.
- **Para:** Cubrir los gastos de viaje de manera justa y sin ánimo de lucro comercial.
- **Criterios de Aceptación:**
  - Cálculo transparente del costo por cupo ($5.000 - $8.000 COP) evidenciando ahorros de ~75% frente a tarifas de taxi o plataformas comerciales.

### 🔹 HU-09: Comprobante Digital de Viaje
- **Rol:** Estudiante pasajero o conductor.
- **Quiero:** Generar un comprobante digital institucional con el desglose del aporte, datos del vehículo y punto de encuentro.
- **Para:** Respaldar la coordinación del viaje y contar con un registro digital auditable.
- **Implementación Técnica:** Componente `DigitalReceiptModal` con código de reserva, punto de encuentro en campus, ahorro generado y botón para compartir vía WhatsApp.

---

## 📌 Épica 4: Calidad, Seguridad y Acompañamiento Campus (EP-04)

### 🔹 HU-10: Calificación Comunitaria e Índice de Confianza (1 a 5 Estrellas)
- **Rol:** Pasajero o conductor.
- **Quiero:** Calificar a mi compañero de viaje tras finalizar el trayecto.
- **Para:** Fortalecer el índice de reputación y confianza de la comunidad institucional.
- **Criterios de Aceptación:**
  - Puntuación de 1 a 5 estrellas con métricas específicas de puntualidad en portería y respeto/convivencia.
  - Comentarios opcionales visibles para el historial de la comunidad.
- **Implementación Técnica:** Componente `ReviewRatingModal` y recálculo reactivo del promedio de reputación.

### 🔹 HU-11: Botón de Alarma SOS con Cancelación de 5 Segundos
- **Rol:** Miembro de la comunidad en trayecto.
- **Quiero:** Activar una señal de auxilio inmediata desde cualquier pantalla de la aplicación.
- **Para:** Alertar sobre cualquier situación sospechosa o percance en la vía.
- **Criterios de Aceptación:**
  - Cuenta regresiva de 5 segundos con botón de cancelación inmediata para evitar falsas alarmas.

### 🔹 HU-12: Despacho y Enlace con Central de Seguridad Institucional
- **Rol:** Comunidad universitaria.
- **Quiero:** Que la alarma SOS transmita las coordenadas GPS y datos institucionales a vigilancia del Pascual Bravo.
- **Para:** Recibir acompañamiento inmediato y coordinación con el cuadrante de policía.
- **Criterios de Aceptación:**
  - Enlace telefónico a la central de vigilancia (01 8000 42 22 22 / Ext. 100 y 102) e identificación de puntos iluminados de salida.

### 🔹 HU-13: Compartir Trayecto y Reporte de Llegada por WhatsApp
- **Rol:** Estudiante pasajero o conductor.
- **Quiero:** Compartir los detalles del viaje por WhatsApp en un solo clic.
- **Para:** Mantener informados a familiares y compañeros sobre la ruta, conductor, vehículo y hora estimada de llegada.
- **Criterios de Aceptación:**
  - Generación de enlace con texto enriquecido con datos del trayecto institucional y reporte de llegada segura.
