const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "BookAnyJet Version-2  Documentation",
    description:
      "This is the BookAnyJet Version-2 documentation which says the working of all the api",
  },
  host: "localhost:8000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const routes = [
  "./server/adminRoutes/bookingRoutes",
  "./server/adminRoutes/categoryRoutes",
  "./server/adminRoutes/loginRoutes",
  "./server/adminRoutes/logsRoutes",
  "./server/adminRoutes/onDemanRoute",
  "./server/adminRoutes/subCategoryRoutes",
  "./server/adminRoutes/enquiryRoutes",
  "./server/adminRoutes/filterRoutes",
  "./server/adminRoutes/typeRoutes",
  "./server/adminRoutes/userRoleRoutes",
  "./server/adminRoutes/viewRoutes",
  "./server/adminRoutes/adminLogRoutes",
];

swaggerAutogen(outputFile, routes, doc);
