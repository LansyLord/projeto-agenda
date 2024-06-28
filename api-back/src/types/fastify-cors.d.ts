declare module 'fastify-cors' {
    import { FastifyPluginCallback } from 'fastify';
  
    interface FastifyCorsOptions {
      origin?: boolean | string | RegExp | (string | RegExp)[] | ((origin: string, cb: (err: Error | null, allow?: boolean) => void) => void);
      methods?: string[];
      allowedHeaders?: string[];
      exposedHeaders?: string[];
      credentials?: boolean;
      maxAge?: number;
      preflightContinue?: boolean;
      optionsSuccessStatus?: number;
      preflight?: boolean;
      hideOptionsRoute?: boolean;
    }
  
    const fastifyCors: FastifyPluginCallback<FastifyCorsOptions>;
    export default fastifyCors;
  }
  