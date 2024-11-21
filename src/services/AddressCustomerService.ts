import prismaClient from "../prisma";

interface CreateAddressProps {
  customer_id: string;
  street: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  is_default?: boolean;
}

class AddressService {
  // Criar um novo endereço
  async createAddress({
    customer_id,
    street,
    number,
    complement,
    city,
    state,
    zip_code,
    country,
    is_default = false,
  }: CreateAddressProps) {
    // Verifica se o cliente existe
    const customer = await prismaClient.customer.findUnique({
      where: { id: customer_id },
    });

    if (!customer) {
      throw new Error("Cliente não encontrado.");
    }

    // Se o novo endereço for padrão, atualiza os outros para não serem padrão
    if (is_default) {
      await prismaClient.address.updateMany({
        where: {
          customer_id,
          is_default: true,
        },
        data: {
          is_default: false,
        },
      });
    }

    // Cria o novo endereço
    const address = await prismaClient.address.create({
      data: {
        customer_id,
        street,
        number,
        complement,
        city,
        state,
        zip_code,
        country,
        is_default,
      },
    });

    return address;
  }

  // Listar endereços de um cliente
  async listAddresses(customer_id: string) {
    const addresses = await prismaClient.address.findMany({
      where: { customer_id },
    });

    if (addresses.length === 0) {
      throw new Error("Nenhum endereço encontrado para este cliente.");
    }

    return addresses;
  }

  // Buscar um endereço específico
  async getAddress(id: string) {
    const address = await prismaClient.address.findUnique({
      where: { id },
    });

    if (!address) {
      throw new Error("Endereço não encontrado.");
    }

    return address;
  }

  // Atualizar um endereço existente
  async updateAddress(
    id: string,
    data: Partial<CreateAddressProps>
  ) {
    const address = await prismaClient.address.update({
      where: { id },
      data,
    });

    return address;
  }

  // Deletar um endereço
  async deleteAddress(id: string) {
    const address = await prismaClient.address.delete({
      where: { id },
    });

    return address;
  }
}

export { AddressService };
