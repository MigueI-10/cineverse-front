import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Media } from '../interfaces/media.interface';
import { CommentResponse } from '../interfaces/comments-response.interface';
import { environment } from '../../environments/environments';

@Injectable({ providedIn: 'root' })
export class FavoriteService {

  private urlBackEnd = environment.baseUrl;
  //inyectar el http cliente
  constructor(private http :HttpClient){

  }

  

}