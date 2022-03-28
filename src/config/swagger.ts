export const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Social Network Managment System APIs",
            version: "1.0.0",
            description: "base URL: https://snm-backend.herokuapp.com/"
        },
        servers: [
            {
                url: "https://snm-backend.herokuapp.com"
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