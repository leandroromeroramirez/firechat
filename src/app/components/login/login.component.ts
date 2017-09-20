import { Component, OnInit } from '@angular/core';
import { ChatserviceService } from "../../services/chatservice.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(public _chs:ChatserviceService) { }

  ngOnInit() {
  }

  ingresar(proveedor:string){
    this._chs.login(proveedor);
  }
}
