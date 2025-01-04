import { Injectable } from '@angular/core';
import { Todo } from '../../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todos: Todo[] = [];
  private idCounter = 0;

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(description: string): void {
    this.todos.push({
      id: this.idCounter++,
      description,
      completed: false
    });
  }

  toggleCompleted(id: number): void {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  deleteTodoById(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}
