import { CustomError } from "domains/suporte/entities/custom.error"
import { AxiosResponse, create } from "axios"

export enum StatusPagamentoMercadoPago {
  CRIACAO = 'payment.created',
  ATUALIZACAO = 'payment.updated',
  PAGAMENTO = 'state_FINISHED',
  CANCELAMENTO = 'state_CANCELED',
  ERRO = 'state_ERROR'
}

export class MercadoPagoExternal {
    constructor() {
      const {
        MERCADOPAGO_URL, 
        MERCADOPAGO_USERID, 
        MERCADOPAGO_TOKEN, 
        MERCADOPAGO_POS, 
        MERCADOPAGO_WEBHOOK_URL
      } = process.env;

      if (!MERCADOPAGO_URL) throw new CustomError("Falha na configuração externa (URL)", 500, false, []);
      if (!MERCADOPAGO_USERID) throw new CustomError("Falha na configuração externa (USERID)", 500, false, []);
      if (!MERCADOPAGO_TOKEN) throw new CustomError("Falha na configuração externa (TOKEN)", 500, false, []);
      if (!MERCADOPAGO_POS) throw new CustomError("Falha na configuração externa (POS)", 500, false, []);
      if (!MERCADOPAGO_WEBHOOK_URL) throw new CustomError("Falha na configuração externa (WEBHOOK)", 500, false, []);
    } 

    criarPedido(descricao: string, codigoPedido: string, total: number): Promise<AxiosResponse> {

      const {
        MERCADOPAGO_URL, 
        MERCADOPAGO_USERID, 
        MERCADOPAGO_TOKEN, 
        MERCADOPAGO_POS
      } = process.env;


      const payload = this.pedidoPayload(descricao, codigoPedido, total)

      console.info(JSON.stringify(payload))

      const axios = create({
        baseURL: `${MERCADOPAGO_URL}`,
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MERCADOPAGO_TOKEN}`
        }
      });

      return axios.post(
        `/instore/orders/qr/seller/collectors/${MERCADOPAGO_USERID}/pos/${MERCADOPAGO_POS}/qrs`,
        payload
      )
    }

    consultarPedido(resource: string) {
      const {
        MERCADOPAGO_TOKEN, 
      } = process.env;

      const axios = create({
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MERCADOPAGO_TOKEN}`
        }
      });

      return axios.get(
        resource
      )      
    }

    private pedidoPayload(descricao: string, codigoPedido: string, total: number): Object {
      return {
        "description": descricao,
        "external_reference": codigoPedido,
        "items": [
          {
            "sku_number": "",
            "category": "marketplace",
            "title": `Pedido ${codigoPedido}`,
            "description": descricao,
            "unit_price": new Number(total),
            "quantity": 1,
            "unit_measure": "unit",
            "total_amount": new Number(total)
          }
        ],
        "notification_url": `${process.env.MERCADOPAGO_WEBHOOK_URL}/api/pagamentos/v1/webhook/mercadopago/${codigoPedido}`,
        "title": `Pedido ${codigoPedido}`,
        "total_amount": new Number(total)
      }
    }

}