export function TodosPage(){

  return (<html>
  <head>
      <title>Todo List App</title>
      <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <script src="https://unpkg.com/htmx.org@1.9.9" integrity="sha384-QFjmbokDn2DjBjq+fM+8LUIVrAgqcNW2s0PjAxHETgRn9l4fvX31ZxDxvwQnyMOX" crossorigin="anonymous"></script>
        <script src="https://unpkg.com/hyperscript.org@0.9.12"></script>
        <link rel="stylesheet" href="/public/styles.css"/>
  </head>
  <body class="bg-gray-100 font-sans h-screen flex justify-center items-center">
      <div class="container max-w-sm mx-auto p-4 bg-white rounded shadow-md">
          <h1 class="text-lg font-bold text-center text-gray-700 mb-4">Todo List</h1>
          <div class="add-task flex mb-4">
            <form hx-post="/api/todos" hx-trigger="submit" hx-target="#todo-list" hx-swap="beforeend">
              <input type="text" name='title' placeholder="Add a new task..." class="flex-1 p-2 border border-gray-300 rounded-l"/>
              <button class="bg-green-500 hover:bg-green-600 text-white p-2 rounded-r">Add</button>
            </form>
          </div>
          <ul class="task-list list-none p-0" hx-get="/api/todos" hx-trigger="load" id="todo-list">
          </ul>
      </div>
  </body>
  </html>)

}