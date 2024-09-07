import {NextFunction, Request} from 'express';
import { PagamentoUseCases } from 'domains/pagamento/core/applications/usecases/pagamento.usecases';
import { CustomError } from 'domains/suporte/entities/custom.error';
import { CustomResponse } from 'domains/suporte/entities/custom.response';
import { validationResult } from 'express-validator';
import { Pagamento } from 'domains/pagamento/core/entities/pagamento';

export class PagamentoController {

    constructor(private readonly service: PagamentoUseCases) {}

    async criar(request: Request, next: NextFunction): Promise<void> {

        try {
            const result = validationResult(request)

            if (!result.isEmpty()) {
                throw new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array())
            }  

            const {nome, cpf, email, valor, parcelamento, meio, identificadorExterno, workflow} = request.body

            const pag = new Pagamento(
                nome,
                cpf,
                email,
                valor,
                parcelamento,
                meio,
                identificadorExterno,
                workflow,
                )

            next(new CustomResponse(201, 'pagamento criado', await this.service.criar(pag)))
        } catch (err){
            next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
        }
    }

    async buscaUltimaVersao(request: Request, next: NextFunction): Promise<void> {

        try {
            const result = validationResult(request)

            if (!result.isEmpty()) {
                throw new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array())
            }  

            const {identificadorExterno} = request.params

            next(new CustomResponse(200, 'sucesso', await this.service.buscaUltimaVersao(identificadorExterno)))
        } catch (err){
            next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
        }
    }

    async webhookMercadoPago(request: Request, next: NextFunction): Promise<void> {

        console.info(JSON.stringify(request.body))

        try {
            const result = validationResult(request)

            if (!result.isEmpty()) {
                throw new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array())
            }  

            const {identificadorExterno} = request.params

            next(new CustomResponse(201, 'Webhook Processado', await this.service.webhookMercadoPago(identificadorExterno, request.body)))
        } catch (err){
            console.error(err)
            next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
        }
    } 

    async atualiza(request: Request, next: NextFunction): Promise<void> {

        try {
            const result = validationResult(request)

            if (!result.isEmpty()) {
                throw new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array())
            }  

            const {identificadorExterno} = request.params

            next(new CustomResponse(200, 'pagamento atualizado', await this.service.atualiza(identificadorExterno, request.body)))
        } catch (err){
            next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
        }
    } 
}