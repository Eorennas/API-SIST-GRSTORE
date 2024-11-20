import prismaClient from "../prisma";

interface CreateProductProps {
  name: string;
  description: string;
  price: number;
  category: string; // Nome da categoria associada
  brand: string;
  stock: number;
  min_stock: number;
  images: string[];
}

class CreateProductService {
  async execute({
    name,
    description,
    price,
    category,
    brand,
    stock,
    min_stock,
    images,
  }: CreateProductProps) {
    // Verifica se os campos obrigatórios foram preenchidos
    if (!name || !description || !price || !category || !brand || !stock || !min_stock) {
      throw new Error("Preencha todos os campos obrigatórios.");
    }

    // Verifica se a categoria existe
    const categoryRecord = await prismaClient.category.findUnique({
        where: { name: category }, // Agora funciona porque `name` é único.
      });

    if (!categoryRecord) {
      throw new Error("Categoria não encontrada.");
    }

    // Cria o produto
    const product = await prismaClient.product.create({
      data: {
        name,
        description,
        price,
        category: categoryRecord.name, // Associa o nome da categoria
        brand,
        stock,
        min_stock,
        images,
      },
    });

    return product;
  }
}

export { CreateProductService };
