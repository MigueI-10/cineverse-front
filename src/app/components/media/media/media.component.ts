import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { Media } from '../../../interfaces';
import { MediaService } from '../../../services/media.service';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../../../prime-ng/prime-ng/prime-ng.module';
import { Message, MessageService } from 'primeng/api';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { CommentResponse } from '../../../interfaces/comments-response.interface';
import { AuthService } from '../../../services/auth.service';
import { MaterialModule } from '../../../material/material/material.module';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddCommentComponent } from '../../shared/add-comment/add-comment.component';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule,
    PrimeNgModule, MaterialModule, FormsModule, ReactiveFormsModule, AddCommentComponent],
  providers: [MessageService],
  templateUrl: './media.component.html',
  styleUrl: './media.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MediaComponent implements OnInit {

  public idMedia: string = ""
  public objMedia!: Media
  public mensaje: Message[] = []
  public noComentMessage: Message[] = []
  public showMessage: boolean = false
  public aComments: CommentResponse[] = []

  public isLoggedIn = false
  public userName = ""
  public idUser = ""
  public inputComentario = ""
  public visibleModal = false  

  constructor(
    private _activatedRouter: ActivatedRoute,
    private _mediaService: MediaService,
    private _authService: AuthService,
    private messageService: MessageService
  ) {

  }

  public actores = [
    {
        "_id": "661415ef804eda4f6a1f320a",
        "nombre": "Vin Diesel",
        "imagen": "http://www.iestrassierra.net/alumnado/curso2324/DAW/daw2324a02/images/Vin_Diesel.jpg"
    },
    {
        "_id": "661415ef804eda4f6a1f320b",
        "nombre": "Jason Momoa",
        "imagen": "http://www.iestrassierra.net/alumnado/curso2324/DAW/daw2324a02/images/Jason_Momoa.jpg"
    },
    {
        "_id": "661415ef804eda4f6a1f320c",
        "nombre": "Michelle Rodriguez",
        "imagen": "http://www.iestrassierra.net/alumnado/curso2324/DAW/daw2324a02/images/Michelle_Rodriguez.jpg"
    },
    {
        "_id": "661415ef804eda4f6a1f320c",
        "nombre": "Michelle Rodriguez",
        "imagen": "http://www.iestrassierra.net/alumnado/curso2324/DAW/daw2324a02/images/Michelle_Rodriguez.jpg"
    },
    {
        "_id": "661415ef804eda4f6a1f320c",
        "nombre": "Michelle Rodriguez",
        "imagen": "http://www.iestrassierra.net/alumnado/curso2324/DAW/daw2324a02/images/Michelle_Rodriguez.jpg"
    },
    {
        "_id": "661415ef804eda4f6a1f320c",
        "nombre": "Michelle Rodriguez",
        "imagen": "http://www.iestrassierra.net/alumnado/curso2324/DAW/daw2324a02/images/Michelle_Rodriguez.jpg"
    }
]

  ngOnInit(): void {

    this._authService.checkAuthStatus().subscribe(
      res => {
        this.isLoggedIn = res

        if (this.isLoggedIn) {
          const { ...user } = this._authService.usrActual();

          this.userName = user.name
          this.idUser = user._id
        }
      }
    )


    this._activatedRouter.params.subscribe(
      params => {
        this.idMedia = params['id'];
        if (this.idMedia) {
          this.cargarMedia();
        }
      }
    );

  }

  setearMensajes() {
    this.mensaje = [{ severity: 'error', summary: 'Error', detail: 'No hay respuesta del servidor compruebe su conexión' }];
    this.noComentMessage = [{ severity: 'info', summary: '', detail: `Esta ${this.objMedia.tipo} no tiene ningún comentario` }];
  }

  cargarMedia() {
    this._mediaService.getMediaById(this.idMedia).subscribe(
      res => {
        console.log(res);
        if (Object.keys(res).length > 0) {
          this.objMedia = res
          this.setearMensajes()
          this.cargarComentarios(this.idMedia)
        } else {
          this.showMessage = true;
        }
      }
    )
  }

  cargarComentarios(id: string) {
    this._mediaService.getCommentsOfAFilm(id).subscribe(
      res => {
        if (res.length > 0) {
          this.aComments = res
        }
      }
    )
  }

  checkAddedComment($event: boolean) {
    console.log($event);

    if ($event) {
      this.success('El comentario fue añadido exitosamente')

      this.aComments = []
      this.cargarComentarios(this.idMedia)
    } else {
      this.errorToast('El comentario no fue añadido')
    }

  }

  seeMoreActors(){
    this.visibleModal = true;
  }

  success(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  errorToast(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }



}
