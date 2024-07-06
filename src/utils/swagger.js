const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.1.0",
    info: {
      title: "TodoAPI Swagger Documentation.",
      version: "0.0.0",
      description:
        "Swagger documentation for Todo REST-API",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development Server",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsDoc(options);

module.exports = specs;
