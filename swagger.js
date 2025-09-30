import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "KarenFlix API",
      version: "1.0.0",
      description: "Documentación de la API de KarenFlix con Swagger",
    },
    servers: [
      {
        url: "https://proyecto-express-backend-aparicio-s.vercel.app/api/v1", // Producción
      },
      {
        url: "http://localhost:4000/api/v1", // Local
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export function swaggerDocs(app) {
  // Endpoint para servir el JSON
  app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  // Swagger UI que usa el JSON
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(null, {
      swaggerUrl: "/swagger.json",
    })
  );
}
