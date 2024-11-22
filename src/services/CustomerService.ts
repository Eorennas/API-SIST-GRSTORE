import { CreateCustomerProps, UpdateCustomerProps } from "../utils/interfaces";
import prismaClient from "../prisma";
import bcrypt from "bcrypt";


class CustomerService {
  async save({ name, email, password, cpf, cellphone }: CreateCustomerProps) {
    if (!name || !email || !password || !cpf || !cellphone) {
      throw new Error("Preencha todos os campos.");
    }

    if (password.length <= 5) {
      throw new Error("A senha deve ter mais de 5 caracteres.");
    }

    const existingCustomer = await prismaClient.customer.findFirst({
      where: { OR: [{ email }, { cpf }] },
    });

    if (existingCustomer) {
      throw new Error("E-mail ou CPF já cadastrado.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = await prismaClient.customer.create({
      data: {
        name,
        email,
        password: hashedPassword,
        cpf,
        cellphone,
        status: true,
      },
    });

    return customer;
  }

  async list() {
    const customers = await prismaClient.customer.findMany({
      include: {
        addresses: true,
      },
    });
    return customers;
  }

  async update({
    id,
    name,
    email,
    password,
    cpf,
    cellphone,
    status,
  }: UpdateCustomerProps) {
    const existingCustomer = await prismaClient.customer.findUnique({
      where: { id },
    });

    if (!existingCustomer) {
      throw new Error("Cliente não encontrado.");
    }

    if (email || cpf) {
      const duplicateCustomer = await prismaClient.customer.findFirst({
        where: {
          OR: [
            { email: email || undefined },
            { cpf: cpf || undefined },
          ],
          NOT: { id },
        },
      });

      if (duplicateCustomer) {
        throw new Error("E-mail ou CPF já estão em uso.");
      }
    }

    let hashedPassword = undefined;
    if (password) {
      if (password.length <= 5) {
        throw new Error("A senha deve ter mais de 5 caracteres.");
      }
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedCustomer = await prismaClient.customer.update({
      where: { id },
      data: {
        name,
        email,
        password: hashedPassword,
        cpf,
        cellphone,
        status,
      },
    });

    return updatedCustomer;
  }

  async delete(id: string) {
    if (!id) {
      throw new Error("Solicitação inválida.");
    }

    const findCustomer = await prismaClient.customer.findFirst({
      where: {
        id: id,
      },
    });

    if (!findCustomer) {
      throw new Error("Cliente não existe.");
    }

    await prismaClient.customer.delete({
      where: {
        id: findCustomer.id,
      },
    });

    return { message: "Deletado com sucesso." };
  }

  async get(id: string) {
    const customer = await prismaClient.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      throw new Error("Cliente não encontrado.");
    }

    return customer;
  }
}

export { CustomerService };
