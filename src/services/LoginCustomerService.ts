import prismaClient from "../prisma";
import bcrypt from "bcrypt";

interface LoginCustomerProps {
    email: string;
    password: string;
}

class LoginCustomerService {
    async execute({ email, password }: LoginCustomerProps) {
        // Verifica se o cliente existe
        const customer = await prismaClient.customer.findUnique({
            where: { email },
        });

        if (!customer) {
            throw new Error("Credenciais inválidas.");
        }

        // Verifica a senha
        const passwordMatch = await bcrypt.compare(password, customer.password);

        if (!passwordMatch) {
            throw new Error("Credenciais inválidas.");
        }

        // Opcional: Geração de um token JWT para autenticação
        // const token = jwt.sign({ id: customer.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        
        return {
            message: "Login realizado com sucesso.",
            // token, // Descomente para retornar o token, se estiver usando JWT
            customer,
        };
    }
}

export { LoginCustomerService };
