import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ListProductsCartComponent } from './list-products-cart.component';
import { ListProductsCartRoutingModule } from './list-products-cart-routing.module';
import { FormsModule } from '@angular/forms';
 



@NgModule({
  declarations: [ListProductsCartComponent],
  providers: [AngularFireAuth,AngularFirestore],
  imports: [CommonModule,ListProductsCartRoutingModule,FormsModule],
  exports:[ListProductsCartComponent]
})
export class ListProductsCartModule { }
