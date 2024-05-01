import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { ActorService } from '../../../services/actor.service';
import { Actor } from '../../../interfaces';
import { AuthService } from '../../../services/auth.service';
import { Message, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material/material/material.module';
import { PrimeNgModule } from '../../../prime-ng/prime-ng/prime-ng.module';

@Component({
  selector: 'app-actor',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule,PrimeNgModule, MaterialModule],
  providers: [MessageService],
  templateUrl: './actor.component.html',
  styleUrl: './actor.component.css'
})
export class ActorComponent implements OnInit{

  public idActor:string = ""
  public objActor ?:Actor
  public showMessage: boolean = false
  public mensaje: Message[] = []

  constructor(
    private _activatedRouter: ActivatedRoute,
    private _actorService: ActorService,
    private _authService: AuthService,
    private messageService: MessageService,
  ){

  }

  ngOnInit(): void {
    this.mensaje = [{ severity: 'error', summary: 'Error', detail: 'No hay respuesta del servidor compruebe su conexión' }];

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
          console.log(res);
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
