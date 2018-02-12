import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { toDoDomain, priorities } from '../toDoClientDomainModel';
import { ToDoClientApiService } from '../TodoService';


@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public toDos: toDoDomain[];
  toDoPriorities: any;

  SelectedIndex:number[] = [];
  filter: boolean = false;
  showDialog = false;

  constructor(private apiService: ToDoClientApiService, private router: Router) {
    this.toDoPriorities = priorities;
  }


  callMethod(param: String): String {
    for (let prior of this.toDoPriorities) {
      if (prior.key == param) {
        return prior.value;
      }
    }
    return "";
  }
  ngOnInit()
  {
    this.apiService.getAllToDo().subscribe(t => this.copyData(t));
  }

  copyData(apiRetData: toDoDomain[]) {
   
    this.toDos = apiRetData;
    console.log(this.toDos);
  }

  btnAddClicked() {
    this.router.navigate(['toDoAdd/0']);

  }

  onFilterChange(eventsargs, row) {
    // this.filter = !this.filter;
    this.SelectedIndex = eventsargs;
    
    if (eventsargs == true) {
      //alert('checked');
    }
  }


  btnDeleteClicked() {
    if (this.SelectedIndex.length > 0) {
      this.showDialog = !this.showDialog
    }
  }

}



