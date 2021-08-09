export interface InputEvent  {
  target: {
    name:string;
    value:string;
  }
}
export interface toDoItemWithOutId {
  title: string;
  description: string;
}
export interface toDoItem {
  id: number;
  title: string;
  description: string;
}

export interface contextContain {
  toDoList?: any;
  addToDo?: any;
  deleteToDo?: any 
  editToDo?: any
}
