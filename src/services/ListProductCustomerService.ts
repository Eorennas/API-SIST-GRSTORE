import prismaClient from "../prisma";

class ListProductService {
  async listAll() {
    // Lista todos os produtos
    const products = await prismaClient.product.findMany();
    return products;
  }

  async getById(id: string) {
    // Busca um único produto pelo ID
    const product = await prismaClient.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new Error("Produto não encontrado.");
    }

    return product;
  }
}

export { ListProductService };
