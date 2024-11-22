import { FastifyRequest, FastifyReply } from 'fastify';
import { SaleService } from '../services/SaleService';

class SaleController {
    async create(request: FastifyRequest, reply: FastifyReply) {
      const { user_id, products, payment_status, shipment_status, address_id } = request.body as {
        user_id: string;
        products: Array<{
          product_id: string;
          quantity: number;
          price: number;
        }>;
        payment_status: string;
        shipment_status: string;
        address_id:string
      };
  
      console.log("Requisição recebida:", { user_id, products, payment_status, shipment_status });
  
      const saleService = new SaleService();
  
      try {
        const sale = await saleService.createSale({
          user_id,
          products,
          payment_status,
          shipment_status,
          address_id
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

    async list(request: FastifyRequest, reply: FastifyReply){
      const saleService = new SaleService();
      try {
        const sales = await saleService.listSales();
        return reply.status(200).send(sales);
      } catch (error: any) {
        return reply.status(500).send({
          error: true,
          message: error.message || "Erro ao listar vendas.",
        });
      }
    }

    async listByClient(request: FastifyRequest, reply: FastifyReply){
      const { id } = request.params as { id: string };
      const saleService = new SaleService();
      try {
        const sales = await saleService.getSalesByClient(id);
        return reply.status(200).send(sales);
      } catch (error: any) {
        return reply.status(500).send({
          error: true,
          message: error.message || "Erro ao listar compras do cliente.",
        });
      }
    }
    async getById(request: FastifyRequest, reply: FastifyReply){
      const { id } = request.params as { id: string };
      const saleService = new SaleService();
      try {
        const sales = await saleService.getSaleById(id);
        return reply.status(200).send(sales);
      } catch (error: any) {
        return reply.status(500).send({
          error: true,
          message: error.message || "Erro ao listar compras do cliente.",
        });
      }
    }
    async update(request: FastifyRequest, reply: FastifyReply){
      const { id, user_id, products, payment_status, shipment_status } = request.body as {
        id: string
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
  
      const saleService = new SaleService();
  
      try {
        const sale = await saleService.updateSale({id, payment_status,
          shipment_status});
  
        reply.status(201).send({
          message: "Venda atualizada com sucesso.",
          sale,
        });
      } catch (error: any) {
        console.error("Erro ao registrar venda:", error.message);
  
        reply.status(400).send({
          error: true,
          message: error.message || "Erro ao atualizar venda.",
        });
      }
    }
  }
  
  export { SaleController };
  