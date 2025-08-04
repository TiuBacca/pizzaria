export enum SituacaoPedido {
  // --- Etapas iniciais ---
  RASCUNHO = 'Rascunho',                   // Pedido criado mas não finalizado
  AGUARDANDO_PAGAMENTO = 'Aguardando Pagamento', // Pedido finalizado mas ainda não pago
  PAGO = 'Pago',                           // Pagamento confirmado

  // --- Processamento interno ---
  EM_PROCESSAMENTO = 'Em Processamento',    // Separando produtos / preparando envio
  AGUARDANDO_RETIRADA = 'Aguardando Retirada', // Cliente ou transportadora irá retirar
  ENVIADO = 'Enviado',                     // Saiu para entrega / transportadora recebeu
  EM_TRANSITO = 'Em Trânsito',             // A caminho do cliente
  ENTREGUE = 'Entregue',                   // Recebido pelo cliente

  // --- Exceções e Pós-venda ---
  DEVOLVIDO = 'Devolvido',                 // Cliente devolveu o produto
  CANCELADO = 'Cancelado',                 // Cancelado antes do envio
  REEMBOLSADO = 'Reembolsado',             // Pedido cancelado/devolvido com estorno
  FALHA_ENTREGA = 'Falha na Entrega',      // Transportadora não conseguiu entregar
}
