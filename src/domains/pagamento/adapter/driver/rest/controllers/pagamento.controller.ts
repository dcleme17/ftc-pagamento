import {NextFunction, Request, Response} from 'express';
import { PagamentoUseCases } from 'domains/pagamento/core/applications/usecases/pagamento.usecases';
import { CustomError } from 'domains/suporte/entities/custom.error';
import { CustomResponse } from 'domains/suporte/entities/custom.response';
import { validationResult } from 'express-validator';
import { Pagamento } from 'domains/pagamento/core/entities/pagamento';

export class PagamentoController {

    constructor(private readonly service: PagamentoUseCases) {}

    async webhookMercadoPago(request: Request, next: NextFunction): Promise<void> {

        try {
            const result = validationResult(request)

            if (!result.isEmpty()) {
                throw new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array())
            }  

            const {action, id } = request.body

            next(new CustomResponse(201, 'Webhook Processado', await this.service.webhookPagamentos(id, action)))
        } catch (err){
            next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
        }
    }

    async criar(request: Request, next: NextFunction): Promise<void> {

        try {
            const result = validationResult(request)

            if (!result.isEmpty()) {
                throw new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array())
            }  

            const {nome, cpf, email, valor, parcelamento, meio, identificadorExterno} = request.body

            let pag = new Pagamento(
                nome,
                cpf,
                email,
                valor,
                parcelamento,
                meio,
                identificadorExterno
                )

            next(new CustomResponse(201, 'Criar Pagamento', await this.service.criar(pag)))
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

            next(new CustomResponse(201, 'Consultar Pagamento', await this.service.buscaUltimaVersao(identificadorExterno)))
        } catch (err){
            next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
        }
    }
}