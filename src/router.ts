import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';
import { CreateCustomerController } from './controllers/CreateCustomerController';
import { ListCustomerController } from './controllers/ListCustomerController';
import { DeleteCustomerController } from './controllers/DeleteCustomerController';
import { LoginCustomerController } from './controllers/LoginCustomerController';
import { CategoryCustomerController } from './controllers/CategoryCustomerController';
import { ListCategoriesController } from './controllers/ListCategoriesController';
import { GetCategoryController } from './controllers/GetCategoryController';

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  // Rota para login
  fastify.post("/login", async (request: FastifyRequest, reply: FastifyReply) => {
    return new LoginCustomerController().handle(request, reply);
  });

  // Rota para criar cliente
  fastify.post("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateCustomerController().handle(request, reply);
  });

  // Rota para listar clientes (autenticada)
  fastify.get("/customers", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new ListCustomerController().handle(request, reply);
  });

  // Rota para deletar cliente (autenticada)
  fastify.delete("/customer", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new DeleteCustomerController().handle(request, reply);
  });

  // Rota para criar categoria
  fastify.post("/categories",{ preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new CategoryCustomerController().handle(request, reply);
  });

  // Rota para listar todas as categorias
  fastify.get("/categories", { preHandler: [fastify.authenticate] },async (request: FastifyRequest, reply: FastifyReply) => {
    return new ListCategoriesController().handle(request, reply);
  });

  // Rota para obter uma única categoria pelo ID
  fastify.get("/categories/:id",{ preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new GetCategoryController().handle(request, reply);
  });
}
