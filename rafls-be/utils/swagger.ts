import {Express} from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import {version} from '../package.json'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API Docs',
      version
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{bearerAuth: []}]
  },
  apis: ['routes/*.ts']
}

const swaggerSpec = swaggerJsdoc(options)

const swaggerDocs = (app: Express, port: string | number) => {
  const docsRoute = '/api/docs'
  app.use(docsRoute, swaggerUI.serve, swaggerUI.setup(swaggerSpec))

  app.get('docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })

  console.log(`Docs available at http://localhost:${port}${docsRoute}`)
}

export default swaggerDocs