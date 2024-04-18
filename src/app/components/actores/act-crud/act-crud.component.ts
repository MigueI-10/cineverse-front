import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../material/material/material.module';
import { NgStyle } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MediaService } from '../../../services/media.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Actor } from '../../../interfaces';
import { ActorService } from '../../../services/actor.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-act-crud',
  standalone: true,
  imports: [MaterialModule, NgStyle, DatePipe],
  templateUrl: './act-crud.component.html',
  styleUrl: './act-crud.component.css'
})
export class ActCrudComponent implements OnInit{

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _actorService: ActorService, private _routerService: Router){

  }

  public displayedColumns: string[] = ['id', 'nombre', 'fechaNacimiento', 'nacionalidad', 'acciones'];
  public dataSource = new MatTableDataSource<Actor>;

  ngOnInit(): void {
    this.cargarActores()
  }

  cargarActores(){
    this._actorService.getAllActors().subscribe(
      res => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res)

      //paginacion
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      }
    )
  }
  cargarFormulario(){
    this._routerService.navigate(['/actores-frm'])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
