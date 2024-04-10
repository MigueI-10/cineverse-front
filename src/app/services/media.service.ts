import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Media } from '../interfaces/media.interface';

@Injectable({providedIn: 'root'})
export class MediaService {

    private urlBackEnd = "http://localhost:3000";
    //inyectar el http cliente
    private http = inject(HttpClient);

    getPeliculas():Observable<Media[]>{
        return this.http.get<Media[]>(this.urlBackEnd+"/media/films").pipe(
          catchError(error=>{
            console.log("Error al obtener la lista de tareas. " + error);
            return of ([])
          })
        );
      }
    
}