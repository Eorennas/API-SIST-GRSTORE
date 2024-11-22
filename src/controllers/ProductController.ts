import { FastifyRequest, FastifyReply } from 'fastify';
import { ProductService } from '../services/ProductService';

class ProductController {
    async create(request: FastifyRequest, reply: FastifyReply) {
        const { name, description, price, categoryId, brand, stock, min_stock, images } = request.body as {
            name: string;
            description: string;
            price: number;
            categoryId: string;
            brand: string;
            stock: number;
            min_stock: number;
            images: string[];
        };

        const productService = new ProductService();

        try {
            const product = await productService.create({
                name,
                description,
                price,
                categoryId,
                brand,
                stock,
                min_stock,
                images,
            });
            reply.status(201).send(product);
        } catch (error: any) {
            reply.status(400).send({ error: true, message: error.message });
        }
    }

    async list(request: FastifyRequest, reply: FastifyReply) {
        const productService = new ProductService();

        try {
            const products = await productService.list();
            reply.status(200).send(products);
        } catch (error: any) {
            reply.status(400).send({ error: true, message: error.message });
        }
    }

    async get(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const productService = new ProductService();

        try {
            const product = await productService.get(id);
            reply.status(200).send(product);
        } catch (error: any) {
            reply.status(400).send({ error: true, message: error.message });
        }
    }

    async update(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const { name, description, price, category, brand, stock, min_stock, images } = request.body as {
            name?: string;
            description?: string;
            price?: number;
            category?: string;
            brand?: string;
            stock?: number;
            min_stock?: number;
            images?: string[];
        };

        const productService = new ProductService();

        try {
            const updatedProduct = await productService.update({
                id,
                name,
                description,
                price,
                category,
                brand,
                stock,
                min_stock,
                images,
            });
            reply.status(200).send({
                message: "Produto atualizado com sucesso.",
                updatedProduct,
            });
        } catch (error: any) {
            reply.status(400).send({ error: true, message: error.message });
        }
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const productService = new ProductService();

        try {
            await productService.delete(id);
            reply.status(200).send({ message: "Produto excluído com sucesso." });
        } catch (error: any) {
            reply.status(400).send({ error: true, message: error.message });
        }
    }
}

export { ProductController };
