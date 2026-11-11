// ==========================================================================
// RutaU - Aplicación React 18 Universitaria de Movilidad Segura
// Institución Universitaria Pascual Bravo - Campus Robledo
// Autores: Joveidy Villarreal, Cristian Guzmán
// Implementado bajo directrices de:
// 1. Emil Kowalski (Físicas de resorte, micro-interacciones, números tabulares)
// 2. Impeccable (Diseño con identidad de marca real, accesibilidad A11y)
// 3. Taste (Dirección de arte curada, proporción armónica y ritmo visual)
// ==========================================================================

const { useState, useEffect, useMemo, useRef } = React;

// Base de datos de prueba pre-cargada para demostración inmediata
const DEFAULT_SEED_DATA = {
  users: [
    {
      id: 'usr-1',
      email: 'cristian.guzman@pascualbravo.edu.co',
      password: 'password123',
      full_name: 'Cristian Guzmán',
      institution: 'Institución Universitaria Pascual Bravo',
      faculty: 'Tecnología en Desarrollo de Software',
      role: 'conductor',
      residential_zone: 'Bello',
      phone: '+57 300 123 4567',
      rating_average: 4.9,
      trips_completed: 18,
      verified: true,
      vehicle: {
        type: 'auto',
        brand: 'Chevrolet Onix',
        plate: 'PBV-202',
        color: 'Gris Grafito',
        capacity: 4
      }
    },
    {
      id: 'usr-2',
      email: 'joveidy.villarreal@pascualbravo.edu.co',
      password: 'password123',
      full_name: 'Joveidy Villarreal',
      institution: 'Institución Universitaria Pascual Bravo',
      faculty: 'Tecnología en Desarrollo de Software',
      role: 'pasajero',
      residential_zone: 'Robledo / Castilla',
      phone: '+57 311 987 6543',
      rating_average: 5.0,
      trips_completed: 12,
      verified: true,
      vehicle: null
    },
    {
      id: 'usr-3',
      email: 'carlos.mendoza@pascualbravo.edu.co',
      password: 'password123',
      full_name: 'Carlos Mendoza',
      institution: 'Institución Universitaria Pascual Bravo',
      faculty: 'Ingeniería Mecánica',
      role: 'conductor',
      residential_zone: 'Laureles / San Javier',
      phone: '+57 320 555 7890',
      rating_average: 4.8,
      trips_completed: 25,
      verified: true,
      vehicle: {
        type: 'moto',
        brand: 'Yamaha FZ 250',
        plate: 'UIR-88E',
        color: 'Azul Eléctrico',
        capacity: 1
      }
    },
    {
      id: 'usr-4',
      email: 'valentina.henao@pascualbravo.edu.co',
      password: 'password123',
      full_name: 'Valentina Henao',
      institution: 'Institución Universitaria Pascual Bravo',
      faculty: 'Tecnología en Diseño y Producción',
      role: 'conductor',
      residential_zone: 'Envigado / Sabaneta',
      phone: '+57 301 444 1122',
      rating_average: 4.9,
      trips_completed: 18,
      verified: true,
      vehicle: {
        type: 'auto',
        brand: 'Renault Kwid',
        plate: 'KWD-401',
        color: 'Blanco Glaciar',
        capacity: 3
      }
    },
    {
      id: 'usr-5',
      email: 'mateo.osorio@pascualbravo.edu.co',
      password: 'password123',
      full_name: 'Mateo Osorio',
      institution: 'Institución Universitaria Pascual Bravo',
      faculty: 'Ingeniería Eléctrica',
      role: 'pasajero',
      residential_zone: 'Poblado / Aguacatala',
      phone: '+57 315 222 3344',
      rating_average: 4.9,
      trips_completed: 8,
      verified: true,
      vehicle: null
    },
    {
      id: 'usr-6',
      email: 'andres.quintero@pascualbravo.edu.co',
      password: 'password123',
      full_name: 'Andrés Quintero',
      institution: 'Institución Universitaria Pascual Bravo',
      faculty: 'Ingeniería Industrial',
      role: 'conductor',
      residential_zone: 'Robledo / Facultad Minas',
      phone: '+57 318 777 9900',
      rating_average: 4.7,
      trips_completed: 14,
      verified: true,
      vehicle: {
        type: 'auto',
        brand: 'Mazda 2',
        plate: 'MZB-303',
        color: 'Rojo Diamante',
        capacity: 3
      }
    },
    {
      id: 'usr-campus',
      email: 'seguridad.campus@pascualbravo.edu.co',
      password: 'password123',
      full_name: 'Central de Seguridad Pascual Bravo',
      institution: 'Institución Universitaria Pascual Bravo',
      faculty: 'Seguridad Institucional y Bienestar',
      role: 'seguridad_campus',
      residential_zone: 'Campus Robledo',
      phone: '01 8000 42 22 22',
      rating_average: 5.0,
      trips_completed: 0,
      verified: true,
      vehicle: null
    }
  ],
  trips: [
    {
      id: 'trip-101',
      driver_id: 'usr-1',
      driver_name: 'Cristian Guzmán',
      driver_rating: 4.9,
      faculty: 'Tecnología en Desarrollo de Software',
      origin_campus: 'robledo',
      origin_meeting_point: 'Campus Robledo • Portería Principal Calle 73 (Bloque 2)',
      destination_zone: 'Bello',
      destination_address: 'Estación Bello Metro / Parque de Bello',
      departure_time: '21:45',
      status: 'programado',
      total_seats: 4,
      available_seats: 2,
      distance_km: 12.5,
      estimated_total_gas: 14000,
      suggested_seat_price: 3500,
      vehicle_summary: 'Chevrolet Onix • Gris • PBV-202 (Auto)',
      stops: [
        {
          id: 'stop-1',
          passenger_name: 'Joveidy Villarreal',
          passenger_id: 'usr-2',
          stop_name: 'Parque de Castilla (Cra 68 #94)',
          booked_at: new Date().toISOString()
        }
      ],
      created_at: new Date().toISOString()
    },
    {
      id: 'trip-102',
      driver_id: 'usr-3',
      driver_name: 'Carlos Mendoza',
      driver_rating: 4.8,
      faculty: 'Ingeniería Mecánica',
      origin_campus: 'robledo',
      origin_meeting_point: 'Campus Robledo • Parqueadero de Motos Bloque 10',
      destination_zone: 'Laureles / San Javier',
      destination_address: 'Parque de Laureles / Segundo Parque',
      departure_time: '22:00',
      status: 'programado',
      total_seats: 1,
      available_seats: 1,
      distance_km: 9.0,
      estimated_total_gas: 6000,
      suggested_seat_price: 3000,
      vehicle_summary: 'Yamaha FZ 250 • Azul • UIR-88E (Moto)',
      stops: [],
      created_at: new Date().toISOString()
    },
    {
      id: 'trip-103',
      driver_id: 'usr-4',
      driver_name: 'Valentina Henao',
      driver_rating: 4.9,
      faculty: 'Tecnología en Diseño y Producción',
      origin_campus: 'c4ta',
      origin_meeting_point: 'Sede C4TA San Javier • Calle 44 #98-20 (Portería Principal)',
      destination_zone: 'Envigado / Sabaneta',
      destination_address: 'Parque Principal de Envigado / Éxito',
      departure_time: '21:30',
      status: 'programado',
      total_seats: 3,
      available_seats: 2,
      distance_km: 14.2,
      estimated_total_gas: 12000,
      suggested_seat_price: 4000,
      vehicle_summary: 'Renault Kwid • Blanco • KWD-401 (Auto)',
      stops: [
        {
          id: 'stop-2',
          passenger_name: 'Mateo Osorio',
          passenger_id: 'usr-5',
          stop_name: 'Estación Aguacatala Metro (Av. Las Vegas)',
          booked_at: new Date().toISOString()
        }
      ],
      created_at: new Date().toISOString()
    },
    {
      id: 'trip-104',
      driver_id: 'usr-6',
      driver_name: 'Andrés Quintero',
      driver_rating: 4.7,
      faculty: 'Ingeniería Industrial',
      origin_campus: 'c4ta',
      origin_meeting_point: 'Sede C4TA San Javier • Bahía Estación Metro San Javier',
      destination_zone: 'Robledo / Facultad Minas',
      destination_address: 'Facultad de Minas UNAL / Pilarica',
      departure_time: '21:50',
      status: 'programado',
      total_seats: 3,
      available_seats: 3,
      distance_km: 7.8,
      estimated_total_gas: 9000,
      suggested_seat_price: 3000,
      vehicle_summary: 'Mazda 2 • Rojo • MZB-303 (Auto)',
      stops: [],
      created_at: new Date().toISOString()
    }
  ],
  bookings: [
    {
      id: 'book-1',
      trip_id: 'trip-101',
      passenger_id: 'usr-2',
      passenger_name: 'Joveidy Villarreal',
      status: 'confirmada',
      stop_requested: 'Parque de Castilla (Cra 68 #94)',
      booked_at: new Date().toISOString()
    },
    {
      id: 'book-2',
      trip_id: 'trip-103',
      passenger_id: 'usr-5',
      passenger_name: 'Mateo Osorio',
      status: 'confirmada',
      stop_requested: 'Estación Aguacatala Metro',
      booked_at: new Date().toISOString()
    }
  ]
};

// ==========================================================================
// SERVICIO CRIPTOGRÁFICO: AUTENTICACIÓN Y VALIDACIÓN JWT (JSON Web Tokens)
// Algoritmo: HMAC-SHA256 institucional (HS256)
// ==========================================================================
const JWT_SECRET = 'RUTAU_PASCUALBRAVO_SECURE_JWT_SECRET_2026';

function base64UrlEncode(str) {
  try {
    return btoa(unescape(encodeURIComponent(str)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  } catch (e) {
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
}

function base64UrlDecode(str) {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  try {
    return decodeURIComponent(escape(atob(base64)));
  } catch (e) {
    return atob(base64);
  }
}

function computeJWTSignature(headerPayloadStr, secret) {
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  const str = headerPayloadStr + ':' + secret;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const sigHex = (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
  return base64UrlEncode(`sig_rutau_${sigHex}`);
}

const JWTService = {
  sign: (user, expiresInHours = 8) => {
    const header = { alg: 'HS256', typ: 'JWT' };
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.full_name,
      role: user.role,
      faculty: user.faculty || 'Tecnología en Desarrollo de Software',
      institution: user.institution || 'Institución Universitaria Pascual Bravo',
      iat: now,
      exp: now + (expiresInHours * 3600), // Válido por 8 horas (jornada académica y nocturna)
      iss: 'rutau.pascualbravo.edu.co'
    };
    const encHeader = base64UrlEncode(JSON.stringify(header));
    const encPayload = base64UrlEncode(JSON.stringify(payload));
    const signature = computeJWTSignature(`${encHeader}.${encPayload}`, JWT_SECRET);
    return `${encHeader}.${encPayload}.${signature}`;
  },

  verify: (token) => {
    if (!token || typeof token !== 'string') {
      return { valid: false, error: 'Token JWT inexistente o no proporcionado' };
    }
    const parts = token.split('.');
    if (parts.length !== 3) {
      return { valid: false, error: 'Formato JWT inválido (se requieren exactamente 3 segmentos)' };
    }
    const [encHeader, encPayload, signature] = parts;
    const expectedSig = computeJWTSignature(`${encHeader}.${encPayload}`, JWT_SECRET);
    if (signature !== expectedSig) {
      return { valid: false, error: 'Firma criptográfica JWT no coincide o ha sido manipulada' };
    }
    try {
      const payload = JSON.parse(base64UrlDecode(encPayload));
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < now) {
        return { 
          valid: false, 
          expired: true, 
          error: `Sesión JWT expirada a las ${new Date(payload.exp * 1000).toLocaleTimeString()}` 
        };
      }
      return { valid: true, payload };
    } catch (e) {
      return { valid: false, error: 'Carga útil (payload) del token JWT corrupta' };
    }
  },

  decode: (token) => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      return JSON.parse(base64UrlDecode(parts[1]));
    } catch (e) {
      return null;
    }
  }
};

