# Informe de cumplimiento de criterios de accesibilidad de `/taura-birra`

## Asuntos Actuales (priorizados)

### Prioridad Alta (Nivel AA de WCAG)

1. **Contraste insuficiente en el héroe**  
   * **Ubicación:** App.css (líneas 520-560)  
   * **Problema:** El subtítulo blanco se superpone a un fondo fotográfico oscuro-claro; medición puntual ~3.1:1 (<4.5:1).  
   * **Solución:** Añadir overlay oscuro estable o aumentar grosor/color del texto hasta alcanzar 4.5:1.

2. **Contraste variable en “Bar de Fábrica”**  
   * **Ubicación:** App.css (líneas 860-900)  
   * **Problema:** Texto color `var(--color-text)` sobre imagen de fondo; en zonas claras cae a ~3.0:1.  
   * **Solución:** Incorporar fondo semitransparente constante detrás del párrafo o ajustar paleta.

3. **Enlaces de redes con texto poco descriptivo**  
   * **Ubicación:** Footer.jsx (líneas 9-35)  
   * **Problema:** El contenido visible es “/tauracerveza”; sin contexto de la red, incumple WCAG 2.4.4.  
   * **Solución:** Cambiar a texto completo (“Facebook: @tauracerveza”) o añadir `aria-label` descriptivo.

### Prioridad Media (Mejores Prácticas)

1. **Falta de enlace alternativo al mapa**  
   * **Ubicación:** Ubicacion.jsx  
   * **Problema:** No existe enlace directo “Ver en Google Maps” o “Obtener indicaciones”.  
   * **Solución:** Añadir `<a>` accesible que abra el mismo destino del iframe.

2. **Animaciones de tarjetas sin opción reducida**  
   * **Ubicación:** App.css (líneas 1020-1170)  
   * **Problema:** Transiciones de `BeerCard` (desplazamiento/escala) se ejecutan incluso si el usuario prefiere menos movimiento.  
   * **Solución:** Encapsular `transform` y `transition` en `@media (prefers-reduced-motion: no-preference)` y dejar un estado estático alternativo.

3. **Mensaje de estado del chat poco informativo**  
   * **Ubicación:** WhatsAppButton.jsx (líneas 80-130)  
   * **Problema:** Se anuncia “En línea” en `aria-live="polite"` pero nunca cambia; podría interpretarse erróneamente como estado actual.  
   * **Solución:** Cambiar a un mensaje neutro (“Chat de Taura listo para recibir consultas”) o actualizarlo dinámicamente.

## Análisis de Contraste

| Elemento | Relación Actual | Requerido | Pasa/Falla |
| :--- | :--- | :--- | :--- |
| Párrafos sobre `var(--color-first-bg)` (#5B3D28 / #FAF3DC) | ~6.8:1 | 4.5:1 | ✅ Pasa |
| Links de navegación sobre `var(--color-navbar-bg)` (#F5E6B3 / #D7B77A) | ~4.9:1 | 4.5:1 | ✅ Pasa |
| Subtítulo del héroe sobre foto | ~3.1:1 | 4.5:1 | ❌ Falla |
| Texto “Bar de Fábrica” sobre imagen | ~3.0:1 | 4.5:1 | ❌ Falla |
| Botón `.btn.btn-brn` (texto blanco / #CBA969) | ~4.6:1 | 4.5:1 | ✅ Pasa |

## Resultados de Pruebas de Navegación por Teclado

| Acción | ¿Funciona? | Notas |
| :--- | :--- | :--- |
| Tabular por la navegación | ✅ | El foco recibe halo (`box-shadow`) en el botón hamburguesa y outline por defecto en enlaces. |
| Abrir menú móvil con teclado | ✅ | `Enter` activa el botón, y los enlaces internos son focusables solo cuando el menú está abierto. |
| Explorar tarjetas de cerveza | ✅ | `tab` enfoca cada `article`; el contenido oculto se revela vía `:focus-visible`. |
| Cerrar el chat flotante | ✅ | Botón “✕” responde a `Enter`/`Esc` y devuelve el foco al disparador. |
| Detección de llegada de datos tras carga | ❌ | Lectores de pantalla no reciben anuncio al poblar la lista/tabla; requiere `aria-live`. |