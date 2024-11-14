import Fastify from 'fastify';
import cors from '@fastify/cors';
import { routes } from './router';

const app = Fastify({ logger: true });

// Configuração de CORS
app.register(cors, {
    origin: true, // Permite todas as origens; ajuste conforme necessário
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Especifica métodos permitidos
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
