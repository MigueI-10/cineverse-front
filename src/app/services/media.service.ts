import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Media } from '../interfaces/media.interface';

@Injectable({ providedIn: 'root' })
export class MediaService {

  private urlBackEnd = "http://localhost:3000";
  //inyectar el http cliente
  constructor(private http :HttpClient){

  }

  getAllMedia(): Observable<Media[]> {
    return this.http.get<Media[]>(this.urlBackEnd + "/media").pipe(
      catchError(error => {
        console.log("Error al obtener la lista de peliculas. " + error);
        return of([])
      })
    );
  }

  getPeliculas(): Observable<Media[]> {
    return this.http.get<Media[]>(this.urlBackEnd + "/media/films").pipe(
      catchError(error => {
        console.log("Error al obtener la lista de peliculas. " + error);
        return of([])
      })
    );
  }

  getSeries(): Observable<Media[]> {
    return this.http.get<Media[]>(this.urlBackEnd + "/media/series").pipe(
      catchError(error => {
        console.log("Error al obtener la lista de series. " + error);
        return of([])
      })
    );
  }

  getMediaById(id: string): Observable<Media> {
    return this.http.get<Media>(this.urlBackEnd + "/media/"+id).pipe(
      map(res=>{
          return res;
      }),
      catchError(error=>{
        console.log("Error al obtener el objeto media. " + error);
        return of ({} as Media)
      })
    );
  }

}