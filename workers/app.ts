import { Hono } from 'hono';
import {
  createContext,
  createRequestHandler,
  RouterContextProvider,
} from 'react-router';

const cloudflareContext = createContext<{
  env: Env;
  ctx: ExecutionContext;
}>();

const requestHandler = createRequestHandler(
  () => import('virtual:react-router/server-build') as any,
  import.meta.env.MODE,
);

const app = new Hono();

app.get('*', c => {
  const routerContext = new RouterContextProvider();
  routerContext.set(cloudflareContext, { env: c.env as Env, ctx: c.executionCtx as ExecutionContext<unknown> });
  return requestHandler(c.req.raw, routerContext);
});

export default app;
