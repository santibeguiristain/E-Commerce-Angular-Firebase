import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class ProductPipe implements PipeTransform {

  transform(value: any, arg: any): any {
   if( arg === undefined || arg =='' || arg.length <3 ) return value;  
     
   const resultProduct = [];
     
     for(const product of value){ //value equivale a todos los productos.
     
        if(product.descripcion.toLowerCase().indexOf(arg.toLowerCase()) > -1)
        {
          resultProduct.push(product);
        }
     }

     return resultProduct;
  }
}
