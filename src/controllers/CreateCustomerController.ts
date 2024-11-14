import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateCustomerService } from '../services/CreateCustomerService';

class CreateCustomerController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { name, email, password, cpf, cellphone } = request.body as {
            name: string;
            email: string;
            password: string;
            cpf: string;
            cellphone: string;
        };

        const createCustomerService = new CreateCustomerService();
        const customer = await createCustomerService.execute({ name, email, password, cpf, cellphone });

        reply.send(customer);
    }
}

export { CreateCustomerController };
