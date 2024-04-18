import { CommonModule, NgStyle } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../material/material/material.module';
import { MediaService } from '../../../services/media.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Media } from '../../../interfaces';

@Component({
  selector: 'app-media-crud',
  standalone: true,
  imports: [MaterialModule, NgStyle, CommonModule],
  templateUrl: './media-crud.component.html',
  styleUrl: './media-crud.component.css'
})
export class MediaCrudComponent implements OnInit{

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _mediaService: MediaService, private _routerService: Router){

  }

  public displayedColumns: string[] = ['id', 'titulo', 'tipo', 'anyo', 'puntuacion', 'acciones'];
  public dataSource = new MatTableDataSource<Media>;

  ngOnInit(): void {
    this.cargarMedia()
  }

  cargarMedia(){
    this._mediaService.getAllMedia().subscribe(
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
    this._routerService.navigate(['/media-frm'])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
