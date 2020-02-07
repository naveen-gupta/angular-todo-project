import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDbComponent } from './todo-db.component';

describe('TodoDbComponent', () => {
  let component: TodoDbComponent;
  let fixture: ComponentFixture<TodoDbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoDbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
