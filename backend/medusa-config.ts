import { loadEnv, defineConfig } from "@medusajs/framework/utils";

loadEnv(process.env.NODE_ENV || "development", process.cwd());

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
    // DODAJTE OVO:
    serveStaticOptions: {
      index: false,
      extensions: ["js", "json", "css", "html"],
      setHeaders: (res, path) => {
        // Blokiraj .ts fajlove da ne budu servirani
        if (path.endsWith(".ts")) {
          res.statusCode = 404;
        }
      },
    },
  },
});
