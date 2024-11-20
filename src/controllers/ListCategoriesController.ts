import { FastifyRequest, FastifyReply } from 'fastify';
import prismaClient from '../prisma';

class ListCategoriesController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const categories = await prismaClient.category.findMany();
      return reply.status(200).send(categories);
    } catch (error: any) {
      return reply.status(500).send({
        error: true,
        message: error.message || "Erro ao listar categorias.",
      });
    }
  }
}

export { ListCategoriesController };
