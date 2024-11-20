import { FastifyRequest, FastifyReply } from 'fastify';
import prismaClient from '../prisma';

class GetCategoryController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    try {
      const category = await prismaClient.category.findUnique({
        where: { id },
      });

      if (!category) {
        return reply.status(404).send({
          error: true,
          message: "Categoria não encontrada.",
        });
      }

      return reply.status(200).send(category);
    } catch (error: any) {
      return reply.status(500).send({
        error: true,
        message: error.message || "Erro ao obter categoria.",
      });
    }
  }
}

export { GetCategoryController };
