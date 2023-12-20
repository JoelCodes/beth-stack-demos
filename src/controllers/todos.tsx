import Elysia, { t } from "elysia";
import { PrismaClient, Todos } from "@prisma/client";

// Data Layer
const client = new PrismaClient();


let todoIndex = 3;

// Views
function TodoLi({todo}:{todo: Todos}){
  return <li data-todo-id={todo.id} hx-target='closest li'>
    {todo.title}
    <input type='checkbox' checked={todo.done} hx-post={`/api/todos/${todo.id}/toggle`} hx-swap='swap'/>
    <button hx-delete={`/api/todos/${todo.id}`} hx-swap='outerHTML'>Delete</button>
  </li>
}

function DeleteTodoLi({todoId}:{todoId: number|string}){
  return <li _='init wait 1s then remove me' data-todo-id={todoId}>Deleted</li>
}

// Controller
export const todoController = new Elysia({prefix: '/api/todos'})
  // Get Todos
  .get('/', async () => {
    const todos = await client.todos.findMany();
    return <>{todos.map(todo => <TodoLi todo={todo}/>)}</>
  })
  // Create Todo
  .post('/', async ({body: {title}}) => {
    const todo = await client.todos.create({data: {title}});

    return <TodoLi todo={todo}/>
  }, {
    body: t.Object({
      title: t.String()
    })
  })
  // Get Todo By Id
  .get('/:id', async ({params: {id}}) => {
    const todo = await client.todos.findFirst({where: {id: Number(id)}});

    if(!todo) throw new Error('Not Found');
    return <TodoLi todo={todo}/>
  })
  // Toggle Todo By Id
  .post('/:id/toggle', async ({params: {id}}) => {
    const todo = await client.todos.findFirst({where: {id: Number(id)}});
    if(!todo) throw new Error('Not Found');
    const updatedTodo = await client.todos.update({where: {id: Number(id)}, data: {done: !todo.done}});
    return <TodoLi todo={updatedTodo}/>
  })
  // Delete Todo By Id
  .delete('/:id', async ({params: {id}, set}) => {
    const deleted = await client.todos.delete({where: {id: Number(id)}});
    if(!deleted) throw new Error('Not Found');

    set.headers['HX-Trigger'] = JSON.stringify({ 'todo-deleted': id });
    return <DeleteTodoLi todoId={id}/>;
  });
  