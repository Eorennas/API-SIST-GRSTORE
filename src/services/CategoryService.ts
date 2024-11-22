import { CreateCategoryProps, UpdateCategoryProps } from "../utils/interfaces";
import prismaClient from "../prisma";


class CategoryService {
    async save({ name, description }: CreateCategoryProps) {
        if (!name || !description) {
            throw new Error("Preencha todos os campos obrigatórios.");
        }

        const existingCategory = await prismaClient.category.findFirst({
            where: { name },
        });

        if (existingCategory) {
            throw new Error("Categoria já cadastrada.");
        }

        const category = await prismaClient.category.create({
            data: {
                name,
                description,
            },
        });

        return category;
    }

    async list() {
        const categories = await prismaClient.category.findMany();
        return categories;
    }

    async get(id: string) {
        const category = await prismaClient.category.findUnique({
            where: { id },
        });

        if (!category) {
            throw new Error("Categoria não encontrada.");
        }

        return category;
    }

    async update({ id, name, description }: UpdateCategoryProps) {
        const category = await prismaClient.category.findUnique({
            where: { id },
        });

        if (!category) {
            throw new Error("Categoria não encontrada.");
        }

        const updatedCategory = await prismaClient.category.update({
            where: { id },
            data: {
                name,
                description,
            },
        });

        return updatedCategory;
    }

    async delete(id: string) {
        const category = await prismaClient.category.findUnique({
            where: { id },
        });

        if (!category) {
            throw new Error("Categoria não encontrada.");
        }

        const deletedCategory = await prismaClient.category.delete({
            where: { id },
        });

        return deletedCategory;
    }
}

export { CategoryService };
