import { FastifyRequest, FastifyReply } from 'fastify';
import { CategoryCustomerService } from '../services/CategoryCustomerService';

class CategoryCustomerController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { name, description } = request.body as {
            name: string;
            description: string;
        };

        const categoryCustomerService = new CategoryCustomerService();

        try {
            // Executar o serviço para criar a categoria
            const category = await categoryCustomerService.execute({ name, description });

            // Retornar a categoria criada
            reply.status(201).send({
                message: "Categoria criada com sucesso.",
                category,
            });
        } catch (error: any) {
            // Tratar erros e retornar resposta apropriada
            reply.status(400).send({
                error: true,
                message: error.message || "Erro ao criar categoria.",
            });
        }
    }
}

export { CategoryCustomerController };
