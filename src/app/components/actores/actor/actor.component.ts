import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActorService } from '../../../services/actor.service';
import { Actor } from '../../../interfaces';

@Component({
  selector: 'app-actor',
  standalone: true,
  imports: [],
  templateUrl: './actor.component.html',
  styleUrl: './actor.component.css'
})
export class ActorComponent implements OnInit{

  public idActor:string = ""
  public objActor !:Actor

  constructor(
    private _activatedRouter: ActivatedRoute,
    private _actorService: ActorService
  ){

  }

  ngOnInit(): void {
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
        console.log(res);
        this.objActor = res
      }
    )
  }

  
}
