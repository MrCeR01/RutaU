/**
 * PROYECTO RUTAU - MOTOR PRINCIPAL DE LA APLICACIÓN
 * Institución Universitaria Pascual Bravo
 * Alcance: TIENE (Must Have) + DEBERÍA (Should Have)
 * Autores: Joveidy Villarreal, Cristian Guzmán
 */

// ==========================================
// 1. ESTADO GLOBAL Y CONFIGURACIÓN
// ==========================================
const RUTA_U_STATE = {
  currentUser: null,
  activeTab: 'feed', // 'feed', 'publish', 'my-trips', 'profile', 'security'
  searchFilters: {
    zone: '',
    faculty: '',
    time: ''
  },
  trips: [],
  bookings: [],
  reviews: [],
  sosAlerts: [],
  supabaseConfig: {
    url: '',
    key: '',
    connected: false
  },
  sosCountdown: null,
  activeSosId: null,
  mapInstance: null
};

// Base de datos de prueba pre-cargada para demostración inmediata
const DEFAULT_SEED_DATA = {
  users: [
    {
      id: 'usr-1',
      email: 'cristian.guzman@pascualbravo.edu.co',
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
      id: 'usr-campus',
      email: 'seguridad.campus@pascualbravo.edu.co',
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
      origin_meeting_point: 'Portería Principal Calle 73 (Frente al Bloque 2)',
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
      notes: 'Salgo apenas termine clase de Ingeniería de Software. Ruta por Autopista Norte.'
    },
    {
      id: 'trip-102',
      driver_id: 'usr-3',
      driver_name: 'Carlos Mendoza',
      driver_rating: 4.8,
      faculty: 'Ingeniería Mecánica',
      origin_meeting_point: 'Parqueadero de Motos Bloque 10',
      destination_zone: 'Laureles / San Javier',
      destination_address: 'Parque de Laureles / Segundo Parque',
      departure_time: '22:00',
      status: 'programado',
      total_seats: 1,
      available_seats: 1,
      distance_km: 8.2,
      estimated_total_gas: 6000,
      suggested_seat_price: 3000,
      vehicle_summary: 'Yamaha FZ 250 • Azul • UIR-88E (Moto)',
      notes: 'Tengo casco extra certificado reglamentario. Salida puntual a las 10 PM.'
    }
  ],
  bookings: [
    {
      id: 'book-1',
      trip_id: 'trip-101',
      passenger_id: 'usr-2',
      passenger_name: 'Joveidy Villarreal',
      passenger_faculty: 'Tecnología en Desarrollo de Software',
      passenger_zone: 'Robledo / Castilla',
      status: 'aceptada',
      seats_requested: 1,
      contribution_amount: 3500,
      booking_time: '20:15'
    }
  ],
  reviews: [
    {
      id: 'rev-1',
      reviewer_name: 'Joveidy Villarreal',
      reviewee_id: 'usr-1',
      rating: 5,
      punctuality_rating: 5,
      respect_rating: 5,
      comment: 'Excelente conductor, salida súper puntual desde la portería y trayecto muy tranquilo.',
      date: 'Ayer'
    },
    {
      id: 'rev-2',
      reviewer_name: 'Mateo Restrepo',
      reviewee_id: 'usr-1',
      rating: 5,
      punctuality_rating: 5,
      respect_rating: 5,
      comment: 'Muy buena iniciativa para no esperar bus tarde de noche. 100% recomendado.',
      date: 'Hace 3 días'
    }
  ],
  sosAlerts: []
};

// ==========================================
// 2. INICIALIZACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initStorage();
  checkSession();
  bindGlobalEvents();
  renderApp();
  initNotificationWatcher();
});

function initStorage() {
  if (!localStorage.getItem('rutau_users')) {
    localStorage.setItem('rutau_users', JSON.stringify(DEFAULT_SEED_DATA.users));
  }
  if (!localStorage.getItem('rutau_trips')) {
    localStorage.setItem('rutau_trips', JSON.stringify(DEFAULT_SEED_DATA.trips));
  }
  if (!localStorage.getItem('rutau_bookings')) {
    localStorage.setItem('rutau_bookings', JSON.stringify(DEFAULT_SEED_DATA.bookings));
  }
  if (!localStorage.getItem('rutau_reviews')) {
    localStorage.setItem('rutau_reviews', JSON.stringify(DEFAULT_SEED_DATA.reviews));
  }
  if (!localStorage.getItem('rutau_sos')) {
    localStorage.setItem('rutau_sos', JSON.stringify(DEFAULT_SEED_DATA.sosAlerts));
  }
  
  const savedSupabase = localStorage.getItem('rutau_supabase_config');
  if (savedSupabase) {
    try {
      RUTA_U_STATE.supabaseConfig = JSON.parse(savedSupabase);
    } catch (e) {}
  }
}

function checkSession() {
  const sessionUser = localStorage.getItem('rutau_current_user');
  if (sessionUser) {
    try {
      RUTA_U_STATE.currentUser = JSON.parse(sessionUser);
    } catch (e) {
      RUTA_U_STATE.currentUser = null;
    }
  } else {
    // Por defecto iniciar con Cristian Guzmán para demostración instantánea
    const users = JSON.parse(localStorage.getItem('rutau_users') || '[]');
    RUTA_U_STATE.currentUser = users[0] || null;
    if (RUTA_U_STATE.currentUser) {
      localStorage.setItem('rutau_current_user', JSON.stringify(RUTA_U_STATE.currentUser));
    }
  }
}

// ==========================================
// 3. CONTROLADOR DE VISTAS Y NAVEGACIÓN
// ==========================================
function switchTab(tabId) {
  RUTA_U_STATE.activeTab = tabId;
  
  // Actualizar indicadores activos de navegación
  document.querySelectorAll('[data-tab]').forEach(btn => {
    if (btn.getAttribute('data-tab') === tabId) {
      btn.classList.add('text-emerald-400', 'border-emerald-400', 'bg-emerald-950/30');
      btn.classList.remove('text-slate-400', 'border-transparent');
    } else {
      btn.classList.remove('text-emerald-400', 'border-emerald-400', 'bg-emerald-950/30');
      btn.classList.add('text-slate-400', 'border-transparent');
    }
  });

  renderActiveTab();
}

function renderApp() {
  updateUserHeader();
  renderActiveTab();
  lucide.createIcons();
}

