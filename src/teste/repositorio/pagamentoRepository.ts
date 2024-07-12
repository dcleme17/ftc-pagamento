import { Pagamento } from "../pagamento/pagamento";
import { PagamentoVersao} from "../pagamento/pagamento.versao";
import { IPagamento } from "../pagamento/pagamento.port";

export class PagamentoRepository  implements IPagamento {
              
  async buscaUltimaVersao(identificadorExterno: string, cpf: string): Promise<Pagamento | null> {
    console.log(identificadorExterno, cpf);
    // Implementação da função
    //return null;
    let pagamento =  new Pagamento("12345678909","Nome Teste","nome.teste@gmail.com", 10, 1, "PIX",  "98765");
    return pagamento;
  }

  async criar(pagamento: Pagamento): Promise<PagamentoVersao | null> {
    console.log(pagamento);
    // Implementação da função
    //return null;
    let versao =  new PagamentoVersao( "1", new Date());
    pagamento = new Pagamento("12345678909","Nome Teste","nome.teste@gmail.com", 10, 1, "PIX",  "98765")
    return versao;
  }
}