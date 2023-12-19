import { html } from "@elysiajs/html";
import { Elysia } from "elysia";
import { todoController } from "./controllers/todos";

const app = new Elysia()
  .use(html())
  .get('/', () => Bun.file('pages/index.html'))
  .get('/todos', () => Bun.file('pages/todos.html'))
  .use(todoController)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
