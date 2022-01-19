import { Component } from '@angular/core';
import { Todo } from './todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  newTodo: string = '';
  todos: Todo[] = [
    { text: 'Buy beer', status: false },
    { text: 'Finish this code', status: false },
  ];

  newTodoUpdate(input: Event): void {
    this.newTodo = (<HTMLInputElement>input.target).value;
  }

  addNewTodo(): void {
    if (this.newTodo) this.todos.push({ text: this.newTodo, status: false });
    this.newTodo = '';
    console.log(this.todos);
  }

  // - Users can edit a to-do
  // - A list with all the completed to-do’s
  // - Users can see a list with all the active to-do’s
  // - User can see the date when he created the to-do
  // - When closing the browser window the to-do’s will be stored and when the User returns, the data will be retrieved
}
