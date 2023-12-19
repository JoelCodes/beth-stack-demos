// Adds support for hyperscript
declare global {
  namespace JSX {
    interface HtmlTag {
      _?:string;
    }
  }
}

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};
