# 📋 Historias de Usuario y Criterios de Aceptación - RutaU

Mapeo de requerimientos con base en la documentación oficial de la I.U. Pascual Bravo:
*Archivo de referencia:* `RutaU_13_Historias_Epicas_Criterios (2).xlsx` y `Proyecto de Software - RutaU (1).docx`.

---

## 📌 Épica 1: Autenticación y Verificación Institucional
- **HU-01: Registro con Correo de Dominio Institucional**
  - *Criterio de Aceptación:* Solo se aceptan correos del dominio `@pascualbravo.edu.co` o dominios universitarios válidos. Se rechazan correos comerciales (`gmail.com`, `hotmail.com`).
  - *Implementación:* Validado con regex y restricciones CHECK en Supabase.
- **HU-02: Inicio de Sesión y Roles**
  - *Criterio de Aceptación:* El usuario selecciona su rol (estudiante pasajero o conductor con vehículo).
  - *Implementación:* `AuthLoginModal` y `AuthRegisterModal` con cambio visual dinámico según rol.
- **HU-03: Perfil Comunitario y Reputación**
  - *Criterio de Aceptación:* Visualización de facultad, promedio de estrellas y número de trayectos completados.

---

## 📌 Épica 2: Publicación y Exploración de Trayectos Nocturnos
- **HU-04: Publicar Trayecto Colaborativo**
  - *Criterio de Aceptación:* El conductor elige sede de salida (**Campus Robledo** o **Sede C4TA San Javier**), destino por dirección o seleccionándolo directamente en el mapa Leaflet, horario nocturno, asientos disponibles y aporte de combustible.
- **HU-05: Cartelera Nocturna con Filtros y Mapa**
  - *Criterio de Aceptación:* Búsqueda por zona residencial, facultad, hora mínima y filtro por sede (`Campus Robledo` / `Sede C4TA San Javier`). Vista dividida en tarjetas y mapa satelital/urbano.
- **HU-06: Estimación Justa de Gasolina**
  - *Criterio de Aceptación:* Comparación automática frente a tarifas comerciales (Taxi/Uber) evidenciando ahorros del ~75%.

---

## 📌 Épica 3: Reservas y Paradas Intermedias (Regla 3 Paradas)
- **HU-07: Solicitud de Cupo con Parada Intermedia**
  - *Criterio de Aceptación:* Cada pasajero puede solicitar **1 parada intermedia** sobre el recorrido (máximo 3 paradas en total por trayecto).
  - *Implementación:* `BookingModal` controla el contador de paradas `(X/3)`. Al llegar a 3, bloquea nuevas solicitudes y permite bajarse en destino final o paradas ya existentes.
- **HU-08: Visualización de Paradas en el Mapa**
  - *Criterio de Aceptación:* Las paradas intermedias solicitadas se marcan con pines ámbar numerados `[1]`, `[2]`, `[3]` sobre la línea de ruta en el mapa interactivo.

---

## 📌 Épica 4: Seguridad y Acompañamiento Campus
- **HU-09: Botón SOS de Emergencia**
  - *Criterio de Aceptación:* Cuenta regresiva de 5 segundos con cancelación para falsas alarmas, conectando con vigilancia institucional (01 8000 42 22 22).
- **HU-10: Compartir por WhatsApp**
  - *Criterio de Aceptación:* Envío instantáneo de los datos del viaje, vehículo, conductor y paradas acordadas a compañeros y familiares.

