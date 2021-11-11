import { environment } from './../../environments/environment.prod';
import { Task } from './tasks';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<Task[]>{
    return this.httpClient.get<Task[]>(API);
  }

  public post(task: Task): Observable<Task>{
    return this.httpClient.post<Task>(API, task);
  }

  public put(task: any): Observable<any>{
    return this.httpClient.put<any>(`${API}/${task.id}`, task);
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete(`${API}/${id}`);
  }
}
