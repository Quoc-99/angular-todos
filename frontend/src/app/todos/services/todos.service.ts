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
    const updatedTodo = this.todos$.getValue().map((todo) => {
      return {
        ...todo,
        isCompleted,
      };
    });
    this.todos$.next(updatedTodo);
  }

  changeFilter(filterName: FilterEnum): void {
    this.filter$.next(filterName);
  }

  changeTodo(id: string, text: string): void {
    const updateTodo$ = this.todos$.getValue().map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text,
        };
      }
      return todo;
    });

    this.todos$.next(updateTodo$);
  }

  removeTodo(id: string): void {
    const updateTodo$ = this.todos$.getValue().filter((todo) => {
      return todo.id !== id;
    });
    this.todos$.next(updateTodo$);
  }

  // Toggle checkbox todo
  toggleTodo(id: string): void {
    const updateTodo$ = this.todos$.getValue().map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });

    this.todos$.next(updateTodo$);
  }
}
