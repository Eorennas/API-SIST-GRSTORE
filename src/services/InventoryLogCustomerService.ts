import { InventoryLogProps } from "../utils/interfaces";
import prismaClient from "../prisma";

class InventoryLogService {
  async save({ product_id, change_type, quantity, note }: InventoryLogProps) {
    // Verifica se o produto existe
    const product = await prismaClient.product.findUnique({
      where: { id: product_id },
    });

    if (!product) {
      throw new Error(`Produto com ID ${product_id} não encontrado.`);
    }

    // Cria o log no banco de dados
    const inventoryLog = await prismaClient.inventoryLog.create({
      data: {
        product_id,
        change_type,
        quantity,
        note,
      },
    });

    return inventoryLog;
  }

  // Lista todos os logs
  async listAll() {
    const logs = await prismaClient.inventoryLog.findMany({
      include: {
        product: true, // Inclui os detalhes do produto no log
      },
    });

    return logs;
  }
}

export { InventoryLogService };
