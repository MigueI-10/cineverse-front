import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MessageService, ConfirmationService, Message } from 'primeng/api';
import { MaterialModule } from '../../material/material/material.module';
import { PrimeNgModule } from '../../prime-ng/prime-ng/prime-ng.module';
import { FavoriteResponse } from '../../interfaces/favorite-response.interface';
import { AuthService } from '../../services/auth.service';
import { FavoriteService } from '../../services/favorite.service';
import { TranslateModule } from '@ngx-translate/core';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-ratings',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, MaterialModule, ReactiveFormsModule, InfiniteScrollModule,  RouterLink, RouterLinkActive, TranslateModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './ratings.component.html',
  styleUrl: './ratings.component.css'
})
export class RatingsComponent implements OnInit{

  private idUser: string = ""
  public ratingList: FavoriteResponse[] = []
  public showMessage = false
  
  public noFoundImage = ""

  public messageTitle: string = "¿Seguro que quieres borrar la valoración?"
  public messageHeader: string = "Acción Importante"
  public mensajeBienRem = "Valoración eliminada correctamente"
  public mensajeMalRem = "Fallo al eliminar la valoración"
  public yes = "Si"
  public no = "No"
  public mensajeNo = "La valoración no ha sido eliminada"


  constructor(
    private _favService: FavoriteService,
    private _mediaService : MediaService,
    private _authService: AuthService,
    private _router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ){
    
  }

  ngOnInit(): void {
    this.noFoundImage = this._mediaService.getNoFound()


    let lang = this._mediaService.getSelectedLanguage()
    if(lang === "en"){
      this.messageTitle = "Confirm delete rating"
      this.messageHeader = "Are you sure you want to delete the rating?"
      this.mensajeBienRem = "Rating removed correctly"
      this.mensajeMalRem = "Failed to remove rating"
      this.yes = "Yes"
      this.mensajeNo = "The rating hasn't been deleted"
    }

    this._authService.checkAuthStatus().subscribe(
      res => {
        
        if (res) {
          const { ...user } = this._authService.usrActual();
          this.idUser = user._id
          
          this.getRatingList()
        }

      }
    ) 
  }

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
          this._favService.removeFromRatings(id).subscribe(
            res => {
              if (res) {
                this.success(this.mensajeBienRem)
              } else {
                this.errorToast(this.mensajeMalRem)
              }
              
                if(this.idUser){
                  this.ratingList = []
                  this.getRatingList()
                }
              
            }
          )
          
        },
        reject: () => {
          this.messageService.add({ severity: 'info', summary: 'Información', detail: this.mensajeNo, life: 3000 });
        }
      });
   
    }
  }

  getRatingList(){
    this._favService.findRatingsFromUser(this.idUser).subscribe(
      res => {
        if(res.length > 0){
          this.ratingList = res    
        }else{      
            this.showMessage = true
        }
      }
    )
  }

  sortRating(word: string){
    if(word === "titulo"){
      this.ratingList.sort((a, b) => a.titulo.localeCompare(b.titulo));
    }else if( word === "notaUsuario"){
      this.ratingList.sort((a, b) => (b?.notaUsuario ?? 0) - (a?.notaUsuario ?? 0));
    }
  }

  success(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  errorToast(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }



}
