import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListProductsCartComponent }from './list-products-cart.component';


const routes: Routes = [{ path: '', component: ListProductsCartComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  
})
export class ListProductsCartRoutingModule { }