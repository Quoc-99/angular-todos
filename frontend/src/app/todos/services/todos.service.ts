import { FilterEnum } from './../types/filter.enum';
import { TodoInterface } from './../types/todo.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TodosService {
  // Khai báo 1 stream todos
  todos$ = new BehaviorSubject<TodoInterface[]>([]);
  // Khai báo 1 filter để lọc danh sách todos khi render
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);

  addTodo(text: string): void {
    const newTodo: TodoInterface = {
      text,
      isCompleted: false,
      id: Math.random().toString(16),
    };

    const updatedTodo = [...this.todos$.getValue(), newTodo];
    this.todos$.next(updatedTodo);
  }

  toggleAll(isCompleted: boolean): void {
    console.log('isCompleted: ', isCompleted);
    const updatedTodo = this.todos$.getValue().map((todo) => {
      return {
        ...todo,
        isCompleted,
      };
    });
    this.todos$.next(updatedTodo);
    console.log('updatedTodo: ', updatedTodo);
  }
}
