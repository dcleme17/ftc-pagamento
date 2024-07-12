import {
    post_webhook_mercadopago

} from 'domains/pagamento/adapter/driver/rest/swagger/pagamento.swagger'

export const swagger = {
    swagger: "2.0",
    info: {
        version: '1.0.0',           
        title: 'Tech Challenge Fiap',              
        description: 'Conjuntos dde recursos e operações do Tech Challenge da FIAP'
    },
    host: ["backend-koxvlyfy2a-rj.a.run.app"],
    // host: ["localhost:31300"],
    schemes: ["https", "http"],
    tags: [                   
        {
            name: 'Pagamento',             
            description: 'APIs do domínio de Pagamento'       
        }
        
    ],
    definitions: {
        post_webhook_mercadopago
    },
    securityDefinitions: {
        JWT: {
          type: 'apiKey',
          in: 'header', 
          name: 'Authorization', 
          description: 'JWT Access Token - Incluir o Bearer'
        }
    },
    "x-google-backend": {
        "address": "https://backend-koxvlyfy2a-rj.a.run.app",
        "jwt_audience": "https://backend-koxvlyfy2a-rj.a.run.app"
    },        
}