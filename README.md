# agilo-product-page
Testni zadatak za Agilo – izrada Product stranice u Next.js, TypeScriptu i TailwindCSS-u s integracijom Medusa backend sustava.

## Upute za pokretanje

1. **Clone repozitorija**
   - Kloniraj repozitorij i uđi u direktorij projekta:
     ```bash
     git clone <link_na_repo>
     cd agilo-product-page
     ```

2. **Backend**
   - Uđi u backend direktorij i instaliraj sve dependecije:
     ```bash
     cd backend
     npm install
     ```
   - Kopiraj `.env.template` u `.env` i unesi svoj `DATABASE_URL` (moraš imati kreiranu bazu podataka):
     ```
     DATABASE_URL=<tvoj_db_url>
     ```
   - Pokreni migraciju i inicijaliziraj bazu: 
     ```
     npx medusa db:setup
     
     ```
   - Pokreni seed za inicijalne podatke:
     ``` 
     npm run seed
     ```
     **Napomena**: Nakon seeda, u konzoli će biti prikazan **publishable key**. Možeš ga također pronaći u Admin panelu (http://localhost:9000/app) pod **Settings** → API Keys ili u bazi podataka, tablica       **api_key**.
   - Postavi publishable key u frontend .env.local:
     ```
     NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
     NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=<publishable_key_koji_je_generiran>
     ```
   - Pokreni backend server:
     ```
     npm run dev
     ```

3. **Frontend**
   - U novom terminalu, uđi u frontend direktorij i instaliraj dependencies:
     ```
     cd frontend
     npm install
     ```
   - Pokreni frontend:
     ```
     npm run dev
     ```
   Frontend se prema defaultu pokreće na http://localhost:3000.

## Procijenjeno vrijeme izrade
Projekt je rađen otprilike 10-12 sati, uključujući integraciju Medusa backend sustava i implementaciju responzivne Product stranice.

## Najzahtjevniji dijelovi zadatka
- **Integracija Medusa backend sustava**: Postavljanje servera i konfiguracija `.env` datoteka.
- **Dynamic Product Page u Next.js**: Prikaz podataka iz API-ja te rukovanje async requestima.
- **TailwindCSS layout i responzivnost**: Implementacija modernog dizajna i prilagodba različitim veličinama ekrana.


