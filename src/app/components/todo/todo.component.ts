import { Component } from '@angular/core';
import { Todo } from '../../../models/todo.model';
import { TodoService } from '../../service/todo.service';
import {FormsModule} from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-todo',
  imports: [FormsModule, NgFor],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  todos: Todo[] = [];
  newTodo: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit():void {
    this.todos = this.todoService.getTodos();
  }

  addTodo(): void {
    if (this.newTodo.trim()){
      this.todoService.addTodo(this.newTodo.trim());
      this.newTodo = '';
      this.todos = this.todoService.getTodos();
    }
  }

  toggleCompleted(id: number): void {
    this.todoService.toggleCompleted(id); 
    this.todos = this.todoService.getTodos();
  }

  deleteTodo(id:number):void{
    this.todoService.deleteTodoById(id);
    this.todos = this.todoService.getTodos();
  }
}
