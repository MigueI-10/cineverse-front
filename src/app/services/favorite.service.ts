import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Media } from '../interfaces/media.interface';
import { CommentResponse } from '../interfaces/comments-response.interface';
import { environment } from '../../environments/environments';
import { FavoriteResponse } from '../interfaces/favorite-response.interface';

@Injectable({ providedIn: 'root' })
export class FavoriteService {

  private urlBackEnd = environment.baseUrl;
  //inyectar el http cliente
  constructor(private http :HttpClient){

  }


  findFavoritesFromUser(id:string):Observable<FavoriteResponse[]>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<FavoriteResponse[]>(`${this.urlBackEnd}/favorite/user-favorite/${id}`, { headers }).pipe(
      map(res =>{
        return res;
      }),
      catchError(error=>{
        console.log(error);
        return of ([] as FavoriteResponse[])
      })
    );
  }

  deleteFavorite(id:string):Observable<boolean>{//va a devolver un boolean

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete(`${this.urlBackEnd}/favorite/${id}`,  { headers }).pipe(
      map(()=>true), //se devuelve cuando es correcto
      catchError(error=>{ //por si falla
        console.log("Error al eliminar favorito. " + error);
        return of (false)
      })
    );
  }

  

}