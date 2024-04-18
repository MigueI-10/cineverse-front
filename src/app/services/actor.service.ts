import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Media } from '../interfaces/media.interface';
import { Actor } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class ActorService {

  private urlBackEnd = "http://localhost:3000";
  //inyectar el http cliente
  constructor(private http :HttpClient){

  }

  getAllActors(): Observable<Actor[]> {
    return this.http.get<Actor[]>(this.urlBackEnd + "/actor").pipe(
      catchError(error => {
        console.log("Error al obtener la lista de actores. " + error);
        return of([])
      })
    );
  }

  

}