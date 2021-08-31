import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';

@Component({
  selector: 'app-todos-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @Input('todo') todoProps!: TodoInterface;
  constructor() {}

  ngOnInit(): void {}
}
