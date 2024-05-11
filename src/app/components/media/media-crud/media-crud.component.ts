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
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-media-crud',
  standalone: true,
  imports: [MaterialModule, NgStyle, CommonModule, PrimeNgModule, TranslateModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './media-crud.component.html',
  styleUrl: './media-crud.component.css'
})
export class MediaCrudComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('input') inputElement!: ElementRef;



  public messageTitle: string = "Confirmar Borrado"
  public messageHeader: string = "¿Estás seguro de que quieres borrar la pelicula/serie?"
  public yes = "Si"
  public no = "No"
  public borradoBien = "Película/serie eliminada correctamente"
  public borradoMal = "Error al eliminar la pelicula/serie"
  public noBorrado = "No se ha borrado la pelicula/serie"

  constructor(private _mediaService: MediaService,
    private _routerService: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) {

  }

  public displayedColumns: string[] = ['id', 'titulo', 'tipo', 'anyo', 'puntuacion', 'acciones'];
  public dataSource = new MatTableDataSource<Media>;

  ngOnInit(): void {
    this.cargarMedia()

    let lang = this._mediaService.getSelectedLanguage();
    if (lang === "en") {

      this.messageTitle = "Confirm Deletion";
      this.messageHeader = "Are you sure you want to delete the media?";
      this.yes = "Yes";
      this.no = "No";
      this.borradoBien = "Movie/Series deleted successfully";
    this.borradoMal = "Error deleting the movie/series";
    this.noBorrado = "Movie/Series has not been deleted";
    }
  }

  cargarMedia() {
    this._mediaService.getAllMedia().subscribe(
      res => {
        this.dataSource = new MatTableDataSource(res)

        //paginacion
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  updateMedia(id: string) {
    this._routerService.navigate([`/media-frm/${id}`])
  }

  cargarFormulario() {
    this._routerService.navigate(['/media-frm'])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  borrarMedia(id: string, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.messageTitle,
      header: this.messageHeader,
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      acceptLabel: this.yes,
      rejectLabel: this.no,
      accept: () => {

        this._mediaService.delMedia(id).subscribe(
          res => {
            if (res == true) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: this.borradoBien });
              this.reiniciarForm()

            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: this.borradoMal, life: 3000 });
            }
          }
        )
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Informacion', detail: this.noBorrado, life: 3000 });
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
