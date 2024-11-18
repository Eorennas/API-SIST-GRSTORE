import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import { LoginCustomerService } from '../services/LoginCustomerService';
import { app } from '../server';

class LoginCustomerController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { email, password } = request.body as {
            email: string;
            password: string;
        };

        const loginCustomerService = new LoginCustomerService();
        const result = await loginCustomerService.execute({ email, password }, app);

        reply.send(result);
    }
}

export { LoginCustomerController };
