import prismaClient from "../prisma";

interface CreateCategoryProps {
    name: string;
    description: string;
}

class CategoryCustomerService {
    async execute({ name, description }: CreateCategoryProps) {
        // Verificar se os campos obrigatórios foram preenchidos
        if (!name || !description) {
            throw new Error("Preencha todos os campos obrigatórios.");
        }

        // Verificar se a categoria já existe
        const existingCategory = await prismaClient.category.findFirst({
            where: { name },
        });

        if (existingCategory) {
            throw new Error("Categoria já cadastrada.");
        }

        // Criar a categoria no banco de dados
        const category = await prismaClient.category.create({
            data: {
                name,
                description,
            },
        });

        return category;
    }
}

export { CategoryCustomerService };
