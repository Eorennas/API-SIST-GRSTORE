import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateProductService } from '../services/ProductCustomerService';

class CreateProductController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, description, price, category, brand, stock, min_stock, images } = request.body as {
      name: string;
      description: string;
      price: number;
      category: string;
      brand: string;
      stock: number;
      min_stock: number;
      images: string[];
    };

    const createProductService = new CreateProductService();

    try {
      // Executar o serviço de criação de produto
      const product = await createProductService.execute({
        name,
        description,
        price,
        category,
        brand,
        stock,
        min_stock,
        images,
      });

      // Retornar o produto criado
      reply.status(201).send({
        message: "Produto criado com sucesso.",
        product,
      });
    } catch (error: any) {
      // Tratar erros e retornar resposta apropriada
      reply.status(400).send({
        error: true,
        message: error.message || "Erro ao criar produto.",
      });
    }
  }
}

export { CreateProductController };
