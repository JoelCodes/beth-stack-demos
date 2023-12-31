export function CheckersPage(){
  return <html lang="en" class="h-full bg-gray-100">
    <head>
      <title>Checkers</title>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <script src="https://unpkg.com/htmx.org@1.9.9" integrity="sha384-QFjmbokDn2DjBjq+fM+8LUIVrAgqcNW2s0PjAxHETgRn9l4fvX31ZxDxvwQnyMOX" crossorigin="anonymous"></script>
      <script src="https://unpkg.com/hyperscript.org@0.9.12"></script>
      <link rel="stylesheet" href="/public/styles.css"/>
    </head>
    <body class="h-full">
      <div class="h-full flex flex-col">
        <header class="bg-gray-800 text-white text-2xl p-4">
          Checkers
        </header>
        <main class="flex-1 flex">
          <div class="flex-1 flex flex-col items-center justify-center">
            <div class="w-96 h-96 bg-gray-100 border-2 border-gray-800 grid grid-cols-8 grid-rows-8">
              <div class="bg-gray-800 col-start-1 col-end-9 row-start-1 row-end-9"></div>
              <div class="bg-gray-800 col-start-1 col-end-9 row-start-1 row-end-9"></div>
              <div class="bg-gray-800 col-start-1 col-end-9 row-start-1 row-end-9"></div>
              <div class="bg-gray-800 col-start-1 col-end-9 row-start-1 row-end-9"></div>
              <div class="bg-gray-800 col-start-1 col-end-9 row-start-1 row-end-9"></div>
              <div class="bg-gray-800 col-start-1 col-end-9 row-start-1 row-end-9"></div>
              <div class="bg-gray-800 col-start-1 col-end-9 row-start-1 row-end-9"></div>
              <div class="bg-gray-800 col-start-1 col-end-9 row-start-1 row-end-9"></div>
            </div>
          </div>
          <div class="flex-1 flex flex-col items-center justify-center">
            <div class="w-96 h-96 bg-gray-100 border-2 border-gray-800 grid grid-cols-8 grid-rows-8">
              <div class="bg-gray-800 col-start-1 col-end-9 row-start-1 row-end-9"></div>
              <div class="bg-gray-800 col-start-1 col-end-9 row-start-1 row-end-9"></div>
            </div>
          </div>
        </main>
        <footer class="bg-gray-800 text-white text-2xl p-4">
          Footer
        </footer>
      </div>
    </body>
  </html>
}