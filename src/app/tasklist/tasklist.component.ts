import { Task } from './tasks';
import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
  listaDeTask: Task[] = []

  constructor(private service: TaskService) { }

  ngOnInit(){
    this.getTasks();
  }

  public getTasks(): void{
    this.service.todasTasks().subscribe(
      response =>{
        this.listaDeTask = response
      },
      error => console.log(error)
    )

    console.log(this.listaDeTask)
  }

}