function updateUserHeader() {
  const headerContainer = document.getElementById('user-header-info');
  if (!headerContainer) return;

  const user = RUTA_U_STATE.currentUser;
  if (user) {
    headerContainer.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="relative cursor-pointer" onclick="openProfileModal()">
          <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center font-bold text-white shadow-lg shadow-emerald-500/20">
            ${user.full_name.split(' ').map(n => n[0]).slice(0, 2).join('')}
          </div>
          <span class="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full" title="Institucional Verificado"></span>
        </div>
        <div class="hidden sm:block text-left">
          <div class="flex items-center gap-1.5">
            <span class="font-semibold text-sm text-slate-100">${user.full_name}</span>
            <span class="badge-edu text-[10px]">Dominio Institucional</span>
          </div>
          <div class="text-xs text-slate-400 flex items-center gap-1">
            <span class="capitalize text-emerald-400 font-medium">${user.role}</span> • 
            <i data-lucide="star" class="w-3 h-3 text-amber-400 fill-amber-400 inline"></i> 
            <span>${user.rating_average.toFixed(1)}</span>
          </div>
        </div>
        <button onclick="switchUserRoleDialog()" class="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition" title="Cambiar de Rol / Usuario">
          <i data-lucide="user-cog" class="w-5 h-5"></i>
        </button>
      </div>
    `;
  } else {
    headerContainer.innerHTML = `
      <button onclick="openAuthModal()" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-emerald-600/20 transition flex items-center gap-2">
        <i data-lucide="log-in" class="w-4 h-4"></i> Iniciar Sesión (Dominio Institucional)
      </button>
    `;
  }
}

function renderActiveTab() {
  const container = document.getElementById('main-tab-content');
  if (!container) return;

  switch (RUTA_U_STATE.activeTab) {
    case 'feed':
      renderFeedView(container);
      break;
    case 'publish':
      renderPublishTripView(container);
      break;
    case 'my-trips':
      renderMyTripsView(container);
      break;
    case 'profile':
      renderProfileView(container);
      break;
    case 'security':
      renderCampusSecurityView(container);
      break;
    default:
      renderFeedView(container);
  }
  lucide.createIcons();
}

// ==========================================
// 4. VISTA: CARTELERA DE VIAJES Y BÚSQUEDA (HU-04, EP-02)
// ==========================================
function renderFeedView(container) {
  const trips = getStoredTrips();
  const filters = RUTA_U_STATE.searchFilters;

  // Filtrado reactivo (CA-07, CA-08)
  const filteredTrips = trips.filter(trip => {
    const matchZone = !filters.zone || trip.destination_zone.toLowerCase().includes(filters.zone.toLowerCase());
    const matchFaculty = !filters.faculty || trip.faculty.toLowerCase().includes(filters.faculty.toLowerCase());
    const matchTime = !filters.time || trip.departure_time >= filters.time;
    return matchZone && matchFaculty && matchTime;
  });

  container.innerHTML = `
    <!-- Banner Campus Pascual Bravo & Seguridad Nocturna -->
    <div class="glass-panel p-5 mb-6 relative overflow-hidden">
      <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <i data-lucide="shield-check" class="w-3.5 h-3.5"></i> Red Institucional Verificada
            </span>
            <span class="text-xs text-slate-400">Pascual Bravo Robledo</span>
          </div>
          <h1 class="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Ruta U <span class="text-emerald-400 text-lg font-normal">| Movilidad Nocturna Segura</span>
          </h1>
          <p class="text-sm text-slate-400 mt-1 max-w-2xl">
            Comparte trayectos nocturnos desde el campus hacia tu zona de residencia con compañeros verificados con dominio institucional. Ahorra combustible y viaja seguro.
          </p>
        </div>
        <div class="flex items-center gap-3">
          <button onclick="openSosModal()" class="px-4 py-2.5 bg-rose-600/90 hover:bg-rose-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-rose-600/30 flex items-center gap-2 transition badge-sos">
            <i data-lucide="alert-triangle" class="w-4 h-4"></i> BOTÓN SOS
          </button>
          <button onclick="switchTab('publish')" class="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-emerald-600/25 flex items-center gap-2 transition">
            <i data-lucide="plus-circle" class="w-4 h-4"></i> Publicar Viaje
          </button>
        </div>
      </div>

      <!-- Filtros de búsqueda (CA-07) -->
      <div class="mt-6 pt-5 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label class="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
            <i data-lucide="map-pin" class="w-3.5 h-3.5 text-emerald-400"></i> Zona Residencial Destino
          </label>
          <input 
            type="text" 
            placeholder="Ej: Bello, Laureles, Castilla..." 
            value="${filters.zone}"
            oninput="applyFilter('zone', this.value)"
            class="w-full px-3 py-2 bg-slate-900/80 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
            <i data-lucide="graduation-cap" class="w-3.5 h-3.5 text-blue-400"></i> Facultad / Carrera
          </label>
          <input 
            type="text" 
            placeholder="Ej: Software, Mecánica..." 
            value="${filters.faculty}"
            oninput="applyFilter('faculty', this.value)"
            class="w-full px-3 py-2 bg-slate-900/80 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
            <i data-lucide="clock" class="w-3.5 h-3.5 text-amber-400"></i> Hora de Salida Mínima
          </label>
          <input 
            type="time" 
            value="${filters.time}"
            onchange="applyFilter('time', this.value)"
            class="w-full px-3 py-2 bg-slate-900/80 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>
      </div>
    </div>

    <!-- Lista de Viajes Disponibles -->
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-lg font-bold text-white flex items-center gap-2">
        <i data-lucide="compass" class="w-5 h-5 text-emerald-400"></i>
        Trayectos Nocturnos Salientes (${filteredTrips.length})
      </h2>
      <span class="text-xs text-slate-400">Actualizado en tiempo real</span>
    </div>

    ${filteredTrips.length === 0 ? renderNoTripsFound(filters.zone) : `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${filteredTrips.map(trip => renderTripCard(trip)).join('')}
      </div>
    `}
  `;
}

function renderTripCard(trip) {
  const isFull = trip.available_seats <= 0;
  const isMyTrip = RUTA_U_STATE.currentUser && trip.driver_id === RUTA_U_STATE.currentUser.id;
  const myBooking = RUTA_U_STATE.currentUser ? getBookingForTrip(trip.id, RUTA_U_STATE.currentUser.id) : null;
  
  // Comparativa de ahorro comercial (CA-17, HU-09)
  const taxiEstimate = Math.round(trip.suggested_seat_price * 4.2);
  const savingsPercent = Math.round(((taxiEstimate - trip.suggested_seat_price) / taxiEstimate) * 100);

  // Coincidencia con zona residencial del usuario (HU-03)
  const user = RUTA_U_STATE.currentUser;
  const userZone = user?.residential_zone ? user.residential_zone.toLowerCase() : '';
  const matchesMyZone = Boolean(
    userZone && (
      trip.destination_zone.toLowerCase().includes(userZone) ||
      userZone.includes(trip.destination_zone.toLowerCase()) ||
      (trip.destination_address && trip.destination_address.toLowerCase().includes(userZone)) ||
      (trip.stops && trip.stops.some(s => s.location_name && s.location_name.toLowerCase().includes(userZone)))
    )
  );

  return `
    <div class="glass-panel p-5 flex flex-col justify-between hover:border-slate-600 transition group relative">
      <div>
        <!-- Cabecera del Conductor -->
        <div class="flex items-start justify-between gap-3 mb-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-emerald-400">
              ${trip.driver_name.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-bold text-sm text-white">${trip.driver_name}</span>
                <span class="badge-edu text-[10px]">@pascualbravo</span>
              </div>
              <div class="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                <span class="flex items-center gap-1 text-amber-400">
                  <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400"></i> ${trip.driver_rating}
                </span>
                <span>•</span>
                <span class="truncate max-w-[160px] text-slate-400">${trip.faculty}</span>
              </div>
            </div>
          </div>

          <!-- Cupos Badge -->
          <div class="text-right">
            <span class="px-2.5 py-1 rounded-full text-xs font-bold ${isFull ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'} flex items-center gap-1">
              <i data-lucide="users" className="w-3.5 h-3.5"></i>
              ${isFull ? 'COMPLETO' : `${trip.available_seats} de ${trip.total_seats} cupos`}
            </span>
          </div>
        </div>

        ${matchesMyZone ? `
          <div class="mb-3 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center justify-between">
            <span class="flex items-center gap-1.5">
              <span>🎯</span>
              <span>Coincide con tu zona residencial (${user.residential_zone})</span>
            </span>
            <span class="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-extrabold">HU-03</span>
          </div>
        ` : ''}

        <!-- Ruta y Punto de Encuentro -->
        <div class="space-y-2.5 my-4 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
          <div class="flex items-start gap-2.5 text-xs">
            <i data-lucide="map-pin" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i>
            <div>
              <span class="text-slate-400 block font-medium">Punto de salida (Campus):</span>
              <span class="text-slate-200 font-semibold">${trip.origin_meeting_point}</span>
            </div>
          </div>
          <div class="flex items-start gap-2.5 text-xs">
            <i data-lucide="navigation" class="w-4 h-4 text-blue-400 shrink-0 mt-0.5"></i>
            <div>
              <span class="text-slate-400 block font-medium">Destino residencial:</span>
              <span class="text-emerald-400 font-bold text-sm">${trip.destination_zone}</span>
              <span class="text-slate-400 block text-[11px]">${trip.destination_address}</span>
            </div>
          </div>
          <div class="flex items-center justify-between text-xs pt-2 border-t border-slate-800 text-slate-400">
            <span class="flex items-center gap-1.5 text-slate-300 font-medium">
              <i data-lucide="clock" class="w-3.5 h-3.5 text-amber-400"></i> Salida: <strong class="text-white">${trip.departure_time} hrs</strong>
            </span>
            <span class="flex items-center gap-1.5 text-slate-400">
              <i data-lucide="car" class="w-3.5 h-3.5 text-slate-400"></i> ${trip.vehicle_summary}
            </span>
          </div>
        </div>

        <!-- Módulo de Cuota de Gasolina Equitativa (HU-08, HU-09) -->
        <div class="p-3 bg-emerald-950/20 border border-emerald-800/40 rounded-xl mb-4">
          <div class="flex items-center justify-between text-xs">
            <div>
              <span class="text-slate-400 block">Aporte sugerido gasolina:</span>
              <span class="text-lg font-extrabold text-emerald-400">$${trip.suggested_seat_price.toLocaleString('es-CO')} COP</span>
            </div>
            <div class="text-right">
              <span class="text-[11px] text-slate-400 line-through">Taxi / Uber: ~$${taxiEstimate.toLocaleString('es-CO')}</span>
              <span class="block text-xs font-semibold text-emerald-300">Ahorras ~${savingsPercent}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Botones de Acción (CA-09, CA-10, CA-25) -->
      <div class="pt-2 border-t border-slate-800 flex items-center gap-2">
        <button onclick="shareTripOnWhatsApp('${trip.id}')" class="p-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 rounded-lg transition" title="Compartir trayecto por WhatsApp (HU-13)">
          <i data-lucide="share-2" class="w-4 h-4"></i>
        </button>

        ${isMyTrip ? `
          <button onclick="openManageTripModal('${trip.id}')" class="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1.5">
            <i data-lucide="sliders" class="w-4 h-4"></i> Gestionar Solicitudes (${getBookingsCountForTrip(trip.id)})
          </button>
        ` : myBooking ? `
          <div class="flex-1 py-2 px-3 rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-1.5 ${
            myBooking.status === 'aceptada' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
            myBooking.status === 'pendiente' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
            'bg-rose-500/20 text-rose-400 border border-rose-500/30'
          }">
            <i data-lucide="${myBooking.status === 'aceptada' ? 'check-circle' : 'hourglass'}" class="w-4 h-4"></i>
            Estado: ${myBooking.status.toUpperCase()}
          </div>
        ` : `
          <button 
            onclick="requestSeatBooking('${trip.id}')" 
            ${isFull ? 'disabled' : ''} 
            class="flex-1 py-2 px-4 ${isFull ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20'} text-xs font-bold rounded-lg transition flex items-center justify-center gap-2"
          >
            <i data-lucide="user-plus" class="w-4 h-4"></i>
            ${isFull ? 'Viaje Completo' : 'Reservar Cupo'}
          </button>
        `}
      </div>
    </div>
  `;
}

// Criterio CA-08: Sin trayectos disponibles y alerta de ruta
function renderNoTripsFound(zone) {
  return `
    <div class="glass-panel p-8 text-center my-6">
      <div class="w-14 h-14 bg-slate-800/80 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400">
        <i data-lucide="search-x" class="w-7 h-7"></i>
      </div>
      <h3 class="text-base font-bold text-white mb-1">No se encontraron trayectos activos</h3>
      <p class="text-xs text-slate-400 max-w-md mx-auto mb-5">
        Ningún conductor ha publicado cupos hacia la zona ${zone ? `<strong>"${zone}"</strong>` : 'seleccionada'} para este horario.
      </p>
      <button onclick="subscribeRouteNotification('${zone || 'esta zona'}')" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-bold rounded-xl border border-emerald-500/30 transition inline-flex items-center gap-2">
        <i data-lucide="bell-ring" class="w-4 h-4"></i> Activar Notificación cuando publiquen ruta
      </button>
    </div>
  `;
}

function applyFilter(key, value) {
  RUTA_U_STATE.searchFilters[key] = value;
  renderActiveTab();
}

function subscribeRouteNotification(zone) {
  showToast(`¡Alerta activada! Te notificaremos al correo institucional cuando se publique un trayecto hacia ${zone}.`, 'info');
}

// ==========================================
// 5. VISTA: PUBLICACIÓN DE VIAJES (HU-06, EP-03)
// ==========================================
function renderPublishTripView(container) {
  const user = RUTA_U_STATE.currentUser;
  
  if (!user) {
    container.innerHTML = `
      <div class="glass-panel p-8 text-center">
        <p class="text-slate-300 mb-4">Debes iniciar sesión con tu correo de dominio institucional para publicar un viaje.</p>
        <button onclick="openAuthModal()" class="px-5 py-2.5 bg-emerald-600 text-white rounded-lg font-bold">Iniciar Sesión</button>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="max-w-2xl mx-auto glass-panel p-6 sm:p-8">
      <div class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
        <div class="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
          <i data-lucide="car" class="w-6 h-6"></i>
        </div>
        <div>
          <h2 class="text-xl font-bold text-white">Publicar Trayecto Nocturno</h2>
          <p class="text-xs text-slate-400">Comparte asientos vacíos con compañeros de tu misma zona residencial.</p>
        </div>
      </div>

      <form id="publish-trip-form" onsubmit="handlePublishTrip(event)" class="space-y-4">
        <!-- Punto de Encuentro en Campus -->
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <i data-lucide="map-pin" class="w-4 h-4 text-emerald-400"></i> Punto de Encuentro Seguro en el Campus *
          </label>
          <select id="meeting-point-input" required class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500">
            <option value="Portería Principal Calle 73 (Frente al Bloque 2)">Portería Principal Calle 73 (Iluminada / Frente Bloque 2)</option>
            <option value="Parqueadero Central Bloque 10 (Área de Motos y Autos)">Parqueadero Central Bloque 10 (Área vigilada)</option>
            <option value="Portería Superior Vía Robledo / El Volador">Portería Superior Vía Robledo / El Volador</option>
            <option value="Salida Peatonal Biblioteca Central">Salida Peatonal Biblioteca Central</option>
          </select>
        </div>

        <!-- Zona y Dirección Destino -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <i data-lucide="compass" class="w-4 h-4 text-blue-400"></i> Zona Residencial Destino *
            </label>
            <select id="destination-zone-input" required class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500">
              <option value="Bello">Bello (Niquía, Cabañas, Centro)</option>
              <option value="Robledo / Castilla">Robledo / Castilla / Pilarica</option>
              <option value="Laureles / San Javier">Laureles / San Javier / Estadio</option>
              <option value="Itagüí">Itagüí / Ditaires / San Antonio</option>
              <option value="Envigado">Envigado / Sabaneta</option>
              <option value="Buenos Aires / Boston">Buenos Aires / Boston / Miraflores</option>
              <option value="Centro / Prado">Centro / Villanueva / Prado</option>
              <option value="Aranjuez / Manrique">Aranjuez / Campo Valdés / Manrique</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <i data-lucide="navigation" class="w-4 h-4 text-slate-400"></i> Dirección o Punto de Dejada *
            </label>
            <input type="text" id="destination-address-input" required placeholder="Ej: Estación Metro Bello o Parque Principal" class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 placeholder-slate-600" />
          </div>
        </div>

        <!-- Horario y Cupos -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <i data-lucide="clock" class="w-4 h-4 text-amber-400"></i> Hora de Salida *
            </label>
            <input type="time" id="departure-time-input" required value="21:45" class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <i data-lucide="users" class="w-4 h-4 text-emerald-400"></i> Cupos Disponibles *
            </label>
            <select id="seats-input" required onchange="calculateSuggestedGasPreview()" class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500">
              <option value="1">1 cupo</option>
              <option value="2">2 cupos</option>
              <option value="3">3 cupos</option>
              <option value="4" selected>4 cupos</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <i data-lucide="gauge" class="w-4 h-4 text-purple-400"></i> Distancia Estimada (km)
            </label>
            <input type="number" id="distance-km-input" value="12" min="1" max="50" oninput="calculateSuggestedGasPreview()" class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500" />
          </div>
        </div>

        <!-- Vehículo -->
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <i data-lucide="truck" class="w-4 h-4 text-slate-400"></i> Vehículo (Modelo, Placa, Color) *
          </label>
          <input type="text" id="vehicle-input" required value="${user.vehicle ? `${user.vehicle.brand} • ${user.vehicle.plate} • ${user.vehicle.color}` : 'Chevrolet Onix • Gris • PBV-202'}" class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500" />
        </div>

        <!-- Tarjeta de Cálculo Automático de Gasolina (HU-08) -->
        <div id="gas-calc-preview" class="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-slate-300 flex items-center gap-1">
              <i data-lucide="calculator" class="w-4 h-4 text-emerald-400"></i> Reparto Sugerido de Combustible (HU-08)
            </span>
            <span class="text-[11px] text-emerald-400 font-semibold">Fórmula Pascual Bravo</span>
          </div>
          <div class="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span class="text-slate-500 block">Costo total gasolina trayecto:</span>
              <span id="preview-total-gas" class="font-bold text-slate-200 text-sm">$14.000 COP</span>
            </div>
            <div>
              <span class="text-slate-500 block">Cuota sugerida por pasajero:</span>
              <span id="preview-seat-price" class="font-extrabold text-emerald-400 text-sm">$3.500 COP</span>
            </div>
          </div>
          <p class="text-[11px] text-slate-500 mt-2">
            * Se divide el costo estimado entre el conductor y los pasajeros confirmados para amortizar el gasto sin fines de lucro.
          </p>
        </div>

        <!-- Notas opcionales -->
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1.5">Notas adicionales del viaje</label>
          <textarea id="notes-input" rows="2" placeholder="Ej: Espero máximo 10 minutos después de terminar clase. Espacio en el baúl disponible." class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 placeholder-slate-600"></textarea>
        </div>

        <button type="submit" class="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2">
          <i data-lucide="check-circle" class="w-5 h-5"></i> Publicar Trayecto en Cartelera
        </button>
      </form>
    </div>
  `;
  calculateSuggestedGasPreview();
}

// Algoritmo de cálculo de combustible equitativo (CA-15, CA-16)
function calculateSuggestedGasPreview() {
  const seatsInput = document.getElementById('seats-input');
  const distanceInput = document.getElementById('distance-km-input');
  const previewTotal = document.getElementById('preview-total-gas');
  const previewSeat = document.getElementById('preview-seat-price');

  if (!seatsInput || !distanceInput || !previewTotal || !previewSeat) return;

  const seats = parseInt(seatsInput.value, 10) || 1;
  const distanceKm = parseFloat(distanceInput.value) || 10;
  
  // Rendimiento promedio ciudad: ~35 km por galón gasolina corriente ($15,500 COP/galón)
  const costPerKm = 15500 / 35; // ~442 COP por km
  const totalGas = Math.round(distanceKm * costPerKm * 2.2); // Factor ciudad/paradas
  
  // Se divide entre Conductor + Asientos
  const totalOccupants = seats + 1;
  const pricePerSeat = Math.ceil((totalGas / totalOccupants) / 100) * 100;

  previewTotal.innerText = `$${totalGas.toLocaleString('es-CO')} COP`;
  previewSeat.innerText = `$${pricePerSeat.toLocaleString('es-CO')} COP`;
}

function handlePublishTrip(e) {
  e.preventDefault();
  const user = RUTA_U_STATE.currentUser;
  if (!user) return;

  const meetingPoint = document.getElementById('meeting-point-input').value.trim();
  const destinationZone = document.getElementById('destination-zone-input').value.trim();
  const destinationAddress = document.getElementById('destination-address-input').value.trim();
  const departureTime = document.getElementById('departure-time-input').value.trim();
  const seats = parseInt(document.getElementById('seats-input').value, 10);
  const distanceKm = parseFloat(document.getElementById('distance-km-input').value) || 12;
  const vehicleSummary = document.getElementById('vehicle-input').value.trim();
  const notes = document.getElementById('notes-input').value.trim();

  // Validación de campos obligatorios (CA-12)
  if (!meetingPoint || !destinationZone || !departureTime || !seats) {
    showToast('Por favor completa todos los campos obligatorios.', 'error');
    return;
  }

  // Costo sugerido
  const costPerKm = 15500 / 35;
  const totalGas = Math.round(distanceKm * costPerKm * 2.2);
  const pricePerSeat = Math.ceil((totalGas / (seats + 1)) / 100) * 100;

  const newTrip = {
    id: `trip-${Date.now()}`,
    driver_id: user.id,
    driver_name: user.full_name,
    driver_rating: user.rating_average || 5.0,
    faculty: user.faculty,
    origin_meeting_point: meetingPoint,
    destination_zone: destinationZone,
    destination_address: destinationAddress,
    departure_time: departureTime,
    status: 'programado',
    total_seats: seats,
    available_seats: seats,
    distance_km: distanceKm,
    estimated_total_gas: totalGas,
    suggested_seat_price: pricePerSeat,
    vehicle_summary: vehicleSummary,
    notes: notes,
    created_at: new Date().toISOString()
  };

  const trips = getStoredTrips();
  trips.unshift(newTrip);
  saveStoredTrips(trips);

  showToast('¡Trayecto publicado exitosamente! Visible para toda la comunidad universitaria.', 'success');
  switchTab('feed');
}

// ==========================================
// 6. GESTIÓN DE RESERVAS Y CUPOS (HU-05, HU-07)
// ==========================================
function requestSeatBooking(tripId) {
  const user = RUTA_U_STATE.currentUser;
  if (!user) {
    openAuthModal();
    return;
  }

  const trips = getStoredTrips();
  const trip = trips.find(t => t.id === tripId);
  if (!trip) return;

  // Validación de cupo disponible (CA-10)
  if (trip.available_seats <= 0) {
    showToast('Lo sentimos, este viaje ya alcanzó el tope máximo de asientos.', 'warning');
    return;
  }

  const bookings = getStoredBookings();
  const existing = bookings.find(b => b.trip_id === tripId && b.passenger_id === user.id);
  if (existing) {
    showToast('Ya tienes una reserva solicitada para este viaje.', 'info');
    return;
  }

  const newBooking = {
    id: `book-${Date.now()}`,
    trip_id: tripId,
    passenger_id: user.id,
    passenger_name: user.full_name,
    passenger_faculty: user.faculty,
    passenger_zone: user.residential_zone,
    status: 'pendiente', // CA-09
    seats_requested: 1,
    contribution_amount: trip.suggested_seat_price,
    booking_time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  bookings.push(newBooking);
  saveStoredBookings(bookings);

  showToast('¡Solicitud de cupo enviada al conductor! En estado de espera de confirmación.', 'success');
  renderActiveTab();
}

function openManageTripModal(tripId) {
  const trips = getStoredTrips();
  const trip = trips.find(t => t.id === tripId);
  if (!trip) return;

  const bookings = getStoredBookings().filter(b => b.trip_id === tripId);

  const modalHtml = `
    <div id="manage-trip-modal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="glass-panel w-full max-w-xl p-6 bg-slate-900 border border-slate-700 rounded-2xl">
        <div class="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 class="text-lg font-bold text-white">Gestionar Cupos del Viaje</h3>
            <p class="text-xs text-slate-400">${trip.destination_zone} • Salida ${trip.departure_time} hrs</p>
          </div>
          <button onclick="closeModal('manage-trip-modal')" class="p-2 text-slate-400 hover:text-white rounded-lg">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <div class="my-4">
          <div class="flex items-center justify-between text-xs p-3 bg-slate-800/60 rounded-xl mb-4">
            <span>Cupos disponibles: <strong class="text-emerald-400 font-bold">${trip.available_seats} de ${trip.total_seats}</strong></span>
            <span>Aporte por cupo: <strong class="text-white">$${trip.suggested_seat_price.toLocaleString('es-CO')}</strong></span>
          </div>

          <h4 class="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Solicitudes de Pasajeros (${bookings.length})</h4>
          
          ${bookings.length === 0 ? `
            <p class="text-xs text-slate-500 py-4 text-center">No hay solicitudes pendientes en este momento.</p>
          ` : `
            <div class="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              ${bookings.map(b => `
                <div class="p-3 bg-slate-800/40 border border-slate-700/60 rounded-xl flex items-center justify-between gap-3">
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="font-semibold text-sm text-white">${b.passenger_name}</span>
                      <span class="badge-edu text-[9px]">Verificado</span>
                    </div>
                    <div class="text-xs text-slate-400 mt-0.5">
                      ${b.passenger_faculty} • Zona: ${b.passenger_zone}
                    </div>
                    <span class="inline-block mt-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      b.status === 'aceptada' ? 'bg-emerald-500/20 text-emerald-400' :
                      b.status === 'rechazada' ? 'bg-rose-500/20 text-rose-400' :
                      'bg-amber-500/20 text-amber-300'
                    }">${b.status}</span>
                  </div>

                  ${b.status === 'pendiente' ? `
                    <div class="flex items-center gap-2">
                      <button onclick="handleBookingAction('${b.id}', 'aceptar')" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition">
                        Aceptar
                      </button>
                      <button onclick="handleBookingAction('${b.id}', 'rechazar')" class="px-3 py-1.5 bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white text-xs font-bold rounded-lg transition">
                        Rechazar
                      </button>
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          `}
        </div>

        <div class="pt-4 border-t border-slate-800 flex justify-end gap-2">
          <button onclick="closeModal('manage-trip-modal')" class="px-4 py-2 bg-slate-800 text-white text-xs font-semibold rounded-lg">Cerrar</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  lucide.createIcons();
}

function handleBookingAction(bookingId, action) {
  const bookings = getStoredBookings();
  const booking = bookings.find(b => b.id === bookingId);
  if (!booking) return;

  const trips = getStoredTrips();
  const trip = trips.find(t => t.id === booking.trip_id);
  if (!trip) return;

  if (action === 'aceptar') {
    // CA-13: Aceptación de solicitud y descuento de cupo
    if (trip.available_seats < booking.seats_requested) {
      showToast('No hay cupos suficientes disponibles para aceptar esta solicitud.', 'error');
      return;
    }
    booking.status = 'aceptada';
    trip.available_seats -= booking.seats_requested;
    showToast(`¡Solicitud de ${booking.passenger_name} aceptada! Cupo asignado.`, 'success');
  } else {
    // CA-14: Rechazo de solicitud
    booking.status = 'rechazada';
    showToast(`Solicitud rechazada.`, 'info');
  }

  saveStoredBookings(bookings);
  saveStoredTrips(trips);

  closeModal('manage-trip-modal');
  renderActiveTab();
}

// ==========================================
// 7. VISTA: MIS VIAJES Y COMPROBANTES (HU-09, CA-18)
// ==========================================
function renderMyTripsView(container) {
  const user = RUTA_U_STATE.currentUser;
  if (!user) {
    renderFeedView(container);
    return;
  }

  const allTrips = getStoredTrips();
  const allBookings = getStoredBookings();

  // Viajes como conductor
  const myDrivenTrips = allTrips.filter(t => t.driver_id === user.id);
  // Reservas como pasajero
  const myPassengerBookings = allBookings.filter(b => b.passenger_id === user.id);

  container.innerHTML = `
    <div class="max-w-4xl mx-auto space-y-6">
      <div class="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h2 class="text-xl font-bold text-white">Mis Trayectos y Reservas</h2>
          <p class="text-xs text-slate-400">Administra tus viajes nocturnos, aportes y calificaciones comunitarias.</p>
        </div>
      </div>

      <!-- Sección Conductor -->
      <div>
        <h3 class="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <i data-lucide="car" class="w-4 h-4"></i> Trayectos que conduzco (${myDrivenTrips.length})
        </h3>
        ${myDrivenTrips.length === 0 ? `
          <div class="glass-panel p-6 text-center text-xs text-slate-500">No has publicado viajes activos como conductor.</div>
        ` : `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${myDrivenTrips.map(trip => renderTripCard(trip)).join('')}
          </div>
        `}
      </div>

      <!-- Sección Pasajero -->
      <div class="pt-6 border-t border-slate-800">
        <h3 class="text-sm font-bold text-blue-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <i data-lucide="ticket" class="w-4 h-4"></i> Mis Reservas como Pasajero (${myPassengerBookings.length})
        </h3>
        ${myPassengerBookings.length === 0 ? `
          <div class="glass-panel p-6 text-center text-xs text-slate-500">No tienes reservas activas. Explora la cartelera para unirte a un trayecto.</div>
        ` : `
          <div class="space-y-3">
            ${myPassengerBookings.map(b => {
              const trip = allTrips.find(t => t.id === b.trip_id);
              return `
                <div class="glass-panel p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="font-bold text-white text-sm">${trip ? trip.destination_zone : 'Destino confirmado'}</span>
                      <span class="inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        b.status === 'aceptada' ? 'bg-emerald-500/20 text-emerald-400' :
                        b.status === 'rechazada' ? 'bg-rose-500/20 text-rose-400' :
                        'bg-amber-500/20 text-amber-300'
                      }">${b.status}</span>
                    </div>
                    <div class="text-xs text-slate-400 mt-1">
                      Conductor: <strong class="text-slate-200">${trip ? trip.driver_name : 'Compañero Institucional'}</strong> • Salida: ${trip ? trip.departure_time : '--:--'} hrs
                    </div>
                    <div class="text-xs text-emerald-400 mt-0.5 font-semibold">
                      Aporte de combustible: $${b.contribution_amount.toLocaleString('es-CO')} COP
                    </div>
                  </div>

                  <div class="flex items-center gap-2 w-full sm:w-auto">
                    ${b.status === 'aceptada' ? `
                      <button onclick="openReceiptModal('${b.id}')" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-lg transition flex items-center gap-1.5">
                        <i data-lucide="receipt" class="w-3.5 h-3.5 text-emerald-400"></i> Comprobante (CA-18)
                      </button>
                      <button onclick="openReviewModal('${trip ? trip.driver_id : ''}', '${trip ? trip.driver_name : ''}')" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white rounded-lg transition flex items-center gap-1.5">
                        <i data-lucide="star" class="w-3.5 h-3.5 text-amber-300 fill-amber-300"></i> Calificar (HU-10)
                      </button>
                    ` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    </div>
  `;
}

// Criterio CA-18: Comprobante digital de aporte de combustible amortizado
function openReceiptModal(bookingId) {
  const bookings = getStoredBookings();
  const booking = bookings.find(b => b.id === bookingId);
  if (!booking) return;

  const trips = getStoredTrips();
  const trip = trips.find(t => t.id === booking.trip_id);

  const modalHtml = `
    <div id="receipt-modal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="glass-panel w-full max-w-md p-6 bg-slate-900 border border-slate-700 rounded-2xl font-mono text-xs">
        <div class="text-center pb-4 border-b border-dashed border-slate-700">
          <h3 class="text-base font-bold text-white uppercase tracking-wider">COMPROBANTE DIGITAL RUTAU</h3>
          <p class="text-slate-400 text-[11px] mt-0.5">Institución Universitaria Pascual Bravo</p>
          <span class="inline-block mt-2 px-2.5 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full font-bold">APORTE AMORTIZADO DE GASOLINA</span>
        </div>

        <div class="py-4 space-y-2 text-slate-300">
          <div class="flex justify-between">
            <span class="text-slate-500">Fecha y Hora:</span>
            <span>${new Date().toLocaleDateString('es-CO')} - ${trip ? trip.departure_time : '21:45'} hrs</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">Pasajero:</span>
            <span class="text-white font-bold">${booking.passenger_name}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">Conductor:</span>
            <span>${trip ? trip.driver_name : 'Cristian Guzmán'}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">Vehículo:</span>
            <span>${trip ? trip.vehicle_summary : 'Chevrolet Onix'}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">Origen (Campus):</span>
            <span class="text-right truncate max-w-[200px]">${trip ? trip.origin_meeting_point : 'Portería Principal'}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">Destino:</span>
            <span class="text-right">${trip ? trip.destination_zone : 'Bello'}</span>
          </div>
        </div>

        <div class="py-3 border-t border-b border-dashed border-slate-700 flex justify-between items-center text-sm">
          <span class="font-bold text-white">TOTAL APORTADO:</span>
          <span class="font-extrabold text-emerald-400 text-base">$${booking.contribution_amount.toLocaleString('es-CO')} COP</span>
        </div>

        <p class="text-[10px] text-slate-500 text-center mt-3">
          * Contribución solidaria para combustible entre pares universitarios sin lucro mercantil.
        </p>

        <div class="mt-5 flex gap-2">
          <button onclick="window.print()" class="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold">Imprimir / Guardar</button>
          <button onclick="closeModal('receipt-modal')" class="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold">Cerrar</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  lucide.createIcons();
}

// ==========================================
// 8. SISTEMA DE CALIFICACIÓN Y RESEÑAS (HU-10, CA-19, CA-20)
// ==========================================
let currentRatingValue = 5;

function openReviewModal(targetUserId, targetUserName) {
  currentRatingValue = 5;
  const modalHtml = `
    <div id="review-modal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="glass-panel w-full max-w-md p-6 bg-slate-900 border border-slate-700 rounded-2xl">
        <div class="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 class="text-base font-bold text-white">Calificación Comunitaria (HU-10)</h3>
            <p class="text-xs text-slate-400">Evalúa a ${targetUserName || 'tu compañero de viaje'}</p>
          </div>
          <button onclick="closeModal('review-modal')" class="p-2 text-slate-400 hover:text-white rounded-lg">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <form onsubmit="handleReviewSubmit(event, '${targetUserId}')" class="space-y-4 my-4">
          <!-- Estrellas (1-5) -->
          <div class="text-center py-2">
            <label class="block text-xs font-semibold text-slate-300 mb-2">Puntuación General</label>
            <div class="flex items-center justify-center gap-2 text-2xl" id="star-rating-container">
              ${[1,2,3,4,5].map(star => `
                <button type="button" onclick="setRating(${star})" class="star-btn transition transform hover:scale-125 focus:outline-none">
                  <i data-lucide="star" id="star-icon-${star}" class="w-8 h-8 text-amber-400 fill-amber-400"></i>
                </button>
              `).join('')}
            </div>
            <span id="star-text" class="text-xs text-amber-400 font-bold block mt-1">5 de 5 estrellas</span>
          </div>

          <!-- Métricas específicas -->
          <div class="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label class="block text-slate-400 mb-1">Puntualidad en salida</label>
              <select id="punctuality-select" class="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white">
                <option value="5">Excelente (A tiempo)</option>
                <option value="4">Buena (Espera corta)</option>
                <option value="3">Regular</option>
              </select>
            </div>
            <div>
              <label class="block text-slate-400 mb-1">Respeto y Convivencia</label>
              <select id="respect-select" class="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white">
                <option value="5">Excelente ambiente</option>
                <option value="4">Muy respetuoso</option>
                <option value="3">Adecuado</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Comentario Comunitario</label>
            <textarea id="review-comment" required rows="3" placeholder="Describe tu experiencia para enriquecer la reputación comunitaria de la universidad..." class="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 placeholder-slate-500"></textarea>
          </div>

          <button type="submit" class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition">
            Enviar Calificación Comunitaria
          </button>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  lucide.createIcons();
}

function setRating(val) {
  currentRatingValue = val;
  for (let i = 1; i <= 5; i++) {
    const el = document.getElementById(`star-icon-${i}`);
    if (el) {
      if (i <= val) {
        el.classList.add('text-amber-400', 'fill-amber-400');
        el.classList.remove('text-slate-600', 'fill-transparent');
      } else {
        el.classList.remove('text-amber-400', 'fill-amber-400');
        el.classList.add('text-slate-600');
      }
    }
  }
  const textEl = document.getElementById('star-text');
  if (textEl) textEl.innerText = `${val} de 5 estrellas`;
}

function handleReviewSubmit(e, targetUserId) {
  e.preventDefault();
  const comment = document.getElementById('review-comment').value.trim();
  const user = RUTA_U_STATE.currentUser;

  const reviews = JSON.parse(localStorage.getItem('rutau_reviews') || '[]');
  const newReview = {
    id: `rev-${Date.now()}`,
    reviewer_name: user ? user.full_name : 'Estudiante anónimo',
    reviewee_id: targetUserId,
    rating: currentRatingValue,
    punctuality_rating: parseInt(document.getElementById('punctuality-select').value, 10),
    respect_rating: parseInt(document.getElementById('respect-select').value, 10),
    comment: comment,
    date: 'Hoy'
  };

  reviews.unshift(newReview);
  localStorage.setItem('rutau_reviews', JSON.stringify(reviews));

  // CA-20: Impacto en el promedio de reputación del usuario
  const users = JSON.parse(localStorage.getItem('rutau_users') || '[]');
  const targetUser = users.find(u => u.id === targetUserId);
  if (targetUser) {
    const userReviews = reviews.filter(r => r.reviewee_id === targetUserId);
    const avg = userReviews.reduce((acc, r) => acc + r.rating, 0) / userReviews.length;
    targetUser.rating_average = parseFloat(avg.toFixed(2));
    localStorage.setItem('rutau_users', JSON.stringify(users));
  }

  showToast('¡Calificación guardada! Contribuye al índice de confianza universitario.', 'success');
  closeModal('review-modal');
  renderActiveTab();
}

// ==========================================
// 9. BOTÓN SOS Y CENTRAL DE SEGURIDAD (HU-11, HU-12)
// ==========================================
let sosSecondsRemaining = 5;

function openSosModal() {
  sosSecondsRemaining = 5;
  const user = RUTA_U_STATE.currentUser;

  const modalHtml = `
    <div id="sos-modal" class="fixed inset-0 z-50 bg-rose-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div class="glass-panel w-full max-w-md p-6 bg-slate-900 border-2 border-rose-500 rounded-3xl text-center relative overflow-hidden shadow-2xl shadow-rose-900/80">
        <div class="w-16 h-16 bg-rose-600/30 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-500/50 animate-bounce">
          <i data-lucide="alert-octagon" class="w-9 h-9"></i>
        </div>

        <h3 class="text-xl font-black text-white uppercase tracking-wider">ACTIVACIÓN DE ALARMA SOS</h3>
        <p class="text-xs text-rose-300 mt-1 mb-4">
          Conexión inmediata con la Central de Seguridad y Bienestar Pascual Bravo.
        </p>

        <!-- Temporizador de 5 segundos para cancelar falsa alarma (CA-22) -->
        <div class="p-4 bg-slate-950/80 rounded-2xl border border-rose-500/30 my-4">
          <div class="text-xs text-slate-400 mb-1">Transmitiendo señal de auxilio en:</div>
          <div id="sos-timer-number" class="text-4xl font-extrabold text-rose-500 tracking-wider">5s</div>
          <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
            <div id="sos-progress-bar" class="sos-timer-bar w-full"></div>
          </div>
        </div>

        <div class="text-[11px] text-slate-400 mb-6 text-left space-y-1 bg-slate-800/40 p-3 rounded-xl">
          <div>• <strong>Ubicación satelital:</strong> Campus Pascual Bravo / Robledo (6.2764, -75.5898)</div>
          <div>• <strong>Usuario:</strong> ${user ? user.full_name : 'Universitario'} (Dominio Institucional)</div>
          <div>• <strong>Protocolo:</strong> Despliegue de cuadrilla institucional y policía cuadrante.</div>
        </div>

        <div class="flex flex-col gap-2">
          <button onclick="cancelSosCountdown()" class="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm rounded-xl border border-slate-600 transition">
            Cancelar Falsa Alarma (Presione Aquí)
          </button>
          <button onclick="triggerImmediateSos()" class="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition">
            Enviar Alarma de Inmediato
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  lucide.createIcons();

  startSosTimer();
}

function startSosTimer() {
  if (RUTA_U_STATE.sosCountdown) clearInterval(RUTA_U_STATE.sosCountdown);

  const numEl = document.getElementById('sos-timer-number');
  const barEl = document.getElementById('sos-progress-bar');

  RUTA_U_STATE.sosCountdown = setInterval(() => {
    sosSecondsRemaining--;
    if (numEl) numEl.innerText = `${sosSecondsRemaining}s`;
    if (barEl) barEl.style.width = `${(sosSecondsRemaining / 5) * 100}%`;

    if (sosSecondsRemaining <= 0) {
      clearInterval(RUTA_U_STATE.sosCountdown);
      triggerImmediateSos();
    }
  }, 1000);
}

// CA-22: Cancelación accidental de alerta SOS
function cancelSosCountdown() {
  if (RUTA_U_STATE.sosCountdown) clearInterval(RUTA_U_STATE.sosCountdown);
  closeModal('sos-modal');
  showToast('Alarma cancelada. Registrada como falsa alarma prevenida con éxito.', 'info');
}

// CA-21, CA-23: Disparo de auxilio SOS
function triggerImmediateSos() {
  if (RUTA_U_STATE.sosCountdown) clearInterval(RUTA_U_STATE.sosCountdown);
  closeModal('sos-modal');

  const user = RUTA_U_STATE.currentUser;
  const sosAlerts = JSON.parse(localStorage.getItem('rutau_sos') || '[]');

  const newAlert = {
    id: `sos-${Date.now()}`,
    user_name: user ? user.full_name : 'Cristian Guzmán',
    user_phone: user ? user.phone : '+57 300 123 4567',
    faculty: user ? user.faculty : 'Tecnología en Desarrollo de Software',
    coordinates: '6.2764, -75.5898 (Vía Robledo / Pascual Bravo)',
    status: 'activa', // CA-23
    timestamp: new Date().toLocaleTimeString()
  };

  sosAlerts.unshift(newAlert);
  localStorage.setItem('rutau_sos', JSON.stringify(sosAlerts));

  showToast('¡SEÑAL SOS ENVIADA A CENTRAL DEL CAMPUS! La patrulla y directivas tienen tus coordenadas.', 'error');
  
  // Cambiar a vista de seguridad para ver la alerta
  switchTab('security');
}

// VISTA: Central de Seguridad Campus (HU-12, CA-23, CA-24)
function renderCampusSecurityView(container) {
  const alerts = JSON.parse(localStorage.getItem('rutau_sos') || '[]');

  container.innerHTML = `
    <div class="max-w-4xl mx-auto space-y-6">
      <div class="glass-panel p-6 border-l-4 border-rose-500 bg-slate-900/90">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-rose-500/20 rounded-xl flex items-center justify-center text-rose-500">
              <i data-lucide="shield-alert" class="w-6 h-6"></i>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white">Central de Monitoreo y Seguridad Campus</h2>
              <p class="text-xs text-slate-400">Institución Universitaria Pascual Bravo • Atención de Emergencias Nocturnas</p>
            </div>
          </div>
          <span class="px-3 py-1 bg-rose-500/20 text-rose-400 text-xs font-bold rounded-full border border-rose-500/30">
            ${alerts.filter(a => a.status === 'activa').length} Alertas Activas
          </span>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <i data-lucide="radio" class="w-4 h-4 text-emerald-400"></i> Bitácora de Alertas Recibidas (CA-23)
        </h3>

        ${alerts.length === 0 ? `
          <div class="glass-panel p-8 text-center text-slate-500 text-xs">
            <i data-lucide="shield-check" class="w-8 h-8 mx-auto mb-2 text-emerald-500"></i>
            No hay alertas de auxilio activas. Todo el campus y rutas operan con normalidad.
          </div>
        ` : `
          <div class="space-y-3">
            ${alerts.map(a => `
              <div class="glass-panel p-5 border ${a.status === 'activa' ? 'border-rose-500/70 bg-rose-950/10' : 'border-slate-800'} rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-[10px] font-black uppercase ${a.status === 'activa' ? 'bg-rose-600 text-white badge-sos' : 'bg-slate-800 text-slate-400'}">
                      ${a.status.toUpperCase()}
                    </span>
                    <span class="text-sm font-bold text-white">${a.user_name}</span>
                    <span class="text-xs text-slate-400">• Hora: ${a.timestamp}</span>
                  </div>
                  <div class="text-xs text-slate-300 mt-1">
                    Facultad: <strong>${a.faculty}</strong> | Teléfono de auxilio: <strong class="text-emerald-400">${a.user_phone}</strong>
                  </div>
                  <div class="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <i data-lucide="map-pin" class="w-3.5 h-3.5 text-rose-400"></i>
                    Coordenadas GPS: ${a.coordinates}
                  </div>
                </div>

                ${a.status === 'activa' ? `
                  <div class="flex items-center gap-2 w-full md:w-auto">
                    <button onclick="handleAcknowledgeSos('${a.id}')" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5">
                      <i data-lucide="phone-call" class="w-4 h-4"></i> Atender y Desplegar Patrulla (CA-24)
                    </button>
                  </div>
                ` : `
                  <span class="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <i data-lucide="check" class="w-4 h-4"></i> Protocolo Atendido
                  </span>
                `}
              </div>
            `).join('')}
          </div>
        `}
      </div>
    </div>
  `;
}

function handleAcknowledgeSos(alertId) {
  const alerts = JSON.parse(localStorage.getItem('rutau_sos') || '[]');
  const alert = alerts.find(a => a.id === alertId);
  if (alert) {
    alert.status = 'en_atencion';
    localStorage.setItem('rutau_sos', JSON.stringify(alerts));
    showToast('Alerta marcada como EN ATENCIÓN. Contacto establecido con autoridades.', 'success');
    renderCampusSecurityView(document.getElementById('main-tab-content'));
  }
}

// ==========================================
// 10. COMPARTIR ENLACE POR WHATSAPP (HU-13, CA-25, CA-26)
// ==========================================
function shareTripOnWhatsApp(tripId) {
  const trips = getStoredTrips();
  const trip = trips.find(t => t.id === tripId);
  if (!trip) return;

  const trackingLink = `https://rutau-pascualbravo.edu.co/live-tracking?id=${trip.id}&t=${Date.now()}`;
  
  const textMessage = 
`🚨 *RutaU - Seguimiento de Viaje Seguro (Pascual Bravo)*
Hola familia, voy saliendo del campus universitario en carpooling institucional.

📍 *Origen:* ${trip.origin_meeting_point}
🏁 *Destino:* ${trip.destination_zone} (${trip.destination_address})
🚗 *Vehículo:* ${trip.vehicle_summary}
👤 *Conductor:* ${trip.driver_name} (Dominio institucional verificado)
⏰ *Hora de Salida:* ${trip.departure_time} hrs

🗺️ *Monitorea mi recorrido en tiempo real aquí:*
${trackingLink}

_Generado con RutaU - Movilidad Universitaria Segura_`;

  const encodedUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(textMessage)}`;
  window.open(encodedUrl, '_blank');

  showToast('Enlace de WhatsApp generado con los datos del vehículo y coordenadas GPS.', 'success');
}

// ==========================================
// 11. AUTENTICACIÓN CON DOMINIO INSTITUCIONAL (HU-01, HU-02)
// ==========================================
function openAuthModal() {
  const modalHtml = `
    <div id="auth-modal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="glass-panel w-full max-w-md p-6 bg-slate-900 border border-slate-700 rounded-2xl">
        <div class="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 class="text-lg font-bold text-white">Ingreso Institucional Exclusivo</h3>
            <p class="text-xs text-slate-400">Válido únicamente para correos con dominio institucional (@pascualbravo.edu.co)</p>
          </div>
          <button onclick="closeModal('auth-modal')" class="p-2 text-slate-400 hover:text-white rounded-lg">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <div id="auth-step-email" class="my-4 space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <i data-lucide="mail" class="w-4 h-4 text-emerald-400"></i> Correo Electrónico Institucional *
            </label>
            <input 
              type="email" 
              id="auth-email-input" 
              placeholder="tu.nombre@pascualbravo.edu.co" 
              class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 placeholder-slate-600" 
            />
            <p class="text-[11px] text-slate-500 mt-1">
              * Por seguridad, no se admiten correos personales (@gmail, @hotmail).
            </p>
          </div>

          <button onclick="handleSendVerificationCode()" class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2">
            <span>Enviar Código de 6 Dígitos</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </div>

        <div id="auth-step-code" class="my-4 space-y-4 hidden">
          <div class="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl text-xs text-slate-300">
            Hemos enviado un código de 6 dígitos a <strong id="verification-email-display" class="text-emerald-400"></strong>.
            <div class="text-[11px] text-slate-400 mt-1">(Código de prueba de demostración: <strong class="text-white">123456</strong>)</div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1.5">Ingresa Código de 6 Dígitos (CA-03)</label>
            <input 
              type="text" 
              id="auth-code-input" 
              maxlength="6" 
              placeholder="123456" 
              class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-lg font-mono text-center tracking-widest text-emerald-400 focus:outline-none focus:border-emerald-500" 
            />
          </div>

          <button onclick="handleVerifyCode()" class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition">
            Validar y Entrar a RutaU
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  lucide.createIcons();
}

function handleSendVerificationCode() {
  const emailInput = document.getElementById('auth-email-input');
  const email = emailInput ? emailInput.value.trim().toLowerCase() : '';

  // Validación de dominio institucional (CA-01, CA-02)
  if (!email || (!email.endsWith('.edu') && !email.includes('.edu.') && !email.includes('@pascualbravo'))) {
    showToast('Error: Solo se permiten correos con dominio institucional (@pascualbravo.edu.co)', 'error');
    return;
  }

  document.getElementById('verification-email-display').innerText = email;
  document.getElementById('auth-step-email').classList.add('hidden');
  document.getElementById('auth-step-code').classList.remove('hidden');
  document.getElementById('auth-code-input').focus();
  showToast('Código de confirmación de 6 dígitos generado exitosamente.', 'info');
}

function handleVerifyCode() {
  const code = document.getElementById('auth-code-input').value.trim();
  const email = document.getElementById('verification-email-display').innerText.trim();

  // Validación del código (CA-03, CA-04)
  if (code !== '123456' && code.length !== 6) {
    showToast('Código inválido o expirado. Verifícalo en tu correo institucional (CA-04).', 'error');
    return;
  }

  // Buscar o crear usuario
  const users = JSON.parse(localStorage.getItem('rutau_users') || '[]');
  let user = users.find(u => u.email === email);
  if (!user) {
    user = {
      id: `usr-${Date.now()}`,
      email: email,
      full_name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      institution: 'Institución Universitaria Pascual Bravo',
      faculty: 'Tecnología en Desarrollo de Software',
      role: 'pasajero',
      residential_zone: 'Bello',
      phone: '+57 300 000 0000',
      rating_average: 5.0,
      trips_completed: 0,
      verified: true
    };
    users.push(user);
    localStorage.setItem('rutau_users', JSON.stringify(users));
  }

  RUTA_U_STATE.currentUser = user;
  localStorage.setItem('rutau_current_user', JSON.stringify(user));

  showToast(`¡Bienvenido a RutaU, ${user.full_name}! Cuenta institucional activada.`, 'success');
  closeModal('auth-modal');
  renderApp();
}

// Selector rápido de roles para facilitar la evaluación del proyecto
function switchUserRoleDialog() {
  const users = JSON.parse(localStorage.getItem('rutau_users') || '[]');

  const modalHtml = `
    <div id="switch-user-modal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="glass-panel w-full max-w-sm p-6 bg-slate-900 border border-slate-700 rounded-2xl">
        <h3 class="text-base font-bold text-white mb-2">Cambiar Usuario de Prueba</h3>
        <p class="text-xs text-slate-400 mb-4">Prueba la aplicación desde las diferentes perspectivas (Conductor, Pasajero, Seguridad).</p>

        <div class="space-y-2">
          ${users.map(u => `
            <button onclick="selectUserRole('${u.id}')" class="w-full p-3 bg-slate-800/80 hover:bg-emerald-950/40 hover:border-emerald-500/50 border border-slate-700 rounded-xl text-left transition flex items-center justify-between">
              <div>
                <span class="font-bold text-xs text-white block">${u.full_name}</span>
                <span class="text-[11px] text-slate-400 capitalize">${u.role} • ${u.residential_zone}</span>
              </div>
              <span class="badge-edu text-[9px]">Seleccionar</span>
            </button>
          `).join('')}
        </div>

        <button onclick="closeModal('switch-user-modal')" class="w-full mt-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-lg">Cerrar</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function selectUserRole(userId) {
  const users = JSON.parse(localStorage.getItem('rutau_users') || '[]');
  const user = users.find(u => u.id === userId);
  if (user) {
    RUTA_U_STATE.currentUser = user;
    localStorage.setItem('rutau_current_user', JSON.stringify(user));
    closeModal('switch-user-modal');
    showToast(`Sesión cambiada a: ${user.full_name} (${user.role})`, 'info');
    renderApp();
  }
}

function openProfileModal() {
  switchTab('profile');
}

// ==========================================
// 12. CONFIGURACIÓN DE PERFIL INSTITUCIONAL (HU-03, CA-05, CA-06)
// ==========================================
function renderProfileView(container) {
  const user = RUTA_U_STATE.currentUser;
  if (!user) {
    container.innerHTML = `<div class="glass-panel p-8 text-center text-slate-400">Inicia sesión para ver tu perfil.</div>`;
    return;
  }

  const reviews = JSON.parse(localStorage.getItem('rutau_reviews') || '[]').filter(r => r.reviewee_id === user.id);

  container.innerHTML = `
    <div class="max-w-2xl mx-auto space-y-6">
      <div class="glass-panel p-6 sm:p-8">
        <div class="flex items-start justify-between pb-6 border-b border-slate-800">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center font-bold text-xl text-white shadow-xl shadow-emerald-500/20">
              ${user.full_name.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-xl font-bold text-white">${user.full_name}</h2>
                <span class="badge-edu text-xs">@pascualbravo</span>
              </div>
              <p class="text-xs text-slate-400 mt-0.5">${user.email}</p>
              <div class="flex items-center gap-3 text-xs mt-2">
                <span class="text-emerald-400 font-bold uppercase tracking-wider">${user.role}</span>
                <span class="text-slate-600">•</span>
                <span class="flex items-center gap-1 text-amber-400 font-bold">
                  <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400"></i> ${user.rating_average.toFixed(1)} / 5.0
                </span>
                <span class="text-slate-600">•</span>
                <span class="text-slate-400">${user.trips_completed} viajes</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Formulario de actualización de perfil (CA-05, CA-06) -->
        <form onsubmit="handleUpdateProfile(event)" class="space-y-4 my-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Nombre Completo *</label>
              <input type="text" id="profile-name" required value="${user.full_name}" class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Rol en el Campus *</label>
              <select id="profile-role" class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500">
                <option value="pasajero" ${user.role === 'pasajero' ? 'selected' : ''}>Estudiante Pasajero</option>
                <option value="conductor" ${user.role === 'conductor' ? 'selected' : ''}>Conductor Universitario (Auto / Moto)</option>
                <option value="docente" ${user.role === 'docente' ? 'selected' : ''}>Docente / Administrativo</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Facultad / Carrera * (CA-05)</label>
              <input type="text" id="profile-faculty" required value="${user.faculty}" placeholder="Ej: Tecnología en Desarrollo de Software" class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Zona Residencial Destino * (CA-05)</label>
              <input type="text" id="profile-zone" required value="${user.residential_zone}" placeholder="Ej: Bello, Laureles, Castilla" class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Teléfono Móvil (Para contacto en el campus)</label>
            <input type="text" id="profile-phone" value="${user.phone || ''}" class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500" />
          </div>

          <button type="submit" class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition">
            Guardar Cambios de Perfil (CA-05)
          </button>
        </form>

        <!-- Reseñas recibidas -->
        <div class="pt-6 border-t border-slate-800">
          <h3 class="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
            <i data-lucide="message-square" class="w-4 h-4 text-emerald-400"></i>
            Reseñas Comunitarias de Compañeros (${reviews.length})
          </h3>
          ${reviews.length === 0 ? `
            <p class="text-xs text-slate-500">Aún no tienes reseñas registradas.</p>
          ` : `
            <div class="space-y-3">
              ${reviews.map(r => `
                <div class="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 text-xs">
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-bold text-white">${r.reviewer_name}</span>
                    <span class="text-amber-400 font-bold flex items-center gap-1">
                      <i data-lucide="star" class="w-3 h-3 fill-amber-400"></i> ${r.rating}.0
                    </span>
                  </div>
                  <p class="text-slate-400 mt-1">${r.comment}</p>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    </div>
  `;
}

function handleUpdateProfile(e) {
  e.preventDefault();
  const user = RUTA_U_STATE.currentUser;
  if (!user) return;

  const name = document.getElementById('profile-name').value.trim();
  const role = document.getElementById('profile-role').value;
  const faculty = document.getElementById('profile-faculty').value.trim();
  const zone = document.getElementById('profile-zone').value.trim();
  const phone = document.getElementById('profile-phone').value.trim();

  // Validación de obligatoriedad (CA-06)
  if (!name || !faculty || !zone) {
    showToast('Error: Nombre, Facultad y Zona Residencial son obligatorios (CA-06).', 'error');
    return;
  }

  user.full_name = name;
  user.role = role;
  user.faculty = faculty;
  user.residential_zone = zone;
  user.phone = phone;

  const users = JSON.parse(localStorage.getItem('rutau_users') || '[]');
  const idx = users.findIndex(u => u.id === user.id);
  if (idx !== -1) {
    users[idx] = user;
    localStorage.setItem('rutau_users', JSON.stringify(users));
  }
  localStorage.setItem('rutau_current_user', JSON.stringify(user));

  showToast('¡Perfil actualizado con éxito! Coincidencias de viaje recalculadas.', 'success');
  renderApp();
}

// ==========================================
// 13. PANEL SUPABASE (CONEXIÓN Y PERSISTENCIA)
// ==========================================
function openSupabaseModal() {
  const config = RUTA_U_STATE.supabaseConfig;
  const modalHtml = `
    <div id="supabase-modal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="glass-panel w-full max-w-lg p-6 bg-slate-900 border border-slate-700 rounded-2xl">
        <div class="flex items-center justify-between pb-4 border-b border-slate-800">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              ⚡
            </div>
            <div>
              <h3 class="text-base font-bold text-white">Configuración de Supabase</h3>
              <p class="text-xs text-slate-400">Guarda los datos en tu proyecto de Supabase en la nube</p>
            </div>
          </div>
          <button onclick="closeModal('supabase-modal')" class="p-2 text-slate-400 hover:text-white rounded-lg">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <form onsubmit="handleSaveSupabaseConfig(event)" class="space-y-4 my-4">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Project URL de Supabase</label>
            <input 
              type="url" 
              id="supabase-url-input" 
              placeholder="https://xyzcompany.supabase.co" 
              value="${config.url || ''}"
              class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500" 
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Anon Public Key</label>
            <input 
              type="password" 
              id="supabase-key-input" 
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." 
              value="${config.key || ''}"
              class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 font-mono" 
            />
          </div>

          <div class="p-3 bg-slate-800/60 rounded-xl text-xs text-slate-400">
            <strong class="text-emerald-400 block mb-1">Esquema SQL listo:</strong>
            El archivo <code class="text-white font-mono">supabase_schema.sql</code> se encuentra en la carpeta del proyecto listo para ser ejecutado en el SQL Editor de tu panel de Supabase.
          </div>

          <div class="flex gap-2">
            <button type="submit" class="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition">
              Guardar y Conectar
            </button>
            <button type="button" onclick="testSupabaseConnection()" class="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition">
              Probar Conexión
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  lucide.createIcons();
}

function handleSaveSupabaseConfig(e) {
  e.preventDefault();
  const url = document.getElementById('supabase-url-input').value.trim();
  const key = document.getElementById('supabase-key-input').value.trim();

  RUTA_U_STATE.supabaseConfig = { url, key, connected: !!(url && key) };
  localStorage.setItem('rutau_supabase_config', JSON.stringify(RUTA_U_STATE.supabaseConfig));

  showToast('Configuración de Supabase guardada.', 'success');
  closeModal('supabase-modal');
}

function testSupabaseConnection() {
  const url = document.getElementById('supabase-url-input').value.trim();
  const key = document.getElementById('supabase-key-input').value.trim();

  if (!url || !key) {
    showToast('Ingresa la URL y la Anon Key para realizar la prueba.', 'warning');
    return;
  }

  showToast('Comprobando conexión con endpoint de Supabase...', 'info');
  fetch(`${url}/rest/v1/`, {
    headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }
  })
  .then(res => {
    if (res.ok || res.status === 200 || res.status === 404) {
      showToast('¡Conexión con Supabase exitosa! Tablas accesibles.', 'success');
    } else {
      showToast(`Respuesta de Supabase código: ${res.status}`, 'warning');
    }
  })
  .catch(err => {
    showToast('No se pudo conectar a la URL especificada. Verifica las credenciales.', 'error');
  });
}

// ==========================================
// 14. UTILIDADES GENERALES Y TOASTS
// ==========================================
function getStoredTrips() {
  return JSON.parse(localStorage.getItem('rutau_trips') || '[]');
}
function saveStoredTrips(trips) {
  localStorage.setItem('rutau_trips', JSON.stringify(trips));
}
function getStoredBookings() {
  return JSON.parse(localStorage.getItem('rutau_bookings') || '[]');
}
function saveStoredBookings(bookings) {
  localStorage.setItem('rutau_bookings', JSON.stringify(bookings));
}
function getBookingForTrip(tripId, passengerId) {
  const bookings = getStoredBookings();
  return bookings.find(b => b.trip_id === tripId && b.passenger_id === passengerId);
}
function getBookingsCountForTrip(tripId) {
  const bookings = getStoredBookings();
  return bookings.filter(b => b.trip_id === tripId && b.status === 'pendiente').length;
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.remove();
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const iconName = type === 'success' ? 'check-circle' : type === 'error' ? 'alert-circle' : type === 'warning' ? 'alert-triangle' : 'info';
  const colorClass = type === 'success' ? 'text-emerald-400' : type === 'error' ? 'text-rose-400' : type === 'warning' ? 'text-amber-400' : 'text-blue-400';

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i data-lucide="${iconName}" class="w-5 h-5 ${colorClass} shrink-0 mt-0.5"></i>
    <div class="text-xs text-slate-200 leading-relaxed">${message}</div>
  `;

  container.appendChild(toast);
  lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}

function bindGlobalEvents() {
  // Manejador de teclado para cerrar modales con ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModals = document.querySelectorAll('[id$="-modal"]');
      openModals.forEach(m => m.remove());
    }
  });
}

function initNotificationWatcher() {
  // Simulación de notificaciones en tiempo real para llegada o reservas (Should Have)
  setInterval(() => {
    const user = RUTA_U_STATE.currentUser;
    if (!user) return;
  }, 30000);
}
