-- ====================================================================
-- PROYECTO RUTAU - DATOS SEMILLA (SEED DATA)
-- Institución Universitaria Pascual Bravo
-- Incluye sedes oficiales (Robledo y C4TA San Javier), usuarios y rutas nocturnas
-- ====================================================================

-- 1. Sedes Oficiales
INSERT INTO public.campuses (id, name, short_name, address, lat, lng, description, meeting_points)
VALUES 
  ('robledo', 'Campus Principal Robledo', 'Campus Robledo', 'Calle 73 #73A-226, Vía El Volador', 6.2755, -75.5908, 
   'Campus principal institucional con porterías vigiladas por Calle 73 y Bloque 10.', 
   ARRAY['Portería Principal Calle 73 (Bloque 2)', 'Parqueadero de Motos Bloque 10', 'Bahía Frente a Biblioteca', 'Salida Peatonal Cra 78']),
  ('c4ta', 'Ciudadela Universitaria C4TA', 'Sede C4TA San Javier', 'Calle 44 #98-20, San Javier', 6.252965, -75.614174, 
   'Ciudadela Universitaria para la Cuarta Revolución Industrial y la Transformación del Aprendizaje.', 
   ARRAY['Calle 44 #98-20 (Portería Principal)', 'Bahía Estación Metro San Javier', 'Parqueadero Bloque Tecnológico'])
ON CONFLICT (id) DO NOTHING;

-- 2. Perfiles Universitarios de Ejemplo
INSERT INTO public.profiles (id, email, full_name, faculty, role, residential_zone, phone, rating_average, trips_completed, verified)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'cristian.guzman@pascualbravo.edu.co', 'Cristian Guzmán', 'Tecnología en Desarrollo de Software', 'conductor', 'Bello', '+57 300 123 4567', 4.9, 34, TRUE),
  ('00000000-0000-0000-0000-000000000002', 'joveidy.villarreal@pascualbravo.edu.co', 'Joveidy Villarreal', 'Ingeniería de Software', 'pasajero', 'Castilla', '+57 311 987 6543', 5.0, 12, TRUE),
  ('00000000-0000-0000-0000-000000000003', 'carlos.mendoza@pascualbravo.edu.co', 'Carlos Mendoza', 'Ingeniería Mecánica', 'conductor', 'Laureles / San Javier', '+57 320 555 7890', 4.8, 25, TRUE),
  ('00000000-0000-0000-0000-000000000004', 'valentina.henao@pascualbravo.edu.co', 'Valentina Henao', 'Tecnología en Diseño y Producción', 'conductor', 'Envigado / Sabaneta', '+57 301 444 1122', 4.9, 18, TRUE),
  ('00000000-0000-0000-0000-000000000005', 'mateo.osorio@pascualbravo.edu.co', 'Mateo Osorio', 'Ingeniería Eléctrica', 'pasajero', 'Poblado / Aguacatala', '+57 315 222 3344', 4.9, 8, TRUE),
  ('00000000-0000-0000-0000-000000000006', 'andres.quintero@pascualbravo.edu.co', 'Andrés Quintero', 'Ingeniería Industrial', 'conductor', 'Robledo / Facultad Minas', '+57 318 777 9900', 4.7, 14, TRUE)
ON CONFLICT (id) DO NOTHING;

-- 3. Vehículos de Conductores
INSERT INTO public.vehicles (id, user_id, vehicle_type, brand, model, license_plate, color, total_capacity, soat_valid)
VALUES
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'auto', 'Chevrolet Onix', '2023', 'PBV-202', 'Gris Platino', 4, TRUE),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', 'moto', 'Yamaha FZ 250', '2022', 'UIR-88E', 'Azul Eléctrico', 1, TRUE),
  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000004', 'auto', 'Renault Kwid', '2024', 'KWD-401', 'Blanco Glaciar', 3, TRUE),
  ('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000006', 'auto', 'Mazda 2', '2021', 'MZB-303', 'Rojo Diamante', 3, TRUE)
ON CONFLICT (id) DO NOTHING;

-- 4. Trayectos Nocturnos Salientes
INSERT INTO public.trips (id, driver_id, origin_campus, origin_meeting_point, destination_zone, destination_address, dest_lat, dest_lng, departure_time, status, total_seats, available_seats, distance_km, estimated_total_gas, suggested_seat_price)
VALUES
  ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'robledo', 'Campus Robledo • Portería Principal Calle 73 (Bloque 2)', 'Bello', 'Estación Bello Metro / Parque de Bello', 6.3370, -75.5570, NOW() + INTERVAL '2 hours', 'programado', 4, 2, 12.5, 14000.00, 3500.00),
  ('20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', 'robledo', 'Campus Robledo • Parqueadero de Motos Bloque 10', 'Laureles / San Javier', 'Parque de Laureles / Segundo Parque', 6.2440, -75.5960, NOW() + INTERVAL '2 hours 15 minutes', 'programado', 1, 1, 9.0, 6000.00, 3000.00),
  ('20000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000004', 'c4ta', 'Sede C4TA San Javier • Calle 44 #98-20 (Portería Principal)', 'Envigado / Sabaneta', 'Parque Principal de Envigado / Éxito', 6.1700, -75.5830, NOW() + INTERVAL '1 hour 45 minutes', 'programado', 3, 2, 14.2, 12000.00, 4000.00),
  ('20000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000006', 'c4ta', 'Sede C4TA San Javier • Bahía Estación Metro San Javier', 'Robledo / Facultad Minas', 'Facultad de Minas UNAL / Pilarica', 6.2730, -75.5920, NOW() + INTERVAL '2 hours 5 minutes', 'programado', 3, 3, 7.8, 9000.00, 3000.00)
ON CONFLICT (id) DO NOTHING;

-- 5. Paradas Intermedias Acordadas (1 por pasajero, máx 3 por trayecto)
INSERT INTO public.trip_stops (id, trip_id, passenger_id, passenger_name, stop_name, stop_lat, stop_lng, stop_order)
VALUES
  ('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'Joveidy Villarreal', 'Parque de Castilla (Cra 68 #94)', 6.2990, -75.5780, 1),
  ('30000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000005', 'Mateo Osorio', 'Estación Aguacatala Metro (Av. Las Vegas)', 6.1950, -75.5790, 1)
ON CONFLICT (id) DO NOTHING;

-- 6. Reservas de Cupo
INSERT INTO public.bookings (id, trip_id, passenger_id, stop_requested, status, seats_requested, contribution_amount)
VALUES
  ('40000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'Parque de Castilla (Cra 68 #94)', 'aceptada', 1, 3500.00),
  ('40000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000005', 'Estación Aguacatala Metro (Av. Las Vegas)', 'aceptada', 1, 4000.00)
ON CONFLICT (id) DO NOTHING;

