import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { toDoDomain} from './toDoClientDomainModel';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';



@Injectable()
export class ToDoClientApiService {

  //
  // to do 
  // try to pass obserable call back function and emit the event
  // to bubble up server side erorr and display in client
  //

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl) {

  }




  getAllToDo(): Observable<toDoDomain[]> {
    
    return this.http.get<toDoDomain[]>('api/ToDoData/GetAllToDos')
      .pipe(catchError(this.handleError));
  }



  getToDoByID(toDoId:number): Observable<toDoDomain> {

    let params = new HttpParams();
    params = params.append('id', toDoId.toString());

    return this.http.get<toDoDomain>('api/ToDoData/GetToByID', { params: params })
      .pipe(catchError(this.handleError));
  }



  postToDo(dataToPost: toDoDomain, id: number): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    if (id != 0) {
      dataToPost.Id = id.toString();
    }

    return this.http.post<Object>('api/ToDoData/PostData', dataToPost, httpOptions)
      .pipe<Object>(catchError(this.handleError));
  }


  private handleError<T>(error: HttpErrorResponse, caught: T) {
    if (error.error instanceof ErrorEvent) {
    
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    return new ErrorObservable(
      {
        hasError: true,
        HttpCode: error.status,
        Message: error.error
      });
  };


}
