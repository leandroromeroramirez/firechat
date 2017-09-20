import { Component } from '@angular/core';
import { ChatserviceService } from "./services/chatservice.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public _chs:ChatserviceService){

  }
  salir(){
    this._chs.logout();
  }
}
