import { CustomError } from "domains/suporte/entities/custom.error"
import { PagamentoDatabase } from "domains/pagamento/adapter/driven/infra/database/pagamento.database";
import { PagamentoVersao } from "../../entities/pagamento.versao";
import { MeioPagamento, Pagamento, ParceiroNegocioPagamento, StatusPagamento } from "../../entities/pagamento";
import { PagamentoExternal } from "domains/pagamento/adapter/driven/infra/external/pagamento.external";
import { StatusPagamentoMercadoPago } from "domains/pagamento/adapter/driven/infra/external/mercadopago/mercadopago";
import { CustomResponse } from "domains/suporte/entities/custom.response";

export class PagamentoUseCases {

    constructor(
        private readonly database: PagamentoDatabase,
        private readonly external: PagamentoExternal) {
        this.database = database
        this.external = external
    }

    /**
     * Esse método está com 2 responsabilidades, criar a base de pagamentos e integrar com o Mercado Pago.
     * Refatorar para ficar com uma única responsabilidade.
     * Se houver problemas no acionamento do mercado pago, ficaremos com um pagamento associado ao pedido que nao gerou a cobrança
     * @param pagamento 
     * @returns 
     */
    async criar(pagamento: Pagamento): Promise<PagamentoVersao | null> {
        
        if (pagamento.getMeio() === MeioPagamento.PIX) {
            pagamento.setParceiroNegocio(ParceiroNegocioPagamento.MERCADOPAGO)
        } else {
            throw new CustomError('Meio de recebimento inválido', 400,false, [])
        }

        pagamento.setStatus(StatusPagamento.PENDENTE)

        const pagamentoVersao: PagamentoVersao = await this.database.criar(pagamento).then()

        const metadata = await this.external.gerarCobrancaPix(pagamento).then()
        
        pagamento.setVersao(pagamentoVersao);
        this.database.versiona(pagamento);

        pagamento.setMetadata(metadata)

        this.database.criar(pagamento)

        return pagamentoVersao
    }

    async buscaUltimaVersao(identificadorExterno: string): Promise<Pagamento> {

        const ultimaVersao = await this.database.buscaUltimaVersao(identificadorExterno)

        if (ultimaVersao) {
            return ultimaVersao
        } else {
            throw new CustomError('Pagamento não encontrado com o código informado', 404, false, [])
        }
    }   

    async webhookMercadoPago(identificadorExterno: string, payload: object): Promise<object>{

        const pagamento: Pagamento = await this.database.buscaUltimaVersao(identificadorExterno).then()
        const pedido: object = await this.external.consultaPedido(payload.resource).then()
        
        return this.external.workflows(pagamento, pedido).then()

    }

    async atualiza(identificadorExterno: string, payload: object): Promise<object>{

        const pagamento = await this.database.buscaUltimaVersao(identificadorExterno).then()

        if (!pagamento) {
            return new CustomResponse(404, 'pagamento não encontrado', null, false)
        }

        if (payload.status) {

            if(Object.values(StatusPagamentoMercadoPago).includes(payload.status)){
                return new CustomResponse(400, 'status invalido', null, false)
            }

            pagamento.setStatus(payload.status)
        }

        const versao: PagamentoVersao = await this.database.criar(pagamento).then()

        await this.database.versiona(pagamento).then()

        return versao;

    }

    
} 