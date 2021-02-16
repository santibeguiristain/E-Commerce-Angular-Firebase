import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { observable, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from '../interface/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

 
 
  constructor(private afs: AngularFirestore) {
    this.clientCollection = afs.collection<Cliente>('cliente');
    this.client =this.clientCollection.valueChanges();
   }

   public clientCollection : AngularFirestoreCollection<Cliente>;
   private client :Observable<Cliente[]>;

  

 

 

  async  getIdCartClientLogued(emailLogueado: string ) {
     
    let idCart = '';     
    const prod = this.afs.collection('cliente');
    const result = await prod.ref.where('email', '==', emailLogueado).get();

    if (result.empty) {
      console.log('No matching documents.');
    }
  
     result.forEach(doc => {
        idCart=doc.get('idCart'); 
        return  idCart;

    });    
    return  idCart;
}


}
 