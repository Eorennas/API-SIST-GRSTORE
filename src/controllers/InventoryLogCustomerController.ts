import { FastifyRequest, FastifyReply } from 'fastify';
import { InventoryLogService } from '../services/InventoryLogCustomerService';

class InventoryLogController {
  // Adicionar um log de estoque
  async createLog(request: FastifyRequest, reply: FastifyReply) {
    const { product_id, change_type, quantity, note } = request.body as {
      product_id: string;
      change_type: "Entrada" | "Saída";
      quantity: number;
      note: string;
    };

    const inventoryLogService = new InventoryLogService();

    try {
      const log = await inventoryLogService.execute({
        product_id,
        change_type,
        quantity,
        note,
      });

      reply.status(201).send({
        message: "Log de estoque registrado com sucesso.",
        log,
      });
    } catch (error: any) {
      reply.status(400).send({
        error: true,
        message: error.message || "Erro ao registrar log de estoque.",
      });
    }
  }

  // Listar todos os logs de estoque
  async listLogs(request: FastifyRequest, reply: FastifyReply) {
    const inventoryLogService = new InventoryLogService();

    try {
      const logs = await inventoryLogService.listAll();
      reply.status(200).send(logs);
    } catch (error: any) {
      reply.status(500).send({
        error: true,
        message: error.message || "Erro ao listar logs de estoque.",
      });
    }
  }
}

export { InventoryLogController };
