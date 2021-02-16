import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {first} from 'rxjs/operators';
import { User } from 'firebase';
import { generateKeyPair } from 'crypto';
import { AngularFirestore } from '@angular/fire/firestore';



@Injectable()
export class AuthService {
 public user:User;
 public uidGenerado:string;

 constructor( public fire : AngularFireAuth ,private afs: AngularFirestore) {}

 public urlImageProd = "./../../../../assets/image/";
  
  async login(email: string, password: string){
    try{
      return await this.fire.signInWithEmailAndPassword(email,password)
        
    }
    catch(error)
    {
      console.log(error)
    }
    
  };
  
 



  async register(name: string,email: string, password: string){
    try{

         const resultado = await this.fire.createUserWithEmailAndPassword(email,password);  
         this.uidGenerado= await (await this.getCurrentUser()).uid; //obtiene id generado en la auth
         this.registerDatosClient_Cart(this.uidGenerado,name,email);            

      return resultado;
    }
    catch(error)
    {
      console.log(error)
    }
  }




  registerDatosClient_Cart(idClient,name,email)
 {
  
  //DATOS CLI      
  const docData = {
    idClient:idClient,
    email: email,
    idCart:idClient+'cart',
    nombre:name
  };
  
   this.afs.collection("cliente").doc(idClient).set(docData).then(function() {
      console.log("Document successfully written!");
   });
 }








  async logout(){
    try{
      await this.fire.signOut();
    }
    catch(error)
    {
      console.log(error)
    }
  }

  getCurrentUser(){
    return  this.fire.authState.pipe(first()).toPromise();  
    

  }
}
