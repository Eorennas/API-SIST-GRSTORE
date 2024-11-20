import { FastifyRequest, FastifyReply } from 'fastify';
import { ListProductService } from '../services/ListProductCustomerService';

class ListProductController {
  async listAll(request: FastifyRequest, reply: FastifyReply) {
    const listProductService = new ListProductService();

    try {
      const products = await listProductService.listAll();
      reply.status(200).send(products);
    } catch (error: any) {
      reply.status(500).send({
        error: true,
        message: error.message || "Erro ao listar produtos.",
      });
    }
  }

  async getById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const listProductService = new ListProductService();

    try {
      const product = await listProductService.getById(id);
      reply.status(200).send(product);
    } catch (error: any) {
      reply.status(404).send({
        error: true,
        message: error.message || "Produto não encontrado.",
      });
    }
  }
}

export { ListProductController };
