import { FastifyRequest, FastifyReply } from 'fastify';
import { LoginCustomerService } from '../services/LoginCustomerService';

class LoginCustomerController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { email, password } = request.body as {
            email: string;
            password: string;
        };

        const loginCustomerService = new LoginCustomerService();
        const result = await loginCustomerService.execute({ email, password });

        reply.send(result);
    }
}

export { LoginCustomerController };
