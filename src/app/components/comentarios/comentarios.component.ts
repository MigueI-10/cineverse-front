import { NgStyle, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { MaterialModule } from '../../material/material/material.module';
import { PrimeNgModule } from '../../prime-ng/prime-ng/prime-ng.module';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { Media } from '../../interfaces';
import { MediaService } from '../../services/media.service';
import { FormsModule } from '@angular/forms';
import { CommentResponse } from '../../interfaces/comments-response.interface';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [MaterialModule, NgStyle, DatePipe, PrimeNgModule, MatSelectModule, FormsModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css'
})
export class ComentariosComponent implements OnInit {

  public aMedia: Media[] = [];
  public aComments: CommentResponse[] = []
  public selectedMedia?: Media
  

  constructor(
    private _authService: AuthService,
    private _mediaService: MediaService,
    private _commentService: CommentService,
    private _routerService: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {

  }

  ngOnInit(): void {
    this.cargarMedia()
  }

  cargarMedia() {
    const saveMedia = localStorage.getItem('media')

    if (saveMedia) {
      this.aMedia = JSON.parse(saveMedia);

    } else {
      this._mediaService.getAllMedia().subscribe(
        res => {
          this.aMedia = res;

          localStorage.setItem('media', JSON.stringify(res));

        }
      );
    }
  }

  onMediaChange() {
    this.aComments = []
    if (this.selectedMedia !== undefined) {
      let idMedia = this.selectedMedia._id

      if (idMedia !== undefined) {
        this._mediaService.getCommentsOfAFilm(idMedia).subscribe(
          res => {
            console.log(res);
            if (res.length <= 0) return this.errorToast('Esta Pelicula / Serie no tiene comentarios')

            this.aComments = res
          }
        )
      }

    }

  }

  borrarComentario(id: string, event: Event) {
    if (id !== "") {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Seguro que quieres borrar el comentario?',
        header: 'Accion Importante',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        acceptLabel: "Si",
        rejectLabel: "No",
        accept: () => {
          this._commentService.delComment(id).subscribe(
            res => {
              if (res) {
                this.success('Comentario eliminado correctamente')
              } else {
                this.errorToast('Error al eliminar el comentario')
              }
              
    
              this.onMediaChange()
            }
          )
          
        },
        reject: () => {
          this.messageService.add({ severity: 'info', summary: 'Informacion', detail: 'No se ha borrado el actor', life: 3000 });
        }
      });
   
    }
  }

  banearUsuario(id: string, idComment: string,  event: Event) {
    if (id !== "") {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Seguro que quieres banear al Usuario?',
        header: 'Accion Importante',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        acceptLabel: "Si",
        rejectLabel: "No",
        accept: () => {
          this._authService.banUser(id).subscribe(
            res => {
              if (res) {
                this.success('Usuario baneado correctamente')

                this._commentService.delComment(idComment).subscribe(
                  res => {
                    if (res) {
                      this.success('Comentario eliminado correctamente')
                    } else {
                      this.errorToast('Error al eliminar el comentario')
                    } 
                  }
                )
              } else {
                this.errorToast('Error al banear el comentario')
              }

              this.aComments = []
              this.onMediaChange()
            }
          )
          
        },
        reject: () => {
          this.messageService.add({ severity: 'info', summary: 'Informacion', detail: 'No se ha borrado el actor', life: 3000 });
        }
      }); 
    }
  }


  success(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  errorToast(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}
