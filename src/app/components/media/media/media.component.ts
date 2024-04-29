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

  private objFavorite?: Favorite
  public isFavorite ?: boolean
  private idFavorite ?: string = ""

  constructor(
    private _activatedRouter: ActivatedRoute,
    private _mediaService: MediaService,
    private _authService: AuthService,
    private messageService: MessageService,
    private _favoriteService: FavoriteService
  ) {

  }

//   public actores = [
//     {
//         "_id": "661415ef804eda4f6a1f320a",
//         "nombre": "Vin Diesel",
//         "imagen": "http://www.iestrassierra.net/alumnado/curso2324/DAW/daw2324a02/images/Vin_Diesel.jpg"
//     },
//     {
//         "_id": "661415ef804eda4f6a1f320b",
//         "nombre": "Jason Momoa",
//         "imagen": "http://www.iestrassierra.net/alumnado/curso2324/DAW/daw2324a02/images/Jason_Momoa.jpg"
//     },
//     {
//         "_id": "661415ef804eda4f6a1f320c",
//         "nombre": "Michelle Rodriguez",
//         "imagen": "http://www.iestrassierra.net/alumnado/curso2324/DAW/daw2324a02/images/Michelle_Rodriguez.jpg"
//     },
//     {
//         "_id": "661415ef804eda4f6a1f320c",
//         "nombre": "Michelle Rodriguez",
//         "imagen": "http://www.iestrassierra.net/alumnado/curso2324/DAW/daw2324a02/images/Michelle_Rodriguez.jpg"
//     },
//     {
//         "_id": "661415ef804eda4f6a1f320c",
//         "nombre": "Michelle Rodriguez",
//         "imagen": "http://www.iestrassierra.net/alumnado/curso2324/DAW/daw2324a02/images/Michelle_Rodriguez.jpg"
//     },
//     {
//         "_id": "661415ef804eda4f6a1f320c",
//         "nombre": "Michelle Rodriguez",
//         "imagen": "http://www.iestrassierra.net/alumnado/curso2324/DAW/daw2324a02/images/Michelle_Rodriguez.jpg"
//     }
// ]

  ngOnInit(): void {

    this._activatedRouter.params.subscribe(
      params => {
        this.idMedia = params['id'];
        if (this.idMedia) {
          this.cargarMedia();
        }
      }
    );


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

  checkExistanceFavorite(idUser: string, idMedia: string){
    this._favoriteService.checkFavoriteUserMedia(idUser, idMedia)
    .pipe(
      catchError((error) => {
        return of(error.message)
      })
    )
    .subscribe(
      res => { 
        if(Object.keys(res).length > 0){
          this.objFavorite = res
          console.log(this.objFavorite);
          this.isFavorite = this.objFavorite?.esFavorito
          this.idFavorite = this.objFavorite?._id
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

  addFavoriteMedia(){
    if(this.isLoggedIn){
      
      console.log(this.isFavorite);

      //caso de actualizar
      if(this.objFavorite !== undefined){
        
        this.isFavorite = !this.isFavorite
        //guardamos el result
        this.objFavorite.esFavorito = this.isFavorite
        console.log("actualizado a " + this.isFavorite);

        if(this.idFavorite !== undefined){

           delete this.objFavorite._id
           delete this.objFavorite.__v

          this._favoriteService.updateFavorite(this.idFavorite, this.objFavorite).subscribe(
            res => {
              if(res){
                this.success('Favorito actualizado con éxito')

                console.log(this.objFavorite);

              }else{
                this.errorToast('Fallo al actualizar el favorito')
                this.isFavorite = !this.isFavorite
                
              }
            }
          )
        }

      }else{
        console.log("añadir");
        this.isFavorite = !this.isFavorite
        this.objFavorite = {
          idPelicula : this.idMedia,
          idUsuario: this.idUser,
          esFavorito: this.isFavorite
        }

        this._favoriteService.addFavorite(this.objFavorite).subscribe(
          res =>{
            if(Object.keys(res).length > 0){
              this.success('Favorito actualizado con éxito')
              this.objFavorite = res
            }else{
              this.errorToast('Fallo al actualizar el favorito')
              this.isFavorite = !this.isFavorite
              
            }
          }
        )


      }


    }else{
      this.messageService.add({ severity: 'info', summary: 'Info', detail: `Para añadir esta película a favoritos, debes estar logueado` });
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
