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

@Component({
  selector: 'app-ratings',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, MaterialModule, ReactiveFormsModule, InfiniteScrollModule,  RouterLink, RouterLinkActive],
  providers: [MessageService, ConfirmationService],
  templateUrl: './ratings.component.html',
  styleUrl: './ratings.component.css'
})
export class RatingsComponent implements OnInit{

  private idUser: string = ""
  public ratingList: FavoriteResponse[] = []
  public showMessage = false
  public mensaje : Message[] = []

  constructor(
    private _favService: FavoriteService,
    private _authService: AuthService,
    private _router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ){
    
  }

  ngOnInit(): void {
    this.mensaje = [{ severity: 'info', summary: 'Info', detail: 'No hay resultados para este término de búsqueda' }];
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
        message: 'Seguro que quieres borrarlo de tus valoraciones?',
        header: 'Accion Importante',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        acceptLabel: "Si",
        rejectLabel: "No",
        accept: () => {
          this._favService.deleteFavorite(id).subscribe(
            res => {
              if (res) {
                this.success('Favorito eliminado correctamente')
              } else {
                this.errorToast('Error al eliminar el favorito')
              }
              
                if(this.idUser){
                  this.ratingList = []
                  this.getRatingList()
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

  success(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  errorToast(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }



}
