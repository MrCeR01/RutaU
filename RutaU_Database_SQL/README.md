# 🗄️ RutaU | Módulo de Base de Datos y Backend SQL (Supabase / PostgreSQL)

Este directorio contiene las definiciones de datos, restricciones de integridad institucional, esquemas relacionales, políticas de seguridad por fila (RLS), disparadores automáticos y datos semilla del proyecto **RutaU** (Institución Universitaria Pascual Bravo).

---

## 📁 Archivos Incluidos

| Archivo | Descripción |
| :--- | :--- |
| `supabase_schema.sql` | Esquema DDL completo con 9 tablas (`campuses`, `profiles`, `vehicles`, `trips`, `trip_stops`, `bookings`, `reviews`, `sos_alerts`, `live_tracking`), extensiones UUID, triggers de actualización automática y políticas RLS. |
| `seed_data.sql` | Inserción de datos iniciales verídicos para las sedes oficiales (Campus Robledo y Sede C4TA San Javier), usuarios conductores y estudiantes, vehículos, rutas nocturnas y paradas acordadas. |

---

## 🏛️ Cobertura de Reglas de Negocio en SQL

1. **Restricción de Correo Institucional:**
   - La tabla `profiles` cuenta con una restricción `CHECK (email LIKE '%@%.edu%' OR email LIKE '%@pascualbravo.edu.co%')` para garantizar acceso exclusivo a la comunidad universitaria.
2. **Sedes Oficiales (Campus Robledo y Sede C4TA San Javier):**
   - La tabla `campuses` modela las sedes autorizadas con sus coordenadas GPS y puntos de encuentro oficiales.
3. **Regla de 3 Paradas Intermedias (1 por pasajero):**
   - La tabla `trip_stops` tiene restricción de unicidad `UNIQUE(trip_id, passenger_id)` garantizando que ningún pasajero fije más de una parada intermedia.
   - El disparador `trg_max_three_stops` valida en cada inserción que el número total de paradas por trayecto no supere 3.
4. **Descuento Automático de Cupos:**
   - El disparador `on_booking_status_change` descuenta o reintegra asientos disponibles en `trips` según el estado de la reserva.
5. **Seguridad a Nivel de Fila (RLS):**
   - Políticas para que los conductores gestionen sus rutas, los pasajeros vean sus reservas y el personal de vigilancia atienda alertas SOS.

---

## 🚀 Cómo Ejecutar en Supabase

1. Inicia sesión en tu consola de [Supabase](https://supabase.com).
2. Abre el **SQL Editor**.
3. Copia y ejecuta primero el contenido de `supabase_schema.sql`.
4. Luego copia y ejecuta el contenido de `seed_data.sql`.
5. ¡Listo! Las tablas, políticas de seguridad y datos de prueba quedarán activos de inmediato.

