import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToDoClientApiService } from '../TodoService';
import { Router, ActivatedRoute } from '@angular/router';
import { toDoDomain, priorities } from '../toDoClientDomainModel';

@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.css']
})
export class AddtodoComponent implements OnInit {

  addToDoForm: FormGroup;
  isNewAddition: true;
  toDoID = 0;
  toDoPriorities: {}[];
  domainModel: toDoDomain = new toDoDomain();



  constructor(private activatedRoute: ActivatedRoute,private apiService: ToDoClientApiService, private router: Router) {
    this.toDoPriorities = priorities;
    this.activatedRoute.params.subscribe(parm => this.processIncomingData(parm));
   
  }

  ngOnInit()
  {
   
    this.constructForm();
  }



  constructForm() {
    this.addToDoForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      Description: new FormControl(),
      IsCompleted: new FormControl({ value: false, disabled: this.isNewAddition }),
      Priority: new FormControl('', Validators.required)
    });

    
  }



  processIncomingData(para: any) {
    console.log(para);
   
    if ("id" in para) {
      this.toDoID = para.id;
      if (this.toDoID != 0) {
        this.apiService.getToDoByID(this.toDoID).subscribe(t => this.copyData(t));

      } 
    }
  }

  copyData(retData: any) {
    
    this.addToDoForm.setValue(
      {
        "Name": retData.name,
        "Description": retData.description,
        "IsCompleted": retData.isCompleted,
        "Priority": retData.priority
      });
  }

  isFieldValid(field: string) {
    return !this.addToDoForm.get(field).valid && this.addToDoForm.get(field).touched;
  }


  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }


  onSubmit() {
    if (this.addToDoForm.valid) {
      this.apiService.postToDo(this.addToDoForm.value, this.toDoID).subscribe(res => this.windingUpSuccessCall(res), err => this.windingUpErrorCall(err));
    } else {
      Object.keys(this.addToDoForm.controls).forEach(field => {
        const control = this.addToDoForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }


  windingUpSuccessCall(activity: any) {
    this.addToDoForm.reset();
    this.router.navigate(['fetch-data']);
  }


  windingUpErrorCall(activity: any) {
    console.log(activity.Message);
  }

}
