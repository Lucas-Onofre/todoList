import { TaskService } from './../tasklist/task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  descricao = '';

  constructor(private service: TaskService) { }

  ngOnInit(): void {
  }

  //responsavel por cadastrar novas tasks através do modal
  cadastrar(){
    const newTask = { descricao: this.descricao, status: false }
    this.service.post(newTask).subscribe(() =>{
      window.location.reload();
    },
    error=> console.log(error)
    );
  }
}
