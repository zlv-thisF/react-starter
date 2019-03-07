import { createContext } from "react";
import { observable, computed } from "mobx";

export interface ITodoItem {
  id: number;
  text: string;
  isCompleted: boolean;
}

interface ITodoStore {
  todoList: ITodoItem[];
  toggle: (id: number) => void;
  notDone: number;
  alreadyDone: number;
}

class TodoStore implements ITodoStore {
  @observable public todoList = [
    { id: 1, text: "起床", isCompleted: true },
    { id: 2, text: "刷牙洗脸", isCompleted: true },
    { id: 3, text: "吃早饭", isCompleted: false },
    { id: 4, text: "坐地铁", isCompleted: false },
    { id: 5, text: "在地铁上看一会儿书", isCompleted: false },
    { id: 6, text: "工作", isCompleted: false },
    { id: 7, text: "吃午饭", isCompleted: false },
  ];

  @observable
  public toggle = (id: number) => {
    this.todoList = this.todoList.map(p => {
      if (p.id === id) {
        return { ...p, isCompleted: !p.isCompleted };
      }
      return p;
    });
  };

  @computed
  public get notDone(): number {
    return this.todoList.filter(p => !p.isCompleted).length;
  }

  @computed
  public get alreadyDone(): number {
    return this.todoList.filter(p => p.isCompleted).length;
  }
}

export default createContext(new TodoStore());
