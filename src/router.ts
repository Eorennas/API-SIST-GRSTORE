import { FastifyInstance, FastifyPluginOptions,FastifyRequest, FastifyReply } from 'fastify';
import { CreateCustomerController } from './controllers/CreateCustomerController';
import { ListCustomerController } from './controllers/ListCustomerController'
import {DeleteCustomerController} from './controllers/DeleteCustomerController'
import { LoginCustomerController } from './controllers/LoginCustomerController';


export async function  routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.post("/login", async (request: FastifyRequest, reply: FastifyReply) =>{
      return new LoginCustomerController().handle(request, reply)  
    })

    fastify.post("/customer", async(request: FastifyRequest, reply: FastifyReply) => {
        return new CreateCustomerController().handle(request, reply)

    })

    fastify.get("/customers", { preHandler: [fastify.authenticate] }, async(request: FastifyRequest, reply: FastifyReply) => {
      return new ListCustomerController().handle(request, reply)

  })

  fastify.delete("/customer", { preHandler: [fastify.authenticate] },async(request: FastifyRequest, reply: FastifyReply) => {
    return new DeleteCustomerController().handle(request, reply)

})
}