import { Component, OnInit } from '@angular/core';
import { Todo } from './shared/todo.model';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  newTodo: string = '';
  todos: Todo[] = [
    { id: 1, text: 'Buy beer', status: true, time: 1642653703431 },
    {
      id: 2,
      text: 'Start a angular app',
      status: true,
      time: 1642653779421,
    },
    { id: 3, text: 'Finish this code', status: false, time: 1642653780050 },
    { id: 4, text: 'Study observables', status: false, time: 1642653792126 },
  ];
  cookies: string = 'userTodos';

  constructor(private cookieService: CookieService) {}

  ngOnInit() {
    if (this.cookieService.check(this.cookies)) {
      this.todos = JSON.parse(this.cookieService.get(this.cookies));
    } else {
      this.cookieService.set(this.cookies, JSON.stringify(this.todos));
    }
  }

  newTodoUpdate(input: Event): void {
    this.newTodo = (<HTMLInputElement>input.target).value;
  }

  addNewTodo(): void {
    if (this.newTodo)
      this.todos.push({
        id: this.todos.length + 1,
        text: this.newTodo,
        status: false,
        time: moment().valueOf(),
      });
    this.newTodo = '';
    this.updateCookies();
  }

  updateTodo(todoId: number, todoValue: string): void {
    this.todos.filter((item) => {
      if (item.id === todoId) {
        item.text = todoValue;
      }
    });
    this.updateCookies();
  }

  doneTodo(todoId: number): void {
    this.todos.filter((item) => {
      if (item.id === todoId) {
        item.status = !item.status;
      }
    });
    this.updateCookies();
  }

  deleteTodo(todoId: number) {
    this.todos.forEach((todo, index) => {
      if (todo.id === todoId) {
        this.todos.splice(index, 1);
      }
    });
    this.updateCookies();
  }

  updateCookies() {
    this.cookieService.set(this.cookies, JSON.stringify(this.todos));
  }
}
