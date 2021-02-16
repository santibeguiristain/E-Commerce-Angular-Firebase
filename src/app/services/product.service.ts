import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection} from  '@angular/fire/firestore';
import {Iproduct, Producto} from '../interface/product.interface'
import { Observable } from 'rxjs/internal/observable';
import {map} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  listAllProducts: Iproduct[];
  public ObjProduct: Producto;

  constructor(private afs: AngularFirestore) { 
    this.productsCollection = afs.collection<Iproduct>('productos');
    this.products = this.productsCollection.valueChanges();
  }

  
  private productsCollection: AngularFirestoreCollection<Iproduct>
  private products: Observable<Iproduct[]>;

 
  async getAllProducts()
  {
      this.listAllProducts = new   Array<Iproduct>(); 
      const prodPed = this.afs.collection('productos');
      const result = await prodPed.ref.where('unidad_disponible', '!=', 0).get();

      if (result.empty) {
         console.log('No matching documents.');
         return;
      }
      
     

      (await result).forEach(doc => {
        let ObjProduct = new Producto('','','',null,null);
          ObjProduct.idproduct= doc.get('idProducto');
          ObjProduct.descripcion= doc.get('descripcion');
          ObjProduct.imagen= doc.get('imagen');
          ObjProduct.precio= doc.get('precio');
          ObjProduct.unidad_disponible= doc.get('unidad_disponible');

          this.listAllProducts.push(ObjProduct);
       });    
   
       return this.listAllProducts;
  }
 
}
