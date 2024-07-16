import { Pagamento } from "./pagamento"
import { PagamentoVersao } from "./pagamento.versao"

export interface IPagamento {
    criar: (pagamento: Pagamento) => Promise<PagamentoVersao | null>
    buscaUltimaVersao: (identificadorExterno: string, cpf: string) => Promise<Pagamento | null>
}