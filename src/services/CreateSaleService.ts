import prismaClient from "../prisma";

interface ProductInSale {
  product_id: string;
  quantity: number;
  price: number;
}

interface CreateSaleProps {
  user_id: string;
  products: ProductInSale[];
  payment_status: string;
  shipment_status: string;
}

class CreateSaleService {
  async execute({ user_id, products, payment_status, shipment_status }: CreateSaleProps) {
    // Verificar se o cliente existe
    const userExists = await prismaClient.customer.findUnique({
      where: { id: user_id },
    });

    if (!userExists) {
      throw new Error("Cliente não encontrado.");
    }

    let total_price = 0;

    // Validar produtos e calcular o total
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

      // Atualizar estoque do produto
      await prismaClient.product.update({
        where: { id: item.product_id },
        data: {
          stock: product.stock - item.quantity,
        },
      });

      total_price += item.quantity * item.price;
    }

    // Registrar a venda
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
      },
    });

    return sale;
  }
}

export { CreateSaleService };
