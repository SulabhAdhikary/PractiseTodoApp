import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AddtodoComponent } from './addtodo/addtodo.component';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { ToDoClientApiService } from './TodoService';
import { TododetailComponent } from './tododetail/tododetail.component';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    AddtodoComponent,
    FieldErrorDisplayComponent,
    TododetailComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: FetchDataComponent, pathMatch: 'full' },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'toDoAdd', component: AddtodoComponent },
      { path: 'toDoAdd/:id', component: AddtodoComponent },
      { path: 'ToDoDetail/:id', component: TododetailComponent }
    ])
  ],
  providers: [ToDoClientApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
