import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PrimeNGConfig } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username = '';
  perfil = '';
  genero = '';
  sucursal = '';
  user: any;
  subscription: Subscription;
  rutaActiva = '';
  ruta = { padre: "", hijo: "" };
  logueado = false;
  modulos = [] as any[];
  constructor(private ds: DataService, private router: Router, private authService: AuthService, private loginService: LoginService, private spinner: NgxSpinnerService, public _config: PrimeNGConfig) {
    this.subscription = this.ds.getData().subscribe(json => {
      // console.log(json);
      switch (json.Caso) {
        case 1:
          this.rutaActiva = json.Url;
          // this.modulosAll(this.rutaActiva);
          break;
        case 2:
          this.user = this.authService.getUser();
          break;
        default:
          break;
      }
    });
  }

  ngOnInit(): void {
    this.setLocale(this._config, environment.app.idioma);
    if (this.authService.login()) {
      this.logueado = true;
      this.username = this.authService.getUser().NombreCompleto;
      this.sucursal = this.authService.getUser().SucursalNombre;
      this.perfil = this.authService.getUser().RolNombre;
      this.genero = this.authService.getUser().Genero;
      //   this.modulosAll();
    } else {
      this.router.navigateByUrl('/login');
    }
  }
  /*
  ** Globally configure the locale (i18n).
  */
  setLocale(config: PrimeNGConfig, locale: string): void {
    switch (locale.toLowerCase()) {
      case 'en': {
        // already english
        const dow: string[] = config.getTranslation('dayNames');
        if (dow[0] !== 'Sunday') {
          const msg: string = 'Default locale not EN.';
        } else {
          console.log(` Using locale: '${locale}'`);
        }
        break;
      }
      case 'es': {
        config.setTranslation({
          startsWith: 'Comienza con',
          contains: 'Contiene',
          notContains: 'No contiene',
          endsWith: 'Termina con',
          equals: 'Igual',
          notEquals: 'No es igual',
          noFilter: 'Sin filtro',
          lt: 'Menos que',
          lte: 'Menos que o igual a',
          gt: 'Mas grande que',
          gte: 'Mayor qué o igual a',
          is: 'Es',
          isNot: 'No es',
          before: 'Antes de',
          after: 'Despues de',
          apply: 'Aplicar',
          matchAll: 'Coincidir con todos',
          matchAny: 'Coincidir con cualquiera',
          addRule: 'Agregar regla',
          removeRule: 'Eliminar regla',
          accept: 'Si',
          reject: 'No',
          choose: 'Escoger',
          upload: 'Subir',
          cancel: 'Cancelar',
          dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
          dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
          dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
          monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
          today: 'Hoy',
          clear: 'Limpiar',
          weekHeader: 'Sm'
        });
        break;
      }
      case 'de': {
        config.setTranslation({
          startsWith: 'Beginnt mit',
          contains: 'Enthält',
          notContains: 'Enthält nicht',
          endsWith: 'Endet mit',
          equals: 'Gleich',
          notEquals: 'Kein Filter',
          noFilter: 'Kein Filter',
          lt: 'Weniger als',
          lte: 'Weniger als oder gleich',
          gt: 'Größer als',
          gte: 'Größer als oder gleich wie',
          is: 'Ist',
          isNot: 'Ist nicht',
          before: 'Vor',
          after: 'Nach dem',
          apply: 'Anwenden',
          matchAll: 'Alle zusammenbringen',
          matchAny: 'Passen Sie zu einem',
          addRule: 'Regel hinzufügen',
          removeRule: 'Regel entfernen',
          accept: 'Ja',
          reject: 'Nein',
          choose: 'Wählen',
          upload: 'Hochladen',
          cancel: 'Stornieren',
          dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samastag'],
          dayNamesShort: ['Son', 'Mon', 'Die', 'Mit', 'Don', 'Fre', 'Sam'],
          dayNamesMin: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
          monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
          monthNamesShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
          today: 'Heute',
          clear: 'Löschen',
          weekHeader: 'Wo'
        });
        break;
      }
      default: {
        const msg: string = `Locale: '${locale}' not available.`;
        break;
      }
    }
  }
}
