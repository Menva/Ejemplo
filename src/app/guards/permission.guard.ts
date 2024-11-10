import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { DataService } from '../data.service';
import { AuthService } from '../services/auth.service';
// import { Observable } from 'rxjs';
// import { MenuService } from '../service/menu/menu.service';
// import { NgxSpinnerService } from "ngx-spinner";
@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  menuall = [] as any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private ds: DataService,
    // private menuService: MenuService,
    // private spinner: NgxSpinnerService
  ) { }
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree>/* | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree*/ {
    var url = state.url;
    this.ds.sendData({Caso:1, Url:url});
    return true;
    // var modulos=this.authService.getModulos();
    // if(modulos.filter((d:any) => d.Ruta == url.slice(1)).length > 0){
    //   return true;
    // }else{
    //   this.router.navigateByUrl("/inaccessible");
    //   return false;
    // }
    // this.spinner.show("HomeLoading");
    // if (this.authService.logeado()) {
    //   var men = await this.menuService.getMenuAsync();
    //   this.menuall = this.makeData((men as any).respuesta);
    //   if (!this.authService.havePermision(this.menuall, url)) {
    //     this.spinner.hide("HomeLoading");
    //     if (this.menuall.length > 0) {
    //       this.router.navigateByUrl(this.menuall[0].ModuloPath);
    //     } else {
    //       this.router.navigateByUrl("/login");
    //     }
    //     return false;
    //   } else {
    //     this.spinner.hide("HomeLoading");
    //     return true;
    //   }
    // } else {
    //   this.spinner.hide("HomeLoading");
    //   this.router.navigateByUrl('/login');
    //   return false;
    // }
  }
  /** retorna un json armado correctamente para ser dibujado en la vista
    * @param data array del menu tal como viene de la api
   */
  // makeData(data: any[]) {
  //   let o = this;
  //   let temp = [] as any;
  //   data.forEach(function (value) {
  //     if (value.ModuloParentID == null && value.isParent == "1") {
  //       value.child = o.getChildItem(data, value.ModuloID);
  //       value.stateAnim = "colapse";
  //       value.isColapsed = false;
  //       value.collapse = '';
  //       temp.push(value);
  //     } else if (value.ModuloParentID == null) {
  //       temp.push(value);
  //     }
  //   });
  //   return temp;
  // }
  // /** retorna un json hijo de un menu item
  //  * @param data array del menu tal como viene de la api
  //  * @param id identificador del menu padre
  // */
  // getChildItem(data: any[], id: Number) {
  //   let temp = [] as any;
  //   data.forEach(function (value) {
  //     if (value.ModuloParentID == id) {
  //       temp.push(value);
  //     }
  //   });
  //   return temp;
  // }

}
