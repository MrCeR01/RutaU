-- ====================================================================
-- PROYECTO RUTAU - ESQUEMA DE BASE DE DATOS SUPABASE (POSTGRESQL)
-- Institución Universitaria Pascual Bravo
-- Módulos: Campus Robledo y Sede C4TA San Javier
-- Reglas de negocio: Carpooling nocturno solidario, máximo 3 paradas por trayecto (1 por pasajero)
-- ====================================================================

-- Habilitar extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------------------------------------------------------
-- 1. TABLA: CAMPUSES (Sedes Oficiales I.U. Pascual Bravo)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.campuses (
    id TEXT PRIMARY KEY, -- 'robledo', 'c4ta'
    name TEXT NOT NULL,
    short_name TEXT NOT NULL,
    address TEXT NOT NULL,
    lat NUMERIC(10,6) NOT NULL,
    lng NUMERIC(10,6) NOT NULL,
    description TEXT,
    meeting_points TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 2. TABLA: PROFILES (Perfiles Universitarios con restricción institucional)
-- HU-01, HU-02, HU-03 (CA-01 a CA-06)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    institution TEXT DEFAULT 'Institución Universitaria Pascual Bravo',
    institutional_id TEXT, -- Carnet institucional
    faculty TEXT NOT NULL, -- Facultad / Carrera
    role TEXT NOT NULL CHECK (role IN ('pasajero', 'conductor', 'ambos', 'docente', 'seguridad_campus')),
    residential_zone TEXT NOT NULL, -- Zona residencial (ej. Bello, Robledo, Laureles, etc.)
    phone TEXT,
    avatar_url TEXT,
    rating_average NUMERIC(3,2) DEFAULT 5.00,
    trips_completed INT DEFAULT 0,
    verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Restricción obligatoria de correo con dominio institucional (@pascualbravo.edu.co o dominio universitario)
    CONSTRAINT check_institutional_email CHECK (
        email LIKE '%@%.edu%' OR 
        email LIKE '%@pascualbravo.edu.co%' OR 
        email LIKE '%@udea.edu.co%' OR 
        email LIKE '%@unal.edu.co%' OR
        email LIKE '%@itm.edu.co%' OR
        email LIKE '%@colmayor.edu.co%'
    )
);

-- --------------------------------------------------------------------
-- 3. TABLA: VEHICLES (Vehículos registrados por conductores universitarios)
-- EP-03 (Conductor universitario con auto o moto)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    vehicle_type TEXT NOT NULL CHECK (vehicle_type IN ('auto', 'moto')),
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    license_plate TEXT NOT NULL,
    color TEXT NOT NULL,
    total_capacity INT NOT NULL CHECK (total_capacity BETWEEN 1 AND 6),
    soat_valid BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 4. TABLA: TRIPS (Trayectos nocturnos salientes desde Campus Robledo o Sede C4TA)
-- HU-04, HU-06, HU-08, HU-09 (CA-07, CA-08, CA-11, CA-12, CA-15 a CA-18)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.trips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    driver_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    origin_campus TEXT NOT NULL DEFAULT 'robledo' REFERENCES public.campuses(id),
    origin_meeting_point TEXT NOT NULL,
    destination_zone TEXT NOT NULL,
    destination_address TEXT,
    dest_lat NUMERIC(10,6),
    dest_lng NUMERIC(10,6),
    departure_time TIMESTAMPTZ NOT NULL,
    status TEXT NOT NULL DEFAULT 'programado' CHECK (status IN ('programado', 'en_curso', 'finalizado', 'cancelado')),
    total_seats INT NOT NULL CHECK (total_seats BETWEEN 1 AND 6),
    available_seats INT NOT NULL CHECK (available_seats >= 0),
    distance_km NUMERIC(5,2) DEFAULT 10.0,
    estimated_total_gas NUMERIC(10,2) NOT NULL DEFAULT 12000.00,
    suggested_seat_price NUMERIC(10,2) NOT NULL DEFAULT 4000.00,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 5. TABLA: TRIP_STOPS (Paradas intermedias solicitadas: máx 3 por trayecto, 1 por pasajero)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.trip_stops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
    passenger_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    passenger_name TEXT NOT NULL,
    stop_name TEXT NOT NULL,
    stop_lat NUMERIC(10,6),
    stop_lng NUMERIC(10,6),
    stop_order INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    -- Restricción: exactamente 1 parada intermedia por pasajero en el mismo trayecto
    UNIQUE(trip_id, passenger_id)
);

-- Trigger: Límite de 3 paradas intermedias por trayecto
CREATE OR REPLACE FUNCTION enforce_max_three_stops()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM public.trip_stops WHERE trip_id = NEW.trip_id) >= 3 THEN
        RAISE EXCEPTION 'Límite de paradas intermedias alcanzado (máximo 3 por trayecto)';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_max_three_stops
BEFORE INSERT ON public.trip_stops
FOR EACH ROW
EXECUTE FUNCTION enforce_max_three_stops();

