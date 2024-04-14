import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthStatus, CheckTokenResponse, LoginResponse, RegisterUser, User } from '../interfaces';
import { BehaviorSubject, Observable, catchError, map, of, throwError } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({providedIn: 'root'})
export class AuthService {
    
  //establecer la URI de las variables de entorno
  private readonly baseUrl:string=environment.baseUrl;
  //inyectar el servicio http
  private http=inject(HttpClient)

  //declarar señales. Las señales son objetos reactivos. Permite la redución de carga de trabajo
  private _usrActual= signal<User|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking)
  
  
  public usrActual=  this._usrActual;
  public authStatus=  this._authStatus ;

  /**
   * BehaviorSubject es un observable en RxJs que retien el último valor emitido y lo emite
   * inmediatamente a los nuevos subcriptores cuando se subscriben y se inicializa a false
   */
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor() { 
    this.checkAuthStatus().subscribe(); //verificar el estado del servicio
  }

  login(email:string, password:string):Observable<boolean>{
    const url = `${ this.baseUrl}/auth/login`;
    //construir el body
    const body = {email, password};

    return this.http.post<LoginResponse>(url, body)
    .pipe(
      map(res=>{ //si todo es correcto
        console.log(res.user);
        this._usrActual.set(res.user);
        this._authStatus.set(AuthStatus.authenticated);
        //almacenar el token en localStorage
        localStorage.setItem('token', res.token);
        this.isLoggedInSubject.next(true);
        console.log('token grabado');
        return true;
      }),
      catchError(error =>{
        return throwError ( ()=>error.error.message) 
      })

    )
    
  }


  //verificar token
checkAuthStatus():Observable<boolean>{

  const url= `${this.baseUrl}/auth/check-token`;
  //Leer el token en la cookie
  const token =localStorage.getItem('token');
  console.log({token});
  if (!token){
    this.logout(); //reestablecer el estado
    return of (false);
  }
 
 //configurar el token de la cabecera para realizar el get
  const headers = new HttpHeaders()
  .set('Authorization', `Bearer ${token}`);

  return this.http.get<LoginResponse>(url, {headers})
  .pipe(
    map(res=>{ //si todo es correcto
      this._usrActual.set( res.user); //asignar el usuario
      this._authStatus.set(AuthStatus.authenticated); //establecer el valor autenticado
      //almacenar el token en localStorage
      localStorage.setItem('token', res.token);
      return true;
    }),
    catchError(() =>{
      //pone en el objeto signal el valor de no autenticado
      this._authStatus.set( AuthStatus.notAuthenticated)
      return of (false) 
    })
  )
}


logout(){
  localStorage.removeItem('token');
  this._usrActual.set(null);
  this._authStatus.set(AuthStatus.notAuthenticated)
}
    
}