# El Rincón de las Higueras

Web independiente en HTML, CSS, JavaScript y SVG originales. Abre `index.html` con Live Server; no necesita instalación, compilación ni dependencias de ejecución. Repositorio del proyecto: https://github.com/pabloldl/elrincondelashigueras. La subida del código fue solicitada por el usuario. No se ha configurado ningún despliegue.

## Identificación y fuentes

Consulta realizada el 5 de noviembre de 2026. El nombre, localidad, capacidad y distribución coinciden entre las siguientes fichas:

- [Airbnb: anuncio 1281771155438002933](https://es-l.airbnb.com/rooms/1281771155438002933). Fuente del anfitrión: alojamiento entero en El Bosque, seis huéspedes, tres dormitorios, cuatro camas y un baño. También detalla cocina, WiFi, aire acondicionado, lavadora, ropa de cama y toallas. Las imágenes de la plataforma no se descargaron; las fotografías usadas fueron aportadas posteriormente por el usuario.
- [Booking: El Rincón de las Higueras](https://www.booking.com/hotel/es/el-rincon-del-bosque.es.html). Nombre público y localidad coincidentes, tres dormitorios, un baño, cocina, WiFi y aire acondicionado. La URL conserva el identificador `el-rincon-del-bosque`; el resultado indexado identifica expresamente El Rincón de las Higueras. La apertura directa presenta una comprobación de JavaScript, por lo que no se comprobó un proceso de reserva.
- [PortalRural](https://portalrural.com/casa-rural/el-rinca%C2%B3n-de-las-higueras-/179060/): corroboración del nombre, localidad, hasta seis plazas y tres habitaciones. No se trasladaron precios ni horarios.
- [Turismo de Andalucía: El Castillejo](https://www.andalucia.org/listing/jard%C3%ADn-bot%C3%A1nico-el-castillejo/15671102/).
- [Junta de Andalucía: río Majaceite](https://www.juntadeandalucia.es/medioambiente/portal/web/ventanadelvisitante/detalle-buscador-mapa/-/asset_publisher/Jlbxh2qB3NwR/content/r%C3%8Do-majaceite/255035).

No se ha confirmado la dirección postal exacta, teléfono, WhatsApp ni un dominio oficial propio. No se publican precios, disponibilidad, horarios ni condiciones que presentan diferencias entre plataformas. No se afirma que haya jardín, higueras, piscina, patio o terraza. El mapa enlaza al municipio, sin atribuirle una posición exacta a la vivienda.

## Diseño y recursos

No existían la carpeta del proyecto ni directorios `img/` o `imgs/` al comenzar. Posteriormente el usuario ha aportado ocho fotografías en `img/`. Se incorporan siete vistas distintas: salón, cocina, comedor, tres dormitorios y baño. Se omite una segunda vista del sofá para evitar repeticiones. Las copias JPEG de 700 y 1400 píxeles en `assets/photos/` conservan la proporción y reducen el peso; los PNG originales permanecen intactos. La web combina estas fotografías con ilustraciones botánicas originales, sin interiores generados. Las ilustraciones se identifican como conceptuales. Tipografías Fraunces y DM Sans servidas por Google Fonts, con alternativas del sistema si no hay conexión.

Se revisaron en modo de lectura las tipografías y composiciones de las referencias indicadas en el encargo. No se copiaron sus recursos ni componentes. La portada botánica simétrica y el cuaderno editorial fueron creados para este proyecto.

## Validación

`qa/results.json` registra pruebas reales en Chrome headless sobre Windows a 375, 390, 768, 1440 y 1920 píxeles: ancho de documento, menú, número de etiquetas robots y carga tipográfica. `qa/check.cjs` reproduce estas pruebas sin paquetes externos, utilizando Chrome instalado y su protocolo DevTools. Las capturas locales se excluyen de Git.

Se comprobaron por análisis estático la existencia de recursos, anclas internas, ausencia de identificadores duplicados y sintaxis JavaScript. Solo existe una página HTML pública y contiene exactamente una etiqueta `noindex, nofollow` dentro de `head`. El menú funciona sin JavaScript como navegación visible. Las animaciones respetan movimiento reducido. No se ha probado en Safari real ni en un iPhone físico; las pruebas móviles realizadas corresponden a Chrome con viewport móvil.
