import { FastifyInstance } from 'fastify';
import fastifyCors from 'fastify-cors';

function registerCors(fastify: FastifyInstance) {
  fastify.register(fastifyCors, {
    origin: true, // Permite todas as origens
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'email'],
  });
}

export default registerCors;
