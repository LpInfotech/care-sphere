const Position = require("./models/Position.model");

const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./server.js"];

const config = {
  info: {
    version: "1.0.0",
    title: "Care Sphere API Documentation",
    description: "Description",
  },
  host: "localhost:3000",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "Roles",
      description: "Roles List",
    },
    {
      name: "Positions",
      description: "Positions List",
    },
  ],
  definitions: {
    Role: {
      name: "role-name",
      order: 0,
    },
    Position: {
      name: "position-name",
      code: 123,
	  isActive: true,
	  roleId: "66dafcc7985b4581b2716913",
    },
  },
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, config);
