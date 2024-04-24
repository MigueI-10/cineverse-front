import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Media } from '../interfaces/media.interface';
import { CommentResponse } from '../interfaces/comments-response.interface';
import { environment } from '../../environments/environments';

@Injectable({ providedIn: 'root' })
export class CommentService {

  private urlBackEnd = environment.baseUrl;
  //inyectar el http cliente
  constructor(private http :HttpClient){

  }

  // getFavoritesAndMarks(filters: {search: string[], limit: number, skip: number}): Observable<Media[]> {

  //   return this.http.get<Media[]>(`${this.urlBackEnd}/favorite/filter`, {params: filters}).pipe(
  //     catchError(error => {
  //       console.log("Error al obtener la lista de favoritos. " + error);
  //       return of([])
  //     })
  //   );
  // }

  

  // addMedia(media:Media):Observable<boolean>{
    
  //   const token = localStorage.getItem('token');
    
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //   return this.http.post(`${this.urlBackEnd}/media`, media,  { headers }).pipe(
  //     map(()=>true),
  //     catchError(error=>{
  //       console.log(error);
  //       return of (false)
  //     })
  //   );
  // }

  delComment(id:string):Observable<boolean>{//va a devolver un boolean

    return this.http.delete(`${this.urlBackEnd}/comments/${id}`).pipe(
      map(()=>true), //se devuelve cuando es correcto
      catchError(error =>{ //por si falla
        console.log(error);
        return of (false)
      })
    );
  }

  // updateMedia(media:Media, id:string):Observable<boolean>{

  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
  //   return this.http.patch(`${this.urlBackEnd}/media/${id}`, media,  { headers }).pipe(
  //     map(()=>true),
  //     catchError(error=>{
  //       console.log("Error al hacer update a la media. " + error);
  //       return of (false)
  //     })
  //   );
  // }

  // getMediaById(id: string): Observable<Media> {
  //   return this.http.get<Media>(this.urlBackEnd + "/media/"+id).pipe(
  //     map(res=>{
  //         return res;
  //     }),
  //     catchError(error=>{
  //       console.log("Error al obtener el objeto media. " + error);
  //       return of ({} as Media)
  //     })
  //   );
  // }

  // getCommentsOfAFilm(id: string): Observable<CommentResponse[]> {
  //   return this.http.get<CommentResponse[]>(`${this.urlBackEnd}/media/${id}/comments`).pipe(
  //     map(res=>{
  //         return res;
  //     }),
  //     catchError(error=>{
  //       console.log("Error al obtener los comentarios. " + error);
  //       return of ([] as CommentResponse[])
  //     })
  //   );
  // }

}