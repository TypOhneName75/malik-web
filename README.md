# NeonShop — E-Commerce Plattform (Gamer-Style, Dark/Neon)

Vollständiger Online-Shop mit Next.js 14 (App Router), PostgreSQL/Prisma,
JWT-Auth, Wallet-System, Admin-Panel und Support-Ticketsystem.

## Tech-Stack

- **Frontend:** Next.js 14 (React, App Router), Tailwind CSS
- **Backend:** Next.js API-Routen (Node.js)
- **Datenbank:** PostgreSQL via Prisma ORM
- **Auth:** Eigene JWT-Session in httpOnly-Cookie, Passwörter mit bcrypt gehasht
- **Validierung:** Zod

## Voraussetzungen

- Node.js 18+
- Eine PostgreSQL-Datenbank (lokal, oder z. B. kostenlos bei
  [Neon](https://neon.tech), [Supabase](https://supabase.com) oder
  [Railway](https://railway.app))

## Setup

```bash
# 1. Abhängigkeiten installieren
npm install

# 2. Umgebungsvariablen konfigurieren
cp .env.example .env
# .env öffnen und DATABASE_URL, JWT_SECRET, ADMIN_USERNAME/ADMIN_PASSWORD setzen

# 3. Datenbankschema anlegen
npm run db:push

# 4. Admin-Account + Kategorien anlegen (Seed)
npm run db:seed

# 5. Entwicklungsserver starten
npm run dev
```

Die Seite ist danach unter `http://localhost:3000` erreichbar.

## Erster Login

Nach dem Seed-Vorgang existiert automatisch ein Administrator-Account mit
den in `.env` hinterlegten Zugangsdaten (Standard: `admin` /
`AdminPassword` — **bitte in Produktion unbedingt ändern**, bevor der Shop
live geht). Login unter `/login`, danach ist das Admin Panel unter
`/admin` erreichbar.

## Projektstruktur

```
app/
  api/            → Backend-API-Routen (Auth, Produkte, Cart, Checkout,
                     Wallet, Tickets, Admin-Endpunkte)
  shop/           → Shop-Übersicht mit Suche/Filter
  product/[id]/   → Produktdetailseite
  cart/           → Warenkorb
  checkout/       → Kasse / Bestellbestätigung
  login/          → Login
  register/       → Registrierung
  dashboard/      → Nutzer-Dashboard (Wallet, Tickets, Profil, Einstellungen)
  admin/          → Admin Panel (Produkte, Kategorien, Bestellungen,
                     Benutzer, Tickets, Statistiken)
components/       → Wiederverwendbare UI-Komponenten (Navbar, ProductCard, AuthProvider)
lib/              → Prisma-Client, Auth-Helper, Validierung, Rate-Limiter
prisma/
  schema.prisma   → Datenbankschema
  seed.js         → Seed-Skript (Admin + Kategorien)
middleware.ts     → Schützt /admin und /dashboard Routen, setzt Security-Header
```

## Kategorien

Die Kategorien werden beim Seed automatisch angelegt:

- **Digital Stuff**: Social Media Services, 1, 2
- **Clothes**: T-Shirts, Shorts, Pullovers, Hosen, Shoes, Bags Woman,
  Bags Men, Other

Weitere Kategorien/Unterkategorien lassen sich jederzeit im Admin Panel
unter „Kategorien" verwalten.

## Wallet & Zahlungen

Das Wallet-System (Guthaben, Transaktionsverlauf, Kauf mit
Guthabenabzug) ist vollständig implementiert. Die eigentliche
**Zahlungsanbindung (Stripe/PayPal) zur Aufladung** ist als Platzhalter
vorbereitet (`app/api/wallet/topup/route.ts`) — dort müssen noch die
Stripe-Keys hinterlegt und eine Checkout-Session sowie ein
Webhook-Handler ergänzt werden, damit Gutschriften erst nach
bestätigter Zahlung erfolgen. Admins können Guthaben zusätzlich manuell
im Admin Panel unter „Benutzer" anpassen.

## Sicherheit

- Passwörter werden mit bcrypt (12 Runden) gehasht
- Sessions als signierte JWTs in httpOnly-, SameSite=strict-Cookies
- Admin- und Dashboard-Routen serverseitig via Middleware geschützt
- Rate Limiting für Login/Registrierung (In-Memory — für Multi-Server-
  Deployments durch Redis ersetzen)
- Eingabevalidierung über Zod auf allen APIs
- Prisma verhindert SQL-Injection durch parametrisierte Queries
- Security-Header (X-Frame-Options, X-Content-Type-Options, Referrer-Policy)

## Deployment

Empfohlen: [Vercel](https://vercel.com) für das Next.js-Frontend/Backend
plus eine verwaltete PostgreSQL-Instanz (z. B. Neon oder Supabase).
`DATABASE_URL` und `JWT_SECRET` als Umgebungsvariablen im Deployment
hinterlegen, danach `npm run db:push` und `npm run db:seed` gegen die
Produktionsdatenbank ausführen.

## Erweiterungsmöglichkeiten

Die Struktur ist bewusst so aufgebaut, dass sich folgende Features ohne
größere Umbauten ergänzen lassen: Rabattcodes, Wunschliste,
Produktbewertungen, Benachrichtigungen, Mehrsprachigkeit,
Stripe/PayPal-Webhooks für die Wallet-Aufladung.
