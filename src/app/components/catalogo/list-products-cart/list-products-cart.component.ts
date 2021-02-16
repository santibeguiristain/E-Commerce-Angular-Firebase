  import { NgModule, OnInit } from '@angular/core';
  import { Component, Input } from '@angular/core';
  import { Pedido } from 'src/app/interface/pedido';
  import { Cliente } from 'src/app/interface/cliente';
  import { CartService } from 'src/app/services/cart.service';
  import {ActivatedRoute, Router} from '@angular/router';
  import { Iproduct } from 'src/app/interface/product.interface';
import { ResultProductPedidoModule } from 'src/app/interface/result-product-pedido.module';
import { Product_Pedido } from 'src/app/interface/product_pedido';
import { ClientService } from 'src/app/services/client.service';
  
  
  @Component({
    selector: 'app-list-products-cart',
    templateUrl: './list-products-cart.component.html',
    styleUrls: ['./list-products-cart.component.scss']
  })
  export class ListProductsCartComponent implements OnInit{

    @Input() pedido:Pedido;
    @Input() cliente:Cliente;
    @Input() producto:Iproduct;
  
  
    
  
    public listInfoProdCart: Array<ResultProductPedidoModule>;
    public listProdPedido:Array<Product_Pedido>;
    public listres= [];
    total =0;
    public emailLogueado;
    public urlImageProd = "./../../../../assets/image/";
    public idCart='';
    public cantProdInList =0;
  
    
    constructor(private cartService :CartService,private _route:ActivatedRoute, private router: Router ) { }


    

    
    ngOnInit(){
      
  
      this.emailLogueado = sessionStorage.getItem('SessionUserLogueado');
      
        this.idCart = sessionStorage.getItem('SessionIdCart'); 
      
       
     /* if(this.emailLogueado != null && this.emailLogueado != undefined && this.emailLogueado != ""  ) {*/
          
        (async () => {
          this.listInfoProdCart = await this.cartService.getProductCartByClient(this.idCart); 
          
        })();

        /*  
      }else
      {
        this.router.navigate(['/login']);
      }*/
      
     
    } 

    
  
    ngAfterViewChecked()
    {
       if(this.listInfoProdCart != null && this.listInfoProdCart != undefined && this.listInfoProdCart.length>0)
      {
        this.total =   this.cartService.getTotal(this.listInfoProdCart);
        this.cantProdInList  = this.listInfoProdCart.length;
      }
   
    }

    Pagar()
    { 
      this.cartService.productPago(this.emailLogueado,this.idCart);
      this.router.navigate(['/catalogo']);
    }
  
  }
  