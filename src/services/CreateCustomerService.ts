import prismaClient from "../prisma";
import bcrypt from "bcrypt";


interface CreateCustomerProps {
    name: string;
    email: string;
    password: string;
    cpf: string;
    cellphone: string;
}

class CreateCustomerService {
    async execute({ name, email, password, cpf, cellphone }: CreateCustomerProps) {
        // Verificação de campos obrigatórios
        if (!name || !email || !password || !cpf || !cellphone) {
            throw new Error("Preencha todos os campos.");
        }

        // Verificação do comprimento da senha
        if (password.length <= 5) {
            throw new Error("A senha deve ter mais de 5 caracteres.");
        }

        // Verificação de e-mail e CPF únicos
        const existingCustomer = await prismaClient.customer.findFirst({
            where: { OR: [{ email }, { cpf }] },
        });

        if (existingCustomer) {
            throw new Error("E-mail ou CPF já cadastrado.");
        }

        // Criptografar a senha antes de salvar
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criação do cliente
        const customer = await prismaClient.customer.create({
            data: {
                name,
                email,
                password: hashedPassword,
                cpf,
                cellphone,
                status: true,
            },
        });

        return customer;
    }
}

export { CreateCustomerService };
