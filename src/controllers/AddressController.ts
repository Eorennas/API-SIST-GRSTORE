import { FastifyRequest, FastifyReply } from "fastify";
import { AddressService } from "../services/AddressService";

class AddressController {

  async create(request: FastifyRequest, reply: FastifyReply) {
    const {
      user_id,
      street,
      number,
      complement,
      city,
      state,
      zip_code,
      country,
      is_default,
    } = request.body as {
      user_id: string;
      street: string;
      number: string;
      complement?: string;
      city: string;
      state: string;
      zip_code: string;
      country: string;
      is_default?: boolean;
    };

    const addressService = new AddressService();

    try {
      const address = await addressService.createAddress({
        user_id,
        street,
        number,
        complement,
        city,
        state,
        zip_code,
        country,
        is_default,
      });

      reply.status(201).send({
        message: "Endereço criado com sucesso.",
        address,
      });
    } catch (error: any) {
      reply.status(400).send({
        error: true,
        message: error.message,
      });
    }
  }

  async list(request: FastifyRequest, reply: FastifyReply) {
    const { user_id } = request.query as { user_id: string };

    const addressService = new AddressService();

    try {
      const addresses = await addressService.listAddresses(user_id);

      reply.status(200).send(addresses);
    } catch (error: any) {
      reply.status(400).send({
        error: true,
        message: error.message,
      });
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const data = request.body as Partial<{
      user_id: string;
      street: string;
      number: string;
      complement: string;
      city: string;
      state: string;
      zip_code: string;
      country: string;
      is_default: boolean;
    }>;

    const addressService = new AddressService();

    try {
      const address = await addressService.updateAddress(id, data);

      reply.status(200).send({
        message: "Endereço atualizado com sucesso.",
        address,
      });
    } catch (error: any) {
      reply.status(400).send({
        error: true,
        message: error.message,
      });
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    const addressService = new AddressService();

    try {
      const address = await addressService.deleteAddress(id);

      reply.status(200).send({
        message: "Endereço deletado com sucesso.",
        address,
      });
    } catch (error: any) {
      reply.status(400).send({
        error: true,
        message: error.message,
      });
    }
  }
}

export { AddressController };
