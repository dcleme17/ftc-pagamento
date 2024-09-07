import {
    post_webhook_mercadopago,
    post_pagamento,
    put_pagamento

} from 'domains/pagamento/adapter/driver/rest/swagger/pagamento.swagger'

export const swagger = {
    swagger: "2.0",
    info: {
        version: '1.0.0',           
        title: 'Tech Challenge Fiap',              
        description: 'Conjuntos dde recursos e operações do Tech Challenge da FIAP'
    },
    host: ["pagamento-backend-91827266597.southamerica-east1.run.app"],
    // host: ["localhost:3000"],
    schemes: ["https", "http"],
    tags: [                   
        {
            name: 'Pagamento',             
            description: 'APIs do domínio de pagamento'       
        }
        
    ],
    definitions: {
        post_webhook_mercadopago,
        post_pagamento,
        put_pagamento
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