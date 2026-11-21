import swaggerJSDoc from 'swagger-jsdoc'
import {config} from './env.config.js'
const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Shipnow API",
            version: "1.0.0",
            description: "users, deliverys, orders, mocks"
        },
        servers: [
            {url: `http://localhost:${config.PORT}`}
        ]
    },
    apis:["./src/docs/swagger.yaml"]
})
export default swaggerSpec