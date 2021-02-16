
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Iproduct, Producto } from 'src/app/interface/product.interface';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Pedido } from 'src/app/interface/pedido';
import { ClientService } from 'src/app/services/client.service';
import { Cliente } from 'src/app/interface/cliente';
import { Product_Pedido } from 'src/app/interface/product_pedido';
import { Route } from '@angular/compiler/src/core';
 



@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {
  
  @Input() producto:Iproduct;
 
 public cant;

  ObjPrdPed :Product_Pedido;

  constructor(private prodService : ProductService,private cartService :CartService,private clientService :ClientService,private _route:ActivatedRoute, private router: Router ) {  }
 
 
  public listProd: Array<Producto>;
  public listres= [];
 
  public listresCli= [];
  public emailLogueado;
  
  public urlImageProd = "./../../../../assets/image/";
  filterProd='';
  listCartForCli = new   Array<Pedido>(); 
  //emailLogueado = this._route.snapshot.paramMap.get("email"); --si lo pasaba por parametro (agregar en el routing)
 

  
  ngOnInit(){
    
    this.emailLogueado = sessionStorage.getItem('SessionUserLogueado');
    if(this.emailLogueado ==null ||this.emailLogueado ==undefined ||this.emailLogueado =='')
    {
      this.router.navigate(['/login']);
    }

    (async () => {
      let idCart = await this.clientService.getIdCartClientLogued(this.emailLogueado);
      sessionStorage.setItem('SessionIdCart',idCart.toString()); 
    })();

  
    (async () => {
      this.listProd = await this.prodService.getAllProducts(); 
    
    })();

    
 
    
 
}

 
  async addToCart(prod: Iproduct )
  {
    try{
    

       //var htmInp =<HTMLInputElement> document.getElementById('cantAddCart');
       var htmInp =<HTMLInputElement> document.getElementById(prod.idproduct);
      
  
       let cantAddToCart = htmInp.value;
       let cantStockDisp = prod.unidad_disponible;
  
        var result = this.cartService.addProductToCart(parseInt(cantAddToCart),prod,this.emailLogueado);
      
 
        if(result =="OK")
        {
          alert("its okey, the product  was add to cart");
        }
        else  
        {
           alert(result);
        }

    }catch(error)
    {
        console.log('**ERROR** ', error);
    }
  }
  
  



  /*addCart()
  {
    this.cartService.addProductCart(this.producto);
  }*/
   
}

