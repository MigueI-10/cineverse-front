import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { PrimeNgModule } from '../../../prime-ng/prime-ng/prime-ng.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-act-crud',
  standalone: true,
  imports: [MaterialModule, NgStyle, DatePipe, PrimeNgModule, TranslateModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './act-crud.component.html',
  styleUrl: './act-crud.component.css'
})
export class ActCrudComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('input') inputElement!: ElementRef;


  public messageTitle: string = "Confirmar Borrado"
  public messageHeader: string = "¿Estás seguro de que quieres borrar el actor?"
  public yes = "Si"
  public no = "No"
  public borradoBien = "Actor borrado correctamente"
  public borradoMal = "Error al borrar el actor"
  public noBorrado = "No se ha borrado el actor"

  constructor(private _actorService: ActorService,
              private _routerService: Router,
              private confirmationService: ConfirmationService,
              private messageService: MessageService
  ) {

  }



  public displayedColumns: string[] = ['id', 'nombre', 'fechaNacimiento', 'nacionalidad', 'acciones'];
  public dataSource = new MatTableDataSource<Actor>;

  ngOnInit(): void {

    let lang = localStorage.getItem('selectedLang')

    if(lang === "en"){
      this.messageTitle = "Confirm Delete"
      this.messageHeader = "Are you sure you want to delete the actor?"
      this.yes = "Yes"
      this.no = "No"
      this.borradoBien = "Actor deleted successfully"
      this.borradoMal = "Error deleting actor"
      this.noBorrado = "Actor not deleted"
    }


    this.cargarActores()
  }

  cargarActores() {


    this._actorService.getAllActors().subscribe(
      res => {
       
        if (!localStorage.getItem('actores') && res.length > 0) {
         
          localStorage.setItem('actores', JSON.stringify(res));
        }

        this.dataSource = new MatTableDataSource(res)

        //paginacion
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }
  cargarFormulario() {
    this._routerService.navigate(['/actores-frm'])
  }

  updateActor(id: string) {
    this._routerService.navigate([`/actores-frm/${id}`])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  borrarActor(id: string, event: Event) {
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

        this._actorService.delActor(id).subscribe(
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
    this.dataSource = new MatTableDataSource(([] as Actor[]))
    this.cargarActores()
    this.inputElement.nativeElement.value = '';
    this._routerService.navigate(['/actores-crud'])
  }

}
