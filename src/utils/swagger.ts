import swaggerJsDocs from "swagger-jsdoc";
import { version } from "../../package.json";

const swaggerOptions: swaggerJsDocs.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API documentation for ALIEN__SHL",
      version,
    },
    securitySchemas: {
      bearerAuth: {
        type: "http, https",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    // basePath: "/api",
  },
  apis: ["./src/homepage.ts"], //path to your route files.
};

// Initialize your swagger docs;

const swaggerSpec = swaggerJsDocs(swaggerOptions);

export default swaggerSpec;
