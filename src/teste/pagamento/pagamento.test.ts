import { PagamentoService } from '../repositorio/pagamentoService';
import { PagamentoRepository } from '../repositorio/pagamentoRepository';
import { Pagamento } from './pagamento';
import { PagamentoVersao } from './pagamento.versao';

jest.mock('../repositorio/pagamentoRepository');

describe('PagamentoService', () => {
  let pagamentoService: PagamentoService;
  let pagamentoRepository: jest.Mocked<PagamentoRepository>;

  beforeEach(() => {
    pagamentoRepository = new PagamentoRepository() as jest.Mocked<PagamentoRepository>;
    pagamentoService = new PagamentoService(pagamentoRepository);
  });

  it('devePermitirObterUltimaVersao', async () => {
    //Given
    const cpf = "12345678909";
    const identificadorExterno = "98765"
    
    let pag = new Pagamento("12345678909","Nome Teste","nome.teste@gmail.com", 10, 1, "PIX",  "98765");
    pagamentoRepository.buscaUltimaVersao.mockResolvedValue(pag);

    //When
    const result = await pagamentoService.buscaUltimaVersao(cpf,identificadorExterno);
    
    //Then
    //expect(result).toBeNull();
    expect(pagamentoRepository.buscaUltimaVersao).toHaveBeenCalledTimes(1);
    expect(pagamentoRepository.buscaUltimaVersao).toHaveBeenCalledWith(cpf, identificadorExterno);
    expect(result).toBe(pag);
  });

  it('devePermitirCriarPagamento', async () => {

    //Given
    let pag = new Pagamento("12345678909","Nome Teste","nome.teste@gmail.com", 10, 1, "PIX",  "98765");
    let versao = new PagamentoVersao("1", new Date());
    pagamentoRepository.criar.mockResolvedValue(versao);

    //When
    const result = await pagamentoService.criar(pag);
    
    //Then
    //expect(result).toBeNull();
    expect(pagamentoRepository.criar).toHaveBeenCalledTimes(1);
    expect(pagamentoRepository.criar).toHaveBeenCalledWith(pag);
    expect(result).toBe(versao);
  });
});