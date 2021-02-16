import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogoRoutingModule } from './catalogo-routing.module';
import { CatalogoComponent } from './catalogo.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductPipe } from 'src/app/pipe/product.pipe';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { DetailProductRoutingModule } from './detail-product/detail-product-routing.module';
import { ListProductsCartRoutingModule } from './list-products-cart/list-products-cart-routing.module';
 
 
 


@NgModule({
  declarations: [CatalogoComponent,ProductPipe],
  providers: [AngularFireAuth,AngularFirestore],
  imports: [CommonModule,CatalogoRoutingModule,FormsModule,DetailProductRoutingModule,ListProductsCartRoutingModule,ReactiveFormsModule]
  
 
})
export class CatalogoModule { }
