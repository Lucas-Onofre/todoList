import { Task } from './tasks';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url = `https://localhost:5001/tarefas`

  constructor(private httpClient: HttpClient) { }

  todasTasks(): Observable<Task[]>{
    return this.httpClient.get<Task[]>(this.url);
  }

  adicionar(task: Task): Observable<Task>{
    return this.httpClient.post<Task>(this.url, task)
  }

}
