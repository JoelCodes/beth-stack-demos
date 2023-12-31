import Elysia, { t } from "elysia";
import { PrismaClient, Todos } from "@prisma/client";

// Data Layer
const client = new PrismaClient();


let todoIndex = 3;

// Views
function TodoLi({todo}:{todo: Todos}){

  return <li class="task bg-gray-200 p-3 rounded-md shadow mb-2 flex items-center justify-between" hx-target='closest li' hx-swap='outerHTML'>
  <span class="task-content text-gray-700">{todo.title}</span>
  <div class="task-actions">
      <input type="checkbox" checked={todo.done} hx-post={`/api/todos/${todo.id}/toggle`} class="mr-2 text-blue-500 hover:text-blue-600"/>

      <button hx-delete={`/api/todos/${todo.id}`} class="delete-task text-red-500 hover:text-red-600">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
  </div>
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
  