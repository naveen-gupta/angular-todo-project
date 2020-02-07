import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { TodoDbComponent } from './todo-db/todo-db.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: TodoComponent },
  { path: 'todo-db', pathMatch: 'full', component: TodoDbComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoDbComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
