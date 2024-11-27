import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';
import { CustomerController } from './controllers/CustomerController';
import { LoginController } from './controllers/LoginController';
import { InventoryLogController } from './controllers/InventoryLogController';
import { CategoryController } from './controllers/CategoryController'
import { AddressController } from './controllers/AddressController';
import { ProductController } from './controllers/ProductController';
import { SaleController } from './controllers/SaleController';

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

   //LOGIN
  fastify.post("/login", async (request: FastifyRequest, reply: FastifyReply) => {
    return new LoginController().handle(request, reply);
  });

   //CUSTOMERS
  fastify.post("/customers", async (request: FastifyRequest, reply: FastifyReply) => {
    return new CustomerController().save(request, reply);
  });
  fastify.put("/customers", { preHandler: [fastify.authenticate] } ,async (request: FastifyRequest, reply: FastifyReply) => {
    return new CustomerController().update(request, reply);
  });
  fastify.get("/customers", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new CustomerController().list(request, reply);
  });
  fastify.delete("/customers/:id", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new CustomerController().delete(request, reply);
  });
  fastify.get("/customers/:id/sales", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new SaleController().listByClient(request, reply);
  });


  //ADDRESS
  fastify.post("/address", async (request: FastifyRequest, reply: FastifyReply) => {
    return new AddressController().create(request, reply);
  });
  fastify.put("/address",{ preHandler: [fastify.authenticate] } ,async (request: FastifyRequest, reply: FastifyReply) => {
    return new AddressController().update(request, reply);
  });
  fastify.get("/address", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new AddressController().list(request, reply);
  });
  fastify.delete("/address/:id", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new AddressController().delete(request, reply);
  });


   //CATEGORY
  fastify.post("/categories", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new CategoryController().create(request, reply);
  });
  fastify.put("/categories", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new CategoryController().update(request, reply);
  });
  fastify.get("/categories", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new CategoryController().list(request, reply);
  });
  fastify.get("/categories/:id", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new CategoryController().get(request, reply);
  });

  //PRODUCT
  fastify.post("/products", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new ProductController().create(request, reply);
  });
  fastify.put("/products", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new ProductController().update(request, reply);
  });
  fastify.get("/products", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new ProductController().list(request, reply);
  });
  fastify.get("/products/:id", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new ProductController().get(request, reply);
  });
  fastify.get("/products/category/:id", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new ProductController().getByCategory(request, reply);
  });
  

   //SALES
  fastify.post("/sales", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new SaleController().create(request, reply);
  });
  fastify.put("/sales", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new SaleController().update(request, reply);
  });
  fastify.get("/sales", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new SaleController().list(request, reply);
  });
  fastify.get("/sales/:id", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new SaleController().getById(request, reply);
  });

   //LOGS
  fastify.get("/inventory-logs", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new InventoryLogController().createLog(request, reply);
  });
}
