import { CreateProductProps, UpdateProductProps } from "../utils/interfaces";
import prismaClient from "../prisma";
import { InventoryLogService } from "./InventoryLogCustomerService";

class ProductService {
  async create({
    name,
    description,
    price,
    categoryId,
    brand,
    stock,
    min_stock,
    images,
  }: CreateProductProps) {
    if (!name || !description || !price || !categoryId || !brand || !stock || !min_stock) {
      throw new Error("Preencha todos os campos obrigatórios.");
    }

    const categoryRecord = await prismaClient.category.findUnique({
      where: { id: categoryId },
    });

    if (!categoryRecord) {
      throw new Error("Categoria não encontrada.");
    }

    const product = await prismaClient.product.create({
      data: {
        name,
        description,
        price,
        categoryId: categoryRecord.id,
        brand,
        stock,
        min_stock,
        images,
      },
    });

    if (product) {
      const inventoryLogService = new InventoryLogService();
      await inventoryLogService.save({
        product_id: product.id,
        change_type: "Entrada",
        quantity: stock,
        note: "Produto criado e inventário inicial inserido.",
      });
    }

    return product;
  }

  async list() {
    const products = await prismaClient.product.findMany();

    return products;
  }

  async get(id: string) {
    const product = await prismaClient.product.findUnique({
      where: { id }
    });

    if (!product) {
      throw new Error("Produto não encontrado.");
    }

    return product;
  }

  async update({
    id,
    name,
    description,
    price,
    categoryId,
    brand,
    stock,
    min_stock,
    images,
  }: UpdateProductProps) {
    const product = await prismaClient.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new Error("Produto não encontrado.");
    }

    if (categoryId) {
      const categoryRecord = await prismaClient.category.findUnique({
        where: { id: categoryId },
      });

      if (!categoryRecord) {
        throw new Error("Nova categoria não encontrada.");
      }
    }

    const updatedProduct = await prismaClient.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        categoryId,
        brand,
        stock,
        min_stock,
        images,
      },
    });

    if (stock !== undefined && stock !== product.stock) {
      const inventoryLogService = new InventoryLogService();
      const changeType = stock > product.stock ? "Entrada" : "Saída";
      const quantity = Math.abs(stock - product.stock);

      await inventoryLogService.save({
        product_id: id,
        change_type: changeType,
        quantity,
        note: "Ajuste no estoque durante a atualização do produto.",
      });
    }

    return updatedProduct;
  }

  async delete(id: string) {
    const product = await prismaClient.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new Error("Produto não encontrado.");
    }

    await prismaClient.product.delete({
      where: { id },
    });

    const inventoryLogService = new InventoryLogService();
    await inventoryLogService.save({
      product_id: id,
      change_type: "Saída",
      quantity: product.stock,
      note: "Produto excluído do inventário.",
    });

    return { message: "Produto excluído com sucesso." };
  }
}

export { ProductService };
