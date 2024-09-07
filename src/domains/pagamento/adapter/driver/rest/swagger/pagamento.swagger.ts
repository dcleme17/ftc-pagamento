import { StatusPagamento } from "../../../../core/entities/pagamento"

export const post_webhook_mercadopago = {
    resource: 'https://api.mercadolibre.com/merchant_orders/22588740544', 
    topic: 'merchant_order'
}   

export const post_pagamento = {
    $nome: "TESTE TESTE",
    $cpf: "12345678909",
    $email: "teste@teste.com",
    $valor: "1.99",
    $parcelamento: "1",
    $meio: "PIX",
    $identificadorExterno: "123456",
    $workflow: "https://workflows/idasdasdas"
}   

export const put_pagamento = {
    $status: StatusPagamento.PENDENTE
}   

