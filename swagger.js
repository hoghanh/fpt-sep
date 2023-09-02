require("dotenv").config();

const options = {
   openapi: "3.0.0",
   language: "en-US",
   disableLogs: false,
   autoHeaders: true,
   autoQuery: true,
   autoBody: true,
};

const swaggerAutogen = require("swagger-autogen")(options);
const path = require("path");

const outputFile = `${__dirname}/swagger_output.json`;
const endpointsFiles = [`${__dirname}/routes/Route.js`];

let port = process.env.PORT || 8080; // use process.env to get value from .env

const doc = {
   info: {
      version: "1.0.0", // by default: '1.0.0'
      title: "FPT-SEP", // by default: 'REST API'
      description: "sep", // by default: ''
   },
   basePath: "/", // by default: '/'
   servers: [
      {
         url: `http://localhost:${port}`,
         description: "local server",
      },
      {
         url: `https://fpt-sep.onrender.com`,
         description: "Server in render",
      },
   ],
   components: {
      securitySchemes: {
         bearerAuth: {
            type: "http",
            in: "header",
            name: "Authorization",
            description: "Bearer token to access these api endpoints",
            scheme: "bearer",
            bearerFormat: "JWT",
         },
      },
   },
   security: [
      {
         bearerAuth: [],
      },
   ],
   // consumes: [],  // by default: ['application/json']
   // produces: [],  // by default: ['application/json']
   // tags: [        // by default: empty Array
   //   {
   //     name: '',         // Tag name
   //     description: '',  // Tag description
   //   },
   //   // { ... }
   // ],
   // securityDefinitions: {},  // by default: empty object
   // definitions: {},          // by default: empty object (Swagger 2.0)
   // components: {}            // by default: empty object (OpenAPI 3.x)
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
   await import("./app.js"); // Your project's root file
});
