import { Router, Request, Response, NextFunction } from 'express'
import { PagamentoController } from "domains/pagamento/adapter/driver/rest/controllers/pagamento.controller"
import { body, param } from 'express-validator'
import { PagamentoUseCases } from 'domains/pagamento/core/applications/usecases/pagamento.usecases';
import { PagamentoDatabase } from 'domains/pagamento/adapter/driven/infra/database/pagamento.database';
import { PagamentoExternal } from 'domains/pagamento/adapter/driven/infra/external/pagamento.external';

const router = Router();

router.post('/v1/webhook/mercadopago',  
  body('id').trim().isLength({ min: 1, max: 16 }).notEmpty(),
  body('action').trim().isLength({ min: 1, max: 20 }).notEmpty(),
  (request: Request, _response: Response, next: NextFunction) => {

    /**
        @Swagger
        #swagger.auto = true
        #swagger.summary = 'Recebe os eventos de pagamento do parceiro'
        #swagger.description = 'Recebe os eventos do parceiro e envia para o domínio de pedidos'
        #swagger.operationId = 'postWebhookMercadopago'
        #swagger.deprecated = false
        #swagger.security = [{
          "JWT": []
        }]            
        #swagger.tags = ['Pagamento']
        #swagger.parameters['body'] = { 
                in: 'body', 
                'schema': { $ref: '#/definitions/post_webhook_mercadopago' }
        }
    */

    const database = new PagamentoDatabase()
    const external = new PagamentoExternal()
    const service = new PagamentoUseCases(database, external)
    const controller = new PagamentoController(service)

    controller.webhookMercadoPago(request, next).then()
  });


  router.post('/v1',  
  body('nome').trim().isLength({ min: 1, max: 60 }).notEmpty(),
  body('cpf').trim().isLength({ min: 1, max: 14 }).notEmpty(),
  body('email').trim().isLength({ min: 1, max: 60 }).notEmpty(),
  body('valor').trim().isLength({ min: 1, max: 10 }).notEmpty(),
  body('parcelamento').trim().isLength({ min: 1, max: 2 }).notEmpty(),
  body('meio').trim().isLength({ min: 1, max: 20 }).notEmpty(),
  (request: Request, _response: Response, next: NextFunction) => {

    /**
        @Swagger
        #swagger.auto = true
        #swagger.summary = 'Recebe os eventos de pagamento do parceiro'
        #swagger.description = 'Recebe os eventos do parceiro e envia para o domínio de pedidos'
        #swagger.operationId = 'postWebhookMercadopago'
        #swagger.deprecated = false
        #swagger.security = [{
          "JWT": []
        }]            
        #swagger.tags = ['Pagamento']
        #swagger.parameters['body'] = { 
                in: 'body', 
                'schema': { $ref: '#/definitions/post_webhook_mercadopago' }
        }
    */

    const database = new PagamentoDatabase()
    const external = new PagamentoExternal()
    const service = new PagamentoUseCases(database, external)
    const controller = new PagamentoController(service)

    controller.criar(request, next).then()
  });

  router.get('/v1/:identificadorExterno',  
    param('identificadorExterno').trim().isLength({ min: 1, max: 20 }).notEmpty(),
    (request: Request, _response: Response, next: NextFunction) => {

    /**
        @Swagger
        #swagger.auto = true
        #swagger.summary = 'Recebe os eventos de pagamento do parceiro'
        #swagger.description = 'Recebe os eventos do parceiro e envia para o domínio de pedidos'
        #swagger.operationId = 'postWebhookMercadopago'
        #swagger.deprecated = false
        #swagger.security = [{
          "JWT": []
        }]            
        #swagger.tags = ['Pagamento']
        #swagger.parameters['body'] = { 
                in: 'body', 
                'schema': { $ref: '#/definitions/post_webhook_mercadopago' }
        }
    */

    const database = new PagamentoDatabase()
    const external = new PagamentoExternal()
    const service = new PagamentoUseCases(database, external)
    const controller = new PagamentoController(service)

    controller.buscaUltimaVersao(request, next).then()
  });

  export default router;