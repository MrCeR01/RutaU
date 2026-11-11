# 🚗 RutaU | Red Universitaria de Movilidad Segura y Solidaria
**Institución Universitaria Pascual Bravo — Medellín, Colombia**

Plataforma universitaria de movilidad colaborativa nocturna organizada de forma limpia por lenguajes y tecnologías, con un **único archivo HTML maestro** en la raíz y recursos centralizados sin duplicaciones.

---

## 📁 Estructura del Proyecto Organizada por Lenguaje

```text
RutaU/
├── index.html                        # 🚀 ÚNICO HTML AUTORIZADO DEL PROYECTO (Ejecuta la App)
├── styles.css                        # Estilos centralizados y tokens de diseño
├── assets/                           # Recursos gráficos, mapas y librerías centralizados
├── README.md                         # Guía general del repositorio
│
├── ⚛️ RutaU_React/                   # [MÓDULO REACT 18 + JSX]
│   ├── app.jsx                       # Código fuente en React JSX
│   ├── app.js                        # Bundle compilado de producción
│   ├── build_react.js                # Compilador con Babel y Node.js
│   ├── package.json                  # Dependencias y configuración
│   └── README.md                     # Documentación de la versión React
│
├── 🌐 RutaU_Vanilla_JS/              # [MÓDULO JAVASCRIPT VANILLA ES6+]
│   ├── app.js                        # Lógica de negocio y controladores en JS nativo
│   └── README.md                     # Documentación del código Vanilla JS
│
├── 🗄️ RutaU_Database_SQL/            # [MÓDULO SQL POSTGRESQL / SUPABASE]
│   ├── supabase_schema.sql           # Tablas (sedes, paradas, perfiles, viajes), RLS y triggers
│   ├── seed_data.sql                 # Datos semilla para Robledo y C4TA San Javier
│   └── README.md                     # Guía de despliegue en Supabase
│
└── 📚 RutaU_Docs/                    # [MÓDULO DE DOCUMENTACIÓN Y ARQUITECTURA]
    ├── README.md                     # Resumen general del proyecto
    ├── arquitectura_sistema.md       # Diagrama de arquitectura y flujo de datos
    └── historias_usuario.md          # Matriz de las 13 historias épicas de usuario
```

---

## 🏛️ Sedes Universitarias Integradas

1. **Campus Principal Robledo:**
   - Ubicación: Calle 73 #73A-226, Vía El Volador (`6.2755, -75.5908`)
   - Puntos de salida: Portería Principal Calle 73 (Bloque 2), Parqueadero Motos Bloque 10, Bahía Biblioteca, Salida Carrera 78.
2. **Ciudadela Universitaria C4TA San Javier:**
   - Ubicación: Calle 44 #98-20, San Javier (`6.252965, -75.614174`)
   - Puntos de salida: Portería Calle 44, Bahía Metro San Javier, Parqueadero Bloque Tecnológico.

---

## 🌟 Funcionalidades Clave

- **Único Archivo HTML:** `index.html` en la raíz ejecuta la aplicación completa directamente en el navegador.
- **Selector Dual de Destino al Publicar:** Por dirección escrita o marcando directamente el punto de llegada en el mapa interactivo de Medellín.
- **Reserva con Paradas Intermedias:** Cada pasajero puede solicitar 1 parada intermedia en la ruta (con un límite máximo de 3 paradas acordadas por trayecto).
- **Mapa Interactivo con Teselas Esri:** Funcional 100% de manera local sin bloqueos 403 ni marcas de agua.
- **Diseño Armonizado:** Paleta cálida durazno, blanco y verde esmeralda idéntica a las pantallas de inicio de sesión y registro institucional con ilustraciones dinámicas para conductor y estudiante.
- **Cero Duplicación de Archivos:** Las carpetas por lenguaje contienen únicamente los archivos correspondientes a su tecnología; `assets` y `styles.css` se mantienen centralizados en la raíz.
