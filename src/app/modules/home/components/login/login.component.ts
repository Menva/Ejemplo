import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  passView: boolean = false;
  
  constructor(public formulario: FormBuilder, private authService: AuthService, private router: Router, private loginService: LoginService, private elRef: ElementRef, private spinner: NgxSpinnerService) {
    this.formLogin = this.formulario.group({
      Codigo: [''],
      Contraseña: ['']
    })
  }

  ngOnInit(): void {
    if (this.authService.login()) {
      this.router.navigateByUrl('/');
    }
  }

  login() {
    this.spinner.show();
    // this.authService.setUser({UserID:1,Nombre:'arturo'});
    // window.location.href="/principal";
    this.loginService.GetLogin(this.formLogin.value).subscribe(res => {
      console.log(res);
      
      if (res.respuesta[0].Valor == 0) {
        this.spinner.hide();
        Swal.fire("Error", res.respuesta[0].Mensaje, 'error');
      } else {
        localStorage.removeItem('TOKEN');
        localStorage.removeItem('user-ID');
        localStorage.removeItem('user-nombre');
        localStorage.removeItem('RolNombre');
        localStorage.removeItem('sucursal-ID');
        localStorage.removeItem('ruta-padre');
        localStorage.removeItem('ruta-hijo');
        localStorage.removeItem('Modulos');
        // localStorage.removeItem('modulo_wtsp');
        this.authService.setUser(res.respuesta[0]);
        window.location.href = "/principal";
        // this.loginService.GetModulos({UsuarioID:this.authService.getUser().UsuarioID}).subscribe(res=>{
        //   this.authService.setModulos(res.respuesta);
        //   window.location.href="/principal";
        // },(error: any) => {
        //   this.spinner.hide();
        //   Swal.fire('Error','Fallo en la peticion de modulos','error');
        // });
      }
    }, (error: any) => {
      this.spinner.hide();
      Swal.fire('Error', 'A ocurrido un error al procesar la petición! COD:c01', 'error');
    });
  }
  mostrarPass() {
    const pass = this.elRef.nativeElement.querySelector("#mostrarPass");
    if (pass.type == "password") {
      this.passView = true;
      pass.type = "text";
    } else {
      this.passView = false;
      pass.type = "password";
    }
  }

}
