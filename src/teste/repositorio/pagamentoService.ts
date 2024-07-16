
  // src/userService.ts
  import { PagamentoRepository } from './pagamentoRepository';
  import { Pagamento } from "../pagamento/pagamento";
  import { PagamentoVersao } from "../pagamento/pagamento.versao";

  export class PagamentoService {
    private pagamentoRepository: PagamentoRepository;
  
    constructor(pagamentoRepository: PagamentoRepository) {
        this.pagamentoRepository = pagamentoRepository;
    }
  
    async buscaUltimaVersao(identificadorExterno: string, cpf: string): Promise<Pagamento | null> {
        const ret = await this.pagamentoRepository.buscaUltimaVersao(identificadorExterno,cpf);
      return ret;
    }
  
    async criar(pagamento: Pagamento): Promise<PagamentoVersao | null> {
        const ret = await this.pagamentoRepository.criar(pagamento);
      return ret;
    }
  
  }
  