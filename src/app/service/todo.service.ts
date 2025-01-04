import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Todo } from '../../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [];
  private idCounter = 0;
  private readonly STORAGE_KEY = 'todos';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    if (!this.isBrowser) return;
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        this.todos = JSON.parse(stored);
        this.idCounter = Math.max(...this.todos.map(t => t.id), 0) + 1;
      }
    } catch (error) {
      console.error('Error loading from storage:', error);
    }
  }

  private saveToStorage(): void {
    if (!this.isBrowser) return;
    try {
      const data = JSON.stringify(this.todos);
      localStorage.setItem(this.STORAGE_KEY, data);
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(description: string): void {
    const todo: Todo = {
      id: this.idCounter++,
      description,
      completed: false
    };
    this.todos.push(todo);
    this.saveToStorage();
  }

  toggleCompleted(id: number): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveToStorage();
    }
  }

  deleteTodoById(id: number): void {
    this.todos = this.todos.filter(t => t.id !== id);
    this.saveToStorage();
  }
}