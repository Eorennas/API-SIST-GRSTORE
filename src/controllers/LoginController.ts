import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import { LoginService } from '../services/LoginService';
import { app } from '../server';

class LoginController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { email, password } = request.body as {
            email: string;
            password: string;
        };

        const loginCustomerService = new LoginService();
        const result = await loginCustomerService.execute({ email, password }, app);

        reply.send(result);
    }
}

export { LoginController };
