import { Task } from './tasks';
import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { NgOption } from '@ng-select/ng-select';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
  @Input() filtroListaTask: string = '';

  selectedOrder?: NgOption;

  orderBy = [
    { id: 1, name: 'A-Z'},
    { id: 2, name: 'Z-A'},
    { id: 3, name: 'Mais recentes'},
    { id: 4, name: 'Mais antigos'},
  ]

  public listaDeTasks: any = [];
  public tasksFiltradas: any = [];
  private _filtroLista: string = this.filtroListaTask;

  //filtrando lista de Tasks
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
        this.getTasks();
      },
      error => console.log(error));
  }


  //ordenando

  public ordenar(val: any){

    //A-Z
    if(val.$ngOptionLabel.trim() == 'A-Z'){
      this.tasksFiltradas = this.tasksFiltradas.sort((x: any, y: any) =>{
        let a = x.descricao.toUpperCase(),
            b = y.descricao.toUpperCase();
        return a == b ? 0 : a > b ? 1 : -1;
      })
      return this.tasksFiltradas;
    }

    //Z-A
    if(val.$ngOptionLabel.trim() == 'Z-A'){
      this.tasksFiltradas = this.tasksFiltradas.sort((x: any, y: any) =>{
        let a = x.descricao.toUpperCase(),
            b = y.descricao.toUpperCase();
        return a == b ? 0 : a > b ? -1 : 1;
      })
      return this.tasksFiltradas;
    }

    //mais recentes/mais antigas....
  }
}
