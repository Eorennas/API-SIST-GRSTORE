import { FastifyRequest, FastifyReply } from 'fastify';
import { CategoryService } from '../services/CategoryService';

class CategoryController {
    async create(request: FastifyRequest, reply: FastifyReply) {
        const { name, description } = request.body as {
            name: string;
            description: string;
        };

        const categoryService = new CategoryService();

        try {
            const category = await categoryService.save({ name, description });

            reply.status(201).send({
                message: "Categoria criada com sucesso.",
                category,
            });
        } catch (error: any) {
            reply.status(400).send({
                error: true,
                message: error.message || "Erro ao criar categoria.",
            });
        }
    }

    async list(request: FastifyRequest, reply: FastifyReply) {
        const categoryService = new CategoryService();

        try {
            const categories = await categoryService.list();

            reply.status(200).send({
                message: "Categorias listadas com sucesso.",
                categories,
            });
        } catch (error: any) {
            reply.status(400).send({
                error: true,
                message: error.message || "Erro ao listar categorias.",
            });
        }
    }

    async get(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        const categoryService = new CategoryService();

        try {
            const category = await categoryService.get(id);

            reply.status(200).send({
                message: "Categoria encontrada com sucesso.",
                category,
            });
        } catch (error: any) {
            reply.status(400).send({
                error: true,
                message: error.message || "Erro ao buscar categoria.",
            });
        }
    }

    async update(request: FastifyRequest, reply: FastifyReply) {
        const { id, name, description } = request.body as {
            id: string;
            name: string;
            description: string;
        };

        const categoryService = new CategoryService();

        try {
            const category = await categoryService.update({ id, name, description });

            reply.status(200).send({
                message: "Categoria atualizada com sucesso.",
                category,
            });
        } catch (error: any) {
            reply.status(400).send({
                error: true,
                message: error.message || "Erro ao atualizar categoria.",
            });
        }
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        const categoryService = new CategoryService();

        try {
            const category = await categoryService.delete(id);

            reply.status(200).send({
                message: "Categoria deletada com sucesso.",
                category,
            });
        } catch (error: any) {
            reply.status(400).send({
                error: true,
                message: error.message || "Erro ao deletar categoria.",
            });
        }
    }
}

export { CategoryController };
