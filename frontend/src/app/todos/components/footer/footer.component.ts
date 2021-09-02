import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';

@Component({
  selector: 'app-todos-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  noTodosClass$: Observable<boolean>;
  activeCount$: Observable<number>;
  itemsLeft$: Observable<string>;
  filterEnum = FilterEnum;
  filter$: Observable<FilterEnum>;
  constructor(private todosService: TodosService) {
    // Kiểm tra xem todos có giá trị hay không
    this.noTodosClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0)
    );
    // Đếm số item đang active (chưa completed)
    this.activeCount$ = this.todosService.todos$.pipe(
      map((todos) => {
        return todos.filter((todo) => {
          return !todo.isCompleted;
        }).length;
      })
    );
    //
    this.itemsLeft$ = this.activeCount$.pipe(
      map((activeCount) => {
        return `item${activeCount !== 1 ? 's' : ''} left`;
      })
    );

    // Gán filter cho filter trong service
    this.filter$ = this.todosService.filter$;
  }

  ngOnInit(): void {}

  changeFilter(event: Event, filterName: FilterEnum): void {
    event.preventDefault();
    console.log('changeFilter: ', filterName);
    this.todosService.changeFilter(filterName);
  }
}
