const swaggerJSDoc = require("swagger-jsdoc");
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

// Configuración de Swagger
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de BOTELLONES",
            version: "1.0.0",
            description: `
# Documentación de la API de Botellones

Esta API permite la gestión pedidos de agua, consultas e informes para Culligan.

> **Nota importante**: Esta API está destinada únicamente para uso autorizado.
> El acceso no autorizado está prohibido y será monitoreado.
            `,
            contact: {
                name: "Equipo de Desarrollo BOTELLONES",
                email: "desarrollo@smec.com",
                url: "https://rasp.com.py"
            }
        },
        servers: [
            {
                url: "http://localhost:52000",
                description: "Servidor local de desarrollo",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        tags: [],
    },
    apis: [
        "src/routes/index.js",
        "src/routes/sub-route/*.js"
    ],
};

// Generar especificación de Swagger
const swaggerSpec = swaggerJSDoc(options);


// Convertir a YAML y guardar el archivo en la carpeta `docs`
const yamlString = yaml.dump(swaggerSpec);
fs.writeFileSync(path.join("src/docs/api-reference", "openapi.yaml"), yamlString);

console.log("Documentación generada en src/docs/openapi.yaml");