import { Component } from '@angular/core';
import { Todo } from './todo.model';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
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
  }

  updateTodo(id: number, value: string): void {
    this.todos.filter((todo) => {
      if (todo.id === id) {
        todo.text = value;
        console.log(todo.text);
      }
    });
    console.log(this.todos);
  }

  doneTodo(clickedTodo: Todo): void {
    this.todos.filter((todo) => {
      if (todo.text === clickedTodo.text) {
        todo.status = !todo.status;
      }
    });
  }

  // OK - Users can edit a to-do
  // OK - A list with all the completed to-do’s
  // OK - Users can see a list with all the active to-do’s
  // OK - User can see the date when he created the to-do
  // - When closing the browser window the to-do’s will be stored and when the User returns, the data will be retrieved
}
