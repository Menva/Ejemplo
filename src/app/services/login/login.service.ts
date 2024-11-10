import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API: string=environment.app.api;

  constructor(private clienteHttp:HttpClient, private authService:AuthService) { }

  GetLogin(datos:{}): Observable<any>{
    return this.clienteHttp.post(this.API+"usuario/acceso",datos);
  }

  GetModulos(datos:{}): Observable<any>{
    return this.clienteHttp.post(this.API+"modulo/obtener/porusuario",datos,this.authService.getHeader());
  }
}
