const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const YAML = require("yamljs")
const swaggerDocument = YAML.load('./swagger.yaml');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Swagger Documention',
            description: 'Swagger Documention of all apis ',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'],
}

const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app, port) {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}

module.exports = swaggerDocs