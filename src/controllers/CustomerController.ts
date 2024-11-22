import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomerService } from '../services/CustomerService';

class CustomerController {
    async save(request: FastifyRequest, reply: FastifyReply) {
        const { name, email, password, cpf, cellphone } = request.body as {
            name: string;
            email: string;
            password: string;
            cpf: string;
            cellphone: string;
        };

        const customerService = new CustomerService();
        try {
            const customer = await customerService.save({ name, email, password, cpf, cellphone });
            reply.status(201).send(customer);
        } catch (error: any) {
            reply.status(400).send({ error: true, message: error.message });
        }
    }

    async update(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const { name, email, password, cpf, cellphone, status } = request.body as {
            name?: string;
            email?: string;
            password?: string;
            cpf?: string;
            cellphone?: string;
            status?: boolean;
        };

        const customerService = new CustomerService();

        try {
            const updatedCustomer = await customerService.update({
                id,
                name,
                email,
                password,
                cpf,
                cellphone,
                status,
            });
            reply.status(200).send({
                message: "Cliente atualizado com sucesso.",
                updatedCustomer,
            });
        } catch (error: any) {
            reply.status(400).send({ error: true, message: error.message });
        }
    }

    async list(request: FastifyRequest, reply: FastifyReply) {
        const customerService = new CustomerService();
        try {
            const customers = await customerService.list();
            reply.status(200).send(customers);
        } catch (error: any) {
            reply.status(400).send({ error: true, message: error.message });
        }
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const customerService = new CustomerService();

        try {
            await customerService.delete(id);
            reply.status(200).send({ message: "Cliente deletado com sucesso." });
        } catch (error: any) {
            reply.status(400).send({ error: true, message: error.message });
        }
    }

    async get(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const customerService = new CustomerService();

        try {
            const customer = await customerService.get(id);
            reply.status(200).send(customer);
        } catch (error: any) {
            reply.status(400).send({ error: true, message: error.message });
        }
    }
}

export { CustomerController };
