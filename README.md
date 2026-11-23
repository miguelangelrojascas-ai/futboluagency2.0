# FutbolUAgency — web

Web pública de FutbolUAgency (futboluagency.com): becas de fútbol universitario en EE.UU., la temporada en España con Prime Play y el Showcase de Talavera. Disponible en español, inglés, italiano y alemán.

## Tecnología

- Next.js (App Router), React y Tailwind CSS.
- Formularios "Aplicar" y "Showcase": se envían al CRM de FUA desde `app/api/lead` y `app/api/showcase`.
- Idiomas: rutas `/es`, `/en`, `/it`, `/de`; la redirección por idioma está en `proxy.ts`.

## Trabajar en local

```sh
npm install
npm run dev     # http://localhost:8080
```

## Publicar

```sh
npm run build
npm run start   # usa la variable PORT si existe; si no, el 8080
```

Variable opcional: `CRM_URL` (dirección del CRM; tiene un valor por defecto).
