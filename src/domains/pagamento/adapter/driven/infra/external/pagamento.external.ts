import { Pagamento } from "domains/pagamento/core/entities/pagamento";
import { MercadoPagoExternal } from "./mercadopago/mercadopago";
import QRCode from "qrcode"
import { WorkflowsExternal } from "./workflows/workflows";

export class PagamentoExternal {

    constructor() {}
    
    async gerarCobrancaPix(pagamento: Pagamento): Promise<object | null> {    

        const external = new MercadoPagoExternal()

        const responsePedido = await external.criarPedido(
            `Pedido de ${pagamento.getCpf() || 'cliente'} em ${pagamento.getData().toISOString()}`,
            pagamento.getIdentificadorExterno(),
            pagamento.getValor().valueOf()
        );

        const {in_store_order_id, qr_data} = responsePedido.data;

        const QRCodeUrl = await QRCode.toDataURL(qr_data).then()

        return {
            idExterno: in_store_order_id,
            QRCodeUrl
        }
    }

    async consultaPedido(recurso: string): Promise<object> {
        const external = new MercadoPagoExternal()
        const pedido =  await external.consultarPedido(recurso).then()

        return pedido.data
    }

    async workflows(pagamento: Pagamento, evento: object): Promise<object | null> {

        const external = new WorkflowsExternal();

        const response = await external.callback(
            pagamento.getWorkflow().url as string,
            evento
        ).then()

        return response.data
    }
}