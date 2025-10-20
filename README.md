# agilo-product-page
Testni zadatak za Agilo – izrada Product stranice u Next.js, TypeScriptu i TailwindCSS-u s integracijom Medusa backend sustava.

## Upute za pokretanje

1. **Clone repozitorija**
   - Kloniraj repozitorij: `git clone <link_na_repo>`
   - Uđi u direktorij projekta: `cd agilo-product-page`

2. **Backend**
   - Uđi u backend direktorij: `cd backend`
   - Instaliraj sve dependencije: `npm install`
   - Kopiraj `.env.template` u `.env` i popuni potrebne varijable, npr. `DATABASE_URL` i `JWT_SECRET`.
   - Pokreni backend server: `npm run start`
   - Nakon pokretanja backend servera, u konzoli će se prikazati publishable key koji trebaš koristiti za frontend.

3. **Frontend**
   - Uđi u frontend direktorij: `cd ../frontend`
   - Instaliraj sve dependencije: `npm install`
   - Kreiraj `.env.local` datoteku i dodaj:
     ```
     NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
     NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=<publishable_key_koji_je_generiran>
     ```
   - Pokreni frontend: `npm run dev`
   - Prema defaultu, frontend se pokreće na portu 3000, osim ako u `.env.local` nije drugačije definirano.

## Procijenjeno vrijeme izrade
Projekt je rađen otprilike 10-12 sati, uključujući integraciju Medusa backend sustava i implementaciju responzivne Product stranice.

## Najzahtjevniji dijelovi zadatka
- **Integracija Medusa backend sustava**: Postavljanje servera i konfiguracija `.env` datoteka.
- **Dynamic Product Page u Next.js**: Prikaz podataka iz API-ja te rukovanje async requestima.
- **TailwindCSS layout i responzivnost**: Implementacija modernog dizajna i prilagodba različitim veličinama ekrana.


