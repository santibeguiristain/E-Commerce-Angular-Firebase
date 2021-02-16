import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
       path: '', redirectTo:'/home',  pathMatch:'full' 
    },{
       path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) 
    },{ 
        path: 'login', loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginModule) 
    },{
        path: 'register', loadChildren: () => import('./components/auth/register/register.module').then(m => m.RegisterModule) 
    },{
       path: 'catalogo',  loadChildren: () => import('./components/catalogo/catalogo.module').then(m => m.CatalogoModule) 
    },{
       path: 'detail-product/:precio/:descripcion/:unidades/:imagen', loadChildren: () => import('./components/catalogo/detail-product/detail-product.module').then(m => m.DetailProductModule) 
    },{
      path: 'list-products-cart',  loadChildren: () => import('./components/catalogo/list-products-cart/list-products-cart.module').then(m => m.ListProductsCartModule) 
   }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
