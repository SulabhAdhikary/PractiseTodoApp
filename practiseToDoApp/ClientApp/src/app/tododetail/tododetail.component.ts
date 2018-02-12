import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { toDoDomain, priorities } from '../toDoClientDomainModel';
import { ToDoClientApiService } from '../TodoService';


@Component({
  selector: 'app-tododetail',
  templateUrl: './tododetail.component.html',
  styleUrls: ['./tododetail.component.css']
})
export class TododetailComponent implements OnInit {

  todoId: number = 0;
  domainModel: toDoDomain = new toDoDomain();
  toDoPriorities: any;

  constructor(private activatedRoute: ActivatedRoute,private apiService: ToDoClientApiService, private router: Router) {
    this.toDoPriorities = priorities;
    this.activatedRoute.params.subscribe(parm => this.processIncomingData(parm));
  }

  ngOnInit() {
    this.apiService.getToDoByID(this.todoId).subscribe(t => this.copyData(t));
  }


  processIncomingData(para: any) {
    if ("id" in para) {
      this.todoId = para.id;
     
    }
  }


  copyData(retData: any) {
   
    this.domainModel = retData;
    let checkIsComplete = new Boolean(retData.isCompleted);

    if (checkIsComplete==true) {
      this.domainModel.IsCompleted = true;
    } else {
    
      this.domainModel.IsCompleted = false;
    }
    
  }

  GetValueOfPriority(param: String): String {
    for (let prior of this.toDoPriorities) {
      if (prior.key == param) {
        return prior.value;
      }
    }
    return "";
  }

  btnCompleteClicked() {
    this.domainModel.IsCompleted = true;
    this.apiService.postToDo(this.domainModel, this.todoId).subscribe(res => this.windingUpSuccessCall(res), err => this.windingUpErrorCall(err));
    
  }


  btnEditClicked() {

    if (this.todoId != 0)
    {
      this.router.navigate(['toDoAdd/' + this.todoId]);
    }
  }

  btnMoveToIndex() {
    this.router.navigate(['fetch-data'])

  }

  windingUpSuccessCall(activity: any) {
                   
    this.domainModel.IsCompleted = true;
  }


  windingUpErrorCall(activity: any) {
    this.domainModel.IsCompleted = false;
    console.log(activity.Message);
  }





}
