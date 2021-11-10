import { Task } from './tasks';
import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from './task.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {

  @Input() filtroListaTask: string = '';

  public listaDeTasks: any = [];
  public tasksFiltradas: any = [];
  private _filtroLista: string = this.filtroListaTask;

  public get filtroLista(){
    return this._filtroLista;
  }

  public set filtroLista(value : string){
    this._filtroLista = value;
    this.tasksFiltradas = this.filtroLista ? this.filtrarTasks(this.filtroLista) : this.listaDeTasks;
  }

  filtrarTasks(filtrarPor: string): any{
    filtrarPor = filtrarPor.toLowerCase();
    return this.listaDeTasks.filter(
      (task: Task) => task.descricao.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  constructor(private service: TaskService) { }

  ngOnInit(){
    this.getTasks();
  }

  public getTasks(): void{
    this.service.getAll().subscribe(
      response =>{
        this.listaDeTasks = response,
        this.tasksFiltradas = response
      },
      error => console.log(error)
    );
  }

  public deleteTask(id: number): void{
    this.service.delete(id).subscribe(
      () => {
        console.log("Removido com sucesso");
        this.ngOnInit();
      },
      error => console.log(error));
  }

  logando(){
    console.log(this.filtroListaTask);
  }
}
