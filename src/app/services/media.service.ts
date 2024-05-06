import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Media } from '../interfaces/media.interface';
import { CommentResponse } from '../interfaces/comments-response.interface';
import { environment } from '../../environments/environments';
import { Filter } from '../interfaces/filter.interface';

@Injectable({ providedIn: 'root' })
export class MediaService {

  private urlBackEnd = environment.baseUrl;
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

  getCommentsOfAFilm(id: string): Observable<CommentResponse[]> {
    return this.http.get<CommentResponse[]>(`${this.urlBackEnd}/media/${id}/comments`).pipe(
      map(res=>{
          return res;
      }),
      catchError(error=>{
        console.log("Error al obtener los comentarios. " + error);
        return of ([] as CommentResponse[])
      })
    );
  }

  getGenres(): Observable<string[]> {
    return this.http.get<string[]>(`${this.urlBackEnd}/media/genres`).pipe(
      map(res=>{
          return res;
      }),
      catchError(error=>{
        console.log("Error al obtener los comentarios. " + error);
        return of ([] as string[])
      })
    );
  }

  getSearchResults(filters: {search: string, limit: number, skip: number}): Observable<Media[]> {

    return this.http.get<Media[]>(`${this.urlBackEnd}/media/search`, {params: filters}).pipe(
      catchError(error => {
        console.log("Error al obtener la lista de peliculas. " + error);
        return of([])
      })
    );
  }

  filterByQuery(filters: Partial<Filter>): Observable<Media[]> {

    // let params = new HttpParams();
    const params = this.getParamsFiltered(filters ?? {})

    return this.http.get<Media[]>(`${this.urlBackEnd}/media/filter`, {params}).pipe(
      catchError(error => {
        console.log("Error al obtener la lista de peliculas. " + error);
        return of([] as Media[])
      })
    );
  }

  protected getParamsFiltered(filters: { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> }): HttpParams {
    const params = Object.entries(filters)
        .reduce((params, [key, value]) => {
            if (typeof value === 'string' && value.trim().length) {
                return params.set(key, value)
            }

            if (typeof value === 'number') {
                return params.set(key, value.toString())
            }

            if (typeof value === 'boolean') {
                return params.set(key, value.toString())
            }

            if (Array.isArray(value) && value.length) {
                return value.reduce<HttpParams>((params, value) => {
                    return params.append(key, value)
                }, params)
            }

            return params
        }, new HttpParams())

    return params
}



}