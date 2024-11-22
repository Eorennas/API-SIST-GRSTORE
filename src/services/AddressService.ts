import { CreateAddressProps } from "../utils/interfaces";
import prismaClient from "../prisma";
import { ObjectId } from "mongodb";


class AddressService {
  async createAddress({
    user_id,
    street,
    number,
    complement,
    city,
    state,
    zip_code,
    country,
    is_default = false,
  }: CreateAddressProps) {
    // Certifique-se de que o ID do cliente é válido
    if (!ObjectId.isValid(user_id)) {
      throw new Error("ID de usuário inválido.");
    }

    // Buscar cliente
    const customer = await prismaClient.customer.findUnique({
      where: { id: new ObjectId(user_id).toString() },
    });

    if (!customer) {
      throw new Error("Cliente não encontrado.");
    }

    // Atualizar endereços padrão
    if (is_default) {
      await prismaClient.address.updateMany({
        where: {
          user_id: new ObjectId(user_id).toString(),
          is_default: true,
        },
        data: {
          is_default: false,
        },
      });
    }

    // Criar endereço
    const address = await prismaClient.address.create({
      data: {
        user_id: new ObjectId(user_id).toString(),
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

  async listAddresses(user_id: string) {
    const addresses = await prismaClient.address.findMany({
      where: { user_id },
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
    const address = await prismaClient.address.update({
      where: { id },
      data: { is_deleted: true },
    });
    

    return address;
  }
}

export { AddressService };
