import Elysia, { t } from "elysia";

// Adds support for hyperscript
declare global {
  namespace JSX {
    interface HtmlTag {
      _?:string;
    }
  }
}

type Todo = {
  title: string;
  id: number;
  completed: boolean;
}

// Data Layer
const todos: Todo[] = [
  { id: 1, title: 'Learn React', completed: false },
  { id: 2, title: 'Learn Elysia', completed: false },
  { id: 3, title: 'Learn TypeScript', completed: false },
];

let todoIndex = 3;

// Views
function TodoLi({todo}:{todo: Todo}){
  return <li data-todo-id={todo.id} hx-target='closest li'>
    {todo.title}
    <input type='checkbox' checked={todo.completed} hx-post={`/api/todos/${todo.id}/toggle`} hx-swap='swap'/>
    <button hx-delete={`/api/todos/${todo.id}`} hx-swap='outerHTML'>Delete</button>
  </li>
}

function DeleteTodoLi({todoId}:{todoId: number|string}){
  return <li _='init wait 1s then remove me' data-todo-id={todoId}>Deleted</li>
}

// Controller
export const todoController = new Elysia({prefix: '/api/todos'})
  // Get Todos
  .get('/', () => <>{todos.map(todo => <TodoLi todo={todo}/>)}</>)
  // Create Todo
  .post('/', ({body: {title}}) => {
    const todo = {id: ++todoIndex, title, completed: false};
    todos.push(todo);
    return <TodoLi todo={todo}/>
  }, {
    body: t.Object({
      title: t.String()
    })
  })
  // Get Todo By Id
  .get('/:id', ({params: {id}}) => {
    const todo = todos.find(todo => todo.id === Number(id));
    if(!todo) throw new Error('Not Found');
    return <TodoLi todo={todo}/>
  })
  // Toggle Todo By Id
  .post('/:id/toggle', ({params: {id}}) => {
    const todo = todos.find(todo => todo.id === Number(id));
    if(!todo) throw new Error('Not Found');
    todo.completed = !todo.completed;
    return <TodoLi todo={todo}/>
  })
  // Delete Todo By Id
  .delete('/:id', ({params: {id}, set}) => {
    const index = todos.findIndex(todo => todo.id === Number(id));
    if(index === -1) throw new Error('Not Found');
    set.headers['HX-Trigger'] = JSON.stringify({ 'todo-deleted': id });
    todos.splice(index, 1);
    return <DeleteTodoLi todoId={id}/>;
  });
  