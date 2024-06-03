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
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [MaterialModule, NgStyle, DatePipe, PrimeNgModule, MatSelectModule, FormsModule, TranslateModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css'
})
export class ComentariosComponent implements OnInit {

  public aMedia: Media[] = [];
  public aComments: CommentResponse[] = []
  public selectedMedia?: Media

  public noComments = "Esta Pelicula / Serie no tiene comentarios"
  public messageTitle: string = "Confirmar Borrado"
  public messageHeader: string = "¿Estás seguro de que quieres borrar el comentario?"
  public yes = "Si"
  public no = "No"
  public borradoBien = "Comentario eliminado correctamente"
  public borradoMal = "Error al eliminar el comentario"
  public noBorrado = "No se ha borrado el comentario"

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
    let lang = this._mediaService.getSelectedLanguage();
    if (lang === "en") {
      this.noComments = "This Movie / Series has no comments";
      this.messageTitle = "Confirm Deletion";
      this.messageHeader = "Are you sure you want to delete the comment?";
      this.yes = "Yes";
      this.no = "No";
      this.borradoBien = "Comment deleted successfully";
      this.borradoMal = "Error deleting the comment";
      this.noBorrado = "Comment has not been deleted";
    }

  }

  cargarMedia() {
    const saveMedia = localStorage.getItem('media')

    if (saveMedia) {
      this.aMedia = JSON.parse(saveMedia);

    } else {
      this._mediaService.getAllMedia().subscribe(
        res => {

          if (res.length > 0) {

            this.aMedia = res;
            localStorage.setItem('media', JSON.stringify(res));
          }

        }
      );
    }
  }

  onMediaChange() {
    this.aComments = []
    if (this.selectedMedia !== null && this.selectedMedia !== undefined ) {
      let idMedia = this.selectedMedia._id

      if (idMedia !== undefined) {
        this._mediaService.getCommentsOfAFilm(idMedia).subscribe(
          res => {
            if (res.length <= 0) return this.infoMsg(this.noComments)

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
        message: this.messageTitle,
        header: this.messageHeader,
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        acceptLabel: this.yes,
        rejectLabel: this.no,
        accept: () => {
          this._commentService.delComment(id).subscribe(
            res => {
              if (res) {
                this.success(this.borradoBien)
              } else {
                this.errorToast(this.borradoMal)
              }


              this.onMediaChange()
            }
          )

        },
        reject: () => {
          this.messageService.add({ severity: 'info', summary: 'Informacion', detail: this.noBorrado, life: 3000 });
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

  infoMsg(message: string) {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: message });
  }
}
