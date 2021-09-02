import { TodoInterface } from './../../types/todo.interface';
import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';

@Component({
  selector: 'app-todos-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  visibleTodos$!: Observable<TodoInterface[]>;
  noTodoClass$!: Observable<boolean>;
  isAllTodosSelected$!: Observable<boolean>;
  editingId: string | null = null;

  constructor(private todosService: TodosService) {
    // Kiểm tra xem todos có giá trị hay không
    this.noTodoClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0)
    );

    // Kiểm tra check all
    this.isAllTodosSelected$ = this.todosService.todos$.pipe(
      map((todos) => {
        return todos.every((todo) => {
          todo.isCompleted;
        });
      })
    );

    // Lọc danh sách todos
    this.visibleTodos$ = combineLatest(
      this.todosService.todos$,
      this.todosService.filter$
    ).pipe(
      map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
        if (filter === FilterEnum.active) {
          return todos.filter((todo) => !todo.isCompleted);
        } else if (filter === FilterEnum.completed) {
          return todos.filter((todo) => todo.isCompleted);
        }
        return todos;
      })
    );
  }

  ngOnInit(): void {}

  // toggle all todos
  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.todosService.toggleAll(target.checked);
  }

  setEditingId(editingId: string | null): void {
    this.editingId = editingId;
  }
}
