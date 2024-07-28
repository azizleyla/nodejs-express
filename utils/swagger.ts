import { _schema } from "../build/_schema";
const swaggerAutogen = require("swagger-autogen")();

require("dotenv").config();

const doc = {
  info: {
    version: "0.1.0",
    title: "Appointment Managment",
    description: "This is your cool API made by ICheered",
  },
  host: "localhost:8080",
  basePath: "/",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  schemas: _schema.definitions,
  definitions: { ..._schema.definitions },
};

const outputFile = "build/swagger.json";
const endpointsFiles = ["src/index.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc);
