# Marcaktiva OnePage estática

Reconstrucción estática local de la OnePage actual de marcaktiva.com para despliegue posterior como sitio estático.

## Estructura

- `index.html`: contenido semántico de la landing.
- `styles.css`: estilos responsive y animaciones visuales.
- `script.js`: menú móvil, carruseles, acordeón FAQ, navegación por anclas y widget de WhatsApp.
- `assets/images/`: copias locales de imágenes públicas usadas por la página original.

## Ejecutar localmente

Puede abrirse directamente en el navegador o servirse con cualquier servidor estático:

```bash
python -m http.server 4173
```

No incluye backend de WordPress ni configuración de Render/DNS.
