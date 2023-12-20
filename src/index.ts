import { html } from "@elysiajs/html";
import { Elysia } from "elysia";
import { todoController } from "./controllers/todos";
import { tailwind } from "elysia-tailwind";

const app = new Elysia()
  .use(html())
  .use(tailwind({
    path: "/public/styles.css",
    source: "./src/styles.css",
    config: "./tailwind.config.js",
    options: {
      minify: true,
      map: true,
      autoprefixer: true,
    },
  }))
  .get('/', () => Bun.file('pages/index.html'))
  .get('/todos', () => Bun.file('pages/todos.html'))
  .use(todoController)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