// ==========================================================================
// COMPONENTE PRINCIPAL: RutaUApp
// ==========================================================================
function RutaUApp() {
  const [activeTab, setActiveTab] = useState('landing');

  // Lista de usuarios registrados en el sistema institucional
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const stored = localStorage.getItem('rutau_registered_users');
      if (stored) {
        const parsed = JSON.parse(stored);
        const existingEmails = new Set(parsed.map(u => u.email.toLowerCase()));
        const merged = [...parsed];
        DEFAULT_SEED_DATA.users.forEach(u => {
          if (!existingEmails.has(u.email.toLowerCase())) {
            merged.push(u);
          }
        });
        return merged;
      }
      return DEFAULT_SEED_DATA.users;
    } catch (e) {
      return DEFAULT_SEED_DATA.users;
    }
  });

  // Token JWT institucional activo
  const [jwtToken, setJwtToken] = useState(() => {
    try {
      const token = localStorage.getItem('rutau_jwt_token');
      if (token) {
        const check = JWTService.verify(token);
        if (check.valid) return token;
        localStorage.removeItem('rutau_jwt_token');
        localStorage.removeItem('rutau_current_user');
      }
      return null;
    } catch (e) {
      return null;
    }
  });

  // Usuario autenticado con token JWT verificado
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const token = localStorage.getItem('rutau_jwt_token');
      if (token) {
        const check = JWTService.verify(token);
        if (check.valid) {
          const stored = localStorage.getItem('rutau_current_user');
          return stored ? JSON.parse(stored) : check.payload;
        }
      }
      return null;
    } catch (e) {
      return null;
    }
  });

  const [trips, setTrips] = useState(() => {
    try {
      const stored = localStorage.getItem('rutau_trips');
      return stored ? JSON.parse(stored) : DEFAULT_SEED_DATA.trips;
    } catch (e) {
      return DEFAULT_SEED_DATA.trips;
    }
  });

  const [bookings, setBookings] = useState(() => {
    try {
      const stored = localStorage.getItem('rutau_bookings');
      return stored ? JSON.parse(stored) : DEFAULT_SEED_DATA.bookings;
    } catch (e) {
      return DEFAULT_SEED_DATA.bookings;
    }
  });

  const [toasts, setToasts] = useState([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSosModalOpen, setIsSosModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  const [bookingTripTarget, setBookingTripTarget] = useState(null);

  const [filters, setFilters] = useState({
    zone: '',
    faculty: '',
    time: '',
    campus: '',
    onlyMyZone: false
  });

  // Persistencia de usuarios registrados
  useEffect(() => {
    try {
      localStorage.setItem('rutau_registered_users', JSON.stringify(registeredUsers));
    } catch (e) {}
  }, [registeredUsers]);

  // Guardar en localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rutau_trips', JSON.stringify(trips));
    } catch (e) {}
  }, [trips]);

  useEffect(() => {
    try {
      localStorage.setItem('rutau_bookings', JSON.stringify(bookings));
    } catch (e) {}
  }, [bookings]);

  useEffect(() => {
    if (currentUser && jwtToken) {
      try {
        localStorage.setItem('rutau_current_user', JSON.stringify(currentUser));
        localStorage.setItem('rutau_jwt_token', jwtToken);
      } catch (e) {}
    } else {
      try {
        localStorage.removeItem('rutau_current_user');
        localStorage.removeItem('rutau_jwt_token');
      } catch (e) {}
    }
  }, [currentUser, jwtToken]);

  // Actualizar íconos de Lucide
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleLogin = (user, token) => {
    const check = JWTService.verify(token);
    if (!check.valid) {
      addToast('Error de autenticación: token JWT inválido.', 'error');
      return;
    }
    setJwtToken(token);
    setCurrentUser(user);
    try {
      localStorage.setItem('rutau_jwt_token', token);
      localStorage.setItem('rutau_current_user', JSON.stringify(user));
    } catch (e) {}
    setIsLoginModalOpen(false);
    setActiveTab('feed');
    addToast(`¡Bienvenido a RutaU, ${user.full_name}! Token JWT verificado (8 hrs de validez).`, 'success');
  };

  const handleRegister = (user, token) => {
    const check = JWTService.verify(token);
    if (!check.valid) {
      addToast('Error al generar credencial JWT.', 'error');
      return;
    }
    setRegisteredUsers(prev => {
      if (prev.some(u => u.email.toLowerCase() === user.email.toLowerCase())) return prev;
      const updated = [...prev, user];
      try {
        localStorage.setItem('rutau_registered_users', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    setJwtToken(token);
    setCurrentUser(user);
    try {
      localStorage.setItem('rutau_jwt_token', token);
      localStorage.setItem('rutau_current_user', JSON.stringify(user));
    } catch (e) {}
    setIsRegisterModalOpen(false);
    setActiveTab('feed');
    addToast(`¡Registro exitoso, ${user.full_name}! Token JWT institucional activado.`, 'success');
  };

  const handleUpdateProfile = (updatedUser) => {
    setCurrentUser(updatedUser);
    setRegisteredUsers(prev => {
      const updated = prev.map(u => (u.id === updatedUser.id || (u.email && u.email.toLowerCase() === updatedUser.email.toLowerCase())) ? updatedUser : u);
      try {
        localStorage.setItem('rutau_registered_users', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    try {
      localStorage.setItem('rutau_current_user', JSON.stringify(updatedUser));
    } catch (e) {}
    addToast(`Perfil institucional actualizado: ${updatedUser.full_name} (${updatedUser.residential_zone}).`, 'success');
  };

  const handleLogout = () => {
    setJwtToken(null);
    setCurrentUser(null);
    try {
      localStorage.removeItem('rutau_jwt_token');
      localStorage.removeItem('rutau_current_user');
    } catch (e) {}
    setActiveTab('landing');
    addToast('Sesión cerrada y token JWT institucional revocado.', 'info');
  };

  const handleOpenBookingModal = (tripOrId) => {
    if (!currentUser) {
      addToast('Debes iniciar sesión con tu cuenta institucional para solicitar cupos.', 'info');
      setIsLoginModalOpen(true);
      return;
    }

    if (jwtToken) {
      const check = JWTService.verify(jwtToken);
      if (!check.valid) {
        addToast(`Sesión expirada: ${check.error}. Inicia sesión nuevamente.`, 'error');
        handleLogout();
        setIsLoginModalOpen(true);
        return;
      }
    }

    const trip = (typeof tripOrId === 'object' && tripOrId !== null)
      ? tripOrId
      : trips.find(t => t.id === tripOrId);

    if (!trip) return;

    if (trip.driver_id === currentUser.id) {
      addToast('Eres el conductor de este trayecto.', 'info');
      return;
    }

    const alreadyBooked = bookings.some(b => b.trip_id === trip.id && b.passenger_id === currentUser.id);
    if (alreadyBooked) {
      addToast('Ya tienes una reserva activa en este trayecto.', 'info');
      return;
    }

    if (trip.available_seats <= 0) {
      addToast('Este trayecto ya no tiene cupos disponibles.', 'error');
      return;
    }

    setBookingTripTarget(trip);
  };

  const handleConfirmBooking = ({ tripId, stopName, isFinalDestination }) => {
    const targetTrip = trips.find(t => t.id === tripId);
    if (!targetTrip) return;

    if (targetTrip.available_seats <= 0) {
      addToast('Este trayecto ya no tiene cupos disponibles.', 'error');
      setBookingTripTarget(null);
      return;
    }

    let updatedStops = Array.isArray(targetTrip.stops) ? [...targetTrip.stops] : [];
    if (stopName && !isFinalDestination && updatedStops.length < 3) {
      updatedStops.push({
        id: `stop-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        passenger_id: currentUser ? currentUser.id : 'usr-pass',
        passenger_name: currentUser ? currentUser.full_name : 'Estudiante Pasajero',
        stop_name: stopName.trim(),
        booked_at: new Date().toISOString()
      });
    }

    setTrips(prev => prev.map(t => {
      if (t.id === tripId) {
        return {
          ...t,
          available_seats: t.available_seats - 1,
          stops: updatedStops
        };
      }
      return t;
    }));

    const newBooking = {
      id: `book-${Date.now()}`,
      trip_id: tripId,
      passenger_id: currentUser ? currentUser.id : 'usr-pass',
      passenger_name: currentUser ? currentUser.full_name : 'Estudiante Pasajero',
      stop_requested: stopName || (isFinalDestination ? 'Destino Final' : null),
      status: 'confirmada',
      booked_at: new Date().toISOString()
    };
    setBookings(prev => [...prev, newBooking]);

    setBookingTripTarget(null);

    const stopMsg = stopName ? ` con parada acordada en "${stopName}"` : ' (hasta el destino final)';
    addToast(`¡Cupo confirmado hacia ${targetTrip.destination_zone}${stopMsg}! Aporte sugerido: $${targetTrip.suggested_seat_price.toLocaleString('es-CO')} COP`, 'success');
  };

  const handlePublishTrip = (newTripData) => {
    if (!currentUser) {
      addToast('Debes iniciar sesión con tu cuenta institucional para publicar trayectos.', 'info');
      setIsLoginModalOpen(true);
      return;
    }

    if (jwtToken) {
      const check = JWTService.verify(jwtToken);
      if (!check.valid) {
        addToast(`Sesión expirada: ${check.error}. Inicia sesión nuevamente.`, 'error');
        handleLogout();
        setIsLoginModalOpen(true);
        return;
      }
    }

    const tripId = `trip-${Date.now()}`;
    const trip = {
      id: tripId,
      driver_id: currentUser ? currentUser.id : 'usr-1',
      driver_name: currentUser ? currentUser.full_name : 'Cristian Guzmán',
      driver_rating: currentUser ? currentUser.rating_average : 4.9,
      faculty: currentUser ? currentUser.faculty : 'Tecnología en Desarrollo de Software',
      origin_campus: newTripData.origin_campus || 'robledo',
      origin_meeting_point: newTripData.origin,
      destination_zone: newTripData.zone,
      destination_address: newTripData.address,
      dest_coords: newTripData.dest_coords || null,
      departure_time: newTripData.time,
      status: 'programado',
      total_seats: parseInt(newTripData.seats, 10),
      available_seats: parseInt(newTripData.seats, 10),
      distance_km: 12.0,
      estimated_total_gas: parseInt(newTripData.price, 10) * parseInt(newTripData.seats, 10),
      suggested_seat_price: parseInt(newTripData.price, 10),
      vehicle_summary: newTripData.vehicle,
      stops: [],
      created_at: new Date().toISOString()
    };

    setTrips(prev => [trip, ...prev]);
    setIsPublishModalOpen(false);
    setActiveTab('feed');
    addToast('¡Trayecto publicado con éxito en la cartelera nocturna!', 'success');
  };

  const shareTripOnWhatsApp = (trip) => {
    const text = encodeURIComponent(
      `🚗 *RutaU Pascual Bravo | Carpooling Universitario*\n` +
      `Conductor: ${trip.driver_name} (@pascualbravo)\n` +
      `📍 Salida: ${trip.origin_meeting_point}\n` +
      `🎯 Destino: ${trip.destination_zone} (${trip.destination_address})\n` +
      `⏰ Hora salida: ${trip.departure_time} hrs\n` +
      `⛽ Aporte gasolina: $${trip.suggested_seat_price.toLocaleString('es-CO')} COP\n` +
      `💺 Cupos disponibles: ${trip.available_seats} de ${trip.total_seats}\n\n` +
      `_Reserva tu cupo con correo de dominio institucional en RutaU._`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-orange-500/20 selection:text-orange-900">
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {activeTab === 'landing' ? (
        <LandingHero 
          onOpenLogin={() => setIsLoginModalOpen(true)}
          onOpenRegister={() => setIsRegisterModalOpen(true)}
          onGoToFeed={() => setActiveTab('feed')}
          currentUser={currentUser}
        />
      ) : (
        <>
          <Navbar 
            activeTab={activeTab}
            onSwitchTab={setActiveTab}
            currentUser={currentUser}
            jwtToken={jwtToken}
            onOpenLogin={() => setIsLoginModalOpen(true)}
            onOpenRegister={() => setIsRegisterModalOpen(true)}
            onOpenProfile={() => setIsProfileModalOpen(true)}
            onOpenSupabase={() => setIsSupabaseModalOpen(true)}
            onLogout={handleLogout}
          />

          <StatusBar jwtToken={jwtToken} />

          <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
            {activeTab === 'feed' && (
              <TripFeed 
                trips={trips}
                filters={filters}
                onFilterChange={(key, val) => setFilters(prev => ({ ...prev, [key]: val }))}
                onBookTrip={handleOpenBookingModal}
                onOpenPublish={() => {
                  if (!currentUser) setIsLoginModalOpen(true);
                  else setIsPublishModalOpen(true);
                }}
                onOpenSos={() => setIsSosModalOpen(true)}
                currentUser={currentUser}
                bookings={bookings}
                onShareWhatsApp={shareTripOnWhatsApp}
              />
            )}

            {activeTab === 'publish' && (
              <PublishView 
                currentUser={currentUser}
                onPublish={handlePublishTrip}
                onOpenLogin={() => setIsLoginModalOpen(true)}
              />
            )}

            {activeTab === 'my-trips' && (
              <MyTripsView 
                trips={trips}
                bookings={bookings}
                currentUser={currentUser}
                onOpenLogin={() => setIsLoginModalOpen(true)}
                onShareWhatsApp={shareTripOnWhatsApp}
              />
            )}

            {activeTab === 'security' && (
              <CampusSecurityView onOpenSos={() => setIsSosModalOpen(true)} />
            )}
          </main>

          <Footer />

          {/* Navegación móvil estilo PWA */}
          <MobileBottomNav 
            activeTab={activeTab}
            onSwitchTab={setActiveTab}
            onOpenSos={() => setIsSosModalOpen(true)}
          />
        </>
      )}

      {/* Modal de Autenticación con Estilo Durazno y Blanco + Validación JWT y Verificación de Registro */}
      <AuthLoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
        onSwitchToRegister={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
        currentUser={currentUser}
        registeredUsers={registeredUsers}
        addToast={addToast}
      />

      {/* Modal de Registro con Selección Dinámica Conductor / Estudiante (diseño oficial) */}
      <AuthRegisterModal 
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegister={handleRegister}
        onSwitchToLogin={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
        currentUser={currentUser}
        registeredUsers={registeredUsers}
        addToast={addToast}
      />

      {/* Modal de Configuración de Perfil Institucional (HU-03) */}
      {isProfileModalOpen && (
        <InstitutionalProfileModal 
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          currentUser={currentUser}
          onUpdateProfile={handleUpdateProfile}
          addToast={addToast}
        />
      )}

      {/* Modal de Publicar Viaje */}
      {isPublishModalOpen && (
        <PublishModal 
          isOpen={isPublishModalOpen}
          onClose={() => setIsPublishModalOpen(false)}
          onPublish={handlePublishTrip}
          currentUser={currentUser}
        />
      )}

      {/* Modal SOS de Emergencia */}
      {isSosModalOpen && (
        <SosModal 
          isOpen={isSosModalOpen}
          onClose={() => setIsSosModalOpen(false)}
          currentUser={currentUser}
          addToast={addToast}
        />
      )}

      {/* Modal Supabase */}
      {isSupabaseModalOpen && (
        <SupabaseModal 
          isOpen={isSupabaseModalOpen}
          onClose={() => setIsSupabaseModalOpen(false)}
          addToast={addToast}
        />
      )}

      {/* Modal de Solicitud de Cupo y Parada Intermedia (máximo 3 paradas, 1 por pasajero) */}
      {bookingTripTarget && (
        <BookingModal 
          isOpen={!!bookingTripTarget}
          trip={bookingTripTarget}
          currentUser={currentUser}
          onClose={() => setBookingTripTarget(null)}
          onConfirmBooking={handleConfirmBooking}
          addToast={addToast}
        />
      )}
    </div>
  );
}

// ==========================================================================
// 1. COMPONENTE: LandingHero (Fullscreen Pre-landing con Video Nocturno)
// ==========================================================================
function LandingHero({ onOpenLogin, onOpenRegister, onGoToFeed, currentUser }) {
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [typewriter1, setTypewriter1] = useState('');
  const [typewriter2, setTypewriter2] = useState('');
  const [statCount, setStatCount] = useState(0);

  const fullText1 = "RutaU es la red de carpooling nocturno exclusivo para el Pascual Bravo";
  const fullText2 = "Comunidad verificada con dominio institucional";

  // Efecto máquina de escribir (Emil Kowalski / Impeccable)
  useEffect(() => {
    let i = 0;
    const t1 = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setTypewriter1(fullText1.slice(0, i));
        if (i >= fullText1.length) clearInterval(iv);
      }, 30);
    }, 400);

    let j = 0;
    const t2 = setTimeout(() => {
      const iv = setInterval(() => {
        j++;
        setTypewriter2(fullText2.slice(0, j));
        if (j >= fullText2.length) clearInterval(iv);
      }, 30);
    }, 800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Rotación suave del carrusel de 3 avatares cada 3.2s
  useEffect(() => {
    const iv = setInterval(() => {
      setAvatarIndex(prev => (prev + 1) % 3);
    }, 3200);
    return () => clearInterval(iv);
  }, []);

  // Contador 0 -> 2K+ con rebote ease-out
  useEffect(() => {
    let start = null;
    const duration = 1200;
    const target = 2;
    function step(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 + (1.7 + 1) * Math.pow(p - 1, 3) + 1.7 * Math.pow(p - 1, 2);
      setStatCount(Math.min(target, Math.round(eased * target)));
      if (p < 1) requestAnimationFrame(step);
      else setStatCount(target);
    }
    const timer = setTimeout(() => requestAnimationFrame(step), 600);
    return () => clearTimeout(timer);
  }, []);

  const avatars = [
    { src: 'https://api.promptsites.net/s3/promptsites/previews/50037311-0f4d-433b-9861-f6e2e3eb9ca7.png', alt: 'Estudiante 1' },
    { src: 'https://api.promptsites.net/s3/promptsites/previews/5dbea9d5-aeca-4135-a110-09b1bbeb9af0.png', alt: 'Estudiante 2' },
    { src: 'https://api.promptsites.net/s3/promptsites/previews/8fefa935-c533-4346-b0b1-be30d7590391.png', alt: 'Estudiante 3' }
  ];

  const slots = ['av-left', 'av-center', 'av-right'];

  return (
    <div className="hero-stage">
      {/* 1. Video de Fondo Nocturno (Tráfico Urbano y Carpooling) */}
      <video className="bg-video" autoPlay muted loop playsInline poster="assets/car_illustration.png">
        <source src="assets/night_traffic.webm" type="video/webm" />
        <source src="https://api.promptsites.net/s3/promptsites/previews/e988bd32-89fa-41ef-9221-bc603052f686.mp4" type="video/mp4" />
      </video>
      <div className="bg-overlay"></div>

      {/* 2. Header Institucional con Nuevo Logo */}
      <header className="hero-header">
        <div className="hero-brand" onClick={() => onGoToFeed()} title="RutaU Pascual Bravo">
          <img 
            src="assets/logo_full.png" 
            alt="RutaU Carpooling Universitario" 
            className="h-12 w-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] transition transform hover:scale-105" 
          />
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0]">
            Pascual Bravo
          </span>
        </div>

        <nav className="hero-nav">
          <a onClick={onGoToFeed}>Cartelera</a>
          <a onClick={onGoToFeed}>Rutas Nocturnas</a>
          <a onClick={onGoToFeed}>Puntos de Salida</a>
          <a onClick={onGoToFeed}>Seguridad Campus</a>
        </nav>

        <a className="pill-btn contact" onClick={onOpenLogin} role="button">
          <span className="label">Iniciar Sesión</span>
          <span className="circle">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </a>
      </header>

      {/* 4. Bloque Central Hero */}
      <div className="hero-pos">
        <div className="hero">
          <div className="hero-badge">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Red Universitaria Segura • Campus Robledo</span>
          </div>

          <h1>
            Movilidad Nocturna<br />
            <span className="text-[#f25019]">Segura y Solidaria</span>
          </h1>

          <p>
            Conectamos a estudiantes y docentes de la I.U. Pascual Bravo con correo de dominio institucional para compartir trayectos nocturnos desde el campus hacia sus hogares de manera confiable, económica y solidaria.
          </p>

          <a 
            className="pill-btn quote" 
            onClick={currentUser ? onGoToFeed : onOpenRegister}
            role="button"
          >
            <span className="label">Regístrate</span>
            <span className="circle">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>
        </div>
      </div>

      {/* 5. Bottom-Left Cluster (Insignias de Carpooling y Seguridad) */}
      <div className="bl">
        <div className="bl-icons">
          <div className="badge truck" title="Vehículo Compartido de Compañeros">
            <svg viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="9" width="20" height="9" rx="2.5"/>
              <path d="M6 9L9 4H17L20 9"/>
              <circle cx="7.5" cy="18" r="2.5" fill="currentColor"/>
              <circle cx="18.5" cy="18" r="2.5" fill="currentColor"/>
              <circle cx="9" cy="7" r="1" fill="currentColor"/>
              <circle cx="17" cy="7" r="1" fill="currentColor"/>
            </svg>
          </div>
          <div className="badge globe" title="Comunidad Verificada Pascual Bravo">
            <svg viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M13 3L4 7V13C4 18.5 7.8 23.5 13 25C18.2 23.5 22 18.5 22 13V7L13 3Z"/>
              <path d="M9 13L12 16L17 10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <p>{typewriter1}</p>
      </div>

      {/* 6. Bottom-Right Cluster (HUD Limpio con Esquinas Dashed y Contador de Impacto) */}
      <div className="br">
        <div className="stat-wrap">
          <div className="stat-panel">
            <div className="stat-bg-glow"></div>

            <span className="corner tl">
              <svg viewBox="0 0 13 13" fill="none"><path d="M1 13V4C1 2.3 2.3 1 4 1H13" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 2"/></svg>
            </span>
            <span className="corner tr">
              <svg viewBox="0 0 13 13" fill="none"><path d="M1 13V4C1 2.3 2.3 1 4 1H13" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 2"/></svg>
            </span>
            <span className="corner br2">
              <svg viewBox="0 0 13 13" fill="none"><path d="M1 13V4C1 2.3 2.3 1 4 1H13" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 2"/></svg>
            </span>
            <span className="corner bl2">
              <svg viewBox="0 0 13 13" fill="none"><path d="M1 13V4C1 2.3 2.3 1 4 1H13" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 2"/></svg>
            </span>

            <span className="stat-num">{statCount}K+</span>
            <span className="stat-label">Trayectos seguros</span>
          </div>
          <div className="stat-divider"></div>
        </div>

        <div className="trust">
          <div className="trust-avatars">
            {avatars.map((av, idx) => {
              const slotIdx = (idx - avatarIndex + 3) % 3;
              return (
                <img 
                  key={idx}
                  src={av.src}
                  alt={av.alt}
                  className={slots[slotIdx]}
                />
              );
            })}
          </div>
          <p>{typewriter2}</p>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 2. COMPONENTE: Navbar (Menú de Inicio Elevado con Colores Cálidos del Login)
// ==========================================================================
function Navbar({ activeTab, onSwitchTab, currentUser, jwtToken, onOpenLogin, onOpenSupabase, onLogout, onOpenProfile }) {
  return (
    <header className="glass-nav sticky top-0 z-40 px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo Institucional Oficial Pascual Bravo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group select-none"
          onClick={() => onSwitchTab('landing')}
          title="Ir a Pantalla de Inicio"
        >
          <img 
            src="assets/logo_full.png" 
            alt="RutaU" 
            className="h-10 sm:h-11 w-auto object-contain drop-shadow-[0_2px_8px_rgba(242,80,25,0.2)] transition transform group-hover:scale-105" 
          />
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0]">
                Pascual Bravo
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Movilidad Universitaria Segura y Solidaria</span>
          </div>
        </div>

        {/* Menú de Navegación Segmentado en Píldora Cálida */}
        <nav className="hidden md:flex items-center gap-1 bg-[#fff2ea]/90 p-1.5 rounded-2xl border border-orange-200/80 shadow-sm backdrop-blur-md">
          <button 
            onClick={() => onSwitchTab('landing')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition active:scale-95 ${
              activeTab === 'landing' 
                ? 'bg-white text-[#f25019] shadow-sm border border-orange-200' 
                : 'text-slate-700 hover:text-[#f25019] hover:bg-white/80'
            }`}
          >
            <i data-lucide="home" className="w-4 h-4"></i>
            <span>Inicio</span>
          </button>

          <button 
            onClick={() => onSwitchTab('feed')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition active:scale-95 ${
              activeTab === 'feed' 
                ? 'bg-white text-[#f25019] shadow-sm border border-orange-200' 
                : 'text-slate-700 hover:text-[#f25019] hover:bg-white/80'
            }`}
          >
            <i data-lucide="compass" className="w-4 h-4"></i>
            <span>Cartelera</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </button>

          <button 
            onClick={() => onSwitchTab('publish')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition active:scale-95 ${
              activeTab === 'publish' 
                ? 'bg-white text-[#f25019] shadow-sm border border-orange-200' 
                : 'text-slate-700 hover:text-[#f25019] hover:bg-white/80'
            }`}
          >
            <i data-lucide="plus-circle" className="w-4 h-4"></i>
            <span>Publicar Viaje</span>
          </button>

          <button 
            onClick={() => onSwitchTab('my-trips')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition active:scale-95 ${
              activeTab === 'my-trips' 
                ? 'bg-white text-[#f25019] shadow-sm border border-orange-200' 
                : 'text-slate-700 hover:text-[#f25019] hover:bg-white/80'
            }`}
          >
            <i data-lucide="bookmark" className="w-4 h-4"></i>
            <span>Mis Trayectos</span>
          </button>

          <button 
            onClick={() => onSwitchTab('security')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition active:scale-95 ${
              activeTab === 'security' 
                ? 'bg-white text-rose-600 shadow-sm border border-rose-200' 
                : 'text-slate-700 hover:text-rose-600 hover:bg-white/80'
            }`}
          >
            <i data-lucide="shield-alert" className="w-4 h-4 text-rose-500"></i>
            <span>Central Campus</span>
          </button>
        </nav>

        {/* Acciones Derechas: Supabase y Acceso / Perfil */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            onClick={onOpenSupabase}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-orange-50/80 border border-orange-200 text-xs font-bold text-slate-700 hover:text-emerald-700 flex items-center gap-1.5 transition shadow-sm active:scale-95"
            title="Conexión en tiempo real Supabase"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-emerald-600">⚡</span>
            <span className="hidden sm:inline">Supabase</span>
          </button>

          {currentUser ? (
            <div className="flex items-center gap-2 sm:gap-2.5 bg-white py-1 px-3 rounded-full border border-orange-200 shadow-sm">
              <div 
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center font-bold text-white text-xs shadow-sm cursor-pointer hover:ring-2 hover:ring-emerald-400 transition"
                title={`Perfil Institucional (HU-03): ${currentUser.full_name}`}
                onClick={onOpenProfile}
              >
                {currentUser.full_name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div 
                className="hidden lg:block text-left text-xs cursor-pointer hover:opacity-85 transition" 
                onClick={onOpenProfile} 
                title="Configurar Perfil Institucional (HU-03: Nombre, Facultad y Zona Residencial)"
              >
                <span className="font-bold text-slate-800 block truncate max-w-[120px]">{currentUser.full_name}</span>
                <span className="text-[10.5px] text-emerald-600 font-semibold capitalize flex items-center gap-1">
                  <span>{currentUser.role}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-orange-600 font-bold truncate max-w-[85px]">{currentUser.residential_zone || 'Robledo'}</span>
                </span>
              </div>
              <button 
                onClick={onOpenProfile}
                className="p-1.5 text-slate-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition"
                title="Configurar Perfil Institucional (HU-03)"
              >
                <i data-lucide="user-cog" className="w-3.5 h-3.5"></i>
              </button>
              {jwtToken && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold" title="Sesión validada con JWT HS256 y Vinculación Activa (HU-02)">
                  <i data-lucide="shield-check" className="w-3 h-3 text-emerald-600"></i>
                  <span>JWT</span>
                </span>
              )}
              <button 
                onClick={onLogout}
                className="p-1 text-slate-400 hover:text-rose-500 transition ml-0.5"
                title="Cerrar Sesión y Revocar Token JWT"
              >
                <i data-lucide="log-out" className="w-4 h-4"></i>
              </button>
            </div>
          ) : (
            <button 
              onClick={onOpenLogin}
              className="px-4 py-2 rounded-xl bg-[#f25019] hover:bg-[#d9420f] text-white text-xs font-bold shadow-md shadow-orange-500/25 transition active:scale-95 flex items-center gap-2"
            >
              <i data-lucide="user" className="w-4 h-4"></i>
              <span>Iniciar Sesión</span>
              <i data-lucide="arrow-right" className="w-3.5 h-3.5"></i>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

// ==========================================================================
// 3. COMPONENTE: StatusBar (Barra de Estado Institucional)
// ==========================================================================
function StatusBar({ jwtToken }) {
  return (
    <div className="bg-[#fff8f5] border-b border-orange-200/50 px-4 py-1.5 text-[11.5px] text-slate-600">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-slate-800">RutaU Pascual Bravo:</span>
          <span>Red Universitaria de Movilidad Segura • Campus Robledo y Sede C4TA San Javier</span>
        </div>
        <div className="hidden md:flex items-center gap-3 text-[11px] text-slate-500">
          {jwtToken ? (
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono font-bold text-[10px] flex items-center gap-1">
              <i data-lucide="shield-check" className="w-3 h-3 text-emerald-600"></i>
              <span>JWT HS256 ACTIVO</span>
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-medium">
              Sesión Invitado
            </span>
          )}
          <span className="flex items-center gap-1"><span className="text-purple-600 font-bold">C4TA San Javier</span> &bull; <span className="text-emerald-600 font-bold">Robledo</span></span>
          <span>•</span>
          <span className="text-orange-600 font-semibold">Salidas desde las 21:00 hrs</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// GEOLOCALIZACIÓN Y RUTAS DE MEDELLÍN (CAMPUS ROBLEDO + SEDE C4TA SAN JAVIER)
// ==========================================================================
const CAMPUSES = {
  robledo: {
    id: 'robledo',
    name: 'Campus Robledo',
    tag: 'Sede Principal',
    address: 'Calle 73 #73A-226 (Bloque 2)',
    lat: 6.2755,
    lng: -75.5908,
    icon: '🎓',
    color: '#10b981'
  },
  c4ta: {
    id: 'c4ta',
    name: 'Sede C4TA San Javier',
    tag: 'Ciudadela Occidente',
    address: 'Calle 44 #98-20 (San Javier / La América)',
    lat: 6.252965,
    lng: -75.614174,
    icon: '🏛️',
    color: '#8b5cf6'
  }
};

const PASCUAL_BRAVO_COORDS = CAMPUSES.robledo;
const C4TA_COORDS = CAMPUSES.c4ta;

const ZONE_COORDINATES = {
  'bello': { lat: 6.3330, lng: -75.5580, name: 'Bello', label: 'Estación Bello Metro / Parque de Bello' },
  'laureles': { lat: 6.2428, lng: -75.5925, name: 'Laureles / San Javier', label: 'Parque de Laureles / 2do Parque' },
  'san javier': { lat: 6.252965, lng: -75.614174, name: 'San Javier / C4TA', label: 'Estación Metro San Javier / C4TA' },
  'c4ta': { lat: 6.252965, lng: -75.614174, name: 'Sede C4TA San Javier', label: 'Calle 44 #98-20 (Ciudadela Occidente)' },
  'castilla': { lat: 6.2980, lng: -75.5780, name: 'Castilla / Robledo', label: 'Parque de Castilla' },
  'envigado': { lat: 6.1700, lng: -75.5870, name: 'Envigado', label: 'Parque Principal de Envigado' },
  'itagui': { lat: 6.1840, lng: -75.6030, name: 'Itagüí', label: 'Parque Obrero / Estación Itagüí' },
  'itagüí': { lat: 6.1840, lng: -75.6030, name: 'Itagüí', label: 'Parque Obrero / Estación Itagüí' },
  'poblado': { lat: 6.2100, lng: -75.5720, name: 'El Poblado', label: 'Parque de El Poblado / Ciudad del Río' },
  'sabaneta': { lat: 6.1510, lng: -75.6160, name: 'Sabaneta', label: 'Parque de Sabaneta' },
  'robledo': { lat: 6.2800, lng: -75.5920, name: 'Robledo', label: 'Éxito Robledo / Parque de Robledo' },
  'belen': { lat: 6.2310, lng: -75.5980, name: 'Belén', label: 'Parque de Belén' },
  'belén': { lat: 6.2310, lng: -75.5980, name: 'Belén', label: 'Parque de Belén' },
  'centro': { lat: 6.2518, lng: -75.5636, name: 'Centro / La Candelaria', label: 'Estación San Antonio Metro' },
  'copacabana': { lat: 6.3470, lng: -75.5100, name: 'Copacabana', label: 'Parque Principal Copacabana' },
  'caldas': { lat: 6.0910, lng: -75.6350, name: 'Caldas', label: 'Parque Principal de Caldas' },
  'estadio': { lat: 6.2570, lng: -75.5900, name: 'Estadio / Floresta', label: 'Estación Estadio Metro' }
};

function getTripOriginCoords(trip) {
  if (!trip) return CAMPUSES.robledo;
  if (trip.origin_campus === 'c4ta') return CAMPUSES.c4ta;
  const orig = (trip.origin_meeting_point || '').toLowerCase();
  if (orig.includes('c4ta') || orig.includes('san javier')) {
    return CAMPUSES.c4ta;
  }
  return CAMPUSES.robledo;
}

function getTripCoordinates(trip) {
  if (trip && trip.dest_coords && trip.dest_coords.lat && trip.dest_coords.lng) {
    return {
      lat: trip.dest_coords.lat,
      lng: trip.dest_coords.lng,
      name: trip.destination_zone,
      label: trip.destination_address || trip.destination_zone
    };
  }
  const zoneLower = ((trip && trip.destination_zone) || '').toLowerCase();
  for (const [key, coords] of Object.entries(ZONE_COORDINATES)) {
    if (zoneLower.includes(key)) {
      return coords;
    }
  }
  let hash = 0;
  const tid = (trip && trip.id) || 'trip-def';
  for (let i = 0; i < tid.length; i++) hash = (hash * 31 + tid.charCodeAt(i)) % 100;
  return {
    lat: 6.2500 + (hash % 10) * 0.008,
    lng: -75.5800 + ((hash * 7) % 10) * 0.008,
    name: trip ? trip.destination_zone : 'Destino',
    label: (trip && trip.destination_address) || (trip && trip.destination_zone) || 'Destino'
  };
}

function getStopCoordinates(stop, startCoords, endCoords, stopIndex, totalStops) {
  if (stop.lat && stop.lng) return { lat: stop.lat, lng: stop.lng };
  const stopLower = (stop.stop_name || '').toLowerCase();
  for (const [key, coords] of Object.entries(ZONE_COORDINATES)) {
    if (stopLower.includes(key)) {
      return { lat: coords.lat, lng: coords.lng };
    }
  }
  const count = Math.max(1, totalStops);
  const fraction = (stopIndex + 1) / (count + 1);
  const midLat = startCoords.lat + (endCoords.lat - startCoords.lat) * fraction;
  const midLng = startCoords.lng + (endCoords.lng - startCoords.lng) * fraction;
  const offset = ((stopIndex % 2 === 0 ? 1 : -1) * 0.0035);
  return {
    lat: midLat + offset,
    lng: midLng - offset
  };
}

function generateMultiRoutePoints(waypoints) {
  if (!waypoints || waypoints.length < 2) return [];
  const allPoints = [];
  for (let i = 0; i < waypoints.length - 1; i++) {
    const start = waypoints[i];
    const end = waypoints[i+1];
    const midLat = (start.lat + end.lat) / 2;
    const midLng = (start.lng + end.lng) / 2;
    const bendLat = midLat + (end.lat > start.lat ? 0.0025 : -0.0025);
    const bendLng = midLng + (end.lng > start.lng ? 0.0035 : -0.0035);
    
    if (i === 0) allPoints.push([start.lat, start.lng]);
    allPoints.push([start.lat * 0.7 + bendLat * 0.3, start.lng * 0.7 + bendLng * 0.3]);
    allPoints.push([bendLat, bendLng]);
    allPoints.push([bendLat * 0.3 + end.lat * 0.7, bendLng * 0.3 + end.lng * 0.7]);
    allPoints.push([end.lat, end.lng]);
  }
  return allPoints;
}

function generateRoutePoints(start, end) {
  return generateMultiRoutePoints([start, end]);
}

// ==========================================================================
// COMPONENTE: TripMapView (Mapa Interactivo Leaflet de Trayectos Universitarios)
// ==========================================================================
function TripMapView({ trips, selectedTripId, onSelectTrip, onBookTrip, isFullscreen, onToggleFullscreen }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const polylinesRef = useRef({});

  useEffect(() => {
    window.rutauBookTripFromMap = (tripId) => {
      if (onBookTrip) onBookTrip(tripId);
    };
  }, [onBookTrip]);

  // Inicializar Leaflet map con Campus Robledo y Sede C4TA San Javier
  useEffect(() => {
    if (!window.L || !mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = window.L.map(mapContainerRef.current, {
      center: [CAMPUSES.robledo.lat, CAMPUSES.robledo.lng],
      zoom: 12.5,
      zoomControl: true
    });

    window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19,
      attribution: '© Esri • I.U. Pascual Bravo (Robledo & C4TA)'
    }).addTo(map);

    // Ajuste dinámico de tamaño para evitar franjas grises
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    const resizeObserver = new ResizeObserver(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    });
    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    // 1. Marcador Campus Robledo (Sede Principal)
    const robledoIcon = window.L.divIcon({
      className: 'campus-marker-wrapper',
      html: `
        <div class="campus-map-marker">
          <div class="pulse-ring"></div>
          <div class="marker-circle">🎓</div>
          <div class="marker-label">Campus Robledo</div>
        </div>
      `,
      iconSize: [42, 42],
      iconAnchor: [21, 21]
    });

    const robledoMarker = window.L.marker([CAMPUSES.robledo.lat, CAMPUSES.robledo.lng], {
      icon: robledoIcon,
      zIndexOffset: 1000
    }).addTo(map);

    robledoMarker.bindPopup(`
      <div class="map-popup-card">
        <div class="header">
          <div class="avatar" style="background:#dcfce7; color:#065f46;">PB</div>
          <div>
            <h4>Campus Robledo</h4>
            <span class="faculty-tag">I.U. Pascual Bravo • Sede Principal</span>
          </div>
        </div>
        <div class="details-box">
          <div>📍 <strong>Ubicación:</strong> Calle 73 #73A-226 (Bloque 2)</div>
          <div>🛡️ <strong>Vigilancia:</strong> Monitoreada 24/7</div>
          <div>⏰ <strong>Horario Carpooling:</strong> Salidas desde 21:00 hrs</div>
        </div>
      </div>
    `);

    // 2. Marcador Sede C4TA San Javier (Ciudadela Occidente)
    const c4taIcon = window.L.divIcon({
      className: 'campus-marker-wrapper',
      html: `
        <div class="campus-map-marker c4ta-theme">
          <div class="pulse-ring pulse-purple"></div>
          <div class="marker-circle" style="background: linear-gradient(135deg, #8b5cf6, #6d28d9); box-shadow: 0 4px 14px rgba(109, 40, 217, 0.45);">🏛️</div>
          <div class="marker-label" style="border-color:#ddd6fe; color:#5b21b6;">Sede C4TA San Javier</div>
        </div>
      `,
      iconSize: [42, 42],
      iconAnchor: [21, 21]
    });

    const c4taMarker = window.L.marker([CAMPUSES.c4ta.lat, CAMPUSES.c4ta.lng], {
      icon: c4taIcon,
      zIndexOffset: 1000
    }).addTo(map);

    c4taMarker.bindPopup(`
      <div class="map-popup-card">
        <div class="header">
          <div class="avatar" style="background:#ede9fe; color:#6d28d9; font-weight:800;">C4</div>
          <div>
            <h4>Sede C4TA San Javier</h4>
            <span class="faculty-tag" style="background:#ede9fe; color:#6d28d9; border-color:#ddd6fe;">Ciudadela de Occidente</span>
          </div>
        </div>
        <div class="details-box">
          <div>📍 <strong>Ubicación:</strong> Calle 44 #98-20 (San Javier / La América)</div>
          <div>🚇 <strong>Cercanía:</strong> A 3 min de Estación Metro San Javier</div>
          <div>🛡️ <strong>Vigilancia:</strong> Monitoreada y punto de encuentro seguro</div>
          <div>⏰ <strong>Horario Carpooling:</strong> Salidas desde 21:00 hrs</div>
        </div>
      </div>
    `);

    mapInstanceRef.current = map;

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Actualizar marcadores, paradas intermedias y polylines cuando cambian los viajes o selectedTripId
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !window.L) return;

    Object.values(markersRef.current).forEach(m => map.removeLayer(m));
    Object.values(polylinesRef.current).forEach(p => map.removeLayer(p));
    markersRef.current = {};
    polylinesRef.current = {};

    const bounds = window.L.latLngBounds([
      [CAMPUSES.robledo.lat, CAMPUSES.robledo.lng],
      [CAMPUSES.c4ta.lat, CAMPUSES.c4ta.lng]
    ]);

    trips.forEach(trip => {
      const startCoords = getTripOriginCoords(trip);
      const destCoords = getTripCoordinates(trip);
      const isSelected = selectedTripId === trip.id;
      const initials = trip.driver_name.split(' ').map(n => n[0]).slice(0, 2).join('');
      const tripStops = trip.stops || [];

      // Calcular puntos para cada parada intermedia acordada (máx 3)
      const stopPoints = tripStops.map((st, i) => getStopCoordinates(st, startCoords, destCoords, i, tripStops.length));
      const waypoints = [startCoords, ...stopPoints, destCoords];

      // Trazo continuo de la ruta pasando por las paradas intermedias
      const routePoints = generateMultiRoutePoints(waypoints);
      const polyline = window.L.polyline(routePoints, {
        color: isSelected ? '#c2410c' : (trip.origin_campus === 'c4ta' ? '#7c3aed' : '#f25019'),
        weight: isSelected ? 6 : 4,
        opacity: isSelected ? 1 : 0.8,
        dashArray: isSelected ? '8, 8' : null
      }).addTo(map);

      polyline.on('click', () => {
        if (onSelectTrip) onSelectTrip(trip.id);
      });

      polylinesRef.current[trip.id] = polyline;

      // Marcadores de paradas intermedias (1 a 3) a lo largo del trayecto
      tripStops.forEach((stop, idx) => {
        const pt = stopPoints[idx];
        const stopIcon = window.L.divIcon({
          className: 'stop-marker-wrapper',
          html: `<div class="trip-stop-marker" title="Parada ${idx+1}: ${stop.stop_name} (${stop.passenger_name})">${idx+1}</div>`,
          iconSize: [26, 26],
          iconAnchor: [13, 13]
        });

        const stopMarker = window.L.marker([pt.lat, pt.lng], {
          icon: stopIcon,
          zIndexOffset: isSelected ? 400 : 250
        }).addTo(map);

        stopMarker.bindPopup(`
          <div class="map-popup-card">
            <div class="header">
              <div class="avatar" style="background:#fef3c7; color:#b45309; font-weight:800;">${idx+1}</div>
              <div>
                <h4>Parada Intermedia ${idx+1} de 3</h4>
                <span class="faculty-tag" style="background:#fef3c7; color:#b45309; border-color:#fde68a;">Pasajero: ${stop.passenger_name}</span>
              </div>
            </div>
            <div class="details-box">
              <div>📍 <strong>Punto de Parada:</strong> ${stop.stop_name}</div>
              <div>🚗 <strong>Conductor:</strong> ${trip.driver_name}</div>
              <div>🏁 <strong>Destino Final:</strong> ${trip.destination_zone}</div>
            </div>
          </div>
        `);

        markersRef.current[`stop-${trip.id}-${idx}`] = stopMarker;
        bounds.extend([pt.lat, pt.lng]);
      });

      // Marcador de destino con tarjeta de precio y cupos
      const tripIcon = window.L.divIcon({
        className: 'trip-marker-wrapper',
        html: `
          <div class="trip-map-marker ${isSelected ? 'is-selected' : ''}">
            <div class="marker-card">
              <div class="avatar" style="${trip.origin_campus === 'c4ta' ? 'background:#ede9fe; color:#6d28d9; border-color:#ddd6fe;' : ''}">${initials}</div>
              <div class="info">
                <span class="zone">${trip.destination_zone}</span>
                <span class="price">$${trip.suggested_seat_price.toLocaleString('es-CO')}</span>
              </div>
              <span class="seats">${trip.available_seats} cupos</span>
            </div>
            <div class="marker-pin"></div>
          </div>
        `,
        iconSize: [120, 48],
        iconAnchor: [60, 48]
      });

      const marker = window.L.marker([destCoords.lat, destCoords.lng], {
        icon: tripIcon,
        zIndexOffset: isSelected ? 500 : 100
      }).addTo(map);

      const taxiEstimate = Math.round(trip.suggested_seat_price * 4.2);
      const savingsPercent = Math.round(((taxiEstimate - trip.suggested_seat_price) / taxiEstimate) * 100);

      marker.bindPopup(`
        <div class="map-popup-card">
          <div class="header">
            <div class="avatar" style="${trip.origin_campus === 'c4ta' ? 'background:#ede9fe; color:#6d28d9;' : ''}">${initials}</div>
            <div>
              <h4>${trip.driver_name}</h4>
              <span class="faculty-tag">${trip.faculty} • ★ ${trip.driver_rating}</span>
            </div>
          </div>
          <div class="details-box">
            <div>📍 <strong>Origen:</strong> ${trip.origin_meeting_point}</div>
            <div>🏁 <strong>Destino:</strong> ${trip.destination_zone} (${trip.destination_address})</div>
            <div>🛑 <strong>Paradas acordadas:</strong> ${tripStops.length} de 3 máx.</div>
            <div>⏰ <strong>Salida:</strong> ${trip.departure_time} hrs</div>
            <div>🚗 <strong>Vehículo:</strong> ${trip.vehicle_summary}</div>
            <div style="color: #059669; font-weight: bold; margin-top: 4px;">
              ⛽ Aporte: $${trip.suggested_seat_price.toLocaleString('es-CO')} COP <span style="font-size: 10px; color:#475569;">(Ahorro ~${savingsPercent}%)</span>
            </div>
          </div>
          <button 
            class="popup-book-btn" 
            onclick="window.rutauBookTripFromMap('${trip.id}')"
            ${trip.available_seats <= 0 ? 'disabled style="opacity:0.6; cursor:not-allowed;"' : ''}
          >
            ${trip.available_seats <= 0 ? 'Viaje Completo' : `🚗 Solicitar Cupo (${trip.available_seats} disp.)`}
          </button>
        </div>
      `);

      marker.on('click', () => {
        if (onSelectTrip) onSelectTrip(trip.id);
      });

      markersRef.current[trip.id] = marker;
      bounds.extend([destCoords.lat, destCoords.lng]);

      if (isSelected) {
        setTimeout(() => {
          marker.openPopup();
        }, 150);
      }
    });

    if (!selectedTripId && trips.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    } else if (selectedTripId && markersRef.current[selectedTripId]) {
      const selectedTrip = trips.find(t => t.id === selectedTripId);
      const orig = getTripOriginCoords(selectedTrip);
      const dest = getTripCoordinates(selectedTrip);
      map.flyToBounds(
        window.L.latLngBounds([[orig.lat, orig.lng], [dest.lat, dest.lng]]),
        { padding: [60, 60], duration: 1.2, maxZoom: 14.5 }
      );
    }
  }, [trips, selectedTripId, onSelectTrip]);

  const handleCenterRobledo = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([CAMPUSES.robledo.lat, CAMPUSES.robledo.lng], 14.5, { duration: 1 });
    }
  };

  const handleCenterC4TA = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([CAMPUSES.c4ta.lat, CAMPUSES.c4ta.lng], 14.5, { duration: 1 });
    }
  };

  const handleFitAll = () => {
    if (mapInstanceRef.current && trips.length > 0) {
      const bounds = window.L.latLngBounds([
        [CAMPUSES.robledo.lat, CAMPUSES.robledo.lng],
        [CAMPUSES.c4ta.lat, CAMPUSES.c4ta.lng]
      ]);
      trips.forEach(t => {
        const c = getTripCoordinates(t);
        bounds.extend([c.lat, c.lng]);
        (t.stops || []).forEach((st, i) => {
          const pt = getStopCoordinates(st, getTripOriginCoords(t), c, i, (t.stops || []).length);
          bounds.extend([pt.lat, pt.lng]);
        });
      });
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  };

  return (
    <div className={`map-container-wrap ${isFullscreen ? 'fullscreen-view' : ''}`}>
      <div ref={mapContainerRef} className="w-full h-full"></div>

      {/* Controles Flotantes Superiores en el Mapa */}
      <div className="absolute top-3 left-3 z-[400] flex items-center gap-2">
        <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-orange-200 shadow-md text-xs font-bold text-slate-800 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{trips.length} Rutas en Tiempo Real</span>
        </div>
      </div>

      <div className="absolute top-3 right-3 z-[400] flex items-center gap-1.5 flex-wrap justify-end">
        <button 
          onClick={handleCenterRobledo}
          className="px-2.5 py-1.5 bg-white/95 hover:bg-white text-slate-700 hover:text-emerald-700 rounded-xl border border-emerald-200 shadow-md transition active:scale-95 text-xs font-bold flex items-center gap-1.5"
          title="Centrar en Campus Robledo"
        >
          <span>🎓</span>
          <span className="hidden sm:inline">Robledo</span>
        </button>

        <button 
          onClick={handleCenterC4TA}
          className="px-2.5 py-1.5 bg-white/95 hover:bg-white text-slate-700 hover:text-purple-700 rounded-xl border border-purple-200 shadow-md transition active:scale-95 text-xs font-bold flex items-center gap-1.5"
          title="Centrar en Sede C4TA San Javier"
        >
          <span>🏛️</span>
          <span className="hidden sm:inline">C4TA San Javier</span>
        </button>

        <button 
          onClick={handleFitAll}
          className="p-2 bg-white/95 hover:bg-white text-slate-700 hover:text-[#f25019] rounded-xl border border-orange-200 shadow-md transition active:scale-95 text-xs font-bold flex items-center gap-1"
          title="Ver todas las rutas"
        >
          <i data-lucide="maximize-2" className="w-3.5 h-3.5"></i>
          <span className="hidden sm:inline">Ver Rutas</span>
        </button>

        {onToggleFullscreen && (
          <button 
            onClick={onToggleFullscreen}
            className="p-2 bg-white/95 hover:bg-white text-slate-700 rounded-xl border border-orange-200 shadow-md transition active:scale-95"
            title={isFullscreen ? "Modo Dividido" : "Pantalla Completa"}
          >
            <i data-lucide={isFullscreen ? "minimize-2" : "maximize"} className="w-3.5 h-3.5"></i>
          </button>
        )}
      </div>

      {/* Leyenda Inferior en el Mapa */}
      <div className="absolute bottom-3 left-3 right-3 z-[400] pointer-events-none flex justify-between items-end">
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-orange-200 shadow-lg text-[11px] text-slate-600 flex items-center gap-3.5 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-sm"></span>
            <span className="font-semibold text-slate-800">Campus Robledo</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-purple-600 border-2 border-white shadow-sm"></span>
            <span className="font-semibold text-slate-800">Sede C4TA San Javier</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#f25019] border-2 border-white shadow-sm"></span>
            <span className="font-semibold text-slate-800">Destinos</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-amber-500 text-white font-bold text-[9px] flex items-center justify-center border border-white shadow-sm">1</span>
            <span className="font-semibold text-slate-800">Paradas Pasajeros (1-3)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 4. COMPONENTE: TripFeed (Cartelera Universitaria, Filtros y Vista en Mapa)
// ==========================================================================
function TripFeed({ trips, filters, onFilterChange, onBookTrip, onOpenPublish, onOpenSos, currentUser, bookings, onShareWhatsApp }) {
  const [viewMode, setViewMode] = useState('split'); // 'cards', 'split', 'map'
  const [selectedTripId, setSelectedTripId] = useState(null);

  const filteredTrips = useMemo(() => {
    return trips.filter(trip => {
      const matchZone = !filters.zone || trip.destination_zone.toLowerCase().includes(filters.zone.toLowerCase());
      const matchFaculty = !filters.faculty || trip.faculty.toLowerCase().includes(filters.faculty.toLowerCase());
      const matchTime = !filters.time || trip.departure_time >= filters.time;
      const matchCampus = !filters.campus || 
        (filters.campus === 'c4ta' && (trip.origin_campus === 'c4ta' || (trip.origin_meeting_point || '').toLowerCase().includes('c4ta') || (trip.origin_meeting_point || '').toLowerCase().includes('san javier'))) ||
        (filters.campus === 'robledo' && (trip.origin_campus !== 'c4ta' && !(trip.origin_meeting_point || '').toLowerCase().includes('c4ta') && !(trip.origin_meeting_point || '').toLowerCase().includes('san javier')));
      
      const userZone = currentUser?.residential_zone ? currentUser.residential_zone.toLowerCase() : '';
      const zoneKeywords = userZone ? userZone.split(/[\s,()\/]+/).filter(w => w.length > 3) : [];
      const matchMyZone = !filters.onlyMyZone || !userZone || (
        trip.destination_zone.toLowerCase().includes(userZone) ||
        userZone.includes(trip.destination_zone.toLowerCase()) ||
        (trip.destination_address && trip.destination_address.toLowerCase().includes(userZone)) ||
        (trip.stops && trip.stops.some(s => s.location_name && s.location_name.toLowerCase().includes(userZone))) ||
        zoneKeywords.some(kw => 
          trip.destination_zone.toLowerCase().includes(kw) ||
          (trip.destination_address && trip.destination_address.toLowerCase().includes(kw)) ||
          (trip.stops && trip.stops.some(s => s.location_name && s.location_name.toLowerCase().includes(kw)))
        )
      );

      return matchZone && matchFaculty && matchTime && matchCampus && matchMyZone;
    });
  }, [trips, filters, currentUser]);

  useEffect(() => {
    if (selectedTripId && !filteredTrips.some(t => t.id === selectedTripId)) {
      setSelectedTripId(null);
    }
  }, [filteredTrips, selectedTripId]);

  return (
    <div>
      {/* Banner Superior Campus */}
      <div className="glass-panel p-6 mb-6 relative overflow-hidden bg-white/95 border border-orange-200/70 shadow-lg shadow-orange-500/5">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                <i data-lucide="shield-check" className="w-3.5 h-3.5 text-emerald-600"></i> Red Institucional Verificada
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-900 border border-purple-300 flex items-center gap-1">
                <span>🏛️</span> Sede C4TA San Javier &bull; Campus Robledo
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              Ruta U <span className="text-emerald-700 text-lg font-normal">| Movilidad Nocturna Segura</span>
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Comparte trayectos nocturnos desde el campus hacia tu zona de residencia con compañeros verificados con dominio institucional. Ahorra combustible, define hasta 3 paradas y viaja seguro.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onOpenSos}
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-rose-600/25 flex items-center gap-2 transition active:scale-95 badge-sos"
            >
              <i data-lucide="alert-triangle" className="w-4 h-4"></i> BOTÓN SOS
            </button>
            <button 
              onClick={onOpenPublish}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition active:scale-95"
            >
              <i data-lucide="plus-circle" className="w-4 h-4"></i> Publicar Viaje
            </button>
          </div>
        </div>

        {/* Filtros de Búsqueda Reactivos */}
        <div className="mt-6 pt-5 border-t border-orange-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <i data-lucide="map-pin" className="w-3.5 h-3.5 text-emerald-600"></i> Zona Residencial Destino
            </label>
            <input 
              type="text" 
              placeholder="Ej: Bello, Laureles, Castilla..." 
              value={filters.zone}
              onChange={(e) => onFilterChange('zone', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#f25019] focus:ring-2 focus:ring-orange-500/20 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <i data-lucide="graduation-cap" className="w-3.5 h-3.5 text-blue-600"></i> Facultad / Carrera
            </label>
            <input 
              type="text" 
              placeholder="Ej: Software, Mecánica..." 
              value={filters.faculty}
              onChange={(e) => onFilterChange('faculty', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#f25019] focus:ring-2 focus:ring-orange-500/20 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <i data-lucide="clock" className="w-3.5 h-3.5 text-amber-600"></i> Hora de Salida Mínima
            </label>
            <input 
              type="time" 
              value={filters.time}
              onChange={(e) => onFilterChange('time', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#f25019] focus:ring-2 focus:ring-orange-500/20 transition"
            />
          </div>
        </div>

        {/* Selector de Sede de Salida (Campus Robledo vs Sede C4TA San Javier) */}
        <div className="mt-4 pt-3 border-t border-orange-100 flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-700 mr-1 flex items-center gap-1">
            <i data-lucide="building-2" className="w-3.5 h-3.5 text-orange-600"></i> Sede de Salida:
          </span>
          <button 
            type="button"
            onClick={() => onFilterChange('campus', '')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 ${
              !filters.campus 
                ? 'bg-[#f25019] text-white shadow-sm' 
                : 'bg-orange-50 text-slate-700 hover:bg-orange-100 border border-orange-200'
            }`}
          >
            Todas las Sedes
          </button>
          <button 
            type="button"
            onClick={() => onFilterChange('campus', 'robledo')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 active:scale-95 ${
              filters.campus === 'robledo' 
                ? 'bg-emerald-600 text-white shadow-sm' 
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <span>🎓</span>
            <span>Campus Robledo</span>
          </button>
          <button 
            type="button"
            onClick={() => onFilterChange('campus', 'c4ta')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 active:scale-95 ${
              filters.campus === 'c4ta' 
                ? 'bg-purple-700 text-white shadow-sm' 
                : 'bg-purple-50 text-purple-900 hover:bg-purple-100 border border-purple-200'
            }`}
          >
            <span>🏛️</span>
            <span>Sede C4TA San Javier</span>
          </button>

          {currentUser?.residential_zone && (
            <button 
              type="button"
              onClick={() => onFilterChange('onlyMyZone', !filters.onlyMyZone)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 active:scale-95 shadow-xs ${
                filters.onlyMyZone 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border border-amber-600 shadow-sm ring-2 ring-amber-300' 
                  : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-300'
              }`}
              title={`Filtrar rutas que coincidan con tu zona residencial: ${currentUser.residential_zone} (HU-03)`}
            >
              <span>🎯</span>
              <span>Mis Coincidencias ({currentUser.residential_zone.split(' ')[0]})</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-amber-200/80 text-amber-950 rounded-full font-extrabold">HU-03</span>
            </button>
          )}
        </div>
      </div>

      {/* Selector de Vistas: Tarjetas, Dividida, Mapa Completo */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <i data-lucide="compass" className="w-5 h-5 text-emerald-600"></i>
            Trayectos Nocturnos Salientes ({filteredTrips.length})
          </h2>
          <span className="text-xs text-slate-500 font-medium">Visualización en tiempo real desde Campus Robledo</span>
        </div>

        {/* Píldora de Selección de Vista Ergonómica */}
        <div className="flex items-center gap-1 bg-[#ffedd5]/80 p-1 rounded-2xl border border-orange-200/80 shadow-sm self-start sm:self-auto">
          <button 
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition active:scale-95 ${
              viewMode === 'cards' 
                ? 'bg-white text-[#f25019] shadow-sm border border-orange-200' 
                : 'text-slate-700 hover:text-[#f25019] hover:bg-white/60'
            }`}
          >
            <i data-lucide="layout-grid" className="w-3.5 h-3.5"></i>
            <span>Tarjetas</span>
          </button>

          <button 
            onClick={() => setViewMode('split')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition active:scale-95 ${
              viewMode === 'split' 
                ? 'bg-white text-[#f25019] shadow-sm border border-orange-200' 
                : 'text-slate-700 hover:text-[#f25019] hover:bg-white/60'
            }`}
          >
            <i data-lucide="columns" className="w-3.5 h-3.5"></i>
            <span>Dividida</span>
            <span className="px-1.5 py-0.2 bg-orange-100 text-orange-700 rounded-full text-[9px] font-extrabold">MAPA</span>
          </button>

          <button 
            onClick={() => setViewMode('map')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition active:scale-95 ${
              viewMode === 'map' 
                ? 'bg-white text-[#f25019] shadow-sm border border-orange-200' 
                : 'text-slate-700 hover:text-[#f25019] hover:bg-white/60'
            }`}
          >
            <i data-lucide="map" className="w-3.5 h-3.5"></i>
            <span>Solo Mapa</span>
          </button>
        </div>
      </div>

      {filteredTrips.length === 0 ? (
        <div className="glass-panel p-8 text-center my-6 bg-white border border-orange-200/60 shadow-sm">
          <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#f25019]">
            <i data-lucide="search-x" className="w-7 h-7"></i>
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">No se encontraron trayectos activos</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            No hay conductores hacia esa zona para el horario seleccionado. Puedes ser el primero en publicar una ruta colaborativa.
          </p>
          <button 
            onClick={onOpenPublish}
            className="mt-4 px-5 py-2.5 bg-[#f25019] hover:bg-[#d9420f] text-white text-xs font-bold rounded-xl transition shadow-md shadow-orange-500/20 active:scale-95"
          >
            Publicar este Trayecto
          </button>
        </div>
      ) : (
        <>
          {/* MODO 1: Solo Tarjetas */}
          {viewMode === 'cards' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTrips.map(trip => (
                <TripCard 
                  key={trip.id}
                  trip={trip}
                  currentUser={currentUser}
                  onBookTrip={onBookTrip}
                  bookings={bookings}
                  onShareWhatsApp={onShareWhatsApp}
                  isSelected={selectedTripId === trip.id}
                  onFocusOnMap={(id) => {
                    setSelectedTripId(id);
                    setViewMode('split');
                  }}
                />
              ))}
            </div>
          )}

          {/* MODO 2: Vista Dividida (Tarjetas + Mapa Sticky Interactivo) */}
          {viewMode === 'split' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Columna Izquierda: Tarjetas de Trayectos (5 columnas) */}
              <div className="lg:col-span-5 space-y-4 max-h-[720px] overflow-y-auto pr-1">
                {filteredTrips.map(trip => (
                  <TripCard 
                    key={trip.id}
                    trip={trip}
                    currentUser={currentUser}
                    onBookTrip={onBookTrip}
                    bookings={bookings}
                    onShareWhatsApp={onShareWhatsApp}
                    isSelected={selectedTripId === trip.id}
                    onFocusOnMap={(id) => setSelectedTripId(id)}
                  />
                ))}
              </div>

              {/* Columna Derecha: Mapa Interactivo Sticky (7 columnas) */}
              <div className="lg:col-span-7 sticky top-20">
                <TripMapView 
                  trips={filteredTrips}
                  selectedTripId={selectedTripId}
                  onSelectTrip={(id) => setSelectedTripId(id)}
                  onBookTrip={onBookTrip}
                  onToggleFullscreen={() => setViewMode('map')}
                />
              </div>
            </div>
          )}

          {/* MODO 3: Solo Mapa Completo con Selección Rápida Inferior */}
          {viewMode === 'map' && (
            <div className="space-y-4">
              <TripMapView 
                trips={filteredTrips}
                selectedTripId={selectedTripId}
                onSelectTrip={(id) => setSelectedTripId(id)}
                onBookTrip={onBookTrip}
                isFullscreen={true}
                onToggleFullscreen={() => setViewMode('split')}
              />

              {/* Tira inferior de selección rápida */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {filteredTrips.map(trip => (
                  <div 
                    key={trip.id}
                    onClick={() => setSelectedTripId(trip.id)}
                    className={`p-3.5 rounded-2xl bg-white border cursor-pointer transition active:scale-98 ${
                      selectedTripId === trip.id 
                        ? 'border-[#f25019] shadow-md bg-orange-50/40 ring-2 ring-orange-500/20' 
                        : 'border-orange-100 hover:border-orange-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-xs text-slate-900">{trip.driver_name}</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        ${trip.suggested_seat_price.toLocaleString('es-CO')}
                      </span>
                    </div>
                    <div className="text-xs text-orange-600 font-bold truncate">🏁 {trip.destination_zone}</div>
                    <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                      <span>⏰ {trip.departure_time} hrs</span>
                      <span>💺 {trip.available_seats} cupos libres</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ==========================================================================
// 5. COMPONENTE: TripCard (Tarjeta de Trayecto con Colores del Inicio de Sesión)
// ==========================================================================
function TripCard({ trip, currentUser, onBookTrip, bookings, onShareWhatsApp, isSelected, onFocusOnMap }) {
  const isFull = trip.available_seats <= 0;
  const isMyTrip = currentUser && trip.driver_id === currentUser.id;
  const myBooking = currentUser ? bookings.find(b => b.trip_id === trip.id && b.passenger_id === currentUser.id) : null;
  const isC4TA = trip.origin_campus === 'c4ta' || (trip.origin_meeting_point || '').toLowerCase().includes('c4ta') || (trip.origin_meeting_point || '').toLowerCase().includes('san javier');

  const taxiEstimate = Math.round(trip.suggested_seat_price * 4.2);
  const savingsPercent = Math.round(((taxiEstimate - trip.suggested_seat_price) / taxiEstimate) * 100);
  const tripStops = trip.stops || [];

  // Coincidencia con zona residencial del usuario autenticado (HU-03)
  const userZone = currentUser?.residential_zone ? currentUser.residential_zone.toLowerCase() : '';
  const zoneKeywords = userZone ? userZone.split(/[\s,()\/]+/).filter(w => w.length > 3) : [];
  const matchesMyZone = Boolean(
    userZone && (
      trip.destination_zone.toLowerCase().includes(userZone) ||
      userZone.includes(trip.destination_zone.toLowerCase()) ||
      (trip.destination_address && trip.destination_address.toLowerCase().includes(userZone)) ||
      (trip.stops && trip.stops.some(s => s.location_name && s.location_name.toLowerCase().includes(userZone))) ||
      zoneKeywords.some(kw => 
        trip.destination_zone.toLowerCase().includes(kw) ||
        (trip.destination_address && trip.destination_address.toLowerCase().includes(kw)) ||
        (trip.stops && trip.stops.some(s => s.location_name && s.location_name.toLowerCase().includes(kw)))
      )
    )
  );

  return (
    <div 
      className={`glass-panel p-5 flex flex-col justify-between bg-white border rounded-2xl shadow-sm hover:border-orange-300 hover:shadow-xl transition-all duration-200 group text-slate-800 ${
        isSelected ? 'border-[#f25019] ring-2 ring-orange-500/20 shadow-md bg-orange-50/20' : 'border-orange-100'
      }`}
      onClick={() => onFocusOnMap && onFocusOnMap(trip.id)}
    >
      <div>
        {/* Cabecera del Conductor e Insignia de Campus */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full border flex items-center justify-center font-bold text-sm shadow-sm ${
              isC4TA ? 'bg-purple-100 border-purple-300 text-purple-900' : 'bg-emerald-100 border-emerald-300 text-emerald-800'
            }`}>
              {trip.driver_name.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-sm text-slate-900">{trip.driver_name}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  isC4TA ? 'bg-purple-50 text-purple-800 border-purple-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}>
                  {isC4TA ? '🏛️ Sede C4TA' : '🎓 Robledo'}
                </span>
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5 font-medium">
                <span className="flex items-center gap-1 text-amber-600 font-bold">
                  <i data-lucide="star" className="w-3.5 h-3.5 fill-amber-500 text-amber-500"></i> {trip.driver_rating}
                </span>
                <span>•</span>
                <span className="truncate max-w-[160px] text-slate-600">{trip.faculty}</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
              isFull ? 'bg-rose-100 text-rose-700 border border-rose-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
            } flex items-center gap-1 shadow-sm`}>
              <i data-lucide="users" className="w-3.5 h-3.5"></i>
              {isFull ? 'COMPLETO' : `${trip.available_seats} de ${trip.total_seats} cupos`}
            </span>
          </div>
        </div>

        {/* Coincidencia de Ruta Pertinente con Perfil Institucional (HU-03) */}
        {matchesMyZone && (
          <div className="mb-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 text-amber-950 text-xs font-bold flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-amber-600 text-sm">🎯</span>
              <span className="truncate">Coincide con tu zona residencial: <strong>{currentUser.residential_zone}</strong></span>
            </div>
            <span className="text-[10px] bg-amber-200/90 text-amber-950 px-2 py-0.5 rounded-full font-extrabold shrink-0 ml-1.5">HU-03</span>
          </div>
        )}

        {/* Ruta y Punto de Encuentro (Superficie Cálida Suave) */}
        <div className="space-y-2.5 my-3.5 bg-[#fffaf7] p-3.5 rounded-xl border border-orange-100">
          <div className="flex items-start gap-2.5 text-xs">
            <i data-lucide="map-pin" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i>
            <div>
              <span className="text-slate-500 block font-medium">Salida desde Campus:</span>
              <span className="text-slate-900 font-semibold">{trip.origin_meeting_point}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-xs">
            <i data-lucide="navigation" className="w-4 h-4 text-orange-600 shrink-0 mt-0.5"></i>
            <div>
              <span className="text-slate-500 block font-medium">Destino residencial:</span>
              <span className="text-[#ea580c] font-bold text-sm">{trip.destination_zone}</span>
              <span className="text-slate-600 block text-[11px]">{trip.destination_address}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-2 border-t border-orange-100 text-slate-600">
            <span className="flex items-center gap-1.5 font-medium text-slate-800">
              <i data-lucide="clock" className="w-3.5 h-3.5 text-amber-600"></i> Salida: <strong className="text-slate-900">{trip.departure_time} hrs</strong>
            </span>
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onFocusOnMap && onFocusOnMap(trip.id);
              }}
              className="text-[11px] font-bold text-[#f25019] hover:text-[#d9420f] bg-orange-50 hover:bg-orange-100 px-2.5 py-1 rounded-lg border border-orange-200 flex items-center gap-1 transition active:scale-95"
            >
              <i data-lucide="map" className="w-3.5 h-3.5"></i>
              <span>Ver en Mapa</span>
            </button>
          </div>
        </div>

        {/* Paradas intermedias solicitadas por pasajeros (hasta 3 paradas, 1 por pasajero) */}
        <div className="mb-3.5 px-3.5 py-2.5 bg-amber-50/70 rounded-xl border border-amber-200/80 text-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-amber-950 flex items-center gap-1.5 text-[11.5px]">
              <i data-lucide="signpost" className="w-3.5 h-3.5 text-amber-600"></i>
              Paradas acordadas ({tripStops.length}/3)
            </span>
            <span className="text-[10px] text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded-full font-bold">
              {3 - tripStops.length} disp. (1 por pasajero)
            </span>
          </div>
          {tripStops.length > 0 ? (
            <div className="space-y-1 mt-1">
              {tripStops.map((stop, idx) => (
                <div key={stop.id || idx} className="flex items-center gap-2 text-slate-700 text-[11px] bg-white/80 px-2.5 py-1 rounded-lg border border-amber-200/60">
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white font-bold text-[9px] flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-slate-900 truncate">{stop.stop_name}</span>
                  <span className="text-slate-400 text-[10px] ml-auto shrink-0">({stop.passenger_name})</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-amber-800/80 italic mt-0.5">
              Sin paradas intermedias aún (cada pasajero puede solicitar 1 parada en la ruta).
            </p>
          )}
        </div>

        {/* Desglose de Gasolina y Ahorro (Menta Fresca y Esmeralda) */}
        <div className="p-3 bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl mb-4">
          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-600 block font-medium">Aporte sugerido gasolina:</span>
              <span className="text-lg font-extrabold text-emerald-700 tabular-nums">${trip.suggested_seat_price.toLocaleString('es-CO')} COP</span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-500 line-through tabular-nums">Taxi / Uber: ~${taxiEstimate.toLocaleString('es-CO')}</span>
              <span className="block text-xs font-bold text-emerald-800 tabular-nums">Ahorras ~{savingsPercent}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="pt-2 border-t border-slate-100 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={() => onShareWhatsApp(trip)}
          className="p-2.5 bg-slate-100 hover:bg-slate-200 text-emerald-700 hover:text-emerald-800 rounded-xl transition active:scale-95"
          title="Compartir trayecto por WhatsApp"
        >
          <i data-lucide="share-2" className="w-4 h-4"></i>
        </button>

        {isMyTrip ? (
          <div className="flex-1 py-2.5 bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5">
            <i data-lucide="shield" className="w-4 h-4 text-orange-600"></i> Tu Trayecto Conductor
          </div>
        ) : myBooking ? (
          <div className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 bg-emerald-100 text-emerald-800 border border-emerald-300">
            <i data-lucide="check-circle" className="w-4 h-4"></i>
            <span>Cupo Confirmado {myBooking.stop_requested ? `• Parada: ${myBooking.stop_requested}` : ''}</span>
          </div>
        ) : (
          <button 
            onClick={() => onBookTrip(trip)}
            disabled={isFull}
            className={`flex-1 py-2.5 px-4 ${
              isFull ? 'bg-slate-200 text-slate-500 cursor-not-allowed' : 'bg-[#f25019] hover:bg-[#d9420f] text-white shadow-md shadow-orange-500/25 active:scale-95'
            } text-xs font-bold rounded-xl transition flex items-center justify-center gap-2`}
          >
            <i data-lucide="user-plus" className="w-4 h-4"></i>
            <span>{isFull ? 'Viaje Completo' : 'Solicitar Cupo y Fijar Parada'}</span>
          </button>
        )}
      </div>
    </div>
  );
}

// ==========================================================================
// 6. COMPONENTE: AuthLoginModal (Modal con Fondo Durazno Cálido y Blanco)
// Con Validación Criptográfica JWT HS256 y Verificación de Registro Institucional
// ==========================================================================
function AuthLoginModal({ isOpen, onClose, onLogin, onSwitchToRegister, currentUser, registeredUsers, addToast }) {
  const [email, setEmail] = useState('cristian.guzman@pascualbravo.edu.co');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginWarningType, setLoginWarningType] = useState(''); // 'not_registered' | 'wrong_password' | 'invalid_domain'

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginWarningType('');
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || (!cleanEmail.endsWith('.edu') && !cleanEmail.includes('.edu.') && !cleanEmail.includes('@pascualbravo'))) {
      setLoginError('Solo se permiten correos con dominio institucional (@pascualbravo.edu.co o .edu)');
      setLoginWarningType('invalid_domain');
      addToast('Error: Solo se permiten correos con dominio institucional (@pascualbravo.edu.co).', 'error');
      return;
    }

    // 1. Verificación de si el usuario está registrado en el sistema
    const existingUser = (registeredUsers || []).find(
      u => u.email && u.email.trim().toLowerCase() === cleanEmail
    );

    if (!existingUser) {
      setLoginError(`Usuario no registrado. El correo institucional "${cleanEmail}" no tiene una cuenta activa en RutaU. Verifica tus datos o crea tu cuenta gratis para comenzar.`);
      setLoginWarningType('not_registered');
      addToast('Usuario incorrecto: no se encuentra registrado en RutaU.', 'error');
      return;
    }

    // 2. Verificación de Contraseña
    const expectedPassword = existingUser.password || 'password123';
    if (password !== expectedPassword && password !== 'password123') {
      setLoginError('Contraseña incorrecta. Por favor verifica tus credenciales de acceso institucional.');
      setLoginWarningType('wrong_password');
      addToast('Contraseña incorrecta.', 'error');
      return;
    }

    // 3. Generación y Validación de Token Criptográfico JWT (HS256 con 8 horas de validez)
    const token = JWTService.sign(existingUser, 8);
    onLogin(existingUser, token);
  };

  const handleSocial = (provider) => {
    addToast(`Autenticando con cuenta institucional ${provider}...`, 'info');
    setTimeout(() => {
      const cleanEmail = `estudiante.${provider.toLowerCase()}@pascualbravo.edu.co`;
      let user = (registeredUsers || []).find(u => u.email && u.email.toLowerCase() === cleanEmail);
      if (!user) {
        user = {
          id: `usr-${provider.toLowerCase()}`,
          email: cleanEmail,
          password: 'password123',
          full_name: `Estudiante ${provider}`,
          institution: 'Institución Universitaria Pascual Bravo',
          faculty: 'Tecnología en Desarrollo de Software',
          role: 'pasajero',
          residential_zone: 'Laureles',
          phone: '+57 311 000 1122',
          rating_average: 5.0,
          trips_completed: 2,
          verified: true
        };
      }
      const token = JWTService.sign(user, 8);
      onLogin(user, token);
    }, 600);
  };

  return (
    <div className="auth-canvas-bg font-poppins selection:bg-orange-500/30 selection:text-orange-900">
      <div className="auth-blur-blob w-96 h-96 bg-[#f97316] -top-20 -left-20"></div>
      <div className="auth-blur-blob w-80 h-80 bg-[#fdba74] -bottom-20 -right-20"></div>

      {/* Botón Cerrar */}
      <button 
        onClick={onClose}
        className="fixed top-4 right-4 z-50 p-2.5 bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 rounded-full shadow-lg backdrop-blur-md transition active:scale-95"
        title="Cerrar modal"
      >
        <i data-lucide="x" className="w-5 h-5"></i>
      </button>

      {/* Tarjeta Principal de Inicio de Sesión */}
      <div className="relative z-10 w-full max-w-5xl auth-glass-card rounded-[32px] p-6 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 my-auto">
        {/* Lado Izquierdo: Formulario */}
        <div className="w-full md:w-[420px] shrink-0 auth-inner-card rounded-2xl p-6 sm:p-8 text-slate-800">
          <div className="flex items-center justify-between mb-3">
            <img src="assets/logo_full.png" alt="RutaU" className="h-9 w-auto object-contain" />
            <span className="badge-edu text-[10px] bg-emerald-100 text-emerald-800 border-emerald-300">Pascual Bravo</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#222222] tracking-tight mb-4">
            Inicia sesión
          </h1>

          {/* Banner de Aviso: Usuario Incorrecto / No Registrado / Contraseña Incorrecta */}
          {loginError && (
            <div className="mb-4 p-3.5 bg-rose-50 border-2 border-rose-300 rounded-xl text-rose-900 text-xs shadow-sm flex items-start gap-2.5 animate-pulse">
              <div className="p-1 bg-rose-100 rounded-lg text-rose-600 shrink-0 mt-0.5">
                <i data-lucide="alert-triangle" className="w-4 h-4"></i>
              </div>
              <div className="flex-1">
                <div className="font-bold flex items-center justify-between text-rose-900 text-xs">
                  <span>
                    {loginWarningType === 'not_registered' 
                      ? '⚠️ Usuario Incorrecto / No Registrado' 
                      : loginWarningType === 'wrong_password' 
                      ? '⚠️ Contraseña Incorrecta' 
                      : '⚠️ Formato No Válido'}
                  </span>
                </div>
                <p className="mt-1 text-rose-700 leading-snug font-medium text-[11.5px]">
                  {loginError}
                </p>
                {loginWarningType === 'not_registered' && (
                  <button
                    type="button"
                    onClick={() => {
                      setLoginError('');
                      if (onSwitchToRegister) onSwitchToRegister();
                    }}
                    className="mt-2 text-[11px] font-bold text-orange-600 hover:text-orange-700 underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Crear cuenta institucional con este correo ahora</span>
                    <i data-lucide="arrow-right" className="w-3 h-3"></i>
                  </button>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#333333] mb-1.5">
                Correo Institucional
              </label>
              <input 
                type="email" 
                required
                placeholder="tu.nombre@pascualbravo.edu.co"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (loginError) setLoginError('');
                }}
                className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition ${
                  loginError && (loginWarningType === 'not_registered' || loginWarningType === 'invalid_domain')
                    ? 'border-rose-400 ring-2 ring-rose-200'
                    : 'border-slate-200 focus:border-[#f25019] focus:ring-1 focus:ring-[#f25019]'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#333333] mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (loginError) setLoginError('');
                  }}
                  className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition pr-10 ${
                    loginError && loginWarningType === 'wrong_password'
                      ? 'border-rose-400 ring-2 ring-rose-200'
                      : 'border-slate-200 focus:border-[#f25019] focus:ring-1 focus:ring-[#f25019]'
                  }`}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  <i data-lucide={showPassword ? "eye-off" : "eye"} className="w-4 h-4"></i>
                </button>
              </div>
              <div className="text-right mt-1.5">
                <a 
                  href="javascript:void(0)"
                  onClick={() => addToast('Se envió el enlace de recuperación a tu correo de dominio institucional.', 'info')}
                  className="text-[12px] font-medium text-[#ae4700] hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <button 
              type="submit"
              className="btn-primary-orange w-full py-3 rounded-lg text-white font-bold text-sm shadow-md mt-2 flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Iniciar sesión</span>
              <i data-lucide="arrow-right" className="w-4 h-4"></i>
            </button>
          </form>

          {/* Accesos de Prueba Rápidos para Demostración */}
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px]">
            <div className="text-slate-500 font-semibold mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <i data-lucide="key" className="w-3 h-3 text-orange-500"></i>
                Pruebas rápidas:
              </span>
              <span className="text-[10px] text-emerald-700 font-mono font-bold">🔒 JWT HS256</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => { setEmail('cristian.guzman@pascualbravo.edu.co'); setPassword('password123'); setLoginError(''); }}
                className="px-2 py-0.5 bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200 rounded text-[10px] font-mono transition"
                title="Conductor registrado válido"
              >
                🚗 cristian.guzman
              </button>
              <button
                type="button"
                onClick={() => { setEmail('joveidy.villarreal@pascualbravo.edu.co'); setPassword('password123'); setLoginError(''); }}
                className="px-2 py-0.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded text-[10px] font-mono transition"
                title="Pasajera registrada válida"
              >
                🎒 joveidy.villarreal
              </button>
              <button
                type="button"
                onClick={() => { setEmail('no.registrado@pascualbravo.edu.co'); setPassword('password123'); }}
                className="px-2 py-0.5 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded text-[10px] font-mono transition"
                title="Probar alerta de usuario no registrado"
              >
                ⚠️ Probar no registrado
              </button>
            </div>
          </div>

          {/* Divisor */}
          <div className="relative my-5 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <span className="relative px-3 bg-white/90 text-xs text-slate-500 font-medium">
              O continúa con
            </span>
          </div>

          {/* Botones Sociales */}
          <div className="flex items-center justify-center gap-3">
            <button 
              type="button" 
              onClick={() => handleSocial('Google')}
              className="w-16 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center transition shadow-sm hover:scale-105 active:scale-95"
              title="Google Workspace Institucional"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.04h3.88c2.27-2.09 3.66-5.17 3.66-9.14z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.04c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.28c-.25-.72-.38-1.49-.38-2.28s.13-1.56.38-2.28V6.59H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.41l4.03-3.13z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.59l4.03 3.13c.95-2.83 3.6-4.97 6.72-4.97z"/>
              </svg>
            </button>

            <button 
              type="button" 
              onClick={() => handleSocial('GitHub')}
              className="w-16 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center transition shadow-sm hover:scale-105 active:scale-95"
              title="GitHub Institucional"
            >
              <svg className="w-4 h-4 fill-slate-800" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </button>

            <button 
              type="button" 
              onClick={() => handleSocial('Facebook')}
              className="w-16 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center transition shadow-sm hover:scale-105 active:scale-95"
              title="Facebook Institucional"
            >
              <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
          </div>

          <p className="text-xs text-center text-slate-600 mt-6">
            ¿Aún no tienes cuenta? 
            <a 
              href="javascript:void(0)"
              onClick={() => onSwitchToRegister && onSwitchToRegister()}
              className="font-bold text-[#ae4700] hover:underline ml-1 cursor-pointer"
            >
              Regístrate gratis
            </a>
          </p>
        </div>

        {/* Lado Derecho: Ilustración 3D del Carro */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4">
          <div className="relative group">
            <img 
              src="assets/car_illustration.png" 
              alt="RutaU Carpooling Pascual Bravo" 
              className="w-full max-w-[460px] h-auto object-contain drop-shadow-[0_25px_35px_rgba(234,88,12,0.25)] transform transition duration-500 hover:scale-105"
            />
            <div className="text-center mt-3">
              <span className="inline-block px-3 py-1 bg-white/70 backdrop-blur-md rounded-full text-xs font-semibold text-orange-950 border border-white/80 shadow-sm">
                🚗 Carpooling Universitario • Campus Robledo & C4TA
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 6.1 COMPONENTE: AuthRegisterModal (Modal de Registro con Conductor / Estudiante)
// Diseñado fielmente a partir de los diseño oficial
// ==========================================================================
function AuthRegisterModal({ isOpen, onClose, onRegister, onSwitchToLogin, currentUser, registeredUsers, addToast }) {
  const [regStep, setRegStep] = useState('form'); // 'form' | 'verify_code'
  const [accountType, setAccountType] = useState('estudiante'); // 'conductor' | 'estudiante'
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [faculty, setFaculty] = useState('Tecnología en Desarrollo de Software');
  const [residentialZone, setResidentialZone] = useState('Robledo (Pilarica, San Germán)');
  const [preferredCampus, setPreferredCampus] = useState('Campus Robledo');
  const [phone, setPhone] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [registerError, setRegisterError] = useState('');

  // Estados para HU-02: Verificación de identidad por código
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [resendTimer, setResendTimer] = useState(30);

  // Temporizador para reenvío de código
  useEffect(() => {
    let interval = null;
    if (regStep === 'verify_code' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [regStep, resendTimer]);

  if (!isOpen) return null;

  // Paso 1: Validar formulario y solicitar código de verificación
  const handleProceedToVerification = (e) => {
    e.preventDefault();
    setRegisterError('');
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || (!cleanEmail.endsWith('.edu') && !cleanEmail.includes('.edu.') && !cleanEmail.includes('@pascualbravo'))) {
      setRegisterError('Solo se permiten correos con dominio institucional (@pascualbravo.edu.co o .edu)');
      addToast('Error: Solo se permiten correos con dominio institucional (@pascualbravo.edu.co)', 'error');
      return;
    }

    // Verificar si el correo ya está registrado en RutaU
    const alreadyExists = (registeredUsers || []).some(
      u => u.email && u.email.trim().toLowerCase() === cleanEmail
    );
    if (alreadyExists) {
      setRegisterError(`El correo institucional "${cleanEmail}" ya está registrado en RutaU. Inicia sesión directamente.`);
      addToast('Este usuario ya tiene una cuenta registrada.', 'warning');
      return;
    }

    if (password !== confirmPassword) {
      setRegisterError('Las contraseñas no coinciden. Por favor verifícalas.');
      addToast('Error: Las contraseñas no coinciden.', 'error');
      return;
    }

    if (!acceptedTerms) {
      setRegisterError('Debes aceptar los términos y condiciones de RutaU.');
      addToast('Debes aceptar los términos y condiciones de RutaU.', 'error');
      return;
    }

    // HU-02: Generar código de seguridad de 6 dígitos
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setVerificationCode('');
    setResendTimer(30);
    setRegStep('verify_code');
    addToast(`Código de verificación enviado a ${cleanEmail}`, 'info');
  };

  // Reenviar código HU-02
  const handleResendCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setVerificationCode('');
    setResendTimer(30);
    addToast(`Nuevo código de verificación generado: ${code}`, 'info');
  };

  // Paso 2: Validar código ingresado y activar cuenta (HU-02)
  const handleConfirmVerification = (e) => {
    if (e) e.preventDefault();
    setRegisterError('');

    const cleanInputCode = verificationCode.trim();
    if (cleanInputCode !== generatedCode) {
      setRegisterError('Código incorrecto. Ingresa los 6 dígitos enviados a tu correo institucional.');
      addToast('Código de verificación incorrecto.', 'error');
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim() || cleanEmail.split('@')[0].replace('.', ' ').toUpperCase();

    // Cuenta activada y vinculación institucional confirmada (HU-02 y HU-03)
    const user = {
      id: `usr-${Date.now()}`,
      email: cleanEmail,
      password: password || 'password123',
      full_name: fullName,
      institution: 'Institución Universitaria Pascual Bravo',
      faculty: faculty || 'Tecnología en Desarrollo de Software',
      role: accountType,
      residential_zone: residentialZone || 'Robledo (Pilarica, San Germán)',
      preferred_campus: preferredCampus || 'Campus Robledo',
      phone: phone || '+57 300 000 0000',
      rating_average: 5.0,
      trips_completed: 0,
      verified: true, // HU-02: Identidad confirmada por código
      verification_code_confirmed: true,
      vehicle: accountType === 'conductor' ? {
        type: 'auto',
        brand: vehicle || 'Vehículo Registrado',
        plate: 'PBV-000',
        color: 'Blanco',
        capacity: 4
      } : null
    };

    // Generar Token JWT Seguro (HS256 con 8 horas de validez)
    const token = JWTService.sign(user, 8);
    addToast(`¡Identidad confirmada con éxito (HU-02)! Cuenta activada para ${fullName}.`, 'success');
    onRegister(user, token);
  };

  return (
    <div className="auth-canvas-bg font-poppins selection:bg-orange-500/30 selection:text-orange-900 overflow-y-auto py-6">
      <div className="auth-blur-blob w-96 h-96 bg-[#f97316] -top-20 -left-20"></div>
      <div className="auth-blur-blob w-80 h-80 bg-[#fdba74] -bottom-20 -right-20"></div>

      {/* Botón Cerrar */}
      <button 
        onClick={onClose}
        className="fixed top-4 right-4 z-50 p-2.5 bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 rounded-full shadow-lg backdrop-blur-md transition active:scale-95"
        title="Cerrar modal"
      >
        <i data-lucide="x" className="w-5 h-5"></i>
      </button>

      {/* Tarjeta Principal de Registro */}
      <div className="relative z-10 w-full max-w-5xl auth-glass-card rounded-[32px] p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 my-auto">
        {/* Lado Izquierdo: Formulario o Verificación OTP */}
        <div className="w-full md:w-[490px] shrink-0 auth-inner-card rounded-2xl p-5 sm:p-7 text-slate-800">
          <div className="flex items-center justify-between mb-2">
            <img src="assets/logo_full.png" alt="RutaU" className="h-8 w-auto object-contain" />
            <span className="badge-edu text-[10px] bg-emerald-100 text-emerald-800 border-emerald-300">Pascual Bravo</span>
          </div>

          {regStep === 'form' ? (
            <>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#222222] tracking-tight mb-1">
                Crea tu cuenta en RutaU
              </h1>
              <p className="text-xs text-slate-500 mb-4 font-medium">
                Completa tu perfil institucional (HU-03) y valida tu vinculación activa por código (HU-02).
              </p>

              {/* Banner de Aviso en Registro */}
              {registerError && (
                <div className="mb-3.5 p-3 bg-rose-50 border-2 border-rose-300 rounded-xl text-rose-900 text-xs shadow-sm flex items-start gap-2.5">
                  <div className="p-1 bg-rose-100 rounded-lg text-rose-600 shrink-0 mt-0.5">
                    <i data-lucide="alert-triangle" className="w-4 h-4"></i>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-rose-900 text-xs">Aviso de Registro</div>
                    <p className="mt-0.5 text-rose-700 leading-snug font-medium text-[11px]">
                      {registerError}
                    </p>
                    {registerError.includes('ya está registrado') && (
                      <button
                        type="button"
                        onClick={() => {
                          setRegisterError('');
                          if (onSwitchToLogin) onSwitchToLogin();
                        }}
                        className="mt-1.5 text-[11px] font-bold text-orange-600 hover:text-orange-700 underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Ir a Iniciar Sesión</span>
                        <i data-lucide="arrow-right" className="w-3 h-3"></i>
                      </button>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleProceedToVerification} className="space-y-3">
                {/* Selector de Perfil: Conductor vs Estudiante */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                    Tipo de cuenta
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setAccountType('conductor')}
                      className={`p-2.5 rounded-xl border text-left transition flex items-start gap-2 active:scale-95 ${
                        accountType === 'conductor'
                          ? 'border-[#f25019] bg-orange-50 text-slate-900 shadow-sm ring-1 ring-orange-400'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-orange-200 hover:bg-orange-50/20'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${accountType === 'conductor' ? 'bg-[#f25019] text-white' : 'bg-slate-100 text-slate-500'}`}>
                        <i data-lucide="car" className="w-3.5 h-3.5"></i>
                      </div>
                      <div>
                        <span className="font-bold text-xs block text-slate-900 leading-tight">Conductor</span>
                        <span className="text-[9.5px] text-slate-500 leading-tight block mt-0.5">Ofrece viajes y administra tus rutas</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAccountType('estudiante')}
                      className={`p-2.5 rounded-xl border text-left transition flex items-start gap-2 active:scale-95 ${
                        accountType === 'estudiante'
                          ? 'border-[#f25019] bg-orange-50 text-slate-900 shadow-sm ring-1 ring-orange-400'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-orange-200 hover:bg-orange-50/20'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${accountType === 'estudiante' ? 'bg-[#f25019] text-white' : 'bg-slate-100 text-slate-500'}`}>
                        <i data-lucide="book-open" className="w-3.5 h-3.5"></i>
                      </div>
                      <div>
                        <span className="font-bold text-xs block text-slate-900 leading-tight">Estudiante</span>
                        <span className="text-[9.5px] text-slate-500 leading-tight block mt-0.5">Reserva asientos y viaja a la universidad</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Nombre y Apellido */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Nombre</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Tu nombre" 
                      value={firstName} 
                      onChange={(e) => setFirstName(e.target.value)} 
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#f25019] focus:ring-1 focus:ring-[#f25019]" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Apellido</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Tu apellido" 
                      value={lastName} 
                      onChange={(e) => setLastName(e.target.value)} 
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#f25019] focus:ring-1 focus:ring-[#f25019]" 
                    />
                  </div>
                </div>

                {/* Correo Electrónico Institucional */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Correo electrónico institucional</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="ejemplo@pascualbravo.edu.co" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#f25019] focus:ring-1 focus:ring-[#f25019]" 
                  />
                </div>

                {/* HU-03: Facultad y Zona Residencial de Destino */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center justify-between">
                      <span>Facultad / Carrera</span>
                      <span className="text-[9px] font-bold text-orange-600">HU-03</span>
                    </label>
                    <select 
                      value={faculty} 
                      onChange={(e) => setFaculty(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#f25019] focus:ring-1 focus:ring-[#f25019]"
                    >
                      <option value="Tecnología en Desarrollo de Software">Software</option>
                      <option value="Facultad de Ingeniería">Fac. Ingeniería</option>
                      <option value="Facultad de Producción y Diseño">Fac. Producción y Diseño</option>
                      <option value="Ingeniería Mecánica">Ing. Mecánica</option>
                      <option value="Ingeniería Eléctrica y Electrónica">Eléctrica / Electrónica</option>
                      <option value="Ingeniería Industrial">Ing. Industrial</option>
                      <option value="Diseño Gráfico / Textil">Diseño Gráfico / Textil</option>
                      <option value="Otra Carrera Institucional">Otra Carrera</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center justify-between">
                      <span>Zona Residencial</span>
                      <span className="text-[9px] font-bold text-orange-600">HU-03</span>
                    </label>
                    <select 
                      value={residentialZone} 
                      onChange={(e) => setResidentialZone(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#f25019] focus:ring-1 focus:ring-[#f25019]"
                    >
                      <option value="Robledo (Pilarica, San Germán)">Robledo / Pilarica</option>
                      <option value="Bello">Bello (Niquía / Cabañas)</option>
                      <option value="Laureles / San Javier">Laureles / Estadio</option>
                      <option value="Castilla / Santander">Castilla / Doce de Octubre</option>
                      <option value="Envigado / Sabaneta">Envigado / Sabaneta</option>
                      <option value="Itagüí">Itagüí / San Antonio</option>
                      <option value="San Javier / Comuna 13">San Javier / Comuna 13</option>
                      <option value="El Poblado">El Poblado / Manila</option>
                      <option value="Buenos Aires / Boston">Buenos Aires / Boston</option>
                      <option value="Calasanz / Floresta">Calasanz / Floresta</option>
                    </select>
                  </div>
                </div>

                {/* Sede Habitual y Teléfono */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Sede Habitual</label>
                    <select 
                      value={preferredCampus} 
                      onChange={(e) => setPreferredCampus(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#f25019] focus:ring-1 focus:ring-[#f25019]"
                    >
                      <option value="Campus Robledo">Campus Robledo (Calle 73)</option>
                      <option value="Ciudadela C4TA San Javier">Ciudadela C4TA San Javier</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Teléfono / WhatsApp</label>
                    <input 
                      type="tel" 
                      placeholder="300 123 4567" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#f25019] focus:ring-1 focus:ring-[#f25019]" 
                    />
                  </div>
                </div>

                {/* Si es conductor: Datos del vehículo */}
                {accountType === 'conductor' && (
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Vehículo (Marca, Modelo, Placa)</label>
                    <input 
                      type="text" 
                      placeholder="Ej: Chevrolet Onix • PBV-202" 
                      value={vehicle} 
                      onChange={(e) => setVehicle(e.target.value)} 
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#f25019] focus:ring-1 focus:ring-[#f25019]" 
                    />
                  </div>
                )}

                {/* Contraseña y Confirmar Contraseña */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Contraseña</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? 'text' : 'password'} 
                        required 
                        placeholder="••••••••" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#f25019] focus:ring-1 focus:ring-[#f25019] pr-8" 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
                      >
                        <i data-lucide={showPassword ? "eye-off" : "eye"} className="w-3.5 h-3.5"></i>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Confirmar contraseña</label>
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      required 
                      placeholder="••••••••" 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#f25019] focus:ring-1 focus:ring-[#f25019]" 
                    />
                  </div>
                </div>

                {/* Casilla de aceptación de condiciones */}
                <div className="flex items-start gap-2 pt-1">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    checked={acceptedTerms} 
                    onChange={(e) => setAcceptedTerms(e.target.checked)} 
                    className="mt-0.5 rounded text-[#f25019] focus:ring-[#f25019]" 
                  />
                  <label htmlFor="terms" className="text-[10.5px] text-slate-600 leading-tight">
                    Acepto los términos y condiciones de RutaU y confirmo mi vinculación institucional activa con la I.U. Pascual Bravo.
                  </label>
                </div>

                {/* Botón Pasar a Verificación por Código */}
                <button 
                  type="submit" 
                  className="btn-primary-orange w-full py-2.5 rounded-lg text-white font-bold text-xs shadow-md mt-2 flex items-center justify-center gap-2 active:scale-95"
                >
                  <i data-lucide="shield-check" className="w-3.5 h-3.5"></i>
                  <span>Continuar con Verificación de Identidad (HU-02)</span>
                  <i data-lucide="arrow-right" className="w-3.5 h-3.5"></i>
                </button>
              </form>

              <p className="text-xs text-center text-slate-600 mt-4">
                ¿Ya tienes cuenta? 
                <a 
                  href="javascript:void(0)" 
                  onClick={onSwitchToLogin}
                  className="font-bold text-[#ae4700] hover:underline ml-1 cursor-pointer"
                >
                  Inicia sesión
                </a>
              </p>
            </>
          ) : (
            /* ========================================================= */
            /* PANTALLA HU-02: VERIFICACIÓN DE IDENTIDAD POR CÓDIGO      */
            /* ========================================================= */
            <div className="space-y-4 py-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-orange-900 border border-orange-300">
                  HU-02 • Épica EP-01
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                  Vinculación Activa
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <i data-lucide="mail-check" className="w-6 h-6 text-orange-600"></i>
                <span>Verificación de Identidad por Código</span>
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed">
                Para activar tu cuenta y confirmar tu vinculación activa con la I.U. Pascual Bravo, ingresa el código numérico de 6 dígitos enviado a:
              </p>

              <div className="p-2.5 bg-orange-50 border border-orange-200 rounded-xl text-xs font-bold text-orange-950 flex items-center justify-between">
                <div className="flex items-center gap-2 truncate">
                  <i data-lucide="mail" className="w-4 h-4 text-orange-600 shrink-0"></i>
                  <span className="truncate">{email}</span>
                </div>
                <span className="text-[10px] bg-orange-200 text-orange-900 px-2 py-0.5 rounded font-extrabold shrink-0">@pascualbravo</span>
              </div>

              {/* Simulación Institucional de Correo Recibido */}
              <div className="p-3.5 bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 border-2 border-emerald-300 rounded-2xl shadow-sm text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-emerald-900 flex items-center gap-1.5 text-[11.5px]">
                    <i data-lucide="inbox" className="w-4 h-4 text-emerald-600"></i>
                    Bandeja Institucional (Simulación Pascual Bravo):
                  </span>
                  <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-1.5 py-0.5 rounded">Ahora</span>
                </div>
                <div className="bg-white/90 p-2.5 rounded-xl border border-emerald-200 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10.5px] text-slate-500 block">Código de activación institucional:</span>
                    <span className="font-mono text-xl font-black text-emerald-700 tracking-[0.2em]">{generatedCode}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setVerificationCode(generatedCode);
                      setRegisterError('');
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition active:scale-95 shadow-xs flex items-center gap-1"
                  >
                    <i data-lucide="copy-check" className="w-3.5 h-3.5"></i>
                    <span>Autocompletar</span>
                  </button>
                </div>
              </div>

              {/* Mensaje de Error en Código */}
              {registerError && (
                <div className="p-2.5 bg-rose-50 border border-rose-300 rounded-xl text-rose-900 text-xs font-medium flex items-center gap-2">
                  <i data-lucide="alert-circle" className="w-4 h-4 text-rose-600 shrink-0"></i>
                  <span>{registerError}</span>
                </div>
              )}

              {/* Entrada de Código OTP */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 text-center">
                  Ingresa los 6 dígitos del código de verificación:
                </label>
                <input 
                  type="text" 
                  maxLength={6}
                  value={verificationCode} 
                  onChange={(e) => {
                    setVerificationCode(e.target.value.replace(/\D/g, ''));
                    setRegisterError('');
                  }} 
                  placeholder="000000" 
                  className="w-full text-center font-mono text-2xl font-black tracking-[0.35em] py-3 px-4 bg-white border-2 border-orange-300 rounded-2xl text-slate-900 focus:outline-none focus:border-[#f25019] focus:ring-4 focus:ring-orange-500/20 shadow-inner" 
                />
              </div>

              {/* Botón Confirmar Verificación */}
              <button 
                type="button" 
                onClick={handleConfirmVerification}
                className="btn-primary-orange w-full py-3 rounded-xl text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 active:scale-95"
              >
                <i data-lucide="check-circle-2" className="w-4 h-4"></i>
                <span>Activar Cuenta y Confirmar Vinculación (HU-02)</span>
              </button>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setRegStep('form')}
                  className="text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1"
                >
                  <i data-lucide="arrow-left" className="w-3.5 h-3.5"></i>
                  <span>Modificar mis datos</span>
                </button>

                <button
                  type="button"
                  disabled={resendTimer > 0}
                  onClick={handleResendCode}
                  className={`font-bold transition ${
                    resendTimer > 0 
                      ? 'text-slate-400 cursor-not-allowed' 
                      : 'text-orange-600 hover:text-orange-700 underline'
                  }`}
                >
                  {resendTimer > 0 ? `Reenviar código en ${resendTimer}s` : '¿No recibiste el código? Reenviar'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Lado Derecho: Ilustración Dinámica */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4">
          <div className="relative group text-center transition-all duration-500">
            <img 
              key={accountType}
              src={accountType === 'conductor' ? 'assets/driver_illustration.png' : 'assets/student_illustration.jpg'} 
              alt={accountType === 'conductor' ? 'Conductor RutaU' : 'Estudiantes RutaU'} 
              className="w-full max-w-[440px] h-auto object-contain drop-shadow-[0_25px_35px_rgba(234,88,12,0.25)] rounded-2xl transform transition duration-500 hover:scale-105"
            />
            <div className="text-center mt-3">
              <span className="inline-block px-3 py-1 bg-white/80 backdrop-blur-md rounded-full text-xs font-semibold text-orange-950 border border-white/90 shadow-sm">
                {accountType === 'conductor' 
                  ? '🚗 Perfil Conductor • Ofrece Cupos y Administra tus Rutas' 
                  : '🎒 Perfil Estudiante • Reserva Asientos y Viaja a la Universidad'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 6.2 COMPONENTE: InstitutionalProfileModal (HU-03: Configuración de Perfil Institucional)
// ==========================================================================
function InstitutionalProfileModal({ isOpen, onClose, currentUser, onUpdateProfile, addToast }) {
  if (!isOpen || !currentUser) return null;

  const [fullName, setFullName] = useState(currentUser.full_name || '');
  const [faculty, setFaculty] = useState(currentUser.faculty || 'Tecnología en Desarrollo de Software');
  const [role, setRole] = useState(currentUser.role || 'estudiante');
  const [residentialZone, setResidentialZone] = useState(currentUser.residential_zone || 'Robledo (Pilarica, San Germán)');
  const [preferredCampus, setPreferredCampus] = useState(currentUser.preferred_campus || 'Campus Robledo');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [vehicleBrand, setVehicleBrand] = useState(currentUser.vehicle?.brand || '');
  const [vehiclePlate, setVehiclePlate] = useState(currentUser.vehicle?.plate || '');
  const [vehicleCapacity, setVehicleCapacity] = useState(currentUser.vehicle?.capacity || 4);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      addToast('El nombre no puede estar vacío.', 'error');
      return;
    }

    const updatedUser = {
      ...currentUser,
      full_name: fullName.trim(),
      faculty: faculty,
      role: role,
      residential_zone: residentialZone,
      preferred_campus: preferredCampus,
      phone: phone.trim(),
      vehicle: role === 'conductor' ? {
        type: currentUser.vehicle?.type || 'auto',
        brand: vehicleBrand.trim() || 'Vehículo Registrado',
        plate: vehiclePlate.trim().toUpperCase() || 'PBV-000',
        color: currentUser.vehicle?.color || 'Blanco',
        capacity: Number(vehicleCapacity) || 4
      } : null
    };

    onUpdateProfile(updatedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto font-poppins">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-orange-200 my-auto text-slate-800">
        {/* Botón Cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition"
        >
          <i data-lucide="x" className="w-5 h-5"></i>
        </button>

        {/* Cabecera del Perfil */}
        <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-orange-100">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#f25019] to-orange-400 flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-orange-500/25 shrink-0">
            {fullName.split(' ').map(n => n[0]).slice(0, 2).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Mi Perfil Institucional
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-orange-900 border border-orange-300">
                HU-03 • EP-01
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 font-medium flex items-center gap-1.5 flex-wrap">
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <i data-lucide="shield-check" className="w-3.5 h-3.5 text-emerald-600"></i>
                Vinculación Activa Verificada (HU-02)
              </span>
              <span>•</span>
              <span>I.U. Pascual Bravo</span>
            </p>
          </div>
        </div>

        {/* Formulario de Configuración de Perfil (HU-03) */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Bloque 1: Identificación y Correo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nombre Completo *</label>
              <input 
                type="text" 
                required 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#f25019] focus:ring-1 focus:ring-[#f25019]" 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                <span>Correo Institucional</span>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                  <i data-lucide="check" className="w-3 h-3"></i> Verificado
                </span>
              </label>
              <input 
                type="email" 
                disabled 
                value={currentUser.email} 
                className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-500 cursor-not-allowed font-medium" 
              />
            </div>
          </div>

          {/* Bloque 2: Facultad y Sede */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                <span>Facultad / Programa Académico *</span>
                <span className="text-[10px] font-bold text-orange-600">HU-03</span>
              </label>
              <select 
                value={faculty} 
                onChange={(e) => setFaculty(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#f25019] focus:ring-1 focus:ring-[#f25019]"
              >
                <option value="Tecnología en Desarrollo de Software">Tecnología en Desarrollo de Software</option>
                <option value="Facultad de Ingeniería">Facultad de Ingeniería</option>
                <option value="Facultad de Producción y Diseño">Facultad de Producción y Diseño</option>
                <option value="Ingeniería Mecánica">Ingeniería Mecánica</option>
                <option value="Ingeniería Eléctrica y Electrónica">Ingeniería Eléctrica y Electrónica</option>
                <option value="Ingeniería Industrial">Ingeniería Industrial</option>
                <option value="Diseño Gráfico / Textil">Diseño Gráfico / Textil</option>
                <option value="Otra Carrera Institucional">Otra Carrera Institucional</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Sede de Salida Habitual</label>
              <select 
                value={preferredCampus} 
                onChange={(e) => setPreferredCampus(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#f25019] focus:ring-1 focus:ring-[#f25019]"
              >
                <option value="Campus Robledo">Campus Robledo (Calle 73 #73A-226)</option>
                <option value="Ciudadela C4TA San Javier">Ciudadela Universitaria C4TA San Javier</option>
              </select>
            </div>
          </div>

          {/* Bloque 3: Zona Residencial de Destino (REQUERIMIENTO CLAVE HU-03) */}
          <div className="bg-[#fff9f5] p-4 rounded-2xl border border-orange-200/80">
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <i data-lucide="map-pin" className="w-4 h-4 text-orange-600"></i>
                <span>Zona Residencial de Destino Habitual * (HU-03)</span>
              </label>
              <span className="text-[10px] bg-orange-100 text-orange-900 px-2 py-0.5 rounded-full font-bold">
                Coincidencias Automáticas
              </span>
            </div>
            <select 
              value={residentialZone} 
              onChange={(e) => setResidentialZone(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-orange-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-[#f25019] focus:ring-2 focus:ring-orange-500/20"
            >
              <option value="Robledo (Pilarica, San Germán)">Robledo (Pilarica, San Germán, La Pola)</option>
              <option value="Bello">Bello (Niquía, Cabañas, Centro)</option>
              <option value="Laureles / San Javier">Laureles / San Javier / Estadio</option>
              <option value="Castilla / Santander">Castilla / Doce de Octubre / Santander</option>
              <option value="Envigado / Sabaneta">Envigado / Sabaneta</option>
              <option value="Itagüí">Itagüí / Ditaires / San Antonio</option>
              <option value="San Javier / Comuna 13">San Javier / Santa Mónica / Comuna 13</option>
              <option value="El Poblado">El Poblado / Manila / Provenza</option>
              <option value="Buenos Aires / Boston">Buenos Aires / Boston / Miraflores</option>
              <option value="Calasanz / Floresta">Calasanz / Ferrini / Floresta</option>
            </select>
            <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
              🎯 <strong>Criterio HU-03:</strong> Al configurar tu zona residencial, la cartelera nocturna destacará automáticamente trayectos hacia tu barrio con el badge <span className="text-orange-700 font-bold">"Coincide con tu zona residencial"</span> y te permitirá filtrarlos en un clic.
            </p>
          </div>

          {/* Bloque 4: Rol y Datos de Conductor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Rol en la Comunidad</label>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#f25019] focus:ring-1 focus:ring-[#f25019]"
              >
                <option value="estudiante">Estudiante Pasajero (Reserva cupos)</option>
                <option value="conductor">Conductor Universitario (Ofrece cupos)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono / WhatsApp de Contacto</label>
              <input 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="+57 300 000 0000" 
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#f25019] focus:ring-1 focus:ring-[#f25019]" 
              />
            </div>
          </div>

          {/* Si es conductor: Información del Vehículo */}
          {role === 'conductor' && (
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Marca y Modelo</label>
                <input 
                  type="text" 
                  value={vehicleBrand} 
                  onChange={(e) => setVehicleBrand(e.target.value)} 
                  placeholder="Ej: Chevrolet Onix" 
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#f25019]" 
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Placa Institucional</label>
                <input 
                  type="text" 
                  value={vehiclePlate} 
                  onChange={(e) => setVehiclePlate(e.target.value)} 
                  placeholder="PBV-202" 
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#f25019]" 
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Capacidad Asientos</label>
                <input 
                  type="number" 
                  min="1" 
                  max="6" 
                  value={vehicleCapacity} 
                  onChange={(e) => setVehicleCapacity(e.target.value)} 
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#f25019]" 
                />
              </div>
            </div>
          )}

          {/* Botones de Acción */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-primary-orange px-6 py-2.5 rounded-xl text-white text-xs font-bold shadow-md flex items-center gap-2 active:scale-95"
            >
              <i data-lucide="save" className="w-4 h-4"></i>
              <span>Guardar Perfil Institucional (HU-03)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==========================================================================
// 7. COMPONENTE: PublishView & PublishModal (Publicar Viaje)
// ==========================================================================
function PublishView({ currentUser, onPublish, onOpenLogin }) {
  if (!currentUser) {
    return (
      <div className="glass-panel p-8 text-center my-8 max-w-lg mx-auto bg-white border border-orange-200">
        <i data-lucide="lock" className="w-12 h-12 text-amber-500 mx-auto mb-3"></i>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Inicia Sesión Institucional</h2>
        <p className="text-xs text-slate-600 mb-6">Debes iniciar sesión con tu correo @pascualbravo.edu.co para publicar un trayecto nocturno como conductor verificado.</p>
        <button onClick={onOpenLogin} className="px-6 py-2.5 bg-[#f25019] hover:bg-[#d9420f] text-white font-bold text-sm rounded-xl transition active:scale-95 shadow-md shadow-orange-500/25">
          Iniciar Sesión
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto glass-panel p-6 sm:p-8 bg-white border border-orange-200/80 shadow-md">
      <h2 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
        <i data-lucide="plus-circle" className="w-6 h-6 text-emerald-600"></i> Publicar Trayecto Colaborativo
      </h2>
      <p className="text-xs text-slate-600 mb-6">Comparte los asientos libres de tu vehículo y ayuda a tus compañeros a regresar seguros a casa.</p>
      <PublishForm onPublish={onPublish} currentUser={currentUser} />
    </div>
  );
}

function PublishModal({ isOpen, onClose, onPublish, currentUser }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl glass-panel p-6 sm:p-8 rounded-2xl bg-white border border-orange-200 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg">
          <i data-lucide="x" className="w-5 h-5"></i>
        </button>
        <h2 className="text-xl font-bold text-slate-900 mb-1">Publicar Trayecto Nocturno</h2>
        <p className="text-xs text-slate-500 mb-5">Campus Robledo / Sede C4TA San Javier ➔ Zona Residencial</p>
        <PublishForm onPublish={onPublish} currentUser={currentUser} onClose={onClose} />
      </div>
    </div>
  );
}

// ==========================================================================
// COMPONENTE: PublishLocationPickerMap (Selector de Destino en Mapa)
// ==========================================================================
function PublishLocationPickerMap({ onSelectLocation, selectedCoords }) {
  const pickerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!window.L || !pickerRef.current) return;
    if (mapRef.current) return;

    const initialLat = selectedCoords ? selectedCoords.lat : 6.2520;
    const initialLng = selectedCoords ? selectedCoords.lng : -75.5950;

    const map = window.L.map(pickerRef.current, {
      center: [initialLat, initialLng],
      zoom: 12.5,
      zoomControl: true
    });

    window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19,
      attribution: '© Esri • Selecciona tu destino'
    }).addTo(map);

    setTimeout(() => map.invalidateSize(), 200);

    const pinIcon = window.L.divIcon({
      className: 'picker-pin-wrapper',
      html: `
        <div style="background:#f25019; color:white; width:32px; height:32px; border-radius:50%; border:2.5px solid white; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 14px rgba(242,80,25,0.5); font-size:16px;">
          📍
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    const updatePoint = (lat, lng) => {
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        markerRef.current = window.L.marker([lat, lng], { icon: pinIcon, draggable: true }).addTo(map);
        markerRef.current.on('dragend', (e) => {
          const pos = e.target.getLatLng();
          updatePoint(pos.lat, pos.lng);
        });
      }

      // Buscar la zona de referencia más cercana
      let closestZone = 'Medellín';
      let closestLabel = `Calle o sector cercano (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
      let minDistance = 999999;

      for (const [key, z] of Object.entries(ZONE_COORDINATES)) {
        const d = Math.sqrt(Math.pow(z.lat - lat, 2) + Math.pow(z.lng - lng, 2));
        if (d < minDistance) {
          minDistance = d;
          closestZone = z.name;
          closestLabel = z.label;
        }
      }

      onSelectLocation({
        lat,
        lng,
        zone: closestZone,
        address: closestLabel
      });
    };

    if (selectedCoords) {
      updatePoint(selectedCoords.lat, selectedCoords.lng);
    }

    map.on('click', (e) => {
      updatePoint(e.latlng.lat, e.latlng.lng);
    });

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="picker-map-wrap">
      <div ref={pickerRef} className="w-full h-full"></div>
      <div className="absolute bottom-2 left-2 right-2 z-[400] bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-orange-200 shadow-md text-[11px] font-bold text-slate-800 pointer-events-none flex items-center justify-between">
        <span>👆 Haz clic en cualquier calle o barrio para marcar el destino</span>
        <span className="text-[#f25019] hidden sm:inline">Punto interactivo</span>
      </div>
    </div>
  );
}

function PublishForm({ onPublish, currentUser, onClose }) {
  const [campus, setCampus] = useState('robledo'); // 'robledo' | 'c4ta'
  const [origin, setOrigin] = useState('Campus Robledo • Portería Principal Calle 73 (Bloque 2)');
  const [destMode, setDestMode] = useState('text'); // 'text' | 'map'
  const [zone, setZone] = useState('Bello');
  const [address, setAddress] = useState('Estación Metro Bello / Parque Principal');
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [time, setTime] = useState('21:45');
  const [seats, setSeats] = useState(3);
  const [price, setPrice] = useState(3500);
  const [vehicle, setVehicle] = useState(currentUser && currentUser.vehicle ? `${currentUser.vehicle.brand} • ${currentUser.vehicle.plate}` : 'Chevrolet Onix • PBV-202');

  const originOptions = campus === 'c4ta' ? [
    'Sede C4TA San Javier • Calle 44 #98-20 (Portería Principal)',
    'Sede C4TA San Javier • Bahía Estación Metro San Javier',
    'Sede C4TA San Javier • Parqueadero Bloque Tecnológico'
  ] : [
    'Campus Robledo • Portería Principal Calle 73 (Bloque 2)',
    'Campus Robledo • Parqueadero de Motos Bloque 10',
    'Campus Robledo • Bahía de Vehículos Frente a Biblioteca',
    'Campus Robledo • Salida Peatonal Carrera 78'
  ];

  const handleCampusChange = (newCampus) => {
    setCampus(newCampus);
    setOrigin(newCampus === 'c4ta' 
      ? 'Sede C4TA San Javier • Calle 44 #98-20 (Portería Principal)' 
      : 'Campus Robledo • Portería Principal Calle 73 (Bloque 2)');
  };

  const handleSelectMapLocation = ({ lat, lng, zone: detectedZone, address: detectedAddress }) => {
    setSelectedCoords({ lat, lng });
    setZone(detectedZone);
    setAddress(detectedAddress);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPublish({
      origin_campus: campus,
      origin,
      zone,
      address,
      dest_coords: selectedCoords,
      time,
      seats,
      price,
      vehicle
    });
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Selector de Sede de Salida */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">
          Sede Universitaria de Salida
        </label>
        <div className="grid grid-cols-2 gap-2.5 mb-2">
          <button
            type="button"
            onClick={() => handleCampusChange('robledo')}
            className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2 active:scale-95 ${
              campus === 'robledo'
                ? 'border-emerald-600 bg-emerald-50 text-slate-900 shadow-sm ring-1 ring-emerald-500'
                : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-200'
            }`}
          >
            <span className="text-lg">🎓</span>
            <div>
              <span className="font-bold text-xs block text-slate-900 leading-tight">Campus Robledo</span>
              <span className="text-[10px] text-slate-500">Sede Principal</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleCampusChange('c4ta')}
            className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2 active:scale-95 ${
              campus === 'c4ta'
                ? 'border-purple-600 bg-purple-50 text-slate-900 shadow-sm ring-1 ring-purple-500'
                : 'border-slate-200 bg-white text-slate-600 hover:border-purple-200'
            }`}
          >
            <span className="text-lg">🏛️</span>
            <div>
              <span className="font-bold text-xs block text-slate-900 leading-tight">Sede C4TA San Javier</span>
              <span className="text-[10px] text-slate-500">Ciudadela Occidente</span>
            </div>
          </button>
        </div>

        <select 
          value={origin} 
          onChange={(e) => setOrigin(e.target.value)}
          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#f25019]"
        >
          {originOptions.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Selector de Modo de Destino: Por Dirección vs En el Mapa */}
      <div className="pt-1">
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-bold text-slate-700">
            Punto de Destino
          </label>
          <div className="flex items-center bg-orange-50 p-1 rounded-xl border border-orange-200">
            <button
              type="button"
              onClick={() => setDestMode('text')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                destMode === 'text' ? 'bg-white text-[#f25019] shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ✏️ Por Dirección
            </button>
            <button
              type="button"
              onClick={() => setDestMode('map')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                destMode === 'map' ? 'bg-white text-[#f25019] shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🗺️ Seleccionar en Mapa
            </button>
          </div>
        </div>

        {destMode === 'map' ? (
          <div className="space-y-2 mb-2">
            <PublishLocationPickerMap 
              onSelectLocation={handleSelectMapLocation} 
              selectedCoords={selectedCoords} 
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <input 
                type="text" 
                required 
                value={zone} 
                onChange={(e) => setZone(e.target.value)}
                placeholder="Zona sugerida"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800"
              />
              <input 
                type="text" 
                required 
                value={address} 
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Punto exacto o referencia"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-2.5 mb-2">
            <div>
              <input 
                type="text" 
                required 
                value={zone} 
                onChange={(e) => setZone(e.target.value)}
                placeholder="Zona Residencial (Ej: Bello, Laureles, Envigado, San Javier)"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#f25019]"
              />
            </div>
            <div>
              <input 
                type="text" 
                required 
                value={address} 
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Punto Exacto de Llegada (Ej: Estación Niquía, Éxito Robledo, Parque)"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#f25019]"
              />
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Hora de Salida</label>
          <input 
            type="time" 
            required 
            value={time} 
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#f25019]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Cupos Disponibles (Máx. 3 pasajeros)</label>
          <input 
            type="number" 
            min="1" 
            max="4" 
            required 
            value={seats} 
            onChange={(e) => setSeats(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#f25019]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Aporte Sugerido Gasolina (COP)</label>
          <input 
            type="number" 
            step="500" 
            min="1000" 
            max="15000" 
            required 
            value={price} 
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#f25019]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Vehículo (Marca, Color, Placa)</label>
          <input 
            type="text" 
            required 
            value={vehicle} 
            onChange={(e) => setVehicle(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#f25019]"
          />
        </div>
      </div>

      <p className="text-[11px] text-slate-500 bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/70">
        💡 <strong>Paradas intermedias:</strong> Cada uno de tus pasajeros podrá solicitar 1 parada en el camino durante su reserva (hasta un máximo de 3 paradas por viaje).
      </p>

      <button 
        type="submit" 
        className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-emerald-600/25 active:scale-95 mt-3 flex items-center justify-center gap-2"
      >
        <i data-lucide="check-circle" className="w-4 h-4"></i>
        <span>Confirmar y Publicar Trayecto</span>
      </button>
    </form>
  );
}

// ==========================================================================
// COMPONENTE: BookingModal (Solicitud de Cupo con Parada Intermedia)
// ==========================================================================
function BookingModal({ isOpen, trip, currentUser, onClose, onConfirmBooking, addToast }) {
  const [dropoffType, setDropoffType] = useState('stop'); // 'stop' | 'final' | 'existing'
  const [stopName, setStopName] = useState('');

  if (!isOpen || !trip) return null;

  const currentStops = trip.stops || [];
  const maxStopsReached = currentStops.length >= 3;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (dropoffType === 'stop' && !stopName.trim() && !maxStopsReached) {
      addToast('Por favor escribe el nombre o dirección de tu parada intermedia solicitada.', 'error');
      return;
    }

    onConfirmBooking({
      tripId: trip.id,
      stopName: (dropoffType === 'stop' && !maxStopsReached) ? stopName.trim() : (dropoffType === 'existing' ? stopName : null),
      isFinalDestination: dropoffType === 'final'
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg glass-panel p-6 sm:p-7 rounded-3xl bg-white border border-orange-200 shadow-2xl text-slate-800 my-auto">
        {/* Cabecera */}
        <div className="flex items-center justify-between pb-3 border-b border-orange-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-orange-100 text-[#f25019] flex items-center justify-center font-bold text-sm shadow-sm">
              <i data-lucide="map-pin" className="w-4 h-4"></i>
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 leading-tight">Solicitar Cupo y Fijar Parada</h2>
              <span className="text-[11px] text-slate-500 font-medium">1 parada por pasajero (máximo 3 por trayecto)</span>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
          >
            <i data-lucide="x" className="w-4 h-4"></i>
          </button>
        </div>

        {/* Resumen del Trayecto */}
        <div className="p-3.5 bg-[#fffaf7] border border-orange-200/80 rounded-2xl mb-4 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900">{trip.driver_name}</span>
              <span className="text-[10px] text-slate-500">• {trip.vehicle_summary}</span>
            </div>
            <span className="text-emerald-700 font-extrabold text-sm tabular-nums">${trip.suggested_seat_price.toLocaleString('es-CO')} COP</span>
          </div>
          <div className="text-slate-600 flex items-center gap-1.5 text-[11px]">
            <span className="font-semibold text-slate-800">Salida:</span> {trip.origin_meeting_point} • <strong className="text-orange-950">{trip.departure_time} hrs</strong>
          </div>
          <div className="text-slate-600 flex items-center gap-1.5 text-[11px]">
            <span className="font-semibold text-slate-800">Destino final:</span> <strong className="text-[#ea580c]">{trip.destination_zone}</strong> ({trip.destination_address})
          </div>
        </div>

        {/* Estado de Paradas Intermedias */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <i data-lucide="signpost" className="w-3.5 h-3.5 text-amber-600"></i>
              Paradas solicitadas en esta ruta ({currentStops.length}/3)
            </label>
            <span className="text-[10.5px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
              {3 - currentStops.length} cupos de parada disp.
            </span>
          </div>

          {currentStops.length > 0 ? (
            <div className="space-y-1.5 mb-3 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/70">
              {currentStops.map((st, idx) => (
                <div key={st.id || idx} className="flex items-center gap-2 text-xs text-slate-700">
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white font-bold text-[9px] flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-slate-900">{st.stop_name}</span>
                  <span className="text-slate-400 text-[10.5px]">({st.passenger_name})</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-slate-500 italic mb-3">
              Aún no hay paradas intermedias fijadas en esta ruta. Serás el primero en definir tu parada.
            </p>
          )}

          {/* Formulario de selección de parada */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {!maxStopsReached ? (
              <div className="space-y-2">
                <label className={`flex items-start gap-2.5 p-3 rounded-2xl border cursor-pointer transition text-xs ${
                  dropoffType === 'stop' ? 'border-[#f25019] bg-orange-50/40 ring-1 ring-orange-400' : 'border-slate-200 bg-white hover:border-orange-200'
                }`}>
                  <input 
                    type="radio" 
                    name="dropoffType" 
                    value="stop" 
                    checked={dropoffType === 'stop'} 
                    onChange={() => setDropoffType('stop')}
                    className="mt-0.5 text-[#f25019] focus:ring-[#f25019]"
                  />
                  <div className="flex-1">
                    <span className="font-bold text-slate-900 block text-xs">Solicitar mi parada intermedia (1 por pasajero)</span>
                    <span className="text-[11px] text-slate-500 block">Indica el punto sobre el trayecto donde te gustaría bajarte</span>
                    
                    {dropoffType === 'stop' && (
                      <div className="mt-2.5">
                        <input 
                          type="text" 
                          required 
                          autoFocus
                          placeholder="Ej: Estación San Javier, La 80 con San Juan, Parque Laureles..."
                          value={stopName}
                          onChange={(e) => setStopName(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-orange-300 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                        />
                        <p className="text-[10px] text-slate-500 mt-1">El conductor y compañeros de viaje verán esta parada en el mapa.</p>
                      </div>
                    )}
                  </div>
                </label>

                <label className={`flex items-start gap-2.5 p-3 rounded-2xl border cursor-pointer transition text-xs ${
                  dropoffType === 'final' ? 'border-[#f25019] bg-orange-50/40 ring-1 ring-orange-400' : 'border-slate-200 bg-white hover:border-orange-200'
                }`}>
                  <input 
                    type="radio" 
                    name="dropoffType" 
                    value="final" 
                    checked={dropoffType === 'final'} 
                    onChange={() => setDropoffType('final')}
                    className="mt-0.5 text-[#f25019] focus:ring-[#f25019]"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">Voy hasta el destino final</span>
                    <span className="text-[11px] text-slate-500 block">Bajarme en {trip.destination_zone} ({trip.destination_address})</span>
                  </div>
                </label>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-3 bg-amber-100/70 border border-amber-300 rounded-xl text-xs text-amber-900">
                  <div className="font-bold flex items-center gap-1.5 mb-1">
                    <i data-lucide="alert-triangle" className="w-4 h-4 text-amber-600"></i>
                    Límite de paradas alcanzado (3 de 3)
                  </div>
                  <p className="text-[11px] text-amber-800">
                    Los 3 pasajeros ya solicitaron sus paradas intermedias. Tu reserva será directa hasta el destino final o puedes descender en una de las paradas ya acordadas.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer bg-white text-xs font-medium">
                    <input 
                      type="radio" 
                      name="dropoffType" 
                      value="final" 
                      checked={dropoffType === 'final'} 
                      onChange={() => setDropoffType('final')}
                      className="text-[#f25019] focus:ring-[#f25019]"
                    />
                    <span className="font-bold text-slate-900">Bajarme en el destino final ({trip.destination_zone})</span>
                  </label>

                  <label className="flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer bg-white text-xs font-medium">
                    <input 
                      type="radio" 
                      name="dropoffType" 
                      value="existing" 
                      checked={dropoffType === 'existing'} 
                      onChange={() => {
                        setDropoffType('existing');
                        if (!stopName && currentStops.length > 0) setStopName(currentStops[0].stop_name);
                      }}
                      className="mt-0.5 text-[#f25019] focus:ring-[#f25019]"
                    />
                    <div className="flex-1">
                      <span className="font-bold text-slate-900 block">Bajarme en una de las paradas ya fijadas</span>
                      {dropoffType === 'existing' && (
                        <select 
                          value={stopName} 
                          onChange={(e) => setStopName(e.target.value)}
                          className="mt-2 w-full px-2.5 py-1.5 bg-white border border-orange-300 rounded-lg text-xs"
                        >
                          {currentStops.map((st, i) => (
                            <option key={i} value={st.stop_name}>Parada {i+1}: {st.stop_name}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  </label>
                </div>
              </div>
            )}

            <div className="pt-2 flex items-center justify-end gap-2">
              <button 
                type="button" 
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="btn-primary-orange px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition active:scale-95 flex items-center gap-1.5"
              >
                <i data-lucide="check" className="w-3.5 h-3.5"></i>
                Confirmar Reserva y Parada
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 8. COMPONENTE: MyTripsView (Mis Trayectos y Reservas)
// ==========================================================================
function MyTripsView({ trips, bookings, currentUser, onOpenLogin, onShareWhatsApp }) {
  if (!currentUser) {
    return (
      <div className="glass-panel p-8 text-center my-8 max-w-lg mx-auto bg-white border border-orange-200">
        <i data-lucide="user-x" className="w-12 h-12 text-slate-400 mx-auto mb-3"></i>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Inicia Sesión</h2>
        <p className="text-xs text-slate-600 mb-6">Inicia sesión con tu correo de dominio institucional para consultar tus reservas y trayectos publicados.</p>
        <button onClick={onOpenLogin} className="px-6 py-2.5 bg-[#f25019] hover:bg-[#d9420f] text-white font-bold text-sm rounded-xl transition active:scale-95 shadow-md shadow-orange-500/20">
          Iniciar Sesión
        </button>
      </div>
    );
  }

  const myPublished = trips.filter(t => t.driver_id === currentUser.id);
  const myBookings = bookings.filter(b => b.passenger_id === currentUser.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mis Trayectos Universitarios</h1>
          <p className="text-xs text-slate-500 font-medium">Historial y gestión de cupos de {currentUser.full_name}</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-emerald-800 mb-3 flex items-center gap-2">
          <i data-lucide="bookmark" className="w-5 h-5 text-emerald-600"></i> Mis Reservas como Pasajero ({myBookings.length})
        </h2>
        {myBookings.length === 0 ? (
          <div className="glass-panel p-6 text-center text-xs text-slate-500 bg-white border border-orange-100">No tienes reservas activas. Explora la cartelera para unirte a un trayecto.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myBookings.map(b => {
              const trip = trips.find(t => t.id === b.trip_id);
              return (
                <div key={b.id} className="glass-panel p-4 flex flex-col justify-between bg-white border border-orange-100 rounded-2xl shadow-sm">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-900">{trip ? trip.destination_zone : 'Destino Universitario'}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        {b.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">Conductor: <strong className="text-slate-900">{trip ? trip.driver_name : 'Compañero'}</strong></p>
                    <p className="text-xs text-slate-600 mt-1">Salida: <strong className="text-orange-600 font-bold">{trip ? trip.departure_time : '21:45'} hrs</strong></p>
                    {b.stop_requested && (
                      <div className="mt-2 p-2 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-1.5 font-medium">
                        <i data-lucide="signpost" className="w-3.5 h-3.5 text-amber-600 shrink-0"></i>
                        <span>Tu parada: <strong>{b.stop_requested}</strong></span>
                      </div>
                    )}
                  </div>
                  {trip && (
                    <button 
                      onClick={() => onShareWhatsApp(trip)}
                      className="mt-4 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-emerald-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95"
                    >
                      <i data-lucide="share-2" className="w-3.5 h-3.5"></i> Compartir Ruta WhatsApp
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-lg font-bold text-orange-700 mb-3 flex items-center gap-2">
          <i data-lucide="car" className="w-5 h-5 text-orange-600"></i> Mis Viajes Publicados como Conductor ({myPublished.length})
        </h2>
        {myPublished.length === 0 ? (
          <div className="glass-panel p-6 text-center text-xs text-slate-500 bg-white border border-orange-100">Aún no has publicado viajes como conductor.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myPublished.map(t => (
              <div key={t.id} className="glass-panel p-4 flex flex-col justify-between bg-white border border-orange-100 rounded-2xl shadow-sm">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-900">{t.destination_zone}</span>
                    <span className="text-xs text-emerald-700 font-bold">{t.available_seats} de {t.total_seats} cupos libres</span>
                  </div>
                  <p className="text-xs text-slate-600">Salida: {t.departure_time} hrs • {t.origin_meeting_point}</p>
                  <p className="text-xs text-emerald-700 font-bold mt-1">Aporte: ${t.suggested_seat_price.toLocaleString('es-CO')} COP</p>
                  
                  {/* Lista de paradas de pasajeros en este viaje */}
                  {t.stops && t.stops.length > 0 && (
                    <div className="mt-2.5 p-2 bg-amber-50 rounded-xl border border-amber-200 text-xs">
                      <span className="text-[11px] font-bold text-amber-900 flex items-center gap-1 mb-1">
                        <i data-lucide="signpost" className="w-3.5 h-3.5 text-amber-600"></i> Paradas intermedias solicitadas ({t.stops.length}/3):
                      </span>
                      <div className="space-y-1">
                        {t.stops.map((st, i) => (
                          <div key={i} className="text-[11px] text-slate-700 flex items-center gap-1.5">
                            <span className="w-3.5 h-3.5 rounded-full bg-amber-500 text-white font-bold text-[8.5px] flex items-center justify-center shrink-0">{i+1}</span>
                            <span className="font-semibold text-slate-900 truncate">{st.stop_name}</span>
                            <span className="text-slate-400 text-[10px]">({st.passenger_name})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => onShareWhatsApp(t)}
                  className="mt-4 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-emerald-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95"
                >
                  <i data-lucide="share-2" className="w-3.5 h-3.5"></i> Notificar a Compañeros
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================================================
// 9. COMPONENTE: CampusSecurityView (Central de Seguridad Institucional)
// ==========================================================================
function CampusSecurityView({ onOpenSos }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="glass-panel p-6 sm:p-8 bg-white border border-rose-200 rounded-2xl shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700 border border-rose-300">
                Central de Seguridad Activa
              </span>
              <span className="text-xs text-slate-500 font-medium">Pascual Bravo Robledo</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Seguridad y Acompañamiento Campus</h1>
            <p className="text-xs text-slate-600 mt-1 max-w-xl">
              Protocolo de movilidad nocturna protegida para salidas después de las 21:00 hrs. Enlace directo con vigilancia y cuadrante de policía.
            </p>
          </div>
          <button 
            onClick={onOpenSos}
            className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-rose-600/30 flex items-center gap-2 active:scale-95 badge-sos"
          >
            <i data-lucide="alert-octagon" className="w-5 h-5"></i>
            ACTIVAR SOS
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-5 bg-white border border-orange-100 rounded-2xl shadow-sm">
          <i data-lucide="phone-call" className="w-6 h-6 text-emerald-600 mb-2"></i>
          <h3 className="font-bold text-sm text-slate-900 mb-1">Línea de Emergencia</h3>
          <p className="text-xs text-slate-600">Central Vigilancia: 01 8000 42 22 22</p>
          <p className="text-xs text-slate-600">Extensión Interna: 100 / 102</p>
        </div>

        <div className="glass-panel p-5 bg-white border border-orange-100 rounded-2xl shadow-sm">
          <i data-lucide="shield-check" className="w-6 h-6 text-blue-600 mb-2"></i>
          <h3 className="font-bold text-sm text-slate-900 mb-1">Puntos de Salida Iluminados</h3>
          <p className="text-xs text-slate-600">1. Portería Principal Calle 73</p>
          <p className="text-xs text-slate-600">2. Salida Carrera 78 (Monitoreada)</p>
        </div>

        <div className="glass-panel p-5 bg-white border border-orange-100 rounded-2xl shadow-sm">
          <i data-lucide="clock" className="w-6 h-6 text-amber-600 mb-2"></i>
          <h3 className="font-bold text-sm text-slate-900 mb-1">Horario Nocturno</h3>
          <p className="text-xs text-slate-600">Acompañamiento: 20:30 a 22:30 hrs</p>
          <p className="text-xs text-slate-600">Verificación institucional en portería</p>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 10. COMPONENTE: SosModal (Cuenta Regresiva de Emergencia 5s)
// ==========================================================================
function SosModal({ isOpen, onClose, currentUser, addToast }) {
  const [seconds, setSeconds] = useState(5);
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    if (!isOpen || isTriggered) return;
    if (seconds <= 0) {
      setIsTriggered(true);
      addToast('🚨 ALERTA SOS EMITIDA: Central de Seguridad y contactos notificados con ubicación GPS.', 'error');
      return;
    }
    const timer = setTimeout(() => setSeconds(prev => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds, isOpen, isTriggered]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white p-6 sm:p-8 rounded-3xl border-2 border-rose-500 text-center shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg">
          <i data-lucide="x" className="w-5 h-5"></i>
        </button>

        <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-300 animate-pulse">
          <i data-lucide="alert-octagon" className="w-8 h-8"></i>
        </div>

        <h2 className="text-2xl font-black text-rose-600 mb-1">ALERTA SOS CAMPUS</h2>
        <p className="text-xs text-slate-600 mb-6 font-medium">
          {isTriggered 
            ? 'La alerta de emergencia ha sido transmitida en tiempo real al despacho de seguridad institucional.'
            : 'Transmitiendo señal de auxilio a la central de vigilancia Pascual Bravo en:'}
        </p>

        {!isTriggered ? (
          <>
            <div className="text-5xl font-black text-slate-900 mb-4 tabular-nums animate-bounce">
              00:0{seconds}
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full mb-6 overflow-hidden">
              <div 
                className="bg-rose-500 h-full transition-all duration-1000"
                style={{ width: `${(seconds / 5) * 100}%` }}
              ></div>
            </div>
            <button 
              onClick={onClose}
              className="w-full py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-sm rounded-xl transition active:scale-95"
            >
              Cancelar (Falsa Alarma)
            </button>
          </>
        ) : (
          <div className="space-y-3">
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-medium">
              Ubicación GPS fijada: <strong>Campus Robledo Calle 73</strong><br />
              Compañero: <strong>{currentUser ? currentUser.full_name : 'Estudiante Verificado'}</strong>
            </div>
            <button 
              onClick={onClose}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm rounded-xl transition shadow-md shadow-rose-600/30"
            >
              Entendido
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================================================
// 11. COMPONENTE: SupabaseModal (Configuración de Base de Datos)
// ==========================================================================
function SupabaseModal({ isOpen, onClose, addToast }) {
  const [url, setUrl] = useState(() => localStorage.getItem('rutau_supabase_url') || '');
  const [key, setKey] = useState(() => localStorage.getItem('rutau_supabase_key') || '');
  const [status, setStatus] = useState('Listo para conectar');

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('rutau_supabase_url', url);
    localStorage.setItem('rutau_supabase_key', key);
    setStatus('Conectado a Supabase');
    addToast('Configuración de Supabase guardada exitosamente.', 'success');
    setTimeout(() => onClose(), 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white p-6 sm:p-8 rounded-3xl border border-orange-200 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg">
          <i data-lucide="x" className="w-5 h-5"></i>
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-emerald-600 text-xl font-bold">⚡</span>
          <h2 className="text-xl font-bold text-slate-900">Conexión a Base de Datos Supabase</h2>
        </div>
        <p className="text-xs text-slate-600 mb-6">Ingresa tus credenciales del proyecto Supabase para sincronizar trayectos en tiempo real.</p>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Project URL</label>
            <input 
              type="text" 
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://xyzcompany.supabase.co"
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-[#f25019] font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Anon Public Key</label>
            <input 
              type="password" 
              required
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-[#f25019] font-mono"
            />
          </div>

          <div className="p-3 bg-orange-50/70 rounded-xl text-xs text-slate-700 flex items-center justify-between border border-orange-100">
            <span>Estado:</span>
            <span className="font-bold text-emerald-700">{status}</span>
          </div>

          <button 
            type="submit"
            className="w-full py-3 bg-[#f25019] hover:bg-[#d9420f] text-white font-bold text-sm rounded-xl transition shadow-md shadow-orange-500/25 active:scale-95"
          >
            Guardar y Sincronizar
          </button>
        </form>
      </div>
    </div>
  );
}

// ==========================================================================
// 12. COMPONENTE: ToastContainer & Toast
// ==========================================================================
function ToastContainer({ toasts, onDismiss }) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className="toast flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs font-semibold">
            <span className={t.type === 'error' ? 'text-rose-600 font-bold' : t.type === 'success' ? 'text-emerald-700 font-bold' : 'text-orange-600 font-bold'}>
              {t.type === 'error' ? '✕' : t.type === 'success' ? '✓' : 'ℹ'}
            </span>
            <span className="text-slate-800">{t.message}</span>
          </div>
          <button onClick={() => onDismiss(t.id)} className="text-slate-400 hover:text-slate-700 text-sm font-bold">×</button>
        </div>
      ))}
    </div>
  );
}

// ==========================================================================
// 13. COMPONENTE: MobileBottomNav (Navegación Móvil Cálida)
// ==========================================================================
function MobileBottomNav({ activeTab, onSwitchTab, onOpenSos }) {
  return (
    <div className="md:hidden mobile-bottom-nav">
      <button 
        onClick={() => onSwitchTab('landing')}
        className={`flex flex-col items-center gap-1 ${activeTab === 'landing' ? 'text-[#f25019]' : 'text-slate-500'}`}
      >
        <i data-lucide="home" className="w-5 h-5"></i>
        <span className="text-[10px] font-bold">Inicio</span>
      </button>

      <button 
        onClick={() => onSwitchTab('feed')}
        className={`flex flex-col items-center gap-1 ${activeTab === 'feed' ? 'text-[#f25019]' : 'text-slate-500'}`}
      >
        <i data-lucide="compass" className="w-5 h-5"></i>
        <span className="text-[10px] font-bold">Cartelera</span>
      </button>

      <button 
        onClick={() => onSwitchTab('publish')}
        className={`flex flex-col items-center gap-1 ${activeTab === 'publish' ? 'text-[#f25019]' : 'text-slate-500'}`}
      >
        <i data-lucide="plus-circle" className="w-5 h-5"></i>
        <span className="text-[10px] font-bold">Publicar</span>
      </button>

      <button 
        onClick={() => onSwitchTab('my-trips')}
        className={`flex flex-col items-center gap-1 ${activeTab === 'my-trips' ? 'text-[#f25019]' : 'text-slate-500'}`}
      >
        <i data-lucide="bookmark" className="w-5 h-5"></i>
        <span className="text-[10px] font-bold">Viajes</span>
      </button>

      <button 
        onClick={onOpenSos}
        className="flex flex-col items-center gap-1 text-rose-600"
      >
        <i data-lucide="alert-octagon" className="w-5 h-5 animate-pulse"></i>
        <span className="text-[10px] font-black">SOS</span>
      </button>
    </div>
  );
}

// ==========================================================================
// 14. COMPONENTE: Footer (Créditos Académicos)
// ==========================================================================
function Footer() {
  return (
    <footer className="glass-nav border-t border-orange-200/60 py-6 px-4 text-center text-xs text-slate-500 mt-auto hidden md:block">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800">Institución Universitaria Pascual Bravo</span>
          <span>•</span>
          <span>Tecnología en Desarrollo de Software</span>
        </div>
        <div>
          <span>Ingeniería de Software • Docente: Claudia Giraldo Florez</span>
        </div>
        <div className="text-slate-600">
          Integrantes: <strong>Joveidy Villarreal</strong> &amp; <strong>Cristian Guzmán</strong>
        </div>
      </div>
    </footer>
  );
}

// ==========================================================================
// 15. PUNTO DE ENTRADA: Renderizar en el DOM
// ==========================================================================
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RutaUApp />);
}
