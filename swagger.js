import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "KarenFlix API",
      version: "1.0.0",
      description: "Documentación de la API KarenFlix"
    },
    servers: [
      { url: "https://proyecto-express-backend-aparicio-s.vercel.app" }
    ],
  },
  apis: ["./src/routes/*.js"], // ajusta según tu estructura
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// 👇 endpoint que devuelve el JSON de la doc
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// 👇 monta SwaggerUI y dile que use ese JSON
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
