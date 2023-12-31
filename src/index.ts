import { html } from "@elysiajs/html";
import { Elysia } from "elysia";
import { todoController } from "./controllers/todos";
import { tailwind } from "elysia-tailwind";
import { CheckersPage } from "./pages/checkers";
import { TodosPage } from "./pages/todos";

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
  .get('/todos', TodosPage)
  .use(todoController)
  .get('/checkers', CheckersPage)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
