import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import cors from '@fastify/cors';
import { routes } from './router';
import jwt from '@fastify/jwt';



export const app = Fastify({ logger: true });
const secretKey = 'teste';

// Registrar o plugin JWT
app.register(jwt, {
    secret: 'teste', // Substitua pela sua chave secreta
  });
  
// Registra as rotas
app.register(routes);

// Manipulador global de erros
app.setErrorHandler((error, request, reply) => {
    app.log.error(error); // Loga o erro para depuração
    reply.status(error.statusCode || 400).send({
        error: true,
        message: error.message || 'Erro desconhecido',
    });
});

app.decorate(
    'authenticate',
    async function (
      this: FastifyInstance,
      request: FastifyRequest,
      reply: FastifyReply
    ) {
      try {
        await request.jwtVerify(); // Verifica o token JWT
      } catch (err) {
        reply.status(401).send({ message: 'Token inválido ou ausente' });
      }
    }
  );
// Função para iniciar o servidor
const start = async () => {
    try {
        await app.listen({ port: 3333, host: '0.0.0.0' });

        app.log.info('Servidor iniciado na porta 3333');
    } catch (err) {
        app.log.error('Erro ao iniciar o servidor:', err);
        process.exit(1);
    }
};

start();
