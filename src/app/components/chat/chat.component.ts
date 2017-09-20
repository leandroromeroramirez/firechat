import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ChatserviceService } from "../../services/chatservice.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {
  mensaje:string;
  elemento:any;

  constructor(public _chs:ChatserviceService) { 
    
    this._chs.cargarMensajes().subscribe( ()=>{
      console.log("Mensaje Cargado");
      setTimeout(()=> this.elemento.scrollTop = this.elemento.scrollHeight, 100); //esto con el proposito de que se cargen todos los elementos del dom
      
    });

  }

  ngOnInit() {
    this.elemento = document.getElementById("app-mensajes");
    console.log(this.elemento);
  }

  enviar(){
    if (this.mensaje.length == 0) {
      return;
    }
    this._chs.agregarMsn(this.mensaje)
    .then( ()=> console.log("Hecho Correctamente"))
    .catch( (error)=>console.error(error));

    this.mensaje = "";
  }

}
