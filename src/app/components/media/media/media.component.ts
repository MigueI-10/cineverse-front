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
import { FavoriteResponse } from '../../../interfaces/favorite-response.interface';
import { FavoriteService } from '../../../services/favorite.service';
import { catchError, of } from 'rxjs';
import { Favorite } from '../../../interfaces/create-favorite.interface';
import { TranslateModule } from '@ngx-translate/core';
import { ActorService } from '../../../services/actor.service';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, TranslateModule,
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
  public visiblePuntuacion = false

  public notaPelicula?: number

  public objFavorite?: Favorite
  public isFavorite?: boolean
  private idFavorite?: string = ""
  public noFoundImage = ""

  public comentarioBien = "El comentario fue añadido exitosamente"
  public comentarioMal = "El comentario no fue añadido"
  public favoritoBien = "Favorito actualizado con éxito"
  public favoritoMal = "Fallo al actualizar el favorito"
  public noLogin = "Para añadir esta película a favoritos, debes estar logueado"

  constructor(
    private _activatedRouter: ActivatedRoute,
    private _mediaService: MediaService,
    private _authService: AuthService,
    private messageService: MessageService,
    private _favoriteService: FavoriteService,
    public _actorService: ActorService
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

    this._activatedRouter.params.subscribe(
      params => {
        this.idMedia = params['id'];
        if (this.idMedia) {
          this.cargarMedia();
        }
      }
    );

    this.noFoundImage = this._mediaService.getNoFound()

    this._authService.checkAuthStatus().subscribe(
      res => {
        this.isLoggedIn = res

        if (this.isLoggedIn) {
          const { ...user } = this._authService.usrActual();

          this.userName = user.name
          this.idUser = user._id
          this.checkExistanceFavorite(this.idUser, this.idMedia)
        }
      }
    )
  }

  setearMensajes() {

    const lang = this._mediaService.getSelectedLanguage()

    if (lang === "en") {
      this.mensaje = [{ severity: 'error', summary: 'Error', detail: `There is not response from the server` }];
      this.noComentMessage = [{ severity: 'info', summary: '', detail: `This media/series has no comments` }];
      this.comentarioBien = "The comment was added correctly"
      this.comentarioMal = "The comment wasn't added"
      this.favoritoBien = "Favorite updated successfully"
      this.favoritoMal = "Failed to update the favorite"
      this.noLogin = "To vote this film or add to favorites you have to be logged in."
    } else {
      this.mensaje = [{ severity: 'error', summary: 'Error', detail: `No hay respuesta del servidor compruebe su conexión` }];
      this.noComentMessage = [{ severity: 'info', summary: '', detail: `Esta ${this.objMedia.tipo} no tiene comentarios` }];
    }
  }

  cargarMedia() {
    this._mediaService.getMediaById(this.idMedia).subscribe(
      res => {

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

  checkExistanceFavorite(idUser: string, idMedia: string) {
    this._favoriteService.checkFavoriteUserMedia(idUser, idMedia)
      .pipe(
        catchError((error) => {
          return of(error.message)
        })
      )
      .subscribe(
        res => {
          if (Object.keys(res).length > 0) {
            this.objFavorite = res
            this.isFavorite = this.objFavorite?.esFavorito
            this.idFavorite = this.objFavorite?._id
            this.notaPelicula = this.objFavorite?.notaUsuario
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

    if ($event) {
      this.success(this.comentarioBien)

      this.aComments = []
      this.cargarComentarios(this.idMedia)
    } else {
      this.errorToast(this.comentarioMal)
    }

  }

  addFavoriteMedia() {

    if (this.isLoggedIn) {

      if (this.objFavorite !== undefined) {

        this.isFavorite = !this.isFavorite
        //guardamos el result
        this.objFavorite.esFavorito = this.isFavorite

        if (this.idFavorite !== undefined) {

          delete this.objFavorite._id
          delete this.objFavorite.__v

          this._favoriteService.updateFavorite(this.idFavorite, this.objFavorite).subscribe(
            res => {
              if (res) {
                this.success(this.favoritoBien)
                this.checkExistanceFavorite(this.idUser, this.idMedia)

              } else {
                this.errorToast(this.favoritoMal)
                this.isFavorite = !this.isFavorite

              }

            }
          )
        }

      } else {

        this.isFavorite = !this.isFavorite
        this.objFavorite = {
          idPelicula: this.idMedia,
          idUsuario: this.idUser,
          esFavorito: this.isFavorite
        }

        this._favoriteService.addFavorite(this.objFavorite).subscribe(
          res => {
            if (Object.keys(res).length > 0) {
              this.success(this.favoritoBien)
              this.objFavorite = res

              this.checkExistanceFavorite(this.idUser, this.idMedia)
            } else {
              this.errorToast(this.favoritoMal)
              this.isFavorite = !this.isFavorite

            }
          }
        )

      }

    } else {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: this.noLogin });
    }
  }

  addMarkFavorite() {
    if (this.isLoggedIn) {
      this.visiblePuntuacion = true

    } else {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: this.noLogin });
    }

  }

  savePuntuacion() {

    if (this.notaPelicula !== undefined) {

      //caso de actualizar
      if (this.objFavorite !== undefined) {

        if (this.idFavorite !== undefined) {
          this.objFavorite.notaUsuario = this.notaPelicula
          delete this.objFavorite._id
          delete this.objFavorite.__v

          this._favoriteService.updateFavorite(this.idFavorite, this.objFavorite).subscribe(
            res => {
              if (res) {
                this.success(this.favoritoBien)
                this.checkExistanceFavorite(this.idUser, this.idMedia)

              } else {
                this.errorToast(this.favoritoMal)
                this.notaPelicula = 0

              }
            }
          )
        }

      } else {

        this.objFavorite = {
          idPelicula: this.idMedia,
          idUsuario: this.idUser,
          notaUsuario: this.notaPelicula
        }

        this._favoriteService.addFavorite(this.objFavorite).subscribe(
          res => {
            if (Object.keys(res).length > 0) {
              this.success(this.favoritoBien)
              this.objFavorite = res

              this.notaPelicula = res.notaUsuario

              this.checkExistanceFavorite(this.idUser, this.idMedia)

            } else {
              this.errorToast(this.favoritoMal)
              this.notaPelicula = 0
            }


          }
        )

      }

      this.visiblePuntuacion = false

    } else {
      this.errorToast('Debes marcar una puntuación del 0 al 10')
    }
  }

  seeMoreActors() {
    this.visibleModal = true;
  }

  success(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  errorToast(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }



}
