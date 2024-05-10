import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MaterialModule } from '../../material/material/material.module';
import { PrimeNgModule } from '../../prime-ng/prime-ng/prime-ng.module';
import { AuthService } from '../../services/auth.service';
import { FavoriteService } from '../../services/favorite.service';
import { FavoriteResponse } from '../../interfaces/favorite-response.interface';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, MaterialModule, ReactiveFormsModule, InfiniteScrollModule,  RouterLink, RouterLinkActive, TranslateModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit{

  
  private idUser: string = ""
  public favoriteList: FavoriteResponse[] = []
  public showMessage = false
  public mensaje : Message[] = []

  public noFoundImage = ""

  public messageTitle: string = "¿Seguro que quieres borrarlo de tus favoritos?"
  public messageHeader: string = "Acción Importante"
  public mensajeBienRem = "Favorito eliminado correctamente"
  public mensajeMalRem = "Fallo al eliminar al favorito"
  public yes = "Si"
  public no = "No"
  public mensajeNo = "El favorito no ha sido eliminado"

  constructor(
    private _favService: FavoriteService,
    private _authService: AuthService,
    private _router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _mediaService: MediaService
  ){
    
  }

  ngOnInit(): void {

    this.noFoundImage = this._mediaService.getNoFound()


    let lang = this._mediaService.getSelectedLanguage()
    if(lang === "en"){
      this.messageTitle = "Confirm delete favorite"
      this.messageHeader = "Are you sure you want to delete the favorite?"
      this.mensajeBienRem = "Favorite removed correctly"
      this.mensajeMalRem = "Failed to remove favorite"
      this.yes = "Yes"
      this.mensajeNo = "The favorite hasn't been deleted"
    }


    this.mensaje = [{ severity: 'info', summary: 'Info', detail: 'No hay resultados para este término de búsqueda' }];
    this._authService.checkAuthStatus().subscribe(
      res => {
        
        if (res) {
          const { ...user } = this._authService.usrActual();
          this.idUser = user._id
          
          this.getFavoriteList()
        }

      }
    )

    
  }
  //se pone a false
  deleteFavorite(id:string, event: Event){
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
          this._favService.removeFromFavorite(id).subscribe(
            res => {
              if (res) {
                this.success(this.mensajeBienRem)
              } else {
                this.errorToast(this.mensajeMalRem)
              }
              
                if(this.idUser){
                  this.favoriteList = []
                  this.getFavoriteList()
                }
              
            }
          )
          
        },
        reject: () => {
          this.messageService.add({ severity: 'info', summary: 'Informacion', detail: 'No se ha borrado el favorito', life: 3000 });
        }
      });
   
    }
  }

  getFavoriteList(){
    this._favService.findFavoritesFromUser(this.idUser).subscribe(
      res => {
        if(res.length > 0){
          this.favoriteList = res
        }else{      
            this.showMessage = true
        }
      }
    )
  }

  success(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  errorToast(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }


}
