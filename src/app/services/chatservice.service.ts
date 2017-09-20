import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Mensaje } from "../interfaces/mensaje.interface";
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class ChatserviceService {

  user: Observable<firebase.User>;

  chats: FirebaseListObservable<any[]>;
  usuario:any = null;

  constructor(private db:AngularFireDatabase, public afAuth: AngularFireAuth){
    // this.items = db.list('/items');
    if(localStorage.getItem('usuario')){
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }
  }

  cargarMensajes(){
    this.chats = this.db.list('/chats', {
      query:{
        limitToLast:20,
        orderByKey:true
      }
    }); 
    return this.chats;
  }

  agregarMsn(texto:string){
    let msn:Mensaje = {
      nombre:this.usuario.displayName,
      mensaje:texto,
      uid: this.usuario.uid
    }

    return this.chats.push(msn); // esto retorna una promesa
  }

  login(proveedor:string) {
    let provider:any;

    if(proveedor == "google" ){

      provider = new firebase.auth.GoogleAuthProvider();
    }else{

      provider = new firebase.auth.TwitterAuthProvider();
    }

    this.afAuth.auth.signInWithPopup(provider)
    .then(res=>{
      this.usuario = res.user; //se guarda la respuesta de google
      localStorage.setItem('usuario', JSON.stringify(this.usuario)); // Se guarda el en localstorage

    });
  }

  logout() {
    this.usuario = null;
    this.afAuth.auth.signOut();
    localStorage.removeItem('usuario');

  }
}
