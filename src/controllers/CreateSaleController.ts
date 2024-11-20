import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateSaleService } from '../services/CreateSaleService';

class CreateSaleController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
      const { user_id, products, payment_status, shipment_status } = request.body as {
        user_id: string;
        products: Array<{
          product_id: string;
          quantity: number;
          price: number;
        }>;
        payment_status: string;
        shipment_status: string;
      };
  
      console.log("Requisição recebida:", { user_id, products, payment_status, shipment_status });
  
      const createSaleService = new CreateSaleService();
  
      try {
        const sale = await createSaleService.execute({
          user_id,
          products,
          payment_status,
          shipment_status,
        });
  
        reply.status(201).send({
          message: "Venda registrada com sucesso.",
          sale,
        });
      } catch (error: any) {
        console.error("Erro ao registrar venda:", error.message);
  
        reply.status(400).send({
          error: true,
          message: error.message || "Erro ao registrar venda.",
        });
      }
    }
  }
  
  export { CreateSaleController };
  