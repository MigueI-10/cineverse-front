import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  
  getActorById(id:string):Observable<Actor>{
    return this.http.get<Actor>(`${this.urlBackEnd}/actor/${id}`).pipe(
      map(res=>{
          return res;
      }),
      catchError(error=>{
        console.log("Error al obtener los actores. " + error);
        return of ({} as Actor)
      })
    );
  }

  addActor(actor:Actor):Observable<boolean>{
    
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.urlBackEnd}/actor`, actor,  { headers }).pipe(
      map(()=>true),
      catchError(error=>{
        console.log("Error al añadir al actor. " + error);
        return of (false)
      })
    );
  }

  delActor(id:string):Observable<boolean>{//va a devolver un boolean

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);


    return this.http.delete(`${this.urlBackEnd}/actor/${id}`,  { headers }).pipe(
      map(()=>true), //se devuelve cuando es correcto
      catchError(error=>{ //por si falla
        console.log("Error al eliminar el actor. " + error);
        return of (false)
      })
    );
  }

  updateActor(actor:Actor, id:string):Observable<boolean>{

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.patch(`${this.urlBackEnd}/actor/${id}`, actor,  { headers }).pipe(
      map(()=>true),
      catchError(error=>{
        console.log("Error al hacer update al actor. " + error);
        return of (false)
      })
    );
  }



  

}