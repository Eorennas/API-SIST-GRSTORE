import fastify from "fastify";
import prismaClient from "../prisma";
import bcrypt from "bcrypt";
import jwt from '@fastify/jwt';



interface LoginCustomerProps {
    email: string;
    password: string;
}

class LoginCustomerService {
    async execute({ email, password }: LoginCustomerProps,  fastifyInstance: ReturnType<typeof fastify>) {
        // Verifica se o cliente existe
        const customer = await prismaClient.customer.findUnique({
            where: { email },
        });

        if (!customer) {
            return "Credencial invalida!"
        }

        // Verifica a senha
        const passwordMatch = await bcrypt.compare(password, customer.password);

        if (!passwordMatch) {
            return "Credencial invalida!"
        }

        // Opcional: Geração de um token JWT para autenticação
        const token = fastifyInstance.jwt.sign(customer, { expiresIn: '4h' });
        
        return {
            message: "Login realizado com sucesso.",
            token, // Descomente para retornar o token, se estiver usando JWT
            customer,
        };
    }
}

export { LoginCustomerService };
