import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { ActorService } from '../../../services/actor.service';
import { Actor } from '../../../interfaces';
import { AuthService } from '../../../services/auth.service';
import { Message, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material/material/material.module';
import { PrimeNgModule } from '../../../prime-ng/prime-ng/prime-ng.module';
import { TranslateModule } from '@ngx-translate/core';
import { MediaService } from '../../../services/media.service';

@Component({
  selector: 'app-actor',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule,PrimeNgModule, MaterialModule, TranslateModule],
  providers: [MessageService],
  templateUrl: './actor.component.html',
  styleUrl: './actor.component.css'
})
export class ActorComponent implements OnInit{

  public idActor:string = ""
  public objActor ?:Actor
  public showMessage: boolean = false
  public mensaje: Message[] = []
  public noFoundImage = ""

  constructor(
    private _activatedRouter: ActivatedRoute,
    private _actorService: ActorService,
    private _authService: AuthService,
    private messageService: MessageService,
    private _mediaService: MediaService
  ){

  }

  ngOnInit(): void {
    
    this.noFoundImage = this._mediaService.getNoFound()
    const lang = localStorage.getItem('selectedLang')

    if(lang === "en"){
      this.mensaje = [{ severity: 'error', summary: 'Error', detail: `There is not response from the server. Check your connection` }];
    }else{
      this.mensaje = [{ severity: 'error', summary: 'Error', detail: `No hay respuesta del servidor, compruebe su conexión` }];
    }

    this._activatedRouter.params.subscribe(
      params => {
        this.idActor = params['id'];
        if (this.idActor) {
          this.cargarActor();
        }
      }
    );
  }

  cargarActor(){
    this._actorService.getActorById(this.idActor).subscribe(
      res => {

        if(Object.keys(res).length > 0){
          this.objActor = res
        }else {
          this.showMessage = true;
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
