import { CommonModule, NgStyle } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../material/material/material.module';
import { MediaService } from '../../../services/media.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Media } from '../../../interfaces';
import { PrimeNgModule } from '../../../prime-ng/prime-ng/prime-ng.module';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-media-crud',
  standalone: true,
  imports: [MaterialModule, NgStyle, CommonModule, PrimeNgModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './media-crud.component.html',
  styleUrl: './media-crud.component.css'
})
export class MediaCrudComponent implements OnInit{

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('input') inputElement!: ElementRef;

  constructor(private _mediaService: MediaService, 
              private _routerService: Router,
              private confirmationService: ConfirmationService,
              private messageService: MessageService){

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

  updateMedia(id:string){
    this._routerService.navigate([`/media-frm/${id}`])
  }

  cargarFormulario(){
    this._routerService.navigate(['/media-frm'])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  borrarMedia(id:string, event: Event){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Seguro que quieres borrar la media?',
      header: 'Accion Importante',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      acceptLabel: "Si",
      rejectLabel: "No",
      accept: () => {

        this._mediaService.delMedia(id).subscribe(
          res => {
            if(res == true){
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Media borrado correctamente' });
              this.reiniciarForm()

            }else{
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al borrar la media', life: 3000 });
            }
          }
        ) 
      },
      reject: () => {
          this.messageService.add({ severity: 'info', summary: 'Informacion', detail: 'No se ha borrado el actor', life: 3000 });
      }
  });
  }

  reiniciarForm() {
    this.dataSource = new MatTableDataSource(([] as Media[]))
    this.cargarMedia()
    this.inputElement.nativeElement.value = '';
    this._routerService.navigate(['/media-crud'])
  }
}
