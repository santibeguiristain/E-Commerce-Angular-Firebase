import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from '../interface/cliente';
import { Pedido } from '../interface/pedido';
import { Product_Pedido } from '../interface/product_pedido';
import { Iproduct, Producto } from '../interface/product.interface';
import { ClientService } from './client.service';
import { ProductService } from './product.service';
import { ProductPipe } from '../pipe/product.pipe';
import { promise } from 'protractor';
import { ResultProductPedidoModule } from '../interface/result-product-pedido.module';
import { exit } from 'process';
import { firestore } from 'firebase';
import { disableDebugTools } from '@angular/platform-browser';
import { literal } from '@angular/compiler/src/output/output_ast';

 


@Injectable({
  providedIn: 'root'
})
export class CartService {
 
 
  public listResultProducPedido: Array<Product_Pedido>;

 
 
  
  constructor(private afs: AngularFirestore, private clientService:ClientService ,private prodService : ProductService   ) {
    this.productCartCollection = afs.collection<Pedido>('carrito');
    this.productCart = this.productCartCollection.valueChanges();

    this.productPedidoCollection = afs.collection<Product_Pedido>('product_pedido');
    this.productPedido = this.productPedidoCollection.valueChanges();

   }
   
  private productPedidoCollection: AngularFirestoreCollection<Product_Pedido>;
  private productPedido: Observable<Product_Pedido[]>;
  private productCartCollection: AngularFirestoreCollection<Pedido>
  private productCart: Observable<Pedido[]>;
  public listInfoProdCart: Array<ResultProductPedidoModule>;
  public listCli: Array<Cliente>[]
  public ObjPrdPed: Product_Pedido;
  public ObjProduct:Iproduct;
  public ObjResultProductPedidoModule: ResultProductPedidoModule;
  public listCartForCli: Array<Pedido>;
  public listProducPedido: Array<Product_Pedido>;
  public listProducPed: Array<Product_Pedido>;
 
  
  
 
  

  getAllProductsCart()
  {   
    //Para mostrar el ID , debemos realizar el mapeo del mismo.
    
    return this.productCart= this.productCartCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Pedido;
        data.idCarrito = action.payload.doc.id; 
        return data;
        
      })
    }));
  }

  
 



  async getProductCartByClient (idCart : string)  {
     
      this.listInfoProdCart = new   Array<ResultProductPedidoModule>(); 
      (async () => {
          this.listResultProducPedido= await  this.getAllProductsPedidoMap(idCart);
      })();


       
      (async () => {
           this.listInfoProdCart= await  this.getProductsForIdProduct(this.listResultProducPedido);
      })();
  
   return this.listInfoProdCart;
  }
   

 async getProductsForIdProduct(listResultProducPedido:Array<Product_Pedido>){
  
  
  this.listInfoProdCart = new   Array<ResultProductPedidoModule>(); 
   
    // Recorro pedidos (cart), quedandome con el id producto
   if (listResultProducPedido != undefined)

    listResultProducPedido.forEach(async prodPed => {

      
        const prod = this.afs.collection('productos');
        const result = await prod.ref.where('idProducto', '==', prodPed.idProduct).get();
    
        if (result.empty) {
          console.log('No matching documents.');
          return;
        }
  
        (await result).forEach(docProdu => {
            let ObjResultProductPedidoModule = new ResultProductPedidoModule(null,null,null,null,null,null,null);
                                        
                                        //Mapeo para devolver el ResultProductPedidoModule // compuesto por atributos de pedido y de producto.
                                        ObjResultProductPedidoModule.idproduct = docProdu.get('idProducto');
                                        ObjResultProductPedidoModule.imagen =docProdu.get('imagen');
                                        ObjResultProductPedidoModule.precio = docProdu.get('precio');
                                        ObjResultProductPedidoModule.unidad_disponible = docProdu.get('unidad_disponible');
                                        ObjResultProductPedidoModule.cantidad_pedida = prodPed.cantProdPedido;
                                        ObjResultProductPedidoModule.precioSubTotal= prodPed.precioTotalProdPedido;
                                                  
                                        this.listInfoProdCart.push(ObjResultProductPedidoModule); 

                                        //console.log('getProductsForIdProduct','=>',docProdu.get('idproduct'));
            
          }) 
        })
          return this.listInfoProdCart;
  };
    

  getTotal(listInfoProdCart: ResultProductPedidoModule[]): number {
    let total = 0;
    
    listInfoProdCart.forEach((prod : ResultProductPedidoModule) => {
      
      total = parseInt(total.toString()) + parseInt(prod.precioSubTotal.toString());
    });

    return total;
  }


  addProductToCart(cantAddToCart: number,prod:Iproduct,emailCli:string ):string{
    let resultVerif = this.verifStock(cantAddToCart,prod.unidad_disponible);
    if(resultVerif != "") {//Err 
      return resultVerif;
    }  
    let resp= "OK";
      //2- GRABAR pRODUCTO       
      const data = {
                    idProduct: prod.idproduct,
                    idCart: sessionStorage.getItem('SessionIdCart'),
                    cantProdPedido: cantAddToCart,
                    precioTotalProdPedido:this.getPrecTotalProd(cantAddToCart,prod.precio),
                    pago:"false"
      };
      
    
      this.afs.collection('product_pedido').add(data)
              .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
              })  
             .catch(function(error) {
             return error;
            });
     
      return resp;
  }

 
   

  

  getPrecTotalProd(cantAddToCart: any, precio: number) {
     return precio * cantAddToCart;
  }


  verifStock(cantAddToCart: number,cantStock: number)
  {
    if(cantAddToCart != undefined && cantAddToCart  > 0 ){
      if(cantAddToCart <= cantStock){
        return "";
      }
      else{
        return "No hay stock para la cantidad solicitada";
      }
    }
    else{
      return "Debe ingresar cantidad"; 
    }
  }

 
 

  //Realiza el pago, quita de la lista PRODUCT_PEDIDOS , y descuenta stock PRODUCTO.
   async productPago(email:string, idCart:string)
   {
      const resul =  this.getAllProductsPedido(idCart);  
      (await resul).forEach(doc => {
    
        const docRef = this.afs.collection("product_pedido").doc(doc.id); // Quita de la lista de productos cart
        const addDocument =   docRef.update({ pago:"true" });       

        this.restCantidadProd(doc.get('idProduct') ,doc.get('cantProdPedido') );  // Descuenta stock del producto
      });    
    }

 

    
