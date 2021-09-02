import {
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { OnChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { TodoInterface } from '../../types/todo.interface';

@Component({
  selector: 'app-todos-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit, OnChanges {
  @Input('todo') todoProps!: TodoInterface;
  @Input('isEditing') isEditingProps!: boolean;
  @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> =
    new EventEmitter();
  editingText: string = '';
  @ViewChild('textInput') textInput!: ElementRef;

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    // Mỗi khi nhấp đúp thì editingText đc khởi tạo và gán giá trị mặc định cho nó là text của todo hiện tại
    this.editingText = this.todoProps.text;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes: ', changes);
    if (changes.isEditingProps.currentValue) {
      setTimeout(() => {
        this.textInput.nativeElement.focus();
      });
    }
  }

  setTodoInEditMode(): void {
    console.log('setTodoInEditMode');
    this.setEditingIdEvent.emit(this.todoProps.id);
  }

  removeTodo(): void {
    this.todosService.removeTodo(this.todoProps.id);
  }

  toggleTodo(): void {
    this.todosService.toggleTodo(this.todoProps.id);
  }

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.editingText = target.value;
  }

  changeTodo(): void {
    // this.todoProps = this.editingText;
    console.log('changeTodo: ', this.editingText);
    this.setEditingIdEvent.emit(null);
    this.todosService.changeTodo(this.todoProps.id, this.editingText);
  }
}
