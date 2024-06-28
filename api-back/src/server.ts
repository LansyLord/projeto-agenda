import 'dotenv/config';
import fastify, { FastifyInstance } from "fastify";
import registerCors from './corsConfig'; // Importação correta do CORS
import { userRoutes } from "./routes/user.routes";
import { contactRoutes } from './routes/contact.routes';

const app: FastifyInstance = fastify({ logger: true });

registerCors(app); // Registrar o CORS

app.register(userRoutes, {
    prefix: '/users',
});
app.register(contactRoutes, {
    prefix: '/contacts',
});

app.listen(
    {
        port: 3100,
    },
    () => console.log('Server is running on port 3100'),
);
