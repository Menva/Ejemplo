import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
// import { AngularFireMessaging } from '@angular/fire/compat/messaging';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }

  /** Valida si el usuario esta logueado
  * @returns TRUE o FALSE
  */
   public login():boolean {
    const user= localStorage.getItem('user');
    return !!user;
  }

  /** Cierra la sesión del usuario
  * @returns void
  */
  public logout(){
    // this.afMessaging.getToken.subscribe((token)=>{
    //   localStorage.removeItem('token');
    //   localStorage.removeItem('user');
    //   // localStorage.removeItem('modulo_wtsp');
    //   if(token){
    //     this.deleteToken(token);
    //   }else{
    //     window.location.href="/login";
    //   }
    // },(error: any) => {
    //   window.location.href="/login";
    // });
    localStorage.removeItem('user');
    window.location.href="/login";
  }

  /** Guarda el usuario logueado en el localStorage
  * @param {any} user json del usuario logueqdo
  * @returns boolean
  */
   setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
		localStorage.setItem('user-nombre',JSON.stringify(user.NombreCompleto));
	  localStorage.setItem('user-ID',JSON.stringify(user.UsuarioID));
		localStorage.setItem('TOKEN',JSON.stringify(user.TOKEN));
		localStorage.setItem('RolNombre',JSON.stringify(user.RolNombre));
		localStorage.setItem('sucursal-ID',JSON.stringify(user.SucursalID));
  }

  /** Retorna el json del usuario almacenado en el localStorage
  * @param {any} user json del usuario logueqdo
  * @returns JSON
  */
   getUser(){
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
  getUserNombre(){
    return localStorage.getItem('user-nombre');
  }
  getUserID(){
    return localStorage.getItem('user-ID');
  }
  geToken(){
    return localStorage.getItem('TOKEN');
  }
  getRolNombre(){
    return localStorage.getItem('RolNombre');
  }
  getSucursalID(){
    return localStorage.getItem('sucursal-ID');
  }

  /** Guarda un token en el localStorage
  * @param {string} token  Token que viene el usuario
  * @returns boolean
  */
   setToken(token: string) {
    localStorage.setItem('token', token);
  }

   /** Retorna el token guardado en localStorage
  * @returns String con el token
  */
  getToken(){
    return localStorage.getItem('token');
  }

  /** Función reutilizable que inicia los headers con el token asignado al usuario, para la consulta de las APIS
  * @returns HttpHeaders
  */
  public getHeader(){
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: this.getUser().TOKEN  
      })
    };
  }
  public getHeaderFormData(){
    return {
      headers: new HttpHeaders({
        'Content-Type':  'multipart/form-data',
        Authorization: this.getUser().TOKEN  
      })
    };
  }

  //eliminar token
  deleteToken(tokenD:string) {
    // this.afMessaging.getToken.pipe(mergeMap(token => this.afMessaging.deleteToken(tokenD))).subscribe(
    //   (token) => {
    //     if (token) {
    //       window.location.href="/login";
    //     } else {
    //       window.location.href="/login";
    //     }
    //   }
    // ),(error: any) => {
    //   window.location.href="/login";
    // };
  }
  setModulos(data: any) {
    localStorage.setItem('Modulos', JSON.stringify(data));
  }
  getModulos(){
    return JSON.parse(localStorage.getItem('Modulos') || '{}');
  }
}
