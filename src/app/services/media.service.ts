import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  addMedia(media:Media):Observable<boolean>{
    
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.urlBackEnd}/media`, media,  { headers }).pipe(
      map(()=>true),
      catchError(error=>{
        console.log(error);
        return of (false)
      })
    );
  }

  delMedia(id:string):Observable<boolean>{//va a devolver un boolean

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete(`${this.urlBackEnd}/media/${id}`,  { headers }).pipe(
      map(()=>true), //se devuelve cuando es correcto
      catchError(error=>{ //por si falla
        console.log("Error al eliminar media. " + error);
        return of (false)
      })
    );
  }

  updateMedia(media:Media, id:string):Observable<boolean>{

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.patch(`${this.urlBackEnd}/media/${id}`, media,  { headers }).pipe(
      map(()=>true),
      catchError(error=>{
        console.log("Error al hacer update a la media. " + error);
        return of (false)
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