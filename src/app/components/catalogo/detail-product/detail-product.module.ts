import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';;
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {FormsModule} from '@angular/forms';
import { DetailProductRoutingModule } from './detail-product-routing.module';
import { DetailProductComponent } from './detail-product.component'; 


@NgModule({
  declarations: [DetailProductComponent],
  providers: [AngularFireAuth,AngularFirestore],
  imports: [CommonModule,DetailProductRoutingModule,FormsModule],
  exports:[DetailProductComponent]
})
export class DetailProductModule { }



 