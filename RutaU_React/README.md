# ⚛️ RutaU_React | Módulo React 18 (JSX + Componentes)

Módulo frontend desarrollado en **React 18** con componentes modulares, hooks avanzados (`useState`, `useEffect`, `useMemo`, `useRef`), mapas interactivos Leaflet con capas Esri World Street Map y sistema de tokens de diseño.

---

## 🚀 Funcionalidades Clave

1. **Sedes Duales:** Soporte completo para **Campus Robledo** y **Sede C4TA San Javier** (Ciudadela de Occidente, Calle 44 #98-20).
2. **Publicación con Mapa Interactivo:** Selector de destino por texto o haciendo clic directamente sobre el mapa (`PublishLocationPickerMap`) con geolocalización inversa automática.
3. **Reserva con Paradas Intermedias (`BookingModal`):** Cada pasajero puede fijar 1 parada intermedia sobre la ruta, con un límite estricto de hasta 3 paradas por trayecto. Las paradas se marcan con pines ámbar numerados `[1]`, `[2]`, `[3]` en el mapa.
4. **Diseño Visual:** Paleta cálida durazno, blanco y verde esmeralda idéntica al diseño de inicio de sesión y registro institucional.
5. **Arquitectura Limpia:** Utiliza los recursos centralizados (`assets/` y `styles.css`) en la raíz del proyecto para evitar duplicación innecesaria de archivos.

---

## 📂 Archivos del Módulo

- `app.jsx`: Código fuente en React JSX con todos los componentes y lógica de negocio.
- `app.js`: Bundle compilado de producción mediante Babel (ejecutado por el `index.html` principal en la raíz).
- `build_react.js`: Script de compilación rápida con Node.js.
- `package.json`: Manifiesto npm.
- `README.md`: Documentación técnica del módulo React.

---

## 🛠️ Cómo Recompilar tras Modificaciones

Si realizas cambios en `app.jsx`, ejecuta en tu terminal:
```bash
node RutaU_React/build_react.js
```
El script generará automáticamente el bundle actualizado en `RutaU_React/app.js`, el cual es cargado por el archivo `index.html` ubicado en la raíz de `RutaU`.