async getAllProductsPedido( idCart:string )
{    
  //Obtienee cart , tuplas vivas-sin pagar.
   const prodPed = this.afs.collection('product_pedido');
   const result = await prodPed.ref.where('idCart', '==', idCart) 
                                   .where('pago', '==', 'false').get();

   if (result.empty) {
     console.log('No matching documents.');
     return;
   }
 return  result;
}

 
async getAllProductsPedidoMap( idCart:string )
{    
  this.listProducPedido = new   Array<Product_Pedido>(); 
     
  //Obtienee cart , tuplas vivas-sin pagar.
   const prodPed = this.afs.collection('product_pedido');
   const result = await prodPed.ref.where('idCart', '==', idCart) 
                                   .where('pago', '!=', 'true').get();

   if (result.empty) {
     console.log('No matching documents.');
     return;
   }

  
   (await result).forEach(prodPedido => {

    let objResultProdPed = new Product_Pedido(null,null,null,null,null,null);
      objResultProdPed.IdDoc=prodPedido.get('IdDoc');
      objResultProdPed.cantProdPedido=prodPedido.get('cantProdPedido');
      objResultProdPed.idCart=prodPedido.get('idCart');
      objResultProdPed.idProduct=prodPedido.get('idProduct');
      objResultProdPed.pago=prodPedido.get('pago');
      objResultProdPed.precioTotalProdPedido=prodPedido.get('precioTotalProdPedido');
      this.listProducPedido.push(objResultProdPed);  

      
   });    
   

   
  
  

  return  this.listProducPedido;
 
}


  async  restCantidadProd(idProducto: string , cantProdPedido:number)  {
     
      //Obtengo el producto           
      const prod = this.afs.collection('productos');
      const result = await prod.ref.where('idProducto', '==', idProducto).get();
  
      if (result.empty) {
        console.log('No matching documents.');
        return;
      }

      //Recorro producto obtenidos y resto cantidas  // producto va a ser uno 
      
       result.forEach(docProdu => {
   
       let resultado = docProdu.get('unidad_disponible') - cantProdPedido;
       const docProdRef = this.afs.collection("productos").doc(idProducto);
       const addDocument =   docProdRef.update({ unidad_disponible:resultado });
       
      
     });    
}
}
