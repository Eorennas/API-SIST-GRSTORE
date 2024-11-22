import prismaClient from "../prisma";
import { CreateSaleProps, UpdateSaleProps } from "../utils/interfaces";
import { InventoryLogService } from "./InventoryLogCustomerService";


class SaleService {
  async createSale({
    user_id,
    products,
    payment_status,
    shipment_status,
    address_id
  }: CreateSaleProps) {
    const userExists = await prismaClient.customer.findUnique({
      where: { id: user_id },
    });

    if (!userExists) {
      throw new Error("Cliente não encontrado.");
    }

    let total_price = 0;
    const inventoryLogService = new InventoryLogService();

    for (const item of products) {
      const product = await prismaClient.product.findUnique({
        where: { id: item.product_id },
      });

      if (!product) {
        throw new Error(`Produto com ID ${item.product_id} não encontrado.`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`Estoque insuficiente para o produto: ${product.name}`);
      }

      await prismaClient.product.update({
        where: { id: item.product_id },
        data: {
          stock: product.stock - item.quantity,
        },
      });

      total_price += item.quantity * item.price;
    }

    const sale = await prismaClient.sale.create({
      data: {
        user_id,
        products: products.map((p) => ({
          product_id: p.product_id,
          quantity: p.quantity,
          price: p.price,
        })),
        total_price,
        payment_status,
        shipment_status,
        address_id,
      },
    });

    for (const item of products) {
      await inventoryLogService.save({
        product_id: item.product_id,
        change_type: "Saída",
        quantity: item.quantity,
        note: `Produto vendido. ID da venda: ${sale.id}`,
      });
    }

    return sale;
  }

  async listSales() {
    return await prismaClient.sale.findMany({ include: { products: true, address: true } });
  }

  async getSaleById(id: string) {
    return await prismaClient.sale.findUnique({ where: { id }, include: { products: true } });
  }

  async getSalesByClient(user_id: string) {
    return await prismaClient.sale.findMany({ where: { user_id }, include: { products: true } });
  }

  async updateSale({ id, payment_status, shipment_status }: UpdateSaleProps) {
    return await prismaClient.sale.update({
      where: { id },
      data: {
        payment_status,
        shipment_status,
      },
    });
  }

  async deleteSale(id: string) {
    return await prismaClient.sale.delete({ where: { id } });
  }
}

export { SaleService };