-- --------------------------------------------------------------------
-- 6. TABLA: BOOKINGS (Reservas y gestión de cupos)
-- HU-05, HU-07 (CA-09, CA-10, CA-13, CA-14)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
    passenger_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    stop_requested TEXT,
    status TEXT NOT NULL DEFAULT 'pendiente' CHECK (status IN ('pendiente', 'aceptada', 'rechazada', 'cancelada', 'completada')),
    seats_requested INT NOT NULL DEFAULT 1,
    contribution_amount NUMERIC(10,2) NOT NULL DEFAULT 4000.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(trip_id, passenger_id)
);

-- --------------------------------------------------------------------
-- 7. TABLA: REVIEWS (Calificaciones y reputación comunitaria)
-- HU-10 (CA-19, CA-20)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    reviewee_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    punctuality_rating INT CHECK (punctuality_rating BETWEEN 1 AND 5),
    respect_rating INT CHECK (respect_rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 8. TABLA: SOS_ALERTS (Alertas de auxilio y seguridad del campus)
-- HU-11, HU-12 (CA-21 a CA-24)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.sos_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID REFERENCES public.trips(id) ON DELETE SET NULL,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    current_lat NUMERIC(10,6) NOT NULL,
    current_lng NUMERIC(10,6) NOT NULL,
    status TEXT NOT NULL DEFAULT 'activa' CHECK (status IN ('activa', 'en_atencion', 'atendida', 'falsa_alarma')),
    dispatcher_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

-- --------------------------------------------------------------------
-- 9. TABLA: LIVE_TRACKING (Seguimiento GPS en vivo compartido por WhatsApp)
-- HU-13 (CA-29, CA-30)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.live_tracking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
    share_token TEXT UNIQUE NOT NULL,
    current_lat NUMERIC(10,6) NOT NULL DEFAULT 6.2764,
    current_lng NUMERIC(10,6) NOT NULL DEFAULT -75.5898,
    status TEXT NOT NULL DEFAULT 'en_ruta' CHECK (status IN ('en_ruta', 'llegada_segura', 'finalizado')),
    expires_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 10. TRIGGERS: Reputación y Descuento de Cupos
-- --------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_user_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.profiles
    SET rating_average = (
        SELECT ROUND(AVG(rating), 2)
        FROM public.reviews
        WHERE reviewee_id = NEW.reviewee_id
    )
    WHERE id = NEW.reviewee_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER on_review_added
AFTER INSERT ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION update_user_rating();

CREATE OR REPLACE FUNCTION update_trip_seats()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'UPDATE' AND OLD.status != 'aceptada' AND NEW.status = 'aceptada') THEN
        UPDATE public.trips
        SET available_seats = GREATEST(0, available_seats - NEW.seats_requested)
        WHERE id = NEW.trip_id;
    ELSIF (TG_OP = 'UPDATE' AND OLD.status = 'aceptada' AND NEW.status IN ('rechazada', 'cancelada')) THEN
        UPDATE public.trips
        SET available_seats = LEAST(total_seats, available_seats + NEW.seats_requested)
        WHERE id = NEW.trip_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER on_booking_status_change
AFTER UPDATE ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION update_trip_seats();

-- --------------------------------------------------------------------
-- 11. ROW LEVEL SECURITY (RLS)
-- --------------------------------------------------------------------
ALTER TABLE public.campuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_stops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sos_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_tracking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública de sedes" ON public.campuses FOR SELECT USING (true);
CREATE POLICY "Lectura pública de perfiles comunitarios" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Edición del propio perfil" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Lectura pública de viajes disponibles" ON public.trips FOR SELECT USING (true);
CREATE POLICY "Conductores pueden insertar sus viajes" ON public.trips FOR INSERT WITH CHECK (auth.uid() = driver_id);
CREATE POLICY "Conductores pueden actualizar sus viajes" ON public.trips FOR UPDATE USING (auth.uid() = driver_id);

CREATE POLICY "Lectura pública de paradas intermedias" ON public.trip_stops FOR SELECT USING (true);
CREATE POLICY "Pasajeros pueden fijar su parada" ON public.trip_stops FOR INSERT WITH CHECK (auth.uid() = passenger_id);

CREATE POLICY "Pasajeros y conductores ven sus reservas" ON public.bookings 
FOR SELECT USING (auth.uid() = passenger_id OR auth.uid() IN (SELECT driver_id FROM public.trips WHERE id = bookings.trip_id));
CREATE POLICY "Pasajeros pueden crear solicitudes de cupo" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = passenger_id);
CREATE POLICY "Actualizar estado de reservas" ON public.bookings FOR UPDATE USING (
    auth.uid() = passenger_id OR 
    auth.uid() IN (SELECT driver_id FROM public.trips WHERE id = bookings.trip_id)
);

CREATE POLICY "Lectura libre de reseñas" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Creación de reseñas por participantes" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);
CREATE POLICY "Visualización pública con enlace de tracking" ON public.live_tracking FOR SELECT USING (true);
CREATE POLICY "Alertas SOS accesibles por creador y seguridad" ON public.sos_alerts FOR ALL USING (true);

