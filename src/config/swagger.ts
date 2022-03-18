export const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Project APIs",
            version: "1.0.0",
            description: "Express Library API"
        },
        servers: [
            {
                url: "http://localhost:3001"
            }
        ],
        components: {
            securitySchemes: {
                jwt: {
                    type: 'http',
                    scheme: 'bearer',
                    in: 'header',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ["src/routes/*"]
}