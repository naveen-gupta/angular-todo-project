import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataService } from "../data.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: "app-todo-db",
  templateUrl: "./todo-db.component.html",
  styleUrls: ["./todo-db.component.css"]
})
export class TodoDbComponent implements OnInit, OnDestroy {

  todoText="";
  todoList = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService
      .sendGetRequest()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any[]) => {
        this.todoList = data.sort((a, b) => b.dateTime - a.dateTime);
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  async onCompletingTask(todo: any) {
    if (todo.isCompleted) {
      todo.isCompleted = false;
      todo.buttonText = "Done";
    } else {
      todo.isCompleted = true;
      todo.buttonText = "Undone";
    }
    await this.dataService
      .sendPutRequest(todo.id, todo)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any[]) => {
        this.dataService
          .sendGetRequest()
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any[]) => {
            this.todoList = data.sort((a, b) => b.dateTime - a.dateTime);
          });
      });
  }

  async onDeleteTask(todo: any) {
    await this.dataService
      .sendDeleteRequest(todo.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any[]) => {
        this.dataService
          .sendGetRequest()
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any[]) => {
            this.todoList = data.sort((a, b) => b.dateTime - a.dateTime);
          });
      });
  }

  async onAddTodoText() {
    if (this.todoText!=""){
      let todoObj = {id: 300+this.todoList.length, text: this.todoText, isCompleted: false, buttonText:"Done", dateTime: (new Date()).getTime()};
      await this.dataService
      .sendPostRequest(todoObj)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any[]) => {
        this.dataService
          .sendGetRequest()
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any[]) => {
            this.todoList = data.sort((a, b) => b.dateTime - a.dateTime);
          });
      });
      this.todoText="";
    }
  }
}
