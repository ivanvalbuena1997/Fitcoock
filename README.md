# FitCoock v1.3.2

App web de registro de comidas y macros. Funciona sin conexión y se instala como
PWA. Los datos se guardan en el navegador del dispositivo (localStorage), no en
ningún servidor.

## Archivos

| Archivo | Para qué |
|---|---|
| `index.html` | La app entera: interfaz, lógica y los alimentos base |
| `sw.js` | Service worker: hace que funcione sin conexión |
| `manifest.webmanifest` | Datos de instalación (nombre, colores, iconos) |
| `icon-192.png`, `icon-512.png`, `icon-maskable.png` | Iconos de la app |

Todos van en la **raíz** del repositorio, al mismo nivel.

## Publicar en GitHub Pages

1. Sube los seis archivos a la raíz del repositorio.
2. Settings → Pages → Source: `Deploy from a branch`, rama `main`, carpeta `/ (root)`.
3. Espera un minuto y entra en la URL que te da GitHub.
4. En Chrome para Android: menú ⋮ → «Añadir a pantalla de inicio».

## IMPORTANTE al publicar cambios

Cada vez que modifiques `index.html`, **sube el número de `VERSION` en `sw.js`**:

```js
const VERSION = "fitcoock-v1.3.2";   // → "fitcoock-v1.4"
```

Si no lo haces, el móvil seguirá sirviendo la copia guardada y parecerá que los
cambios no se han aplicado. Es el fallo clásico con service workers.

## Copias de seguridad

Los datos viven solo en el navegador. Si limpias los datos del navegador o
cambias de móvil, se pierden. En Objetivos → Datos tienes **Exportar** (descarga
el archivo) y **Enviar copia por correo**. La app te lo recuerda cada 20
aperturas.

En el móvil, «Enviar copia» abre el menú de compartir de Android con el archivo
ya adjunto: eliges Gmail y lo mandas. En el ordenador, o en navegadores sin esa
función, descarga el archivo y abre el correo con el asunto puesto para que lo
adjuntes tú (un enlace `mailto:` no puede llevar adjuntos).

## Alimentos base

Los alimentos base están dentro de `index.html`, en la constante `BASE`, y
salen de la hoja de Drive «FITCOOCK - ALIMENTOS». Cada línea es un producto:

```
["009","Pasta tortiglioni Armando","mercadona","g",354,1.3,70.2,2.7,14,2.8,2.35]
 código  nombre                     súper        ud  kcal gra  hid  fib prot precio factor
```

Al ampliar esa lista en una versión nueva, los productos nuevos aparecen solos
al abrir la app, sin tocar los que ya tengas ni los que hayas creado tú. Los que
borres a mano no reaparecen; para recuperarlos está el botón «Reponer alimentos
base» en Objetivos → Datos.

## Historial

- **v1.3.2** — La copia de seguridad se puede enviar por correo: en el móvil usa
  el menú de compartir del sistema y adjunta el archivo; en el ordenador lo
  descarga y abre el correo para adjuntarlo a mano.
- **v1.3.1** — Fuera también la etiqueta entreno/descanso de los menús y del
  diario, y sus filtros.
- **v1.3** — Al añadir un producto a un menú se puede indicar si lo has pesado
  crudo o ya cocinado (solo en los que tienen factor). Un único objetivo diario
  en vez de uno para entreno y otro para descanso.
- **v1.2** — Base ampliada a 83 alimentos (10 nuevos: pan proteico, postres y
  leche de Día, y la gama de patatas y batata ultracongeladas).
- **v1.1** — Diálogos propios en vez de los del navegador (los nativos se
  bloquean dentro de iframes y PWA, y eso impedía borrar). Alimentos base
  incorporados y con carga incremental por código.
- **v1.0** — Alimentos, platos, menús, diario, vista semanal, objetivos por tipo
  de día, lista de la compra y PWA.
