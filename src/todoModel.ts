export interface task {
  id: string;
  title: string;
  completed: boolean;
}

export interface todoResponse {
  todos: task[]
}
